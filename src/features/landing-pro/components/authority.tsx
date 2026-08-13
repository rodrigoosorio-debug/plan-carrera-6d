import { CentroEvaluador } from "@/shared/components/centro-evaluador";
import { Eyebrow, Section, SectionTitle } from "@/shared/components/ui";

const backers = [
  {
    name: "Universidad ICEMéxico",
    detail: "Respalda y emite el programa.",
    tiers: null,
  },
  {
    name: "SEP-CONOCER · EC0217.01",
    detail:
      "Impartición de cursos de formación. Verificable en el RENEC con tu folio.",
    tiers: "Ejecutivo y Corporativo · opcional en Profesional",
  },
  {
    name: "Microsoft",
    detail: "Certificación oficial Excel MOS.",
    tiers: "Ejecutivo y Corporativo",
  },
  {
    name: "Cambridge",
    detail: "Certificado Linguaskill, vía Open English.",
    tiers: "Corporativo",
  },
];

export function Authority() {
  return (
    <Section density="tight">
      <Eyebrow>Respaldos</Eyebrow>
      <SectionTitle className="max-w-2xl">
        Estos papeles los puede verificar cualquiera.
      </SectionTitle>

      <ul className="mt-12 divide-y divide-line border-y border-line">
        {backers.map((backer) => (
          <li
            key={backer.name}
            className="grid gap-2 py-6 sm:grid-cols-[16rem_1fr] sm:gap-8"
          >
            <p className="font-display text-lg font-bold tracking-tight">
              {backer.name}
            </p>
            <div>
              <p className="text-base text-muted">{backer.detail}</p>
              {backer.tiers && (
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
                  {backer.tiers}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>

      <CentroEvaluador audience="personal" />

      <p className="mt-10 max-w-prose font-display text-xl font-bold leading-snug sm:text-2xl">
        Ninguno es un diploma de participación. Los tres primeros llevan folio y
        se consultan en un registro público.
      </p>
    </Section>
  );
}
