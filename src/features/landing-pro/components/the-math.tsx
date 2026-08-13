import { Eyebrow, Figure, Section, SectionTitle } from "@/shared/components/ui";
import { entryPlan, monthlyPrice } from "@/shared/data/plans";
import { ACCESS_MONTHS, mxn, PROGRAM_MONTHS } from "@/shared/data/site";

/**
 * La cuenta, versión individual. En la B2B el ancla es el costo de reemplazo;
 * aquí es lo poco que cuesta al mes contra los años que ya llevas esperando.
 */
export function TheMath() {
  const monthly = monthlyPrice(entryPlan);

  return (
    <Section density="loose" id="la-cuenta" dark>
      <Eyebrow>La cuenta</Eyebrow>
      <SectionTitle className="max-w-2xl">Lo que cuesta cambiarlo</SectionTitle>

      <div className="mt-14">
        <Figure>{mxn(monthly)}</Figure>
        <p className="mt-4 text-lg text-muted">al mes</p>
      </div>

      <div className="mt-10 max-w-prose space-y-5 text-lg leading-relaxed text-muted">
        <p>
          Eso es el nivel de entrada, dividido entre los {ACCESS_MONTHS} meses
          de acceso.
        </p>
        <p>
          Menos que tu plan de datos. Menos que las suscripciones que pagas y no
          has cancelado.{" "}
          <span className="text-cream">
            Y a diferencia de esas, esta termina con tu nombre en tres
            certificados.
          </span>
        </p>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        <div className="bg-night p-8 sm:p-10">
          <p className="text-sm uppercase tracking-[0.18em] text-muted">
            Lo que llevas esperando
          </p>
          <p className="tabular mt-3 font-display text-5xl font-extrabold text-cream sm:text-6xl">
            3 años
          </p>
        </div>

        <div className="bg-surface p-8 sm:p-10">
          <p className="text-sm uppercase tracking-[0.18em] text-aqua">
            Lo que tarda el programa
          </p>
          <p className="tabular mt-3 font-display text-5xl font-extrabold text-gold sm:text-6xl">
            {PROGRAM_MONTHS} meses
          </p>
        </div>
      </div>

      <p className="mt-16 max-w-2xl font-display text-3xl font-extrabold leading-tight sm:text-4xl">
        Los tres años ya te los cobraron. Los seis meses los eliges tú.
      </p>
    </Section>
  );
}
