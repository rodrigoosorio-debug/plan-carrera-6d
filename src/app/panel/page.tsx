import { notFound } from "next/navigation";
import { plans } from "@/shared/data/plans";
import { META_SNAPSHOT } from "@/shared/data/kpis-meta";

/**
 * Panel de control de la campaña — plan.6dlinks.com/panel?clave=...
 *
 * Dos fuentes:
 *   · GHL en vivo: leads por etiqueta y compradores, consultados al cargar.
 *   · Meta: snapshot en kpis-meta.ts (se refresca pidiéndoselo a Claude).
 *
 * Protegido con PANEL_KEY (variable de Vercel). Sin la clave correcta, 404:
 * el panel no debe existir para quien no sabe que existe.
 */

export const dynamic = "force-dynamic";

const GHL_CONTACTS = "https://services.leadconnectorhq.com/contacts/";

/** Etiquetas que el funnel pone solo, y qué significan en el tablero. */
const LEAD_TAGS: Record<string, string> = {
  "calculadora-rotacion": "Calculadora (B2B)",
  "test-empleabilidad": "Test de Empleabilidad",
  "whatsapp-ejecutivo": "WhatsApp · Ejecutivo",
  "whatsapp-corporativo": "WhatsApp · Corporativo",
};

const BUYER_TAGS: Record<string, string> = {
  "comprador-esencial": "esencial",
  "comprador-profesional": "profesional",
};

interface GhlStats {
  ok: boolean;
  /** Contactos con al menos una etiqueta del funnel — el CRM completo no cuenta. */
  leadsUnicos: number;
  leads: Record<string, number>;
  compras: Record<string, number>;
  ingresos: number;
}

async function fetchGhlStats(): Promise<GhlStats> {
  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  const empty: GhlStats = {
    ok: false,
    leadsUnicos: 0,
    leads: {},
    compras: {},
    ingresos: 0,
  };
  if (!token || !locationId) return empty;

  const tagCount: Record<string, number> = {};
  let leadsUnicos = 0;
  let startAfter = "";
  let startAfterId = "";

  try {
    // Hasta 500 contactos por carga: suficiente hoy; si el CRM crece más,
    // este conteo pasa a un endpoint con filtros del lado de GHL.
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
        contacts?: Array<{ tags?: string[] }>;
        meta?: { startAfter?: number; startAfterId?: string };
      };
      const contacts = body.contacts ?? [];
      for (const c of contacts) {
        const tags = c.tags ?? [];
        if (tags.some((t) => t in LEAD_TAGS)) leadsUnicos += 1;
        for (const t of tags) {
          tagCount[t] = (tagCount[t] ?? 0) + 1;
        }
      }
      if (contacts.length < 100 || !body.meta?.startAfterId) break;
      startAfter = String(body.meta.startAfter ?? "");
      startAfterId = body.meta.startAfterId;
    }
  } catch {
    return empty;
  }

  const leads: Record<string, number> = {};
  for (const tag of Object.keys(LEAD_TAGS)) leads[tag] = tagCount[tag] ?? 0;

  const compras: Record<string, number> = {};
  let ingresos = 0;
  for (const [tag, planId] of Object.entries(BUYER_TAGS)) {
    const n = tagCount[tag] ?? 0;
    compras[planId] = n;
    const plan = plans.find((p) => p.id === planId);
    if (plan) ingresos += n * plan.price;
  }

  return { ok: true, leadsUnicos, leads, compras, ingresos };
}

interface PipelineStats {
  ok: boolean;
  faltaPermiso: boolean;
  etapas: Array<{ nombre: string; abiertas: number }>;
}

/**
 * Etapas del pipeline de cierre (oportunidades abiertas por etapa).
 * Requiere que la integración privada tenga el scope opportunities.readonly —
 * si no lo tiene, la sección explica cómo activarlo en vez de fallar.
 */
