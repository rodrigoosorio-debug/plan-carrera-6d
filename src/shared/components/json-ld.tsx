import { plans } from "../data/plans";
import { PROGRAM_MONTHS, site } from "../data/site";

/**
 * Datos estructurados, compartidos por las dos landings.
 *
 * Los precios salen de `shared/data/plans.ts`, así que nunca pueden
 * desincronizarse de lo que muestra la página. El FAQ llega por prop porque
 * cada landing responde objeciones distintas.
 */

export interface FaqEntry {
  question: string;
  answer: string;
}

export function JsonLd({
  baseUrl,
  path = "/",
  faq,
}: {
  baseUrl: string;
  /** Ruta de esta página, para la URL canónica del schema. */
  path?: string;
  faq: FaqEntry[];
}) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brand,
    legalName: site.legalName,
    url: baseUrl,
    description: `${site.program}, respaldado por ${site.backer}.`,
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: "Centro de Evaluación acreditado ante CONOCER-SEP",
      identifier: site.conocer.code,
      recognizedBy: {
        "@type": "GovernmentOrganization",
        name: "CONOCER — Consejo Nacional de Normalización y Certificación de Competencias Laborales, SEP",
      },
    },
  };

  const course = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: site.program,
    url: new URL(path, baseUrl).toString(),
    description:
      "Plan de carrera profesional con diagnóstico, ruta personalizada, coaching semanal en vivo y certificaciones oficiales. Seis meses de programa, doce meses de acceso.",
    provider: {
      "@type": "Organization",
      name: site.backer,
    },
    inLanguage: "es-MX",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `P${PROGRAM_MONTHS}M`,
    },
    offers: plans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      price: String(plan.price),
      priceCurrency: "MXN",
      category: "Paid",
      availability: "https://schema.org/InStock",
      valueAddedTaxIncluded: true,
    })),
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      {[organization, course, faqPage].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
