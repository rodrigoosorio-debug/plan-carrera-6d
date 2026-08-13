import { entryPlan, monthlyPrice } from '@/shared/data/plans';
import { mxn, PROGRAM_MONTHS, ACCESS_MONTHS, whatsappUrl } from '@/shared/data/site';
import { Cta } from '@/shared/components/ui';

const backers = [
  "Universidad ICEMéxico",
  "SEP-CONOCER",
  "Microsoft",
  "Open English",
];

export function Hero() {
  const monthly = monthlyPrice(entryPlan);

  return (
    <section
      id="top"
      className="relative overflow-hidden pb-20 pt-16 sm:pb-28 sm:pt-24"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <h1 className="font-display text-[clamp(2.75rem,8vw,5.5rem)] font-extrabold leading-[0.95] tracking-tight">
          Que tu mejor gente{" "}
          {/* En móvil deja que fluya solo; en pantallas grandes forzamos el corte. */}
          <br className="hidden sm:block" />
          se quede.
        </h1>

        <p className="tabular mt-6 font-display text-[clamp(1.5rem,4vw,2.75rem)] font-bold leading-tight text-gold">
          Desde {mxn(monthly)} al mes por persona.
        </p>

        <p className="mt-7 max-w-prose text-lg leading-relaxed text-muted">
          {PROGRAM_MONTHS} meses de programa con diagnóstico, ruta personalizada
          y coaching semanal en vivo. {ACCESS_MONTHS} meses de acceso a todo.
          Respaldo de Universidad ICEMéxico y certificación Microsoft.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#planes"
            className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-gold px-7 text-base font-semibold text-night transition-colors duration-200 hover:bg-gold-bright"
          >
            Ver los 4 niveles
          </a>
          <Cta
            href={whatsappUrl(
              "Hola, quiero información del Plan de Carrera Profesional para mi empresa.",
            )}
            variant="ghost"
            missingLabel="número de WhatsApp"
          >
            Hablar por WhatsApp
          </Cta>
        </div>

        <p className="mt-5 text-sm text-muted">
          Precios con IVA incluido · Termina el módulo 1 y si no es para ti, te
          devolvemos
        </p>

        <div className="mt-16 border-t border-line pt-8">
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-muted">
            Respaldado por
          </p>
          {/* Sustituir por los logotipos oficiales cuando lleguen los SVG. */}
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {backers.map((backer) => (
              <li
                key={backer}
                className="font-display text-base font-bold tracking-tight text-cream/70"
              >
                {backer}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
