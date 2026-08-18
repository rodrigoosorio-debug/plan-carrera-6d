/**
 * Datos globales de la landing.
 *
 * Los valores en `null` o vacíos son datos que aún no tenemos. La página los
 * renderiza como marcadores visibles (ver `components/pending.tsx`) en vez de
 * inventarlos. Antes de publicar, `npm run check:pending` debe salir limpio.
 */

/** Meses de acceso a la plataforma. El programa dura 6; el acceso, 12. */
export const ACCESS_MONTHS = 12;

/** Meses que dura el programa en sí. */
export const PROGRAM_MONTHS = 6;

export const site = {
  brand: "6D Consultoría",
  /** Razón social, para el footer y los datos estructurados. */
  legalName: "SEIS D, S.A.S. de C.V.",
  program: "El Plan de Carrera Profesional",
  backer: "Universidad ICEMéxico",

  /**
   * Acreditación como Centro de Evaluación ante CONOCER-SEP.
   * El código es verificable en el registro público, y por eso se publica:
   * un sello sin número es decorativo, uno con número es comprobable.
   */
  conocer: {
    code: "CE2140-OC063-18",
    /** Estándares que 6D está acreditada para evaluar. */
    standards: ["EC0076", "EC0217.01", "EC0301", "EC0366", "EC1621"],
  },

  /** Número en formato internacional sin signos: +52 993 516 8287. */
  whatsappNumber: "529935168287" as string | null,

  /** Correo de contacto del footer. */
  email: "contacto@centroevaluador6d.com" as string | null,

  /**
   * Fecha límite del bono de primera generación.
   * ⚠️ El 5 de septiembre este bono DEBE quitarse (bonusItems: []) o cambiarse
   * por uno nuevo con fecha real. Una urgencia vencida a la vista destruye la
   * credibilidad de todo lo demás.
   */
  bonusDeadline: "4 de septiembre" as string | null,

  /**
   * Bono de primera generación, decidido el 14 de agosto de 2026.
   * Tres piezas apiladas; las dos primeras aplican a cualquier compra, la
   * tercera solo a Profesional (Ejecutivo y Corporativo ya la incluyen).
   * Array vacío = el bloque de bono no se renderiza.
   */
  bonusItems: [
    "Sesión de arranque en vivo con Rodrigo, exclusiva de la primera generación",
    "Un taller extra en vivo que no se repetirá para generaciones futuras",
    "Al comprar Profesional: la evaluación EC0217.01 incluida — normalmente se paga aparte",
  ] as readonly string[],

  /**
   * Pixel de Meta que alimenta los públicos de la campaña (TOF/MOF/BOF).
   * Es el pixel "Plan_de_Carrera_Marathon" de la cuenta Seis D. Tab
   * (act_750991560852206). Elegido a propósito sobre el pixel general del
   * negocio para que los públicos de retargeting queden limpios de otro
   * tráfico. El id es público por naturaleza — viaja en el HTML.
   */
  metaPixelId: "865425979950511",

  /** Cuántas empresas al mes admite el bloque con acompañamiento. */
  monthlyCompanySlots: 2 as number | null,

  /** Días desde la compra para completar el módulo 1 y decidir. */
  guaranteeWindowDays: 7 as number | null,
} as const;

/** Costo de reemplazar a un colaborador. Base de la sección "La cuenta". */
export const replacementCost = {
  salary: 15000,
  months: 6,
  total: 90000,
} as const;

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

/** Formatea un monto en pesos mexicanos sin decimales: 2997 → "$2,997". */
export function mxn(amount: number): string {
  return currency.format(amount).replace("MX", "");
}

/**
 * Construye el enlace de WhatsApp con mensaje pre-cargado.
 * Devuelve `null` si aún no tenemos número, para que el CTA se marque como pendiente.
 */
export function whatsappUrl(message: string): string | null {
  if (!site.whatsappNumber) return null;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
