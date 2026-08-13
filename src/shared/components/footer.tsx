import { site } from "../data/site";
import { Pending } from "./pending";

/**
 * Footer compartido. El enlace cruzado manda a la otra landing para que nadie
 * que llegue a la página equivocada se pierda.
 */
export function Footer({
  crossLink,
}: {
  crossLink: { href: string; label: string };
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-night-deep">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8">
        <a
          href={crossLink.href}
          className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-cream transition-colors hover:border-aqua hover:text-aqua"
        >
          {crossLink.label}
          <span aria-hidden>→</span>
        </a>

        <div className="mt-10 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element -- SVG estático */}
              <img
                src="/logo-6d.svg"
                alt=""
                aria-hidden
                className="h-10 w-auto"
              />
              <p className="font-display text-lg font-extrabold tracking-tight">
                {site.brand}
              </p>
            </div>
            <p className="mt-2 text-sm text-muted">
              {site.program} · Respaldado por {site.backer}
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm text-muted sm:items-end">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a
                href="/aviso-de-privacidad"
                className="transition-colors hover:text-cream"
              >
                Aviso de privacidad
              </a>
              <a
                href="/terminos"
                className="transition-colors hover:text-cream"
              >
                Términos
              </a>
              {site.email ? (
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-cream"
                >
                  {site.email}
                </a>
              ) : (
                <Pending>correo de contacto</Pending>
              )}
            </div>
            <p className="text-muted">
              © {year} {site.legalName} · Centro de Evaluación acreditado{" "}
              <span className="tabular">{site.conocer.code}</span>
            </p>
            <p className="text-muted">
              Precios en pesos mexicanos con IVA incluido.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
