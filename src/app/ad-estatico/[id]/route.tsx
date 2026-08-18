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
  /** Tarjeta de carrusel de Meta: siempre cuadrada. */
  square: { width: 1080, height: 1080 },
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

  // ── TOF-05 · Carrusel "Presupuesto que sí se usa" (4 tarjetas) ──

  "tof-05-t1": carouselCard(
    "1/4",
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        color: GOLD,
        fontSize: 82,
        fontWeight: 800,
        lineHeight: 1.12,
        letterSpacing: "-2px",
      }}
    >
      <span>¿Cuántos cursos pagó</span>
      <span>tu empresa este año</span>
      <span style={{ color: CREAM }}>que nadie terminó?</span>
    </div>,
  ),

  "tof-05-t2": carouselCard(
    "2/4",
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          color: CREAM,
          fontSize: 78,
          fontWeight: 800,
          lineHeight: 1.12,
          letterSpacing: "-2px",
        }}
      >
        El problema no es tu gente.
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 40,
          color: GOLD,
          fontSize: 58,
          fontWeight: 700,
          lineHeight: 1.2,
        }}
      >
        <span>Es el formato: en vivo, un solo</span>
        <span>día, a la hora que no podían.</span>
      </div>
    </div>,
  ),

  "tof-05-t3": carouselCard(
    "3/4",
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          color: GOLD,
          fontSize: 78,
          fontWeight: 800,
          lineHeight: 1.12,
          letterSpacing: "-2px",
        }}
      >
        <span>Grabaciones disponibles</span>
        <span>12 meses.</span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 40,
          color: CREAM,
          fontSize: 58,
          fontWeight: 700,
        }}
      >
        Cada quien avanza cuando puede.
      </div>
    </div>,
  ),

  "tof-05-t4": carouselCard(
    "4/4",
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 20,
        }}
      >
        <span style={{ color: GOLD, fontSize: 120, fontWeight: 800 }}>$83</span>
        <span style={{ color: CREAM, fontSize: 52, fontWeight: 700 }}>
          al mes por colaborador
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 44,
          color: AQUA,
          fontSize: 54,
          fontWeight: 700,
          lineHeight: 1.2,
        }}
      >
        <span>Presupuesto de capacitación</span>
        <span>que por fin se ejecuta.</span>
      </div>
    </div>,
  ),

  // ── MOF-02 · Carrusel "La tabla ÷12" (5 tarjetas) ──

  "mof-02-t1": carouselCard(
    "1/5",
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          color: GOLD,
          fontSize: 92,
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: "-2px",
        }}
      >
        <span>Hicimos la</span>
        <span>cuenta por ti.</span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 44,
          color: CREAM,
          fontSize: 56,
          fontWeight: 700,
        }}
      >
        El acceso dura 12 meses.
      </div>
    </div>,
  ),

  "mof-02-t2": priceCard(
    "2/5",
    "CORPORATIVO",
    "$9,997",
    "$833/mes",
    "$27 al día",
  ),
  "mof-02-t3": priceCard(
    "3/5",
    "EJECUTIVO",
    "$5,997",
    "$500/mes",
    "$16 al día",
  ),
  "mof-02-t4": priceCard(
    "4/5",
    "PROFESIONAL",
    "$2,997",
    "$250/mes",
    "$8 al día",
  ),

  // BOF-03 · Urgencia honesta — la fecha real del bono
  "bof-03": (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          color: CREAM,
          fontSize: 74,
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: "-2px",
        }}
      >
        <span>El bono de primera</span>
        <span>generación cierra el</span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 24,
          color: GOLD,
          fontSize: 112,
          fontWeight: 800,
          letterSpacing: "-3px",
        }}
      >
        4 de septiembre
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 52,
          gap: 22,
          color: CREAM,
          fontSize: 38,
          fontWeight: 700,
        }}
      >
        <span>· Sesión de arranque en vivo</span>
        <span>· Taller extra que no se repetirá</span>
        <span>· Evaluación EC0217.01 incluida en Profesional</span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 48,
          color: AQUA,
          fontSize: 36,
          fontWeight: 700,
        }}
      >
        Después de esa fecha, estas condiciones no vuelven.
      </div>
    </div>
  ),

  // BOF-05 · El recordatorio directo — retargeting de carrito/página
  "bof-05": (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          color: GOLD,
          fontSize: 100,
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: "-2px",
        }}
      >
        <span>Hiciste la cuenta.</span>
        <span>$2.70 al día.</span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 48,
          color: CREAM,
          fontSize: 120,
          fontWeight: 800,
          letterSpacing: "-3px",
        }}
      >
        ¿Entonces?
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 56,
          color: AQUA,
          fontSize: 40,
          fontWeight: 700,
        }}
      >
        Estabas a un clic. Sigues a un clic.
      </div>
    </div>
  ),

  // ── BOF-01 · Carrusel "La escalera de precios" (5 tarjetas) ──

  "bof-01-t1": carouselCard(
    "1/5",
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          color: GOLD,
          fontSize: 88,
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: "-2px",
        }}
      >
        <span>Elige tu nivel.</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 44,
          color: CREAM,
          fontSize: 50,
          fontWeight: 700,
          lineHeight: 1.25,
        }}
      >
        <span>Todos son individuales</span>
        <span>(un acceso = una persona)</span>
        <span>con 12 meses de acceso.</span>
      </div>
    </div>,
  ),

  "bof-01-t2": ladderCard(
    "2/5",
    "CORPORATIVO",
    "$9,997",
    "$833/mes",
    "Microsoft + CONOCER + Cambridge, y un año de Open English",
  ),
  "bof-01-t3": ladderCard(
    "3/5",
    "EJECUTIVO",
    "$5,997",
    "$500/mes",
    "Certificaciones Microsoft y CONOCER incluidas",
  ),
  "bof-01-t4": ladderCard(
    "4/5",
    "PROFESIONAL",
    "$2,997",
    "$250/mes",
    "Constancias + 200 horas de Excel + coaching semanal",
  ),
  "bof-01-t5": ladderCard(
    "5/5",
    "ESENCIAL",
    "$997",
    "$83/mes",
    "$2.70 al día. Empieza hoy.",
  ),

  "mof-02-t5": (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      {cardBadge("5/5")}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        {priceRows("ESENCIAL", "$997", "$83/mes", "$2.70 al día")}
        <div
          style={{
            display: "flex",
            marginTop: 52,
            color: CREAM,
            fontSize: 62,
            fontWeight: 800,
          }}
        >
          ¿Sigue pareciendo caro?
        </div>
      </div>
    </div>
  ),
};

