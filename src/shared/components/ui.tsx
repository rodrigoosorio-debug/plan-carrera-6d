import { Pending } from "./pending";

/**
 * Primitivas compartidas de la landing.
 * El ritmo vertical se controla aquí: cada sección declara su propia densidad
 * en vez de heredar un padding uniforme.
 */

type Density = "tight" | "normal" | "loose";

const densityClass: Record<Density, string> = {
  tight: "py-16 sm:py-20",
  normal: "py-20 sm:py-28",
  loose: "py-28 sm:py-36",
};

export function Section({
  id,
  density = "normal",
  dark = false,
  className = "",
  children,
}: {
  id?: string;
  density?: Density;
  /** Fondo hundido, para separar bloques sin usar un divisor. */
  dark?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`${densityClass[density]} ${dark ? "bg-night-deep" : ""} ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

/** Etiqueta corta sobre el título de sección. Turquesa, versalitas. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-aqua">
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl ${className}`}
    >
      {children}
    </h2>
  );
}

/**
 * Botón de llamada a la acción.
 * Si `href` es `null` renderiza un marcador pendiente en vez de un enlace roto.
 */
export function Cta({
  href,
  children,
  variant = "primary",
  missingLabel,
}: {
  href: string | null;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  /** Qué dato falta, si `href` viene vacío. */
  missingLabel: string;
}) {
  if (!href) {
    return <Pending>{missingLabel}</Pending>;
  }

  const base =
    "inline-flex min-h-[52px] items-center justify-center rounded-full px-7 text-base font-semibold transition-colors duration-200";

  const styles =
    variant === "primary"
      ? "bg-gold text-night hover:bg-gold-bright"
      : "border border-line text-cream hover:border-aqua hover:text-aqua";

  return (
    <a href={href} className={`${base} ${styles}`}>
      {children}
    </a>
  );
}

/** Cifra grande en dorado. El recurso visual central de la página. */
export function Figure({
  children,
  size = "lg",
}: {
  children: React.ReactNode;
  size?: "lg" | "sm";
}) {
  return (
    <span
      className={`tabular block font-display font-extrabold text-gold ${
        size === "lg" ? "text-figure" : "text-figure-sm"
      }`}
    >
      {children}
    </span>
  );
}
