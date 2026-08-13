import { site } from "../data/site";
import type { Audience } from "./navbar";
import { Pending } from "./pending";
import { Section, SectionTitle } from "./ui";

const copy = {
  empresa: {
    title: "Termina el módulo 1. Si no es para ustedes, te devolvemos.",
    body: [
      "No te pedimos que nos creas por el brochure. Te pedimos una sola cosa: que tu gente complete el módulo 1.",
      "Si después de haberlo hecho decides que esto no es lo que necesitan, nos escribes y te devolvemos el 100%. Sin formulario de tres páginas ni alguien intentando convencerte de quedarte.",
    ],
    close:
      "Es una garantía con una condición, y la decimos de frente: queremos que lo juzgues habiéndolo visto por dentro, no por la portada.",
  },
  personal: {
    title: "Termina el módulo 1. Si no es para ti, te devolvemos.",
    body: [
      "No te pedimos que nos creas de entrada. Te pedimos una sola cosa: que completes el módulo 1.",
      "Si después de haberlo hecho decides que esto no era lo que necesitabas, nos escribes y te devolvemos el 100%. Sin formulario de tres páginas ni alguien intentando convencerte de quedarte.",
    ],
    close:
      "Es una garantía con una condición, y la decimos de frente: queremos que lo juzgues habiéndolo visto por dentro, no por la portada.",
  },
} satisfies Record<Audience, unknown>;

export function Guarantee({ audience }: { audience: Audience }) {
  const text = copy[audience];

  return (
    <Section density="tight" dark>
      <div className="mx-auto max-w-3xl rounded-2xl border border-aqua/30 bg-aqua/[0.05] p-8 sm:p-12">
        <SectionTitle>{text.title}</SectionTitle>

        <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
          {text.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
          <p className="text-cream">{text.close}</p>
        </div>

        <p className="mt-8 border-t border-line pt-6 text-sm text-muted">
          {site.guaranteeWindowDays ? (
            <>
              Tienes {site.guaranteeWindowDays} días desde la compra para
              completar el módulo 1 y decidir.
            </>
          ) : (
            <Pending>
              plazo para completar el módulo 1 y pedir la devolución
            </Pending>
          )}
        </p>
      </div>
    </Section>
  );
}
