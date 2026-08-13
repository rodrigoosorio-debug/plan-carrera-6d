import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Recibe el lead de la calculadora de rotación y lo crea en GHL.
 *
 * Es la única ruta de servidor del proyecto. Existe para que el token de GHL
 * nunca llegue al navegador: el formulario habla con esta ruta y esta ruta
 * habla con GHL.
 *
 * Variables necesarias en Vercel:
 *   GHL_API_TOKEN    token de integración privada (empieza con "pit-")
 *   GHL_LOCATION_ID  id del subaccount
 */

const GHL_ENDPOINT = "https://services.leadconnectorhq.com/contacts/upsert";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Nombre demasiado corto").max(80),
  email: z.email("Correo inválido").max(120),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  /** Sueldo promedio mensual que capturó el usuario. */
  salary: z
    .number()
    .int()
    .min(1000, "Sueldo fuera de rango")
    .max(1_000_000, "Sueldo fuera de rango"),
  /** Cuántas personas se fueron en el último año. */
  departures: z
    .number()
    .int()
    .min(0, "Número de bajas fuera de rango")
    .max(500, "Número de bajas fuera de rango"),
  /** Costo total calculado, para que el vendedor lo vea sin recalcular. */
  cost: z.number().int().min(0, "Costo inválido"),
  /**
   * Campo trampa: los bots lo llenan, las personas no lo ven.
   * Se acepta cualquier valor a propósito — si lo rechazáramos aquí, el error
   * le diría al bot que encontró un honeypot. El descarte se hace abajo, en
   * silencio y devolviendo éxito.
   */
  website: z.string().max(200).optional(),
});

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
    console.error("[lead] Falta GHL_API_TOKEN o GHL_LOCATION_ID");
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
    companyName: lead.company || undefined,
    source: "Landing — Calculadora de rotación",
    tags: ["calculadora-rotacion", "landing-b2b"],
    customFields: [
      { key: "costo_rotacion_anual", field_value: String(lead.cost) },
      { key: "sueldo_promedio", field_value: String(lead.salary) },
      { key: "bajas_ultimo_ano", field_value: String(lead.departures) },
    ],
  };

  const send = (body: object) =>
    fetch(GHL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

  try {
    let response = await send(contact);

    // Si los campos personalizados no existen en GHL, no perdemos el lead:
    // reintentamos sin ellos. Vale más un contacto incompleto que ninguno.
    if (!response.ok) {
      const detail = await response.text();
      console.error("[lead] GHL rechazó el contacto:", response.status, detail);

      const { customFields, ...withoutCustom } = contact;
      void customFields;
      response = await send(withoutCustom);
    }

    if (!response.ok) {
      const detail = await response.text();
      console.error(
        "[lead] GHL falló también sin campos:",
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
    console.error("[lead] Error de red hacia GHL:", error);
    return NextResponse.json(
      { error: "No pudimos guardar tus datos. Escríbenos por WhatsApp." },
      { status: 502 },
    );
  }
}
