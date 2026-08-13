import { Eyebrow, Section, SectionTitle } from "@/shared/components/ui";

/**
 * El bonus de empleabilidad. Existe solo en esta landing: en la B2B contradecía
 * el argumento de retención, y aquí es de los mejores que hay.
 */

const blocks = [
  {
    title: "Tu CV, rehecho",
    body: "Cómo se escribe uno que pase los filtros y diga lo que realmente sabes hacer.",
  },
  {
    title: "Dónde están las vacantes de verdad",
    body: "Fuentes y bolsas de trabajo que sirven, no las tres de siempre.",
  },
  {
    title: "La entrevista",
    body: "Cómo se prepara y cómo se responde lo que de verdad te van a preguntar.",
  },
];

export function YourCv() {
  return (
    <Section dark>
      <Eyebrow>Bonus de empleabilidad</Eyebrow>
      <SectionTitle className="max-w-2xl">
        Y después, la parte que nadie te enseña.
      </SectionTitle>

      <p className="mt-8 max-w-prose text-lg leading-relaxed text-muted">
        Puedes tener las certificaciones y seguir sin saber cómo usarlas. Por
        eso el programa no termina en el certificado.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {blocks.map((block) => (
          <div key={block.title} className="border-t border-line pt-6">
            <h3 className="font-display text-xl font-bold leading-snug">
              {block.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted">
              {block.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-14 max-w-prose rounded-xl border-l-2 border-aqua bg-surface/50 p-6">
        <p className="text-lg leading-relaxed">
          <span className="font-semibold">
            No te vamos a conseguir el trabajo.
          </span>{" "}
          <span className="text-muted">
            Eso lo haces tú. Lo que hacemos es que llegues con qué demostrar y
            sabiendo cómo presentarlo.
          </span>
        </p>
      </div>
    </Section>
  );
}
