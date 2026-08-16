import { ImageResponse } from "next/og";
import { logoDataUri } from "@/shared/lib/logo";

/**
 * Estáticos de la campaña de Meta (TOF-03, TOF-09, MOF-06), generados con
 * código para que el texto y las cifras salgan exactos — un generador de
 * imágenes por IA los destrozaría.
 *
 * Formatos (specs del pipeline de Leidy):
 *   ?f=feed  → 1080×1350
 *   ?f=story → 1080×1920
 *
 * Los textos vienen del doc `campana-ads-plan-de-carrera.md`. Si cambian ahí,
 * cámbialos aquí y regenera con `npm run ads:img`.
 */

const NIGHT = "#160B2E";
const GOLD = "#E8B84B";
const AQUA = "#2ED9D0";
const CREAM = "#F7F3EA";
const MUTED = "#A9A2B9";
const RED = "#E88585";

type Format = { width: number; height: number };

const FORMATS: Record<string, Format> = {
  feed: { width: 1080, height: 1350 },
  story: { width: 1080, height: 1920 },
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const url = new URL(request.url);
  const format = FORMATS[url.searchParams.get("f") ?? "feed"];

  if (!format) {
    return new Response("Formato desconocido: usa ?f=feed o ?f=story", {
      status: 400,
    });
  }

  const logo = await logoDataUri();
  const body = AD_BODIES[id];

  if (!body) {
    return new Response(
      `Anuncio desconocido: ${id}. Disponibles: ${Object.keys(AD_BODIES).join(", ")}`,
      { status: 404 },
    );
  }

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: NIGHT,
        padding: format.height > 1400 ? "150px 90px" : "90px",
        borderBottom: `14px solid ${GOLD}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- satori requiere <img> */}
        <img src={logo} width={78} height={62} alt="" />
        <span style={{ color: MUTED, fontSize: 30, letterSpacing: 3 }}>
          6D CONSULTORÍA
        </span>
      </div>

      {body}

      <div style={{ display: "flex", color: MUTED, fontSize: 28 }}>
        Plan de Carrera Profesional · Acceso 12 meses
      </div>
    </div>,
    format,
  );
}

/** El cuerpo central de cada anuncio, con su copy literal del doc de campaña. */
const AD_BODIES: Record<string, React.ReactElement> = {
  // TOF-03 · Dueño — la tesis de marca
  "tof-03": (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          color: GOLD,
          fontSize: 92,
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: "-2px",
        }}
      >
        <span>Tu gente no renuncia</span>
        <span>por dinero.</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 44,
          color: CREAM,
          fontSize: 92,
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: "-2px",
        }}
      >
        <span>Renuncia porque</span>
        <span>no ve futuro.</span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 56,
          color: AQUA,
          fontSize: 38,
          fontWeight: 700,
        }}
      >
        Retener cuesta desde $83/mes por persona
      </div>
    </div>
  ),

  // TOF-09 · Individual — café vs carrera
  "tof-09": (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          color: GOLD,
          fontSize: 104,
          fontWeight: 800,
          lineHeight: 1.06,
          letterSpacing: "-2px",
        }}
      >
        <span>Gastas más</span>
        <span>en café que</span>
        <span>en tu carrera.</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 24,
          marginTop: 64,
        }}
      >
        <span style={{ color: AQUA, fontSize: 72, fontWeight: 800 }}>
          $2.70 al día.
        </span>
        <span style={{ color: CREAM, fontSize: 44, fontWeight: 700 }}>
          Acceso 12 meses.
        </span>
      </div>
      <div
        style={{ display: "flex", marginTop: 30, color: MUTED, fontSize: 34 }}
      >
        Un latte: $75. Tu siguiente nivel: $2.70.
      </div>
    </div>
  ),

  // MOF-06 · La comparación brutal
  "mof-06": (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          borderLeft: `10px solid ${RED}`,
          paddingLeft: 40,
        }}
      >
        <span style={{ color: RED, fontSize: 44, fontWeight: 700 }}>
          UNA renuncia
        </span>
        <span
          style={{
            color: CREAM,
            fontSize: 120,
            fontWeight: 800,
            letterSpacing: "-3px",
          }}
        >
          $90,000+
        </span>
      </div>

      <div
        style={{
          display: "flex",
          margin: "56px 0",
          color: MUTED,
          fontSize: 40,
          fontWeight: 700,
        }}
      >
        contra
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          borderLeft: `10px solid ${GOLD}`,
          paddingLeft: 40,
        }}
      >
        <span style={{ color: GOLD, fontSize: 44, fontWeight: 700 }}>
          Capacitar a 9 personas TODO un año
        </span>
        <span
          style={{
            color: GOLD,
            fontSize: 120,
            fontWeight: 800,
            letterSpacing: "-3px",
          }}
        >
          $8,973
        </span>
      </div>

      <div
        style={{ display: "flex", marginTop: 56, color: CREAM, fontSize: 36 }}
      >
        La rotación es el impuesto de no dar futuro. Deja de pagarlo.
      </div>
    </div>
  ),
};
