import { ACCESS_MONTHS, PROGRAM_MONTHS } from '../data/site';
import { Eyebrow, Section, SectionTitle } from './ui';

const steps = [
  {
    title: "Diagnóstico",
    body: "Haces el análisis Pyxoom y una sesión con tu consultor vocacional. Sale tu punto de partida real, no el que crees que tienes.",
  },
  {
    title: "Tu ruta, con fechas",
    body: "Recibes un plan de formación personalizado y un diagrama de Gantt. Sabes exactamente qué te toca cada semana de los próximos seis meses.",
  },
  {
    title: "Seis meses de ejecución",
    body: "Cuatro meses de módulos, dos de talleres, coaching semanal en vivo todo el camino. Al final: constancias y, según el nivel, certificación Microsoft.",
  },
];

export function HowItWorks() {
  return (
    <Section id="como-funciona" dark>
      <Eyebrow>Cómo funciona</Eyebrow>
      <SectionTitle className="max-w-2xl">
        Tres pasos. Empiezas la misma semana.
      </SectionTitle>

      <ol className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
        {steps.map((step, index) => (
          <li key={step.title} className="border-t border-line pt-6">
            <span className="tabular block font-display text-5xl font-extrabold text-gold">
              {index + 1}
            </span>
            <h3 className="mt-4 font-display text-xl font-bold">
              {step.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted">
              {step.body}
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-14 max-w-prose text-base leading-relaxed text-muted">
        El programa dura {PROGRAM_MONTHS} meses. El acceso a la plataforma y a
        todas las grabaciones dura {ACCESS_MONTHS}.{" "}
        <span className="text-cream">
          Los últimos seis son para volver a lo que necesites, cuando lo
          necesites.
        </span>
      </p>
    </Section>
  );
}
