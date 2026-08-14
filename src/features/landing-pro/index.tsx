import { Faq } from "@/shared/components/faq";
import { Footer } from "@/shared/components/footer";
import { Guarantee } from "@/shared/components/guarantee";
import { HowItWorks } from "@/shared/components/how-it-works";
import { JsonLd } from "@/shared/components/json-ld";
import { MetaPixel } from "@/shared/components/meta-pixel";
import { MobileBar, Navbar, type NavLink } from "@/shared/components/navbar";
import { Pricing } from "@/shared/components/pricing";
import { Testimonials } from "@/shared/components/testimonials";
import { testimonialsPro } from "@/shared/data/testimonials";
import { Authority } from "./components/authority";
import { CtaFinal } from "./components/cta-final";
import { Hero } from "./components/hero";
import { Stagnation } from "./components/stagnation";
import { TheMath } from "./components/the-math";
import { WhatYouGet } from "./components/what-you-get";
import { WhyNotPromoted } from "./components/why-not-promoted";
import { YourCv } from "./components/your-cv";
import { faq } from "./data/faq";

const links: NavLink[] = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#que-te-llevas", label: "Qué te llevas" },
  { href: "#planes", label: "Planes" },
];

/** Landing B2C (`/profesionales`): le habla a quien se paga su propio crecimiento. */
export function LandingPro({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <JsonLd baseUrl={baseUrl} path="/profesionales" faq={faq} />
      <Navbar links={links} />
      <main>
        <Hero />
        <Stagnation />
        <WhyNotPromoted />
        <TheMath />
        <HowItWorks />
        <WhatYouGet />
        <YourCv />
        <Authority />
        <Testimonials
          items={testimonialsPro}
          title="Tres personas en tres puntos distintos del camino."
        />
        <Pricing audience="personal" />
        <Guarantee audience="personal" />
        <Faq items={faq} />
        <CtaFinal />
      </main>
      <Footer crossLink={{ href: "/", label: "¿Lo quieres para tu equipo?" }} />
      {/* Espacio para que la barra fija de móvil no tape el footer. */}
      <div className="h-20 md:hidden" aria-hidden />
      <MobileBar audience="personal" />
    </>
  );
}
