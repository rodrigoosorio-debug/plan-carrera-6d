import { Eyebrow, Section, SectionTitle } from "@/shared/components/ui";

const reasons = [
  {
    title: "Nadie escribió tu ruta",
    body: "En la mayoría de las empresas no existe un plan de carrera. Se asciende a quien se le ocurre pedirlo en el momento correcto. Eso no es un plan, es suerte.",
  },
  {
    title: "Lo que sabes no está en ningún papel",
    body: "Sabes negociar, sabes organizar un equipo, sabes sacar un reporte que nadie más saca. Nada de eso aparece en tu CV de forma que alguien externo pueda comprobarlo.",
  },
  {
    title: "Tu CV dice lo que hiciste, no lo que vales",
    body: '"Tres años como coordinador" no dice nada. Un certificado de Microsoft con folio verificable, sí.',
  },
];

export function WhyNotPromoted() {
  return (
    <Section density="tight">
      <Eyebrow>El diagnóstico</Eyebrow>
      <SectionTitle className="max-w-2xl">
        Te falta la evidencia, no la capacidad.
      </SectionTitle>

      <ol className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
        {reasons.map((reason, index) => (
          <li key={reason.title} className="border-t border-line pt-6">
            <span className="tabular block font-display text-5xl font-extrabold text-gold">
              {index + 1}
            </span>
            <h3 className="mt-4 font-display text-xl font-bold leading-snug">
              {reason.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted">
              {reason.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
