import { ImageResponse } from "next/og";
import { entryPlan, monthlyPrice } from "@/shared/data/plans";
import { mxn } from "@/shared/data/site";
import { logoDataUri } from "@/shared/lib/logo";

/**
 * Imagen de Open Graph generada en build. Evita depender de un PNG que alguien
 * tenga que diseñar y subir, y usa los mismos precios que la página.
 */

export const alt = "Que tu mejor gente se quede — Plan de Carrera Profesional";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await logoDataUri();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#160B2E",
        padding: "80px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- satori requiere <img> */}
        <img src={logo} width={72} height={58} alt="" />
        <span style={{ color: "#A9A2B9", fontSize: 30 }}>6D Consultoría</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            color: "#F7F3EA",
            fontSize: 96,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          Que tu mejor gente se quede.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            color: "#E8B84B",
            fontSize: 54,
            fontWeight: 700,
          }}
        >
          Desde {mxn(monthlyPrice(entryPlan))} al mes por persona.
        </div>
      </div>

      <div style={{ display: "flex", color: "#A9A2B9", fontSize: 26 }}>
        Universidad ICEMéxico · SEP-CONOCER · Microsoft · Open English
      </div>
    </div>,
    size,
  );
}