async function fetchPipeline(): Promise<PipelineStats> {
  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  const empty: PipelineStats = { ok: false, faltaPermiso: false, etapas: [] };
  if (!token || !locationId) return empty;

  const headers = {
    Authorization: `Bearer ${token}`,
    Version: "2021-07-28",
    Accept: "application/json",
  };

  try {
    const pipesRes = await fetch(
      `https://services.leadconnectorhq.com/opportunities/pipelines?locationId=${locationId}`,
      { headers, cache: "no-store" },
    );
    if (pipesRes.status === 401 || pipesRes.status === 403) {
      return { ok: false, faltaPermiso: true, etapas: [] };
    }
    if (!pipesRes.ok) return empty;

    const pipes = (await pipesRes.json()) as {
      pipelines?: Array<{
        id: string;
        name: string;
        stages?: Array<{ id: string; name: string }>;
      }>;
    };
    const pipeline = pipes.pipelines?.[0];
    if (!pipeline) return empty;

    const count = new Map<string, number>();
    const oppsRes = await fetch(
      `https://services.leadconnectorhq.com/opportunities/search?location_id=${locationId}&pipeline_id=${pipeline.id}&status=open&limit=100`,
      { headers, cache: "no-store" },
    );
    if (!oppsRes.ok) return empty;
    const opps = (await oppsRes.json()) as {
      opportunities?: Array<{ pipelineStageId?: string }>;
    };
    for (const o of opps.opportunities ?? []) {
      const key = o.pipelineStageId ?? "";
      count.set(key, (count.get(key) ?? 0) + 1);
    }

    return {
      ok: true,
      faltaPermiso: false,
      etapas: (pipeline.stages ?? []).map((st) => ({
        nombre: st.name,
        abiertas: count.get(st.id) ?? 0,
      })),
    };
  } catch {
    return empty;
  }
}

/** Semáforo simple: cada métrica sabe cuándo está bien, regular o mal. */
function light(
  value: number | null,
  good: number,
  warn: number,
  higherIsBetter = true,
): "ok" | "warn" | "bad" | "na" {
  if (value === null || Number.isNaN(value)) return "na";
  if (higherIsBetter) {
    if (value >= good) return "ok";
    if (value >= warn) return "warn";
    return "bad";
  }
  if (value <= good) return "ok";
  if (value <= warn) return "warn";
  return "bad";
}

const DOT: Record<string, string> = {
  ok: "bg-emerald-400",
  warn: "bg-amber-400",
  bad: "bg-rose-400",
  na: "bg-white/20",
};

const mx = (n: number) =>
  n.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });

