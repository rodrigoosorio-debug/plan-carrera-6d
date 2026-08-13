import { Cta, Section } from "@/shared/components/ui";
import { entryPlan, monthlyPrice, planHref } from "@/shared/data/plans";
import { mxn, site, whatsappUrl } from "@/shared/data/site";

export function CtaFinal() {
  const monthly = monthlyPrice(entryPlan);

  return (
    <Section density="loose">
      <div className="max-w-3xl">
        <h2 className="font-display text-[clamp(2.25rem,6vw,4rem)] font-extrabold leading-[1.02] tracking-tight">
          El cuarto año empieza igual que el tercero.
        </h2>

        <p className="mt-7 max-w-prose text-lg leading-relaxed text-muted">
          A menos que esta vez alguien escriba la ruta. Seis meses, y sales con
          qué demostrarlo.
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
              "Hola, quiero información del Plan de Carrera Profesional.",
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
