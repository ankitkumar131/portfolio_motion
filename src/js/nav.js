import { $, $$ } from '../utils.js';
import { getLenis, scrollTo } from '../scroll.js';

/** Sticky nav state, scroll progress bar, smooth anchors, mobile menu. */
export function initNav() {
  const nav = $('#nav');
  const bar = $('#scroll-progress');
  const burger = $('#burger');
  const menu = $('#menu');
  const doc = document.documentElement;

  // ── nav background + scroll progress ──────────────────────────────────────
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 80);
    const max = doc.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── stagger indices for the mobile menu ───────────────────────────────────
  $$('.menu-link').forEach((l, i) => l.style.setProperty('--i', i));

  // ── mobile menu ───────────────────────────────────────────────────────────
  let open = false;
  const setOpen = (v) => {
    open = v;
    menu.classList.toggle('is-open', open);
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
    document.documentElement.classList.toggle('menu-open', open);
    const lenis = getLenis();
    if (lenis) (open ? lenis.stop() : lenis.start());
  };
  burger.addEventListener('click', () => setOpen(!open));

  // ── smooth anchors ────────────────────────────────────────────────────────
  $$('[data-scroll]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.getAttribute('href');
      if (open) {
        setOpen(false);
        window.setTimeout(() => scrollTo(id), 420);
      } else {
        scrollTo(id);
      }
    });
  });

  $('#nav-logo').addEventListener('click', () => scrollTo(0));
}
