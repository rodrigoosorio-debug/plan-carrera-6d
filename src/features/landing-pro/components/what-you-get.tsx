import { Eyebrow, Section, SectionTitle } from "@/shared/components/ui";

interface Item {
  title: string;
  body: string;
  tiers?: string;
  wide?: boolean;
  featured?: boolean;
}

const items: Item[] = [
  {
    title: "Certificación Microsoft Excel MOS",
    body: "La que sí pesa en un proceso de selección. 200 horas de Excel de cero a avanzado, con simulador de práctica y coaching técnico semanal.",
    tiers: "Ejecutivo y Corporativo",
    wide: true,
    featured: true,
  },
  {
    title: "Certificación SEP-CONOCER · EC0217.01",
    body: "Impartición de cursos de formación. Reconocimiento oficial de la SEP, verificable en el RENEC con tu número de certificado. Te habilita para capacitar formalmente.",
    tiers: "Ejecutivo y Corporativo · alineación en Profesional",
    featured: true,
  },
  {
    title: "Certificado de inglés Linguaskill",
    body: "De Cambridge. Un año completo de Open English con profesores nativos, clases en vivo y prueba de nivel.",
    tiers: "Solo Corporativo",
    featured: true,
  },
  {
    title: "14 habilidades en 5 módulos y 6 talleres",
    body: "Comunicación, inteligencia emocional, liderazgo, pensamiento estratégico, gestión del tiempo y ética. Los talleres cierran con IA aplicada al trabajo, negociación laboral y educación financiera.",
    wide: true,
  },
  {
    title: "Un consultor vocacional para ti",
    body: "No es una plataforma donde te dejan solo. Alguien te da seguimiento y hay sesiones grupales cada semana.",
  },
  {
    title: "Constancias con valor curricular",
    body: "De competencias profesionales y del programa completo.",
    tiers: "Esencial no las otorga",
  },
];

export function WhatYouGet() {
  return (
    <Section id="que-te-llevas">
      <Eyebrow>Qué te llevas</Eyebrow>
      <SectionTitle className="max-w-2xl">
        Tres certificaciones que otro puede verificar.
      </SectionTitle>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className={`rounded-2xl border p-7 transition-colors duration-200 ${
              item.featured
                ? "border-aqua/40 bg-aqua/[0.06] hover:border-aqua/70"
                : "border-line bg-surface/40 hover:border-line/80 hover:bg-surface/70"
            } ${item.wide ? "lg:col-span-2" : ""}`}
          >
            <h3 className="font-display text-xl font-bold leading-snug">
              {item.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted">
              {item.body}
            </p>
            {item.tiers && (
              <p className="mt-4 text-xs uppercase tracking-[0.14em] text-muted">
                {item.tiers}
              </p>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
