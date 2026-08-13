import { site } from "../data/site";

/**
 * Bloque de acreditación como Centro de Evaluación CONOCER.
 *
 * Es el argumento de autoridad más fuerte de las dos páginas: no es que 6D
 * revenda una certificación, es que está acreditada para evaluarla y emitirla.
 * Por eso se publica el código — un sello sin número es decoración, uno con
 * número lo puede comprobar cualquiera.
 */
export function CentroEvaluador({
  audience,
}: {
  audience: "empresa" | "personal";
}) {
  return (
    <div className="mt-12 rounded-2xl border border-aqua/40 bg-aqua/[0.06] p-8 sm:p-10">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-aqua">
        Centro de Evaluación acreditado · CONOCER-SEP
      </p>

      <p className="mt-5 font-display text-2xl font-extrabold leading-snug sm:text-3xl">
        {audience === "empresa"
          ? "No revendemos la certificación. Somos quienes la evalúan y la emiten."
          : "La certificación no te la conseguimos con un tercero. Te la evaluamos nosotros."}
      </p>

      <p className="mt-5 max-w-prose text-base leading-relaxed text-muted">
        6D Consultoría está acreditada por el CONOCER, el organismo de la SEP
        que regula la certificación de competencias en México, con el código{" "}
        <span className="tabular font-semibold text-cream">
          {site.conocer.code}
        </span>
        . Es público: lo puedes verificar antes de contratarnos.
      </p>

      <div className="mt-7 border-t border-line pt-6">
        <p className="text-xs uppercase tracking-[0.14em] text-muted">
          Estándares que estamos acreditados para evaluar
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {site.conocer.standards.map((standard) => (
            <li
              key={standard}
              className={`tabular rounded-full border px-3 py-1 text-sm ${
                standard === "EC0217.01"
                  ? "border-gold/60 bg-gold/10 font-semibold text-gold"
                  : "border-line text-muted"
              }`}
            >
              {standard}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-muted">
          El <span className="font-semibold text-cream">EC0217.01</span> es el
          que entra en el programa.
        </p>
      </div>
    </div>
  );
}
