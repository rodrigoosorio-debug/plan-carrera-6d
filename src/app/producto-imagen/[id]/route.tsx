import { ImageResponse } from "next/og";
import { logoDataUri } from "@/shared/lib/logo";
import { monthlyPrice, plans } from "@/shared/data/plans";
import { ACCESS_MONTHS, mxn, PROGRAM_MONTHS } from "@/shared/data/site";

/**
 * Genera la imagen de producto de cada nivel, a 800x400 (el máximo que acepta
 * GHL). Los precios vienen de `data/plans.ts`, así que si cambias un precio la
 * imagen se regenera correcta sola.
 *
 * Uso: /producto-imagen/esencial · /producto-imagen/profesional · etc.
 * Para exportarlas a PNG: `npm run productos:img`
 */

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const plan = plans.find((p) => p.id === id);

  if (!plan) {
    return new Response(`Nivel desconocido: ${id}`, { status: 404 });
  }

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
        padding: "44px 52px",
        borderBottom: "8px solid #E8B84B",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#A9A2B9",
          fontSize: 20,
          letterSpacing: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- satori requiere <img> */}
          <img src={logo} width={54} height={43} alt="" />
          <span>6D CONSULTORÍA</span>
        </div>
        <span style={{ color: "#2ED9D0" }}>
          {plan.weeklyHours.toUpperCase()}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", color: "#A9A2B9", fontSize: 24 }}>
          Plan de Carrera Profesional
        </div>
        <div
          style={{
            display: "flex",
            color: "#F7F3EA",
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-2px",
          }}
        >
          {plan.name}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 18 }}>
          <span style={{ color: "#E8B84B", fontSize: 64, fontWeight: 800 }}>
            {mxn(plan.price)}
          </span>
          <span
            style={{
              color: "#A9A2B9",
              fontSize: 26,
              textDecoration: "line-through",
              paddingBottom: 12,
            }}
          >
            {mxn(plan.priceRegular)}
          </span>
          <span style={{ color: "#F7F3EA", fontSize: 23, paddingBottom: 13 }}>
            IVA incluido
          </span>
        </div>
        <span style={{ display: "flex", color: "#A9A2B9", fontSize: 21 }}>
          {mxn(monthlyPrice(plan))}/mes · {PROGRAM_MONTHS} meses de programa ·{" "}
          {ACCESS_MONTHS} meses de acceso
        </span>
      </div>
    </div>,
    { width: 800, height: 400 },
  );
}
