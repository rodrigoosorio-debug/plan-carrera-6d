import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * El logo 6D como data URI, para incrustarlo en las imágenes generadas con
 * `next/og`. Satori no resuelve rutas relativas: necesita el SVG embebido.
 *
 * Se cachea en memoria porque el archivo no cambia entre peticiones.
 */
let cached: string | null = null;

export async function logoDataUri(): Promise<string> {
  if (cached) return cached;
  const svg = await readFile(
    join(process.cwd(), "public", "logo-6d.svg"),
    "utf8",
  );
  cached = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  return cached;
}
