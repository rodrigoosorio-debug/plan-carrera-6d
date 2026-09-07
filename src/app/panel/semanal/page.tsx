import { notFound } from "next/navigation";

/**
 * Reporte semanal de KPIs — plan.6dlinks.com/panel/semanal?clave=...
 *
 * Una fila por semana (lunes a domingo) desde el arranque de la campaña
 * (lunes 17 de agosto de 2026) hasta hoy. Todo se consulta EN VIVO al cargar:
 * Meta con time_increment=7 (los cortes caen solos en lunes) y GHL agrupando
 * los leads del funnel por semana según su fecha de alta.
 *
 * Misma clave que /panel (PANEL_KEY). Sin clave correcta, 404.
 */

export const dynamic = "force-dynamic";

const CAMPAIGN_START = "2026-08-17";
const META_ACCOUNT = "act_750991560852206";
const GHL_CONTACTS = "https://services.leadconnectorhq.com/contacts/";

const LEAD_TAGS = [
  "calculadora-rotacion",
  "test-empleabilidad",
  "whatsapp-ejecutivo",
  "whatsapp-corporativo",
];

interface WeekRow {
  desde: string;
  hasta: string;
  gasto: number;
  impresiones: number;
  alcance: number;
  clics: number;
  ctr: number;
  cpm: number;
  visitasLanding: number;
  carritos: number;
  valorCarritos: number;
  contactosWhatsApp: number;
  leadsGhl: number;
  compras: number;
  ingresos: number;
}

interface MetaAction {
  action_type: string;
  value: string;
}

function actionValue(list: MetaAction[] | undefined, type: string): number {
  return Number(list?.find((a) => a.action_type === type)?.value ?? 0);
}

async function fetchMetaWeekly(): Promise<Omit<WeekRow, "leadsGhl">[] | null> {
  const token = process.env.META_INSIGHTS_TOKEN;
  if (!token) return null;

  const hoy = new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Mexico_City",
  });
  const params = new URLSearchParams({
    fields: "spend,impressions,reach,clicks,ctr,cpm,actions,action_values",
    time_increment: "7",
    time_range: JSON.stringify({ since: CAMPAIGN_START, until: hoy }),
    limit: "60",
    access_token: token,
  });

  try {
    const res = await fetch(
      `https://graph.facebook.com/v25.0/${META_ACCOUNT}/insights?${params}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const body = (await res.json()) as {
      data?: Array<{
        date_start: string;
        date_stop: string;
        spend?: string;
        impressions?: string;
        reach?: string;
        clicks?: string;
        ctr?: string;
        cpm?: string;
        actions?: MetaAction[];
        action_values?: MetaAction[];
      }>;
    };

    return (body.data ?? []).map((w) => ({
      desde: w.date_start,
      hasta: w.date_stop,
      gasto: Number(w.spend ?? 0),
      impresiones: Number(w.impressions ?? 0),
      alcance: Number(w.reach ?? 0),
      clics: Number(w.clicks ?? 0),
      ctr: Number(w.ctr ?? 0),
      cpm: Number(w.cpm ?? 0),
      visitasLanding: actionValue(w.actions, "landing_page_view"),
      carritos: actionValue(w.actions, "initiate_checkout"),
      valorCarritos: actionValue(w.action_values, "initiate_checkout"),
      // El evento Contact llega como acción offsite de contacto al sitio.
      contactosWhatsApp:
        actionValue(w.actions, "contact_website") ||
        actionValue(w.actions, "contact_total") ||
        actionValue(w.actions, "contact"),
      compras:
        actionValue(w.actions, "omni_purchase") ||
        actionValue(w.actions, "purchase") ||
        actionValue(w.actions, "offsite_conversion.fb_pixel_purchase"),
      ingresos:
        actionValue(w.action_values, "omni_purchase") ||
        actionValue(w.action_values, "purchase"),
    }));
  } catch {
    return null;
  }
}

/** Índice de semana (0 = la del 17-ago) para una fecha ISO, en hora de México. */
function weekIndex(iso: string): number {
  const start = new Date(`${CAMPAIGN_START}T00:00:00-06:00`).getTime();
  const t = new Date(iso).getTime();
  return Math.floor((t - start) / (7 * 24 * 60 * 60 * 1000));
}

async function fetchGhlLeadsPorSemana(): Promise<Map<number, number> | null> {
  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) return null;

  const porSemana = new Map<number, number>();
  let startAfter = "";
  let startAfterId = "";

  try {
    for (let page = 0; page < 5; page++) {
      const params = new URLSearchParams({ locationId, limit: "100" });
      if (startAfter) params.set("startAfter", startAfter);
      if (startAfterId) params.set("startAfterId", startAfterId);

      const res = await fetch(`${GHL_CONTACTS}?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Version: "2021-07-28",
          Accept: "application/json",
        },
        cache: "no-store",
      });
      if (!res.ok) break;

      const body = (await res.json()) as {
        contacts?: Array<{ tags?: string[]; dateAdded?: string }>;
        meta?: { startAfter?: number; startAfterId?: string };
      };
      const contacts = body.contacts ?? [];
      for (const c of contacts) {
        const tags = c.tags ?? [];
        if (tags.includes("interno-prueba")) continue;
        if (!tags.some((t) => LEAD_TAGS.includes(t))) continue;
        if (!c.dateAdded) continue;
        const idx = weekIndex(c.dateAdded);
        if (idx < 0) continue;
        porSemana.set(idx, (porSemana.get(idx) ?? 0) + 1);
      }
      if (contacts.length < 100 || !body.meta?.startAfterId) break;
      startAfter = String(body.meta.startAfter ?? "");
      startAfterId = body.meta.startAfterId;
    }
    return porSemana;
  } catch {
    return null;
  }
}

