import { Cta } from "@/shared/components/ui";
import { entryPlan, monthlyPrice } from "@/shared/data/plans";
import { mxn, whatsappUrl } from "@/shared/data/site";

const backers = [
  "Microsoft",
  "SEP-CONOCER",
  "Cambridge",
  "Universidad ICEMéxico",
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
          Llevas tres años <br className="hidden sm:block" />
          en el mismo puesto.
        </h1>

        <p className="mt-7 max-w-prose text-lg leading-relaxed text-muted">
          No es que no te esfuerces. Es que nadie escribió la ruta.
          <span className="text-cream">
            {" "}
            Seis meses, tres certificaciones verificables y un CV que sí dice lo
            que vales.
          </span>
        </p>

        <p className="tabular mt-7 font-display text-[clamp(1.5rem,4vw,2.75rem)] font-bold leading-tight text-gold">
          Desde {mxn(monthly)} al mes.
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
              "Hola, quiero información del Plan de Carrera Profesional.",
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
            Certificaciones respaldadas por
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
