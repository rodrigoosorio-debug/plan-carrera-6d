#!/usr/bin/env node
/**
 * Exporta las imágenes de producto a `public/productos/*.png`, a 800x400,
 * que es el máximo que acepta GHL.
 *
 * Los precios salen de `src/shared/data/plans.ts`, así que si cambias uno,
 * vuelve a correr esto y las imágenes quedan al día solas.
 *
 * Requiere el servidor de desarrollo corriendo:
 *   npm run dev          (en otra terminal)
 *   npm run productos:img
 */

import { mkdir, writeFile } from 'node:fs/promises'

const BASE = process.env.BASE_URL ?? 'http://localhost:3000'
const OUT = 'public/productos'
const IDS = ['esencial', 'profesional', 'ejecutivo', 'corporativo']

await mkdir(OUT, { recursive: true })

let failed = 0

for (const id of IDS) {
  const url = `${BASE}/producto-imagen/${id}`
  try {
    const response = await fetch(url)
    if (!response.ok) {
      console.error(`✗ ${id} — HTTP ${response.status}`)
      failed++
      continue
    }
    const buffer = Buffer.from(await response.arrayBuffer())
    await writeFile(`${OUT}/${id}.png`, buffer)
    console.log(`✓ ${id}.png — ${(buffer.length / 1024).toFixed(0)} KB`)
  } catch {
    console.error(`✗ ${id} — no hay servidor en ${BASE}. Corre "npm run dev" primero.`)
    failed++
  }
}

process.exit(failed > 0 ? 1 : 0)
