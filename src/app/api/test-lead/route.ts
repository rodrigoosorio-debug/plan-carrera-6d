import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Recibe el lead del Test de Empleabilidad (public/test-empleabilidad.html)
 * y lo crea en GHL.
 *
 * Es hermana de /api/lead (la calculadora B2B) pero con su propio contrato:
 * aquí no hay costo de rotación — hay puntaje, situación laboral y brechas.
 * Como el CRM no tiene campos personalizados para esto, el contexto viaja en
 * las etiquetas (puntaje por rango + situación), que es lo que Saulo e Iri
 * filtran en el pipeline.
 *
 * Variables necesarias en Vercel (las mismas de /api/lead):
 *   GHL_API_TOKEN    token de integración privada (empieza con "pit-")
 *   GHL_LOCATION_ID  id del subaccount
 */

const GHL_ENDPOINT = "https://services.leadconnectorhq.com/contacts/upsert";

const SITUACIONES: Record<string, string> = {
  "Estudiante / por egresar": "situacion-estudiante",
  "Recién egresado buscando primer empleo": "situacion-recien-egresado",
  "Trabajo pero busco mejor empleo": "situacion-busca-mejor-empleo",
  "Busco ascenso / aumento en mi empresa": "situacion-busca-ascenso",
};

const leadSchema = z.object({
  name: z.string().trim().min(2, "Nombre demasiado corto").max(80),
  email: z.email("Correo inválido").max(120),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  situacion: z.string().trim().max(80),
  /** Puntaje 0-100 del test, para etiquetar el nivel del lead. */
  score: z.number().int().min(0).max(100),
  /** Las 3 brechas principales, como texto para referencia del vendedor. */
  gaps: z.array(z.string().max(60)).max(3).optional(),
  /** Campo trampa: se acepta cualquier valor y se descarta en silencio. */
  website: z.string().max(200).optional(),
});

/** El puntaje viaja como etiqueta por rango: es lo que el pipeline filtra. */
function scoreTag(score: number): string {
  if (score >= 80) return "score-alto-80-100";
  if (score >= 60) return "score-competitivo-60-79";
  if (score >= 40) return "score-potencial-40-59";
  return "score-invisible-0-39";
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Datos inválidos" },
      { status: 400 },
    );
  }

  const lead = parsed.data;

  // El honeypot venía lleno: es un bot. Respondemos ok para no darle pistas.
  if (lead.website) {
    return NextResponse.json({ ok: true });
  }

  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!token || !locationId) {
    console.error("[test-lead] Falta GHL_API_TOKEN o GHL_LOCATION_ID");
    return NextResponse.json(
      { error: "El formulario no está configurado todavía." },
      { status: 503 },
    );
  }

  const [firstName, ...rest] = lead.name.split(" ");

  const contact = {
    locationId,
    firstName,
    lastName: rest.join(" ") || undefined,
    email: lead.email,
    phone: lead.phone || undefined,
    source: `Test de Empleabilidad — ${lead.score}/100${
      lead.gaps?.length ? ` · brechas: ${lead.gaps.join(", ")}` : ""
    }`,
    tags: [
      "test-empleabilidad",
      "leadmagnet-b2c",
      scoreTag(lead.score),
      SITUACIONES[lead.situacion] ?? "situacion-otra",
    ],
  };

  try {
    const response = await fetch(GHL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error(
        "[test-lead] GHL rechazó el contacto:",
        response.status,
        detail,
      );
      return NextResponse.json(
        { error: "No pudimos guardar tus datos. Escríbenos por WhatsApp." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[test-lead] Error de red hacia GHL:", error);
    return NextResponse.json(
      { error: "No pudimos guardar tus datos. Escríbenos por WhatsApp." },
      { status: 502 },
    );
  }
}
