#!/usr/bin/env node
/**
 * Exporta los estáticos de la campaña a `public/ads/*.png` en los dos
 * formatos del pipeline (feed 1080×1350 y story 1080×1920).
 *
 * Requiere el servidor de desarrollo corriendo:
 *   npm run dev       (en otra terminal)
 *   npm run ads:img
 */
import { mkdir, writeFile } from "node:fs/promises";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = "public/ads";
const ADS = ["tof-03", "tof-09", "mof-06"];
const FORMATS = ["feed", "story"];

await mkdir(OUT, { recursive: true });
let failed = 0;

for (const id of ADS) {
  for (const f of FORMATS) {
    const name = `${id.toUpperCase()}_estatico_${f}_v1.png`;
    try {
      const res = await fetch(`${BASE}/ad-estatico/${id}?f=${f}`);
      if (!res.ok) { console.error(`✗ ${name} — HTTP ${res.status}`); failed++; continue; }
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(`${OUT}/${name}`, buf);
      console.log(`✓ ${name} — ${(buf.length / 1024).toFixed(0)} KB`);
    } catch {
      console.error(`✗ ${name} — no hay servidor en ${BASE}. Corre "npm run dev" primero.`);
      failed++;
    }
  }
}
process.exit(failed > 0 ? 1 : 0);
