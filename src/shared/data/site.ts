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

  /** Número en formato internacional sin signos: +52 993 223 2863. */
  whatsappNumber: "529932232863" as string | null,

  /** Correo de contacto del footer. */
  email: "contacto@centroevaluador6d.com" as string | null,

  /** Fecha límite del bono de primera generación. */
  bonusDeadline: "4 de septiembre" as string | null,

  /**
   * Qué incluye el bono de primera generación.
   * TODO: falta el contenido real. Sin decir qué se llevan, la urgencia no
   * convierte — "bono" a secas no le mueve nada a nadie.
   */
  bonusDescription: "Bono de primera generación" as string | null,

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
