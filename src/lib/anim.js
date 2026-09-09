/** Global reduced-motion flag — checked once, used everywhere. */
export const REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Pad a number: 1 -> "01". */
export const pad2 = (n) => String(n).padStart(2, '0');
