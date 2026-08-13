import { Eyebrow, Section, SectionTitle } from '@/shared/components/ui';

interface Item {
  title: string;
  body: string;
  /** Niveles en los que aplica. Se muestra en pequeño, evita malentendidos. */
  tiers?: string;
  /** Ancho en la rejilla de 3 columnas. */
  wide?: boolean;
  featured?: boolean;
}

const items: Item[] = [
  {
    title: "14 habilidades, 5 módulos y 6 talleres",
    body: "Comunicación, inteligencia emocional, liderazgo, pensamiento estratégico, gestión del tiempo y ética. Los talleres cierran con IA aplicada al trabajo, negociación laboral y educación financiera.",
    wide: true,
  },
  {
    title: "200 horas de Excel",
    body: "De cero a avanzado, con simulador de práctica y coaching técnico semanal.",
    tiers: "Esencial no lo incluye",
  },
  {
    title: "Tu propio capacitador interno",
    body: "Con el EC0217.01 tu colaborador queda certificado para impartir formación. Deja de ser alguien a quien capacitas y pasa a ser alguien que capacita a los demás — dentro de tu empresa, sin pagarle a un externo cada vez.",
    tiers: "Ejecutivo y Corporativo",
    wide: true,
    featured: true,
  },
  {
    title: "Un consultor asignado",
    body: "Seguimiento real y sesiones grupales semanales. No es una plataforma donde te dejan solo.",
  },
  {
    title: "Certificación SEP-CONOCER",
    body: "EC0217.01, impartición de cursos de formación. Reconocimiento oficial de la SEP, verificable en el RENEC con el número de certificado.",
    tiers: "Incluida en Ejecutivo y Corporativo · alineación en Profesional",
  },
  {
    title: "Certificación Microsoft Excel MOS",
    body: "La que sí pesa en un proceso de selección.",
    tiers: "Ejecutivo y Corporativo",
  },
  {
    title: "Coaching semanal en vivo",
    body: "Todas las semanas, durante los seis meses.",
    tiers: "Esencial no lo incluye",
  },
  {
    title: "Constancias con valor curricular",
    body: "De competencias profesionales y del programa completo.",
    tiers: "Esencial no las otorga",
  },
  {
    title: "Un año de Open English",
    body: "Clases en vivo con profesores nativos y certificado Linguaskill de Cambridge.",
    tiers: "Solo Corporativo",
  },
];

export function WhatsIncluded() {
  return (
    <Section id="que-incluye">
      <Eyebrow>Qué incluye</Eyebrow>
      <SectionTitle className="max-w-2xl">
        Todo lo que tu gente se lleva con su nombre.
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
