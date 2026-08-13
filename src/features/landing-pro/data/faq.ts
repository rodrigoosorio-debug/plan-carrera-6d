import type { FaqEntry } from "@/shared/components/json-ld";

/**
 * Objeciones del profesional que se paga su propio crecimiento.
 * Distintas de las de la landing B2B: aquí la duda no es el ROI del equipo,
 * es el tiempo, la validez del papel y si esto de verdad le sirve a él.
 */
export const faq: FaqEntry[] = [
  {
    question: "Trabajo tiempo completo. ¿De dónde saco el tiempo?",
    answer:
      "De 1 a 3 horas por semana en Esencial y de 4 a 6 en los demás. La plataforma está disponible 24/7 y te dan un diagrama de Gantt para acomodarlo a tu semana real, no a una ideal.",
  },
  {
    question: "¿Las certificaciones sirven de verdad o son un papelito?",
    answer:
      "La de Excel la emite Microsoft. La de CONOCER es de la SEP y se consulta con tu folio en el RENEC, que es un registro público. La de inglés es Linguaskill, de Cambridge. Las tres las puede verificar un reclutador sin llamarnos.",
  },
  {
    question: "No sé nada de Excel y mi inglés está oxidado.",
    answer:
      "Es exactamente el punto de partida que espera el programa. Excel arranca desde cero y llega a avanzado, con simulador y coaching técnico. Open English empieza con una prueba de nivel.",
  },
  {
    question: "¿Me van a conseguir trabajo?",
    answer:
      "No. Eso lo haces tú. Lo que hacemos es que llegues con certificaciones que se verifican, un CV rehecho y la entrevista preparada.",
  },
  {
    question: "¿Mi empresa tiene que enterarse?",
    answer:
      "No. Los cuatro niveles son individuales y los pagas tú. Muchos entran justamente porque en su trabajo esa ruta no existe.",
  },
  {
    question: "¿Puedo empezar por el más barato y subir después?",
    answer:
      "Sí. Pagas solo la diferencia con tu consultor y tu avance anterior se respeta.",
  },
  {
    question: "¿Los precios llevan IVA?",
    answer:
      "Sí. Son en pesos mexicanos con IVA incluido. Lo que ves es lo que pagas.",
  },
  {
    question: "¿Qué pasa si no me funciona?",
    answer:
      "Completa el módulo 1. Si con eso decides que no era para ti, te devolvemos el 100%.",
  },
];
