import { entryPlan, monthlyPrice, planHref } from '@/shared/data/plans';
import { mxn, site, whatsappUrl } from '@/shared/data/site';
import { Cta, Section } from '@/shared/components/ui';

export function CtaFinal() {
  const monthly = monthlyPrice(entryPlan);

  return (
    <Section density="loose">
      <div className="max-w-3xl">
        <h2 className="font-display text-[clamp(2.25rem,6vw,4rem)] font-extrabold leading-[1.02] tracking-tight">
          Que tu mejor gente se quede.
        </h2>

        <p className="mt-7 max-w-prose text-lg leading-relaxed text-muted">
          El año que viene tu equipo va a estar en un lugar. La única pregunta
          es si alguien escribió cómo llegar ahí.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Cta
            href={planHref(entryPlan)}
            missingLabel={`URL de pago de ${entryPlan.name}`}
          >
            Empezar desde {mxn(monthly)} al mes
          </Cta>
          <Cta
            href={whatsappUrl(
              "Hola, quiero información del Plan de Carrera Profesional para mi empresa.",
            )}
            variant="ghost"
            missingLabel="número de WhatsApp"
          >
            Prefiero que hablemos
          </Cta>
        </div>

        <p className="mt-6 text-sm text-muted">
          Precios con IVA incluido · Termina el módulo 1 y decides · Respaldo{" "}
          {site.backer}
        </p>
      </div>
    </Section>
  );
}
