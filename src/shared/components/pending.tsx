/**
 * Marcador de dato faltante.
 *
 * Se ve a propósito: ámbar, borde punteado, imposible de pasar por alto en una
 * revisión. Reemplaza al dato real mientras no lo tengamos, en vez de inventarlo
 * o dejar un hueco silencioso.
 *
 * `npm run check:pending` falla mientras exista alguno renderizado.
 */
export function Pending({ children }: { children: React.ReactNode }) {
  return (
    <span
      data-pending
      className="inline-flex items-center gap-1.5 rounded border border-dashed border-amber-400/70 bg-amber-400/10 px-2 py-0.5 text-sm font-medium text-amber-300"
    >
      <span aria-hidden>⚠</span>
      PENDIENTE: {children}
    </span>
  );
}