/** Insignia con el número de tarjeta, para que el orden del carrusel sea obvio. */
function cardBadge(step: string) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <span
        style={{
          color: MUTED,
          fontSize: 30,
          letterSpacing: 4,
          border: `2px solid ${MUTED}`,
          borderRadius: 999,
          padding: "8px 24px",
        }}
      >
        {step}
      </span>
    </div>
  );
}

/** Estructura común de tarjeta de carrusel: insignia arriba, cuerpo centrado. */
function carouselCard(step: string, content: React.ReactElement) {
  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      {cardBadge(step)}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        {content}
      </div>
    </div>
  );
}

/** Filas de la tabla ÷12: precio grande → mensualidad → diario. */
function priceRows(
  level: string,
  price: string,
  monthly: string,
  daily: string,
) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span
        style={{
          color: MUTED,
          fontSize: 40,
          letterSpacing: 6,
          fontWeight: 700,
        }}
      >
        {level}
      </span>
      <span
        style={{
          color: GOLD,
          fontSize: 150,
          fontWeight: 800,
          letterSpacing: "-4px",
        }}
      >
        {price}
      </span>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 26,
          marginTop: 12,
        }}
      >
        <span style={{ color: CREAM, fontSize: 66, fontWeight: 800 }}>
          → {monthly}
        </span>
        <span style={{ color: AQUA, fontSize: 52, fontWeight: 700 }}>
          → {daily}
        </span>
      </div>
    </div>
  );
}

/** Tarjeta de la escalera BOF-01: precio + qué certificaciones incluye. */
function ladderCard(
  step: string,
  level: string,
  price: string,
  monthly: string,
  includes: string,
) {
  return carouselCard(
    step,
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span
        style={{
          color: MUTED,
          fontSize: 40,
          letterSpacing: 6,
          fontWeight: 700,
        }}
      >
        {level}
      </span>
      <div style={{ display: "flex", alignItems: "baseline", gap: 26 }}>
        <span
          style={{
            color: GOLD,
            fontSize: 140,
            fontWeight: 800,
            letterSpacing: "-4px",
          }}
        >
          {price}
        </span>
        <span style={{ color: CREAM, fontSize: 56, fontWeight: 800 }}>
          → {monthly}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 36,
          color: AQUA,
          fontSize: 44,
          fontWeight: 700,
          lineHeight: 1.3,
        }}
      >
        {includes}
      </div>
    </div>,
  );
}

/** Tarjeta de precio del carrusel MOF-02. */
function priceCard(
  step: string,
  level: string,
  price: string,
  monthly: string,
  daily: string,
) {
  return carouselCard(step, priceRows(level, price, monthly, daily));
}
