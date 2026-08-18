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
const ESTATICOS = ["tof-03", "tof-09", "mof-06", "bof-03", "bof-05"];
const CARRUSELES = [
  ...[1, 2, 3, 4].map((n) => `tof-05-t${n}`),
  ...[1, 2, 3, 4, 5].map((n) => `mof-02-t${n}`),
  ...[1, 2, 3, 4, 5].map((n) => `bof-01-t${n}`),
];

await mkdir(OUT, { recursive: true });
let failed = 0;

const jobs = [
  ...ESTATICOS.flatMap((id) => ["feed", "story"].map((f) => ({ id, f, name: `${id.toUpperCase()}_estatico_${f}_v1.png` }))),
  ...CARRUSELES.map((id) => {
    const [a, b, card] = id.toUpperCase().split("-");
    return { id, f: "square", name: `${a}-${b}_carrusel_${card.toLowerCase()}_v1.png` };
  }),
];

for (const { id, f, name } of jobs) {
  {
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
