import Lenis from 'lenis';

let lenis = null;

/** Boots the Lenis smooth-scroll engine once. */
export function initLenis() {
  if (lenis) return lenis;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  lenis = new Lenis({
    lerp: reduced ? 1 : 0.09,
    smoothWheel: !reduced,
  });
  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  return lenis;
}

export const getLenis = () => lenis;

export function scrollTo(target) {
  if (lenis) {
    lenis.scrollTo(target, { offset: -60, duration: 1.4 });
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
  }
}
