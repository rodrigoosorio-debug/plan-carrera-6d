/**
 * Testimonios reales, confirmados por el cliente el 13 de agosto de 2026.
 * NUNCA se inventan ni se "mejoran" con datos que la persona no dijo.
 *
 * Las citas están editadas solo para recortar: se conserva su forma de hablar,
 * sus cifras y sus matices. Si una persona retira su permiso, se borra de aquí
 * y la página se actualiza sola.
 *
 * Si un array queda vacío, su sección no se renderiza.
 */

export interface Testimonial {
  quote: string;
  name: string;
  /** El cambio en una línea: de dónde a dónde. */
  role: string;
  /** Empresa y tamaño, o para individuos: ciudad y nivel cursado. */
  context: string;
  /** Ruta en /public. Opcional: sin foto el testimonio funciona igual. */
  photo?: string;
}

/** Landing B2B (`/`): quienes compraron accesos para su equipo. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Dejamos de pagar horas extra en temporada. Y me retuve a dos personas que ya andaban viendo para irse; una me lo dijo tal cual, que se quedó porque aquí sí la estaban formando. Haz la cuenta al revés: pagué menos por capacitar a ocho gentes todo un año que lo que me cuesta reemplazar a una sola cuando se va.",
    name: "Lic. Roberto M.",
    role: "Director general · 8 accesos",
    context: "Despacho contable, 22 colaboradores",
  },
  {
    quote:
      'Antes los supervisores llegaban a decir "hubo problemas"; ahora llegan con datos. Eso cambió la conversación completa. Tres de ellos me pidieron seguir con más certificaciones por su cuenta, y eso nunca había pasado. Al principio sí nos costó el arranque: nos hubiera servido una sesión de bienvenida más aterrizada.',
    name: "Ing. Claudia P.",
    role: "Gerente de RH · 15 accesos",
    context: "Manufactura, planta de 140",
  },
  {
    quote:
      "Dos de ellos ya llevan clientes solos. Antes yo tenía que estar en toda junta importante y eso me tenía secuestrado. Este año ya no entro a las de cuentas medianas. Me devolvió como seis horas a la semana.",
    name: "Sergio A.",
    role: "Socio director · 4 accesos",
    context: "Agencia de marketing, 11 personas",
  },
];

/** Landing B2C (`/profesionales`): quienes lo cursaron por su cuenta. */
export const testimonialsPro: Testimonial[] = [
  {
    quote:
      'Mi jefe llevaba dos años diciéndome "es que te falta perfil". Llegué a la evaluación de fin de año con el certificado de Excel y con un proyecto que yo misma propuse. Después de eso ya no tenía qué decirme. Yo llevaba cuatro años esperando que alguien notara que trabajaba bien, y nadie nota eso. Notan lo que traes en la mano.',
    name: "Mariana G.",
    role: "De analista administrativa a coordinadora de administración",
    context: "Villahermosa · Nivel Profesional",
  },
  {
    quote:
      "Me habían frenado dos veces por el inglés. Empecé en enero muy mal, y no estoy bilingüe, pero llegué a la entrevista pudiendo sostener veinte minutos de conversación. Si llevas años atorado, probablemente ya sabes exactamente qué te falta. Lo que no teníamos era una estructura para hacerlo sin abandonarlo en marzo.",
    name: "Andrés R.",
    role: "De supervisor a jefe de operaciones, en otra cadena",
    context: "Cancún · Nivel Ejecutivo",
  },
  {
    quote:
      "Voy a ser honesta: todavía no hay ascenso. Lo que sí cambió es que ahora yo hago el cierre mensual, que antes lo hacía mi jefa y yo nada más pasaba capturas. Y me metieron al proyecto de migración del sistema, que ese sí va a definir quién crece el año que entra. No esperes el ascenso al mes tres. A mí me sirvió para dejar de ser la que captura y volverme la que entiende.",
    name: "Daniela V.",
    role: "Auxiliar contable",
    context: "Mérida · Empezó en Esencial y subió a Profesional",
  },
];
