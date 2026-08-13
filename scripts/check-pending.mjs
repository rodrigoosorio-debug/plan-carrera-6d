#!/usr/bin/env node
/**
 * Falla si la página construida todavía renderiza marcadores de dato faltante.
 *
 * Los componentes marcan esos huecos con `data-pending` (ver
 * `src/features/landing/components/pending.tsx`). Sirven durante el desarrollo,
 * pero no pueden llegar a producción.
 *
 * Uso: npm run build && npm run check:pending
 */

import { readdir, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

const BUILD_DIR = '.next/server/app'
const MARKER = 'data-pending'

if (!existsSync(BUILD_DIR)) {
  console.error(`No encuentro ${BUILD_DIR}. Corre "npm run build" primero.`)
  process.exit(1)
}

/** Devuelve todas las rutas de archivo bajo `dir`, recursivamente. */
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name)
      return entry.isDirectory() ? walk(path) : [path]
    }),
  )
  return files.flat()
}

const files = await walk(BUILD_DIR)
const hits = []

for (const file of files.filter((f) => f.endsWith('.html'))) {
  const contents = await readFile(file, 'utf8')
  if (contents.includes(MARKER)) {
    const count = contents.split(MARKER).length - 1
    hits.push({ file, count })
  }
}

if (hits.length === 0) {
  console.log('✅ Sin marcadores pendientes. La página se puede publicar.')
  process.exit(0)
}

console.error('❌ Hay marcadores pendientes en la página construida:\n')
for (const hit of hits) {
  console.error(`   ${hit.file} — ${hit.count} marcador(es)`)
}
console.error(
  '\nCompleta los datos que faltan en src/features/landing/data/ y vuelve a construir.',
)
process.exit(1)
