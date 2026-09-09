/** DOM helpers + shared flags + tiny motion utilities. */

export const $ = (sel, ctx = document) => ctx.querySelector(sel);
export const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

export const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const FINE = window.matchMedia('(pointer: fine)').matches;

/**
 * Splits each line of text into masked char spans for clean reveals.
 * Returns the inner char spans.
 */
export function splitMasked(el, lines) {
  el.innerHTML = '';
  const chars = [];
  lines.forEach((line) => {
    const lineEl = document.createElement('span');
    lineEl.className = 'line';
    for (const ch of line) {
      const mask = document.createElement('span');
      mask.className = 'ch-mask';
      const inner = document.createElement('span');
      inner.className = 'ch';
      inner.textContent = ch;
      mask.appendChild(inner);
      lineEl.appendChild(mask);
      chars.push(inner);
    }
    el.appendChild(lineEl);
  });
  return chars;
}

/** Hacker-style scramble that resolves into `text`. */
export function scrambleTo(el, text, speed = 26) {
  const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01✦<>-/#';
  let frame = 0;
  const resolveAt = Array.from(text, (_, i) => 3 + i * 2);
  const iv = setInterval(() => {
    let out = '';
    let done = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === ' ' || frame >= resolveAt[i]) {
        out += text[i];
        done += 1;
      } else {
        out += glyphs[(Math.random() * glyphs.length) | 0];
      }
    }
    el.textContent = out;
    frame += 1;
    if (done === text.length) clearInterval(iv);
  }, speed);
  return iv;
}

/** Run `cb` once when `el` scrolls into view. */
export function whenInView(el, cb, threshold = 0.35) {
  if (!el) return;
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        cb();
      }
    },
    { threshold }
  );
  io.observe(el);
}

/** Builds a seamless marquee (two identical rows) inside `el`. */
export function buildMarquee(el, items, { reverse = false, duration = 26 } = {}) {
  if (!el) return;
  if (reverse) el.classList.add('is-rev');
  const row = () => {
    const r = document.createElement('div');
    r.className = 'marquee-row';
    r.style.animationDuration = `${duration}s`;
    items.forEach((t) => {
      const item = document.createElement('span');
      item.className = 'marquee-item mono';
      item.textContent = t;
      const sep = document.createElement('i');
      sep.className = 'sep';
      sep.setAttribute('aria-hidden', 'true');
      sep.textContent = '✦';
      item.appendChild(sep);
      r.appendChild(item);
    });
    return r;
  };
  el.appendChild(row());
  el.appendChild(row());
}

/** Simple trailing debounce. */
export function debounce(fn, wait = 250) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}
