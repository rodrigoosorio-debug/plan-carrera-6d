import type { Testimonial } from "../data/testimonials";
import { Eyebrow, Section, SectionTitle } from "./ui";

/**
 * Si no hay testimonios reales, la sección entera desaparece.
 * Preferimos una página sin testimonios que una con testimonios inventados.
 */
export function Testimonials({
  items,
  title = "Lo que cambió, en sus palabras.",
}: {
  items: Testimonial[];
  title?: string;
}) {
  if (items.length === 0) return null;

  return (
    <Section>
      <Eyebrow>Testimonios</Eyebrow>
      <SectionTitle className="max-w-2xl">{title}</SectionTitle>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {items.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="flex flex-col rounded-2xl border border-line bg-surface/40 p-7"
          >
            <blockquote className="flex-1 text-base leading-relaxed">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="mt-6 border-t border-line pt-4">
              <p className="font-display font-bold">{testimonial.name}</p>
              <p className="mt-1 text-sm text-cream/80">{testimonial.role}</p>
              <p className="mt-0.5 text-sm text-muted">{testimonial.context}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      {/*
       * Obligatorio siempre que un testimonio mencione sueldo, ascenso o ahorro:
       * son resultados de una persona, no una promesa a quien lee.
       */}
      <p className="mt-8 text-sm text-muted">
        Testimonios reales, publicados con su autorización. Los resultados son
        individuales y dependen del punto de partida y del esfuerzo de cada
        persona: no son típicos ni garantizados.
      </p>
    </Section>
  );
}