function Tile({
  label,
  value,
  hint,
  status = "na",
}: {
  label: string;
  value: string;
  hint?: string;
  status?: "ok" | "warn" | "bad" | "na";
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${DOT[status]}`} />
        <p className="text-xs uppercase tracking-widest text-white/50">
          {label}
        </p>
      </div>
      <p className="mt-2 font-display text-3xl font-bold text-[#E8B84B]">
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-white/40">{hint}</p> : null}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-[0.2em] text-[#2ED9D0]">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default async function Panel({
  searchParams,
}: {
  searchParams: Promise<{ clave?: string }>;
}) {
  const key = process.env.PANEL_KEY;
  const { clave } = await searchParams;
  if (!key || clave !== key) notFound();

  const [ghl, pipeline] = await Promise.all([fetchGhlStats(), fetchPipeline()]);
  const meta = META_SNAPSHOT;

  const gastoTotal = meta.campanas.reduce((s, c) => s + c.gasto, 0);
  const comprasMeta = meta.campanas.reduce((s, c) => s + c.compras, 0);
  const comprasGhl = Object.values(ghl.compras).reduce((s, n) => s + n, 0);
  const compras = Math.max(comprasMeta, comprasGhl);
  const ingresos = Math.max(
    ghl.ingresos,
    meta.campanas.reduce((s, c) => s + c.ingresosAtribuidos, 0),
  );
  const leadsTotal = Object.values(ghl.leads).reduce((s, n) => s + n, 0);
  const costoLead =
    gastoTotal > 0 && leadsTotal > 0 ? gastoTotal / leadsTotal : null;
  const cac = gastoTotal > 0 && compras > 0 ? gastoTotal / compras : null;
  const roas = gastoTotal > 0 ? ingresos / gastoTotal : null;

  return (
    <main className="min-h-screen bg-[#160B2E] px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          6D · Plan de Carrera Profesional
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold">
          Panel de control de campaña
        </h1>
        <p className="mt-2 text-sm text-white/50">
          GHL en vivo al cargar esta página · Meta: foto del{" "}
          {new Date(meta.actualizado).toLocaleString("es-MX", {
            dateStyle: "medium",
            timeStyle: "short",
          })}{" "}
          — pídele a Claude &ldquo;actualiza el panel&rdquo; para refrescarla.
          {meta.nota ? ` · ${meta.nota}` : ""}
        </p>

        <Section title="El negocio (lo único que importa al final)">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Tile
              label="Ingresos"
              value={mx(ingresos)}
              hint="compras × precio de nivel"
            />
            <Tile
              label="Gasto en pauta"
              value={mx(gastoTotal)}
              hint={`presupuesto activo: ${mx(meta.campanas.filter((c) => c.estado === "activa").reduce((s, c) => s + c.presupuestoDiario, 0))}/día`}
            />
            <Tile
              label="ROAS"
              value={roas === null ? "—" : `${roas.toFixed(1)}×`}
              hint="meta: ≥3× · alarma: <1.5×"
              status={light(roas, 3, 1.5)}
            />
            <Tile
              label="CAC"
              value={cac === null ? "—" : mx(cac)}
              hint="meta: <$1,000 · alarma: >$2,500"
              status={light(cac, 1000, 2500, false)}
            />
          </div>
        </Section>

        <Section title="Leads en GHL (en vivo)">
          {ghl.ok ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(LEAD_TAGS).map(([tag, label]) => (
                <Tile
                  key={tag}
                  label={label}
                  value={String(ghl.leads[tag] ?? 0)}
                />
              ))}
              <Tile
                label="Costo por lead"
                value={costoLead === null ? "—" : mx(costoLead)}
                hint="meta: <$150 · alarma: >$300"
                status={light(costoLead, 150, 300, false)}
              />
              <Tile
                label="Leads de campaña"
                value={String(ghl.leadsUnicos)}
                hint="contactos únicos con etiqueta del funnel"
              />
              <Tile
                label="Compras Esencial"
                value={String(ghl.compras.esencial ?? 0)}
                hint="etiqueta comprador-esencial"
              />
              <Tile
                label="Compras Profesional"
                value={String(ghl.compras.profesional ?? 0)}
                hint="etiqueta comprador-profesional"
              />
            </div>
          ) : (
            <p className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm">
              No se pudo leer GHL (revisa GHL_API_TOKEN / GHL_LOCATION_ID en
              Vercel).
            </p>
          )}
        </Section>

        <Section title="Pipeline de cierre (oportunidades abiertas)">
          {pipeline.ok ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {pipeline.etapas.map((e) => (
                <Tile key={e.nombre} label={e.nombre} value={String(e.abiertas)} />
              ))}
            </div>
          ) : pipeline.faltaPermiso ? (
            <p className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/60">
              Para ver el pipeline aquí, agrega el permiso{" "}
              <code className="text-[#2ED9D0]">opportunities.readonly</code> a la
              integración privada en GHL (Configuración → Integraciones privadas →
              editar → scopes) y recarga esta página.
            </p>
          ) : (
            <p className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/60">
              No se pudo leer el pipeline en este momento.
            </p>
          )}
        </Section>

        <Section title="Pauta por campaña (Meta)">
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-white/[0.04] text-left text-xs uppercase tracking-wider text-white/50">
                <tr>
                  {[
                    "Campaña",
                    "Estado",
                    "Gasto",
                    "Impresiones",
                    "CTR",
                    "CPM",
                    "CPC",
                    "Hook rate",
                    "Compras",
                  ].map((h) => (
                    <th key={h} className="px-4 py-3 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {meta.campanas.map((c) => (
                  <tr key={c.nombre} className="border-t border-white/10">
                    <td className="px-4 py-3 font-medium">{c.nombre}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${c.estado === "activa" ? "bg-emerald-400/15 text-emerald-300" : "bg-white/10 text-white/50"}`}
                      >
                        {c.estado}
                      </span>
                    </td>
                    <td className="px-4 py-3">{mx(c.gasto)}</td>
                    <td className="px-4 py-3">
                      {c.impresiones.toLocaleString("es-MX")}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${DOT[light(c.ctr, 1, 0.7)]}`}
                        />
                        {c.ctr === null ? "—" : `${c.ctr.toFixed(2)}%`}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {c.cpm === null ? "—" : mx(c.cpm)}
                    </td>
                    <td className="px-4 py-3">
                      {c.cpc === null ? "—" : mx(c.cpc)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${DOT[light(c.hookRate, 25, 18)]}`}
                        />
                        {c.hookRate === null
                          ? "—"
                          : `${c.hookRate.toFixed(0)}%`}
                      </span>
                    </td>
                    <td className="px-4 py-3">{c.compras}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Las reglas de lectura (para no reaccionar de más)">
          <ul className="space-y-2 text-sm leading-relaxed text-white/60">
            <li>
              · Días 1–5: fase de aprendizaje — no tocar nada, los costos altos
              son normales.
            </li>
            <li>
              · Día 7 (26 ago): primera lectura seria — hook rate ≥25% y CTR
              ≥1%. Ventas aún NO se juzgan.
            </li>
            <li>
              · Semana 2–3: costo por lead y CAC empiezan a significar algo.
            </li>
            <li>
              · C2 se enciende al juntar ~1,000 tibios · C3 con tráfico
              constante en la landing.
            </li>
            <li>
              · Una campaña solo se apaga con ROAS &lt;1.5× sostenido DOS
              semanas, nunca por un mal día.
            </li>
          </ul>
        </Section>
      </div>
    </main>
  );
}
