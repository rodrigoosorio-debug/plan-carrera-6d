import { entryPlan, monthlyPrice } from '@/shared/data/plans';
import { mxn, replacementCost } from '@/shared/data/site';
import { Eyebrow, Figure, Section, SectionTitle } from '@/shared/components/ui';

/**
 * La cuenta. Sección ancla de la página: para la audiencia primaria —dueños y
 * RH— este contraste es el argumento entero.
 */
export function TheMath() {
  const ratio = Math.floor(replacementCost.total / entryPlan.price);
  const monthly = monthlyPrice(entryPlan);

  return (
    <Section density="loose" id="la-cuenta">
      <Eyebrow>La cuenta</Eyebrow>
      <SectionTitle className="max-w-2xl">Lo que cuesta perderlo</SectionTitle>

      <div className="mt-14">
        <p className="max-w-prose text-lg text-muted">
          Un colaborador de {mxn(replacementCost.salary)} al mes que renuncia te
          cuesta:
        </p>

        <div className="mt-6">
          <Figure>{mxn(replacementCost.total)}</Figure>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-muted">
            Entre reclutar, capacitar y los meses en que nadie rinde igual. Son
            de 6 a 9 meses de su sueldo, y casi nunca aparecen en ningún
            presupuesto.
          </p>
        </div>
      </div>

      {/* Contraste: el número grande contra el número pequeño */}
      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        <div className="bg-night-deep p-8 sm:p-10">
          <p className="text-sm uppercase tracking-[0.18em] text-muted">
            Reemplazarlo
          </p>
          <p className="tabular mt-3 font-display text-5xl font-extrabold text-cream sm:text-6xl">
            {mxn(replacementCost.total)}
          </p>
          <p className="mt-3 text-sm text-muted">Cada vez que pasa.</p>
        </div>

        <div className="bg-surface p-8 sm:p-10">
          <p className="text-sm uppercase tracking-[0.18em] text-aqua">
            Darle una ruta
          </p>
          <p className="tabular mt-3 font-display text-5xl font-extrabold text-gold sm:text-6xl">
            {mxn(entryPlan.price)}
          </p>
          <p className="mt-3 text-sm text-muted">
            {mxn(monthly)} al mes, una sola vez, por persona.
          </p>
        </div>
      </div>

      <div className="mt-16 max-w-2xl">
        <p className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
          Por lo que te cuesta perder a <span className="text-gold">una</span>{" "}
          persona, le das plan de carrera a{" "}
          <span className="text-gold tabular">{ratio}</span>.
        </p>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          No es un gasto de capacitación. Es lo que pagas por no volver a
          empezar de cero.
        </p>
      </div>

      <div className="mt-14 max-w-prose rounded-xl border-l-2 border-aqua bg-surface/50 p-6">
        <p className="text-base leading-relaxed text-muted">
          <span className="font-semibold text-cream">¿Lo pagas tú?</span> Son{" "}
          {mxn(monthly)} al mes. Menos que tu plan de datos, y por primera vez
          con una ruta escrita y fechas.
        </p>
      </div>
    </Section>
  );
}
