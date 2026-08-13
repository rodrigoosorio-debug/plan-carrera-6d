import type { Metadata } from "next";
import { LandingPro } from "@/features/landing-pro";
import { baseUrl } from "@/shared/data/url";

const title =
  "Llevas tres años en el mismo puesto | Plan de Carrera Profesional";
const description =
  "Seis meses, tres certificaciones verificables (Microsoft, SEP-CONOCER y Cambridge) y un CV que sí dice lo que vales. Desde $83 al mes, IVA incluido.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/profesionales" },
  openGraph: {
    title,
    description,
    url: "/profesionales",
    siteName: "6D Consultoría",
    locale: "es_MX",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function Profesionales() {
  return <LandingPro baseUrl={baseUrl} />;
}
