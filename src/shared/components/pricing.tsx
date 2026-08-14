import {
  monthlyPrice,
  planHref,
  plansByChannel,
  type Plan,
} from "../data/plans";
import { ACCESS_MONTHS, mxn, site } from "../data/site";
import type { Audience } from "./navbar";
import { Pending } from "./pending";
import { Cta, Eyebrow, Section, SectionTitle } from "./ui";

/**
 * Sección de Planes, compartida por las dos landings.
 *
 * Los precios y los niveles vienen de `data/plans.ts` — nunca se duplican.
 * Lo único que cambia por audiencia es la narrativa: los títulos de cada bloque,
 * el resumen de cada nivel y la razón por la que el bloque B se cierra hablando.
 */

const copy = {
  empresa: {
    blockA: {
      title: "Empieza por tu cuenta",
      subtitle: "Compra directa, acceso inmediato.",
    },
    blockB: {
      title: "Trabajemos juntos",
      subtitle: "Incluye acompañamiento de arranque. Cupo mensual limitado.",
    },
    volumeNote:
      // El descuento por volumen está EN EVALUACIÓN: se invita a la charla sin
      // prometer condiciones que aún no existen (regla del CLAUDE.md maestro).
      "¿Vas a inscribir a 10 o más colaboradores? Escríbenos antes y lo armamos contigo.",
    upgradeNote:
      "¿Empezaste en un nivel y quieres subir? Pagas solo la diferencia y tu avance se respeta.",
  },
  personal: {
    blockA: {
      title: "Empieza hoy mismo",
      subtitle: "Compra directa, acceso inmediato.",
    },
    blockB: {
      title: "Hablemos antes",
      subtitle:
        "Incluyen acompañamiento de arranque, y por eso los cerramos contigo.",
    },
    volumeNote:
      "¿Quieres que tu empresa lo pague? Escríbenos y te ayudamos a plantearlo con tu área de RH.",
    upgradeNote:
      "¿Empiezas en un nivel y quieres subir? Pagas solo la diferencia y tu avance se respeta.",
  },
} satisfies Record<Audience, unknown>;

export function Pricing({ audience }: { audience: Audience }) {
  const text = copy[audience];

  return (
    <Section id="planes" density="loose">
      <Eyebrow>Planes</Eyebrow>
      <SectionTitle className="max-w-2xl">
        Cuatro formas de entrar. Elige por dónde empiezas.
      </SectionTitle>
      <p className="mt-5 max-w-prose text-base text-muted">
        Todos los precios son por persona, en pesos mexicanos y con IVA
        incluido.
      </p>

      {/* Bloque A — compra directa */}
      <div className="mt-16">
        <PlanBlockHeader
          title={text.blockA.title}
          subtitle={text.blockA.subtitle}
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {plansByChannel.checkout.map((plan) => (
            <PlanCard key={plan.id} plan={plan} audience={audience} />
          ))}
        </div>

        {site.bonusItems.length > 0 && (
          <div className="mt-6 rounded-2xl border border-gold/40 bg-gold/[0.06] p-6 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold">
              Bono de primera generación · hasta el{" "}
              {site.bonusDeadline ?? <Pending>fecha del bono</Pending>}
            </p>
            <ul className="mt-4 space-y-2.5">
              {site.bonusItems.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <span aria-hidden className="mt-0.5 text-gold">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 space-y-2 text-sm text-muted">
          <p>{text.upgradeNote}</p>
        </div>
      </div>

      {/* Bloque B — venta asistida */}
      <div className="mt-20">
        <PlanBlockHeader
          title={text.blockB.title}
          subtitle={text.blockB.subtitle}
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {plansByChannel.whatsapp.map((plan) => (
            <PlanCard key={plan.id} plan={plan} audience={audience} />
          ))}
        </div>

        <div className="mt-6 space-y-2 text-sm text-muted">
          {audience === "empresa" ? (
            <p>
              Solo tomamos{" "}
              {site.monthlyCompanySlots ?? (
                <Pending>cuántas empresas al mes</Pending>
              )}{" "}
              empresas al mes con acompañamiento de arranque. No es marketing:
              es la capacidad real que tenemos para implementar bien.
            </p>
          ) : (
            <p>
              Estos dos niveles llevan acompañamiento de arranque, así que los
              cerramos hablando contigo. Es una conversación corta para
              confirmar que el nivel que eliges es el que de verdad necesitas.
            </p>
          )}
          <p>{text.volumeNote}</p>
        </div>
      </div>
    </Section>
  );
}

function PlanBlockHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="border-t border-line pt-6">
      <h3 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
        {title}
      </h3>
      <p className="mt-2 text-base text-muted">{subtitle}</p>
    </div>
  );
}

function PlanCard({ plan, audience }: { plan: Plan; audience: Audience }) {
  const monthly = monthlyPrice(plan);
  const href = planHref(plan);
  const summary = audience === "personal" ? plan.summaryPro : plan.summary;

  return (
    <article
      className={`flex flex-col rounded-2xl border p-8 ${
        plan.featured
          ? "border-gold/50 bg-surface/70"
          : "border-line bg-surface/30"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <h4 className="font-display text-2xl font-extrabold tracking-tight">
          {plan.name}
        </h4>
        {plan.featured && (
          <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-night">
            Más elegido
          </span>
        )}
      </div>

      <div className="mt-6">
        <p className="tabular text-sm text-muted line-through">
          {mxn(plan.priceRegular)}
        </p>
        <p className="tabular font-display text-5xl font-extrabold text-gold">
          {mxn(plan.price)}
        </p>
        <p className="tabular mt-2 text-sm text-muted">
          {mxn(monthly)} al mes durante {ACCESS_MONTHS} meses de acceso · IVA
          incluido
        </p>
      </div>

      <p className="mt-6 text-base leading-relaxed text-muted">{summary}</p>

      <ul className="mt-6 flex-1 space-y-2.5">
        {plan.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-3 text-sm leading-relaxed">
            <span aria-hidden className="mt-0.5 text-aqua">
              ✓
            </span>
            <span>{highlight}</span>
          </li>
        ))}
        {plan.excludes?.map((exclude) => (
          <li
            key={exclude}
            className="flex gap-3 text-sm leading-relaxed text-muted"
          >
            <span aria-hidden className="mt-0.5">
              —
            </span>
            <span>{exclude}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-xs uppercase tracking-[0.14em] text-muted">
        {plan.weeklyHours}
      </p>

      <div className="mt-6">
        <Cta
          href={href}
          variant={plan.featured ? "primary" : "ghost"}
          missingLabel={
            plan.channel === "checkout"
              ? `URL de pago de ${plan.name}`
              : "número de WhatsApp"
          }
        >
          {plan.ctaLabel}
        </Cta>
      </div>
    </article>
  );
}
