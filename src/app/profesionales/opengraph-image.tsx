import { ImageResponse } from "next/og";
import { entryPlan, monthlyPrice } from "@/shared/data/plans";
import { mxn } from "@/shared/data/site";
import { logoDataUri } from "@/shared/lib/logo";

/**
 * Open Graph de la landing B2C. Propia y distinta de la de `/`: cuando alguien
 * comparte esta página por WhatsApp tiene que aparecer su titular, no el de la
 * versión para empresas.
 */

export const alt =
  "Llevas tres años en el mismo puesto — Plan de Carrera Profesional";
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
            fontSize: 92,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          Llevas tres años en el mismo puesto.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            color: "#E8B84B",
            fontSize: 50,
            fontWeight: 700,
          }}
        >
          Tres certificaciones. Desde {mxn(monthlyPrice(entryPlan))} al mes.
        </div>
      </div>

      <div style={{ display: "flex", color: "#A9A2B9", fontSize: 26 }}>
        Microsoft · SEP-CONOCER · Cambridge · Universidad ICEMéxico
      </div>
    </div>,
    size,
  );
}
