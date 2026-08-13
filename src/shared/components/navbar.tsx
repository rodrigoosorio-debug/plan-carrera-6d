import { site, whatsappUrl } from "../data/site";
import { Cta } from "./ui";

export interface NavLink {
  href: string;
  label: string;
}

/** Mensaje pre-cargado del WhatsApp, distinto según a quién le hable la página. */
export type Audience = "empresa" | "personal";

const whatsappMessage: Record<Audience, string> = {
  empresa:
    "Hola, quiero información del Plan de Carrera Profesional para mi empresa.",
  personal: "Hola, quiero información del Plan de Carrera Profesional.",
};

export function Navbar({ links }: { links: NavLink[] }) {
  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-night/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element -- SVG estático, next/image no aporta aquí */}
          <img
            src="/logo-6d.svg"
            alt=""
            aria-hidden
            className="h-9 w-auto sm:h-10"
          />
          <span className="font-display text-lg font-extrabold tracking-tight">
            {site.brand}
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-cream"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden sm:block">
          <a
            href="#planes"
            className="inline-flex min-h-[44px] items-center rounded-full bg-gold px-5 text-sm font-semibold text-night transition-colors hover:bg-gold-bright"
          >
            Ver los 4 niveles
          </a>
        </div>

        <div className="sm:hidden">
          <a href="#planes" className="text-sm font-semibold text-gold">
            Ver planes
          </a>
        </div>
      </nav>
    </header>
  );
}

/** Barra fija inferior en móvil: el CTA nunca queda fuera de alcance. */
export function MobileBar({ audience }: { audience: Audience }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-night/95 px-4 py-3 backdrop-blur-md md:hidden">
      <div className="flex gap-3">
        <a
          href="#planes"
          className="flex min-h-[48px] flex-1 items-center justify-center rounded-full bg-gold text-sm font-semibold text-night"
        >
          Ver los 4 niveles
        </a>
        <Cta
          href={whatsappUrl(whatsappMessage[audience])}
          variant="ghost"
          missingLabel="WhatsApp"
        >
          WhatsApp
        </Cta>
      </div>
    </div>
  );
}
