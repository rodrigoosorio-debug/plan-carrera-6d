import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { baseUrl } from "@/shared/data/url";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const title = "Que tu mejor gente se quede | Plan de Carrera Profesional";
const description =
  "Plan de carrera con diagnóstico, ruta personalizada y coaching semanal en vivo. Seis meses de programa, doce meses de acceso. Desde $83 al mes por persona, IVA incluido.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "6D Consultoría",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX" className={`${display.variable} ${sans.variable}`}>
      {/*
       * suppressHydrationWarning solo aquí, en <body>: extensiones como
       * ColorZilla o Grammarly le inyectan atributos antes de que React hidrate
       * y eso dispara un falso positivo de hydration mismatch.
       * Solo silencia diferencias de atributos EN ESTE elemento — cualquier
       * mismatch real dentro de la app se sigue reportando.
       */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
