/**
 * Snapshot de métricas de Meta Ads para el panel de control (/panel).
 *
 * Meta no se puede consultar en vivo desde el servidor (el token de la API de
 * Conversiones no lee insights), así que este archivo es la foto más reciente:
 * se actualiza pidiéndoselo a Claude ("actualiza el panel"), que consulta la
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
  actualizado: "2026-08-19T19:05:00-06:00",
  nota: "C1 encendida hoy 19-ago 17:13 · Meta aún no reporta entrega (normal en las primeras horas)",
  campanas: [
    {
      nombre: "C1 · TOF Prospección",
      estado: "activa",
      presupuestoDiario: 300,
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
    {
      nombre: "C2 · MOF Retargeting tibio",
      estado: "pausada",
      presupuestoDiario: 125,
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
