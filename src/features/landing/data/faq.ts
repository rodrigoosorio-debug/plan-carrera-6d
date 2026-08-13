import type { FaqEntry } from "@/shared/components/json-ld";

/**
 * Objeciones reales, no preguntas de relleno. Se renderizan abiertas y en
 * formato de conversación — un acordeón genérico es un indicador de página
 * hecha con plantilla.
 */

export const faq: FaqEntry[] = [
  {
    question: "¿Y si los capacito y se van de todas formas?",
    answer:
      "Puede pasar. Pero hoy se están yendo sin capacitación y sin ruta — y eso ya te cuesta $90,000 cada vez. La pregunta no es si alguien se irá. Es cuánta gente se queda cuando por fin ve qué sigue.",
  },
  {
    question: "Ya compré cursos y nadie los terminó. ¿Por qué este sí?",
    answer:
      "Porque un curso grabado no tiene a nadie del otro lado. Aquí cada persona arranca con un diagnóstico, recibe un diagrama de Gantt con fechas, tiene un consultor asignado que le da seguimiento y coaching en vivo cada semana durante seis meses. Lo que hace que la gente termine no es el contenido: es que alguien esté esperando verlos el jueves.",
  },
  {
    question: "¿Cuánto tiempo le quita a mi gente?",
    answer:
      "Depende del nivel: de 1 a 3 horas por semana en Esencial, de 4 a 6 en Profesional y Ejecutivo, de 6 a 8 en Corporativo. Se organiza con un diagrama de Gantt y la plataforma está disponible 24/7.",
  },
  {
    question: "¿Necesitan saber Excel o inglés antes de entrar?",
    answer:
      "No. Excel arranca desde cero y llega a avanzado, con simulador y coaching técnico. Open English empieza por una prueba de nivel.",
  },
  {
    question: "Mi empresa es chica, somos 12. ¿Aplica?",
    answer:
      "Sí. De hecho es donde más se nota: en una empresa de 12, perder a uno es perder el 8% del equipo y a alguien que hacía tres trabajos. Compras un acceso por persona y empiezas con los que no quieres perder.",
  },
  {
    question: "¿Puedo comprarlo para mí, sin que sea cosa de la empresa?",
    answer:
      "Sí. Los cuatro niveles son individuales. Muchos entran pagándoselo ellos mismos justamente porque en su trabajo no existe esa ruta.",
  },
  {
    question: "¿Los precios llevan IVA?",
    answer:
      "Sí. Los cuatro precios son por persona, en pesos mexicanos y con IVA incluido. Lo que ves es lo que pagas.",
  },
  {
    question: "¿Qué pasa si no me funciona?",
    answer:
      "Que tu gente complete el módulo 1. Si con eso en la mano decides que no es lo que necesitaban, nos escribes y te devolvemos el 100%.",
  },
];
