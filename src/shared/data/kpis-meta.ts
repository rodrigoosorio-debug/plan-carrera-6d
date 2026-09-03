/**
 * Snapshot de métricas de Meta Ads para el panel de control (/panel).
 *
 * Desde que existe META_INSIGHTS_TOKEN el panel consulta Meta EN VIVO en cada
 * carga; este archivo es solo el respaldo si el token falla o se revoca.
 * Se actualiza pidiéndoselo a Claude ("actualiza el panel"), que consulta la
 * cuenta por MCP, reescribe estos números y publica. La fecha de la foto se
 * muestra en el panel para que nadie lea datos viejos como si fueran de hoy.
 */

export interface CampaignSnapshot {
  nombre: string;
  estado: "activa" | "pausada";
  presupuestoDiario: number;
  gasto: number;
  impresiones: number;
  alcance: number;
  clics: number;
  ctr: number | null;
  cpm: number | null;
  cpc: number | null;
  /** Vistas de video ≥3s / impresiones — solo aplica cuando hay reels. */
  hookRate: number | null;
  compras: number;
  ingresosAtribuidos: number;
}

export const META_SNAPSHOT: {
  actualizado: string;
  nota: string;
  campanas: CampaignSnapshot[];
} = {
  actualizado: "2026-09-03T12:00:00-06:00",
  nota: "Acumulado al 3-sep: 5 InitiateCheckout ($10,985 en carritos), 18 Contact a WhatsApp, 10 leads de píxel, 866 visitas a landing. C2 encendida el 26-ago (CPM $27); 6 anuncios MOF activos desde el 3-sep.",
  campanas: [
    {
      nombre: "C1 · TOF Prospección",
      estado: "activa",
      presupuestoDiario: 300,
      gasto: 3519.65,
      impresiones: 32324,
      alcance: 25099,
      clics: 1107,
      ctr: 3.42,
      cpm: 108.89,
      cpc: 3.18,
      hookRate: null,
      compras: 0,
      ingresosAtribuidos: 0,
    },
    {
      nombre: "C2 · MOF Retargeting tibio",
      estado: "activa",
      presupuestoDiario: 125,
      gasto: 470.59,
      impresiones: 17264,
      alcance: 14886,
      clics: 399,
      ctr: 2.31,
      cpm: 27.26,
      cpc: 1.18,
      hookRate: null,
      compras: 0,
      ingresosAtribuidos: 0,
    },
    {
      nombre: "C3 · BOF Cierre",
      estado: "pausada",
      presupuestoDiario: 75,
      gasto: 0,
      impresiones: 0,
      alcance: 0,
      clics: 0,
      ctr: null,
      cpm: null,
      cpc: null,
      hookRate: null,
      compras: 0,
      ingresosAtribuidos: 0,
    },
  ],
};
