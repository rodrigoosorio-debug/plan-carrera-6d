/**
 * URL pública del sitio. Se usa en el JSON-LD y en las metaetiquetas Open Graph.
 *
 * Antes de desplegar hay que definir `NEXT_PUBLIC_SITE_URL` en Vercel;
 * si no, las URLs canónicas y la imagen de Open Graph apuntarán a localhost.
 */
export const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
