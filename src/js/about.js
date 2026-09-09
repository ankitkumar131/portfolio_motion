import { animate, createTimeline, onScroll, stagger } from 'animejs';
import { data } from '../data.js';
import { $, $$, REDUCED } from '../utils.js';

/** About: typewriter terminal + animated stat counters + chips. */
export function initAbout() {
  // ── render ────────────────────────────────────────────────────────────────
  const linesWrap = $('#term-lines');
  data.aboutLines.forEach((line) => {
    const p = document.createElement('p');
    p.className = 't-line';
    p.dataset.text = line;
    linesWrap.appendChild(p);
  });

  const stats = $('#stats');
  data.stats.forEach((s) => {
    const el = document.createElement('div');
    el.className = 'stat';
    el.dataset.hover = '';
    const val = document.createElement('p');
    val.className = 'stat-num';
    const span = document.createElement('span');
    span.className = 'stat-val chrome';
    span.textContent = '0';
    val.appendChild(span);
    const label = document.createElement('p');
    label.className = 'stat-label mono';
    label.textContent = s.label;
    el.append(val, label);
    stats.appendChild(el);
  });

  const chips = $('#chips');
  data.chips.forEach((c) => {
    const el = document.createElement('span');
    el.className = 'chip mono';
    if (c.live) {
      const dot = document.createElement('i');
      dot.className = 'chip-dot';
      el.appendChild(dot);
    }
    const text = document.createElement('span');
    text.innerHTML = `${c.k}: <b>${c.v}</b>`;
    el.appendChild(text);
    chips.appendChild(el);
  });

  // ── reduced motion: final states only ─────────────────────────────────────
  if (REDUCED) {
    $$('#term-lines .t-line').forEach((el) => {
      el.textContent = el.dataset.text;
    });
    $$('#stats .stat-val').forEach((el, i) => {
      const s = data.stats[i];
      el.textContent = s.value.toFixed(s.decimals) + s.suffix;
    });
    return;
  }

  // ── terminal typing, triggered on scroll ──────────────────────────────────
  const typeTl = createTimeline({
    autoplay: onScroll({ target: '.terminal', enter: 'top 80%' }),
  });
  $$('#term-lines .t-line').forEach((el) => {
    const text = el.dataset.text;
    const o = { p: 0 };
    typeTl.add(o, {
      p: 1,
      duration: Math.min(text.length * 22, 1500),
      ease: 'linear',
      onUpdate: () => {
        el.textContent = text.slice(0, Math.round(o.p * text.length));
      },
    });
  });

  // ── stat counters + card reveals ─────────────────────────────────────────
  $$('#stats .stat-val').forEach((el, i) => {
    const s = data.stats[i];
    const o = { v: 0 };
    animate(o, {
      v: s.value,
      duration: 1600,
      ease: 'out(3)',
      delay: i * 120,
      autoplay: onScroll({ target: '#stats', enter: 'top 85%' }),
      onUpdate: () => {
        el.textContent = o.v.toFixed(s.decimals) + s.suffix;
      },
    });
  });

  animate('.stat', {
    y: [40, 0],
    opacity: [0, 1],
    duration: 800,
    ease: 'out(3)',
    delay: stagger(120),
    autoplay: onScroll({ target: '#stats', enter: 'top 85%' }),
  });

  animate('#chips .chip', {
    y: [20, 0],
    opacity: [0, 1],
    duration: 500,
    ease: 'out(2)',
    delay: stagger(70),
    autoplay: onScroll({ target: '#chips', enter: 'top 94%' }),
  });
}
