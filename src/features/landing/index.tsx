import { Faq } from "@/shared/components/faq";
import { Footer } from "@/shared/components/footer";
import { Guarantee } from "@/shared/components/guarantee";
import { HowItWorks } from "@/shared/components/how-it-works";
import { JsonLd } from "@/shared/components/json-ld";
import { MobileBar, Navbar, type NavLink } from "@/shared/components/navbar";
import { Pricing } from "@/shared/components/pricing";
import { RotationCalculator } from "./components/rotation-calculator";
import { Testimonials } from "@/shared/components/testimonials";
import { testimonials } from "@/shared/data/testimonials";
import { Authority } from "./components/authority";
import { CtaFinal } from "./components/cta-final";
import { Hero } from "./components/hero";
import { Pain } from "./components/pain";
import { TheMath } from "./components/the-math";
import { WhatsIncluded } from "./components/whats-included";
import { faq } from "./data/faq";

const links: NavLink[] = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#que-incluye", label: "Qué incluye" },
  { href: "#planes", label: "Planes" },
];

/** Landing B2B (`/`): le habla a quien decide y paga por su equipo. */
export function LandingPage({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <JsonLd baseUrl={baseUrl} path="/" faq={faq} />
      <Navbar links={links} />
      <main>
        <Hero />
        <Pain />
        <TheMath />
        <RotationCalculator />
        <HowItWorks />
        <WhatsIncluded />
        <Authority />
        <Testimonials items={testimonials} />
        <Pricing audience="empresa" />
        <Guarantee audience="empresa" />
        <Faq items={faq} />
        <CtaFinal />
      </main>
      <Footer
        crossLink={{ href: "/profesionales", label: "¿Lo quieres para ti?" }}
      />
      {/* Espacio para que la barra fija de móvil no tape el footer. */}
      <div className="h-20 md:hidden" aria-hidden />
      <MobileBar audience="empresa" />
    </>
  );
}
