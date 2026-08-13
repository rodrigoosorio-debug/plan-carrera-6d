import type { FaqEntry } from "./json-ld";
import { Eyebrow, Section, SectionTitle } from "./ui";

/**
 * Abiertas, no en acordeón: son objeciones reales y queremos que se lean.
 * Un acordeón esconde justo lo que resuelve la compra.
 */
export function Faq({ items }: { items: FaqEntry[] }) {
  return (
    <Section id="preguntas">
      <Eyebrow>Preguntas</Eyebrow>
      <SectionTitle className="max-w-2xl">
        Lo que nos preguntan siempre.
      </SectionTitle>

      <dl className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.question}>
            <dt className="font-display text-lg font-bold leading-snug">
              {item.question}
            </dt>
            <dd className="mt-3 max-w-prose text-base leading-relaxed text-muted">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
