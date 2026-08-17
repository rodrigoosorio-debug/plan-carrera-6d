import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { plans } from "@/shared/data/plans";
import { site } from "@/shared/data/site";

/**
 * Recibe el aviso de pago desde un workflow de GHL y reporta el evento
 * Purchase a Meta por la API de Conversiones (CAPI).
 *
 * Existe porque la agencia no da acceso para poner el pixel en el checkout de
 * GHL: en lugar de medir la compra en el navegador, GHL nos avisa del pago y
 * nosotros se lo contamos a Meta desde el servidor. Es incluso más fiable que
 * el pixel (no depende de bloqueadores ni de que el cliente espere la página
 * de gracias).
 *
 * Configuración en GHL (workflow "Pago recibido"):
 *   POST https://plan.6dlinks.com/api/meta-purchase?key=<PURCHASE_WEBHOOK_SECRET>
 *   Body JSON: { "email": "{{contact.email}}", "phone": "{{contact.phone}}",
 *               "nivel": "esencial" }   ← un workflow por nivel de compra directa
 *
 * Variables en Vercel:
 *   META_CAPI_TOKEN          token de la API de Conversiones (lo genera Rodrigo
 *                            en Events Manager; el pixel es suyo, no de la agencia)
 *   PURCHASE_WEBHOOK_SECRET  cadena secreta que valida que el aviso viene de GHL
 */

const GRAPH_URL = `https://graph.facebook.com/v21.0/${site.metaPixelId}/events`;

const payloadSchema = z.object({
  email: z.string().trim().toLowerCase().optional().or(z.literal("")),
  phone: z.string().trim().optional().or(z.literal("")),
  /** id del nivel comprado; de aquí sale el monto (fuente única: plans.ts). */
  nivel: z.string().trim().toLowerCase(),
  /** id de transacción u orden de GHL, si el workflow lo trae: deduplica. */
  transactionId: z.string().trim().max(120).optional().or(z.literal("")),
});

/** Meta exige los datos de contacto en SHA-256, en minúsculas y sin espacios. */
function hash(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

/** Teléfono en formato E.164 sin signos, como lo pide Meta: 5219931234567. */
function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits.startsWith("52") ? digits : `52${digits}`;
}

export async function POST(request: Request) {
  const url = new URL(request.url);

  const secret = process.env.PURCHASE_WEBHOOK_SECRET;
  const token = process.env.META_CAPI_TOKEN;

  if (!secret || !token) {
    console.error(
      "[meta-purchase] Falta META_CAPI_TOKEN o PURCHASE_WEBHOOK_SECRET",
    );
    return NextResponse.json({ error: "No configurado" }, { status: 503 });
  }

  if (url.searchParams.get("key") !== secret) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Datos inválidos" },
      { status: 400 },
    );
  }

  const { email, phone, nivel, transactionId } = parsed.data;

  const plan = plans.find((p) => p.id === nivel);
  if (!plan) {
    return NextResponse.json(
      {
        error: `Nivel desconocido: ${nivel}. Válidos: ${plans.map((p) => p.id).join(", ")}`,
      },
      { status: 400 },
    );
  }

  const userData: Record<string, string[]> = {};
  if (email) userData.em = [hash(email)];
  if (phone) userData.ph = [hash(normalizePhone(phone))];

  if (Object.keys(userData).length === 0) {
    // Sin email ni teléfono Meta no puede atribuir la compra a nadie.
    return NextResponse.json(
      { error: "Se necesita al menos email o teléfono" },
      { status: 400 },
    );
  }

  const event = {
    event_name: "Purchase",
    event_time: Math.floor(Date.now() / 1000),
    action_source: "website",
    event_source_url: "https://plan.6dlinks.com/",
    // Con event_id, si algún día el pixel también reporta la compra, Meta
    // deduplica en vez de contarla doble.
    event_id:
      transactionId ||
      `pcp-${nivel}-${hash((email || phone) + nivel).slice(0, 16)}`,
    user_data: userData,
    custom_data: {
      value: plan.price,
      currency: "MXN",
      content_name: `Plan de Carrera — ${plan.name}`,
    },
  };

  // El código de Test Events de Meta, para verificar en vivo sin compras reales.
  const testCode = url.searchParams.get("test");

  try {
    const response = await fetch(`${GRAPH_URL}?access_token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [event],
        ...(testCode ? { test_event_code: testCode } : {}),
      }),
    });

    const result: unknown = await response.json();

    if (!response.ok) {
      console.error(
        "[meta-purchase] Meta rechazó el evento:",
        JSON.stringify(result),
      );
      return NextResponse.json(
        { error: "Meta rechazó el evento" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, nivel: plan.id, value: plan.price });
  } catch (error) {
    console.error("[meta-purchase] Error de red hacia Meta:", error);
    return NextResponse.json(
      { error: "Error de red hacia Meta" },
      { status: 502 },
    );
  }
}
