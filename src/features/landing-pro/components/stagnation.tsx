import { Section, SectionTitle } from "@/shared/components/ui";

const story = [
  "Entraste con ganas. Aprendiste el puesto en tres meses y llevas tres años haciéndolo bien.",
  "Has visto irse a dos jefes. Has entrenado a gente que llegó después que tú. Cuando hay un problema difícil, te lo pasan a ti.",
  "Y cada vez que se abre algo arriba, el puesto se lo dan a alguien de fuera.",
  "No es que no te lo merezcas. Es que nadie en tu empresa lleva la cuenta de lo que aprendiste, y tú tampoco tienes cómo demostrarlo.",
];

export function Stagnation() {
  return (
    <Section density="tight" dark>
      <SectionTitle className="max-w-2xl">
        Nadie te dijo que no. Simplemente nunca te tocó.
      </SectionTitle>

      <div className="mt-10 max-w-prose space-y-5 text-lg leading-relaxed text-muted">
        {story.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