const mxn = (n: number) =>
  n.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });

const num = (n: number) => n.toLocaleString("es-MX");

function fechaCorta(iso: string): string {
  return new Date(`${iso}T12:00:00-06:00`).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
    timeZone: "America/Mexico_City",
  });
}

export default async function ReporteSemanal({
  searchParams,
}: {
  searchParams: Promise<{ clave?: string }>;
}) {
  const key = process.env.PANEL_KEY;
  const { clave } = await searchParams;
  if (!key || clave !== key) notFound();

  const [semanas, leadsGhl] = await Promise.all([
    fetchMetaWeekly(),
    fetchGhlLeadsPorSemana(),
  ]);

  const filas: WeekRow[] = (semanas ?? []).map((s, i) => ({
    ...s,
    leadsGhl: leadsGhl?.get(i) ?? 0,
  }));

  const total = filas.reduce(
    (acc, f) => ({
      gasto: acc.gasto + f.gasto,
      visitasLanding: acc.visitasLanding + f.visitasLanding,
      carritos: acc.carritos + f.carritos,
      valorCarritos: acc.valorCarritos + f.valorCarritos,
      contactosWhatsApp: acc.contactosWhatsApp + f.contactosWhatsApp,
      leadsGhl: acc.leadsGhl + f.leadsGhl,
      compras: acc.compras + f.compras,
      ingresos: acc.ingresos + f.ingresos,
    }),
    {
      gasto: 0,
      visitasLanding: 0,
      carritos: 0,
      valorCarritos: 0,
      contactosWhatsApp: 0,
      leadsGhl: 0,
      compras: 0,
      ingresos: 0,
    },
  );

  return (
    <main className="min-h-screen bg-[#160B2E] px-6 py-10 text-[#F5F1E8]">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          6D · Plan de Carrera Profesional
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
          Reporte semanal de KPIs
        </h1>
        <p className="mt-2 text-sm text-white/50">
          Semanas de lunes a domingo desde el arranque (17 ago 2026),
          consultadas en vivo al cargar esta página. La última fila es la semana
          en curso (parcial).
        </p>

        {filas.length === 0 ? (
          <p className="mt-10 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/60">
            No se pudo consultar Meta en vivo (falta META_INSIGHTS_TOKEN o la
            API no respondió). Recarga la página o revisa la variable en Vercel.
          </p>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04] text-left text-xs uppercase tracking-wider text-white/50">
                  <th className="px-4 py-3">Semana</th>
                  <th className="px-4 py-3">Gasto</th>
                  <th className="px-4 py-3">Impresiones</th>
                  <th className="px-4 py-3">CTR</th>
                  <th className="px-4 py-3">CPM</th>
                  <th className="px-4 py-3">Visitas landing</th>
                  <th className="px-4 py-3">Leads (GHL)</th>
                  <th className="px-4 py-3">WhatsApp</th>
                  <th className="px-4 py-3">Carritos</th>
                  <th className="px-4 py-3">Compras</th>
                </tr>
              </thead>
              <tbody className="tabular">
                {filas.map((f) => (
                  <tr key={f.desde} className="border-b border-white/5">
                    <td className="px-4 py-3 font-medium">
                      {fechaCorta(f.desde)} – {fechaCorta(f.hasta)}
                    </td>
                    <td className="px-4 py-3">{mxn(f.gasto)}</td>
                    <td className="px-4 py-3">{num(f.impresiones)}</td>
                    <td className="px-4 py-3">{f.ctr.toFixed(2)}%</td>
                    <td className="px-4 py-3">{mxn(f.cpm)}</td>
                    <td className="px-4 py-3">
                      {num(f.visitasLanding)}
                      {f.visitasLanding > 0 && (
                        <span className="text-white/40">
                          {" "}
                          ({mxn(f.gasto / f.visitasLanding)})
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">{num(f.leadsGhl)}</td>
                    <td className="px-4 py-3">{num(f.contactosWhatsApp)}</td>
                    <td className="px-4 py-3">
                      {num(f.carritos)}
                      {f.valorCarritos > 0 && (
                        <span className="text-white/40">
                          {" "}
                          ({mxn(f.valorCarritos)})
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {num(f.compras)}
                      {f.ingresos > 0 && (
                        <span className="text-[#E8B84B]">
                          {" "}
                          {mxn(f.ingresos)}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="bg-white/[0.04] font-semibold">
                  <td className="px-4 py-3">Total</td>
                  <td className="px-4 py-3">{mxn(total.gasto)}</td>
                  <td className="px-4 py-3" />
                  <td className="px-4 py-3" />
                  <td className="px-4 py-3" />
                  <td className="px-4 py-3">{num(total.visitasLanding)}</td>
                  <td className="px-4 py-3">{num(total.leadsGhl)}</td>
                  <td className="px-4 py-3">{num(total.contactosWhatsApp)}</td>
                  <td className="px-4 py-3">
                    {num(total.carritos)}{" "}
                    <span className="text-white/40">
                      ({mxn(total.valorCarritos)})
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {num(total.compras)}{" "}
                    {total.ingresos > 0 && (
                      <span className="text-[#E8B84B]">
                        {mxn(total.ingresos)}
                      </span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-6 text-sm text-white/40">
          · "Leads (GHL)" cuenta contactos nuevos con etiqueta del funnel
          (calculadora, test o WhatsApp), sin pruebas internas. · "WhatsApp" es
          el evento Contact del píxel. · Cada lunes, esta misma página ya trae
          la semana anterior completa.
        </p>

        <a
          href={`/panel?clave=${encodeURIComponent(clave ?? "")}`}
          className="mt-8 inline-block rounded-full border border-white/20 px-6 py-2 text-sm text-white/70 hover:bg-white/5"
        >
          ← Volver al panel
        </a>
      </div>
    </main>
  );
}
