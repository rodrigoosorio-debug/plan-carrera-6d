import { Section, SectionTitle } from '@/shared/components/ui';

const story = [
  "Lo contrataste hace tres años. Lo capacitaste. Aprendió el negocio, se ganó la confianza del equipo, y ahora sabe cosas que nadie más sabe.",
  "Y un martes cualquiera te pide hablar cinco minutos.",
  "Vas a pensar que fue el dinero. Casi nunca es el dinero.",
  "Se fue porque llevaba dos años haciendo exactamente lo mismo, sin que nadie le dijera nunca qué venía después. Le ofrecieron un puesto con nombre. Aquí no teníamos ninguno que ofrecerle.",
];

export function Pain() {
  return (
    <Section density="tight" dark>
      <SectionTitle className="max-w-2xl">
        Nadie te avisa que se va a ir.
      </SectionTitle>

      <div className="mt-10 max-w-prose space-y-5 text-lg leading-relaxed text-muted">
        {story.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>

      <p className="mt-12 font-display text-2xl font-bold text-cream sm:text-3xl">
        Y ahora empieza la parte cara.
      </p>
    </Section>
  );
}
