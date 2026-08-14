"use client";

import Script from "next/script";
import { useEffect } from "react";
import { checkoutAmountFor } from "../data/plans";
import { site } from "../data/site";

/**
 * Pixel de Meta con los eventos del embudo.
 *
 * Eventos que dispara:
 * - PageView y ViewContent al cargar (ViewContent lleva el nombre de la landing
 *   para poder separar públicos B2B y B2C).
 * - InitiateCheckout al hacer clic en cualquier enlace de pago, con el monto.
 * - Contact al hacer clic en cualquier enlace de WhatsApp.
 * - Lead lo dispara la calculadora al enviar el formulario (ver
 *   rotation-calculator.tsx).
 *
 * Los clics se capturan por delegación en `document`, así los CTAs siguen
 * siendo componentes de servidor y este es el único código de cliente extra.
 *
 * El evento Purchase NO se dispara aquí: la compra ocurre en el checkout de
 * GHL (otro dominio). Hay que configurar el mismo pixel dentro de GHL para
 * cerrar el embudo.
 */
export function MetaPixel({ contentName }: { contentName: string }) {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!window.fbq) return;
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a");
      const href = anchor?.getAttribute("href") ?? "";
      if (!href) return;

      if (href.includes("wa.me/")) {
        window.fbq("track", "Contact");
        return;
      }

      const amount = checkoutAmountFor(href);
      if (amount !== null) {
        window.fbq("track", "InitiateCheckout", {
          value: amount,
          currency: "MXN",
        });
      }
    };

    // Fase de captura: se registra el clic aunque el enlace navegue.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${site.metaPixelId}');
fbq('track', 'PageView');
fbq('track', 'ViewContent', {content_name: '${contentName}'});`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${site.metaPixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
