import { ACCESS_MONTHS, whatsappUrl } from "./site";

/**
 * Los 4 niveles del programa. Fuente única: la usan la sección de Planes,
 * el JSON-LD y todos los CTAs. Cambiar un precio se hace solo aquí.
 *
 * Precios en MXN, por persona, con IVA incluido.
 */

export type PlanChannel = "checkout" | "whatsapp";

export interface Plan {
  id: string;
  name: string;
  /** Precio de lista real, se muestra tachado como anclaje. */
  priceRegular: number;
  price: number;
  weeklyHours: string;
  /** Narrativa B2B: le habla a quien compra para su equipo. */
  summary: string;
  /** Narrativa B2C: segunda persona del singular. */
  summaryPro: string;
  highlights: string[];
  /** Lo que este nivel NO incluye. Se muestra en gris, evita sorpresas. */
  excludes?: string[];
  channel: PlanChannel;
  ctaLabel: string;
  featured?: boolean;
}

export const plans: Plan[] = [
  {
    id: "esencial",
    name: "Esencial",
    priceRegular: 1994,
    price: 997,
    weeklyHours: "1 a 3 horas por semana",
    summary:
      "Programa introductorio con diagnóstico inicial. Los 5 módulos y 5 de los 6 talleres. Para probar el sistema antes de invertir más.",
    summaryPro:
      "Para probar el sistema sin comprometerte de más. Diagnóstico inicial, los 5 módulos y 5 de los 6 talleres.",
    highlights: [
      "Diagnóstico profesional inicial",
      "20 habilidades en 5 módulos y 5 talleres",
      "Plataforma disponible 24/7",
    ],
    excludes: ["Sin constancias", "Sin Excel", "Sin sesiones en vivo ni coaching"],
    channel: "checkout",
    ctaLabel: "Empezar con Esencial",
  },
  {
    id: "profesional",
    name: "Profesional",
    priceRegular: 5994,
    price: 2997,
    weeklyHours: "4 a 6 horas por semana",
    summary:
      "Todo lo de Esencial, más lo que lo vuelve un programa de verdad: constancias, Excel, sesiones en vivo y coaching semanal.",
    summaryPro:
      "El punto donde deja de ser un curso: constancias, 200 horas de Excel, coaching semanal y la alineación CONOCER.",
    highlights: [
      "Constancias con valor curricular",
      "200 horas de Excel, de cero a avanzado",
      "Coaching semanal en vivo",
      "Alineación SEP-CONOCER EC0217.01 · evaluación aparte",
    ],
    excludes: ["Certificación Microsoft opcional, pagando el examen aparte"],
    channel: "checkout",
    ctaLabel: "Empezar con Profesional",
    featured: true,
  },
  {
    id: "ejecutivo",
    name: "Ejecutivo",
    priceRegular: 11994,
    price: 5997,
    weeklyHours: "4 a 6 horas por semana",
    summary:
      "Todo lo de Profesional más dos certificaciones incluidas. Aquí es donde tu gente sale con papeles que sirven en cualquier proceso de selección.",
    summaryPro:
      "Sales con dos certificaciones que un reclutador puede verificar sin llamarnos: Microsoft y SEP-CONOCER.",
    highlights: [
      "Certificación Microsoft Excel MOS",
      "Certificación SEP-CONOCER EC0217.01",
      "Simulador de práctica para evaluación",
      "Acompañamiento de arranque",
    ],
    channel: "whatsapp",
    ctaLabel: "Hablemos de Ejecutivo",
  },
  {
    id: "corporativo",
    name: "Corporativo",
    priceRegular: 19994,
    price: 9997,
    weeklyHours: "6 a 8 horas por semana",
    summary:
      "Todo lo de Ejecutivo más un año completo de Open English. Tres certificaciones en total.",
    summaryPro:
      "Las tres certificaciones, con un año completo de Open English y certificado de Cambridge.",
    highlights: [
      "Las tres certificaciones: Microsoft, CONOCER y Cambridge",
      "Un año de Open English con profesores nativos",
      "Certificado Linguaskill de Cambridge",
      "Acompañamiento de arranque",
    ],
    channel: "whatsapp",
    ctaLabel: "Hablemos de Corporativo",
  },
];

/** Precio mensualizado sobre los 12 meses de acceso. $997 → $83. */
export function monthlyPrice(plan: Plan): number {
  return Math.round(plan.price / ACCESS_MONTHS);
}

/** El nivel más barato — el que ancla el "desde $X al mes" del hero. */
export const entryPlan = plans[0];

/**
 * Destino del CTA de cada nivel. `null` cuando aún no tenemos la URL,
 * para que el botón se renderice como marcador pendiente.
 */
export function planHref(plan: Plan): string | null {
  if (plan.channel === "whatsapp") {
    return whatsappUrl(
      `Hola, me interesa el nivel ${plan.name} del Plan de Carrera Profesional.`,
    );
  }
  return checkoutUrls[plan.id] ?? null;
}

/**
 * URLs de pago de los niveles de compra directa, generadas en GHL.
 * Ejecutivo y Corporativo no llevan link: se cierran por WhatsApp porque
 * incluyen acompañamiento de arranque y hay cupo limitado.
 */
const checkoutUrls: Record<string, string | null> = {
  esencial:
    "https://links.hazloconmarketing.com/payment-link/6a7e128873c7ff66b05e8141",
  profesional:
    "https://links.hazloconmarketing.com/payment-link/6a7e12c7c8cc9a2ce7267d9b",
};

export const plansByChannel = {
  checkout: plans.filter((p) => p.channel === "checkout"),
  whatsapp: plans.filter((p) => p.channel === "whatsapp"),
};

/**
 * Precio del nivel al que apunta una URL de pago, para el evento
 * InitiateCheckout del pixel. `null` si la URL no es de checkout.
 */
export function checkoutAmountFor(href: string): number | null {
  for (const plan of plans) {
    const url = checkoutUrls[plan.id];
    if (url && href.includes(url)) return plan.price;
  }
  return null;
}
