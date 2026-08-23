import { Eyebrow, Section } from "@/shared/components/ui";

/**
 * Puerta de entrada al Test de Empleabilidad (/test-empleabilidad).
 *
 * El test existía como lead magnet pero ninguna página lo enlazaba — cero
 * leads por diseño accidental. Va justo después del dolor (Stagnation):
 * a quien acaba de reconocerse estancado se le ofrece el diagnóstico.
 */
export function TestCta() {
  return (
    <Section dark>
      <div className="flex flex-col gap-8 rounded-2xl border border-aqua/40 bg-aqua/[0.06] p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <Eyebrow>Gratis · 5 minutos · Resultado inmediato</Eyebrow>
          <h3 className="font-display text-2xl font-extrabold leading-snug sm:text-3xl">
            ¿No sabes qué te está frenando?
          </h3>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Responde 10 preguntas y recibe tu Puntaje de Empleabilidad con las 3
            brechas exactas que te están costando entrevistas — y qué hacer con
            cada una.
          </p>
        </div>
        <a
          href="/test-empleabilidad"
          className="inline-flex min-h-[52px] shrink-0 items-center justify-center rounded-full bg-gold px-8 text-base font-semibold text-night transition-colors duration-200 hover:bg-gold-bright"
        >
          Hacer el test gratis
        </a>
      </div>
    </Section>
  );
}
