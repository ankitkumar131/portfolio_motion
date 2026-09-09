import { animate, onScroll, stagger } from 'animejs';
import { data } from '../data.js';
import { $, REDUCED } from '../utils.js';

/** Experience: quest-log timeline with a scroll-scrubbed neon line. */
export function initExperience() {
  // ── render ────────────────────────────────────────────────────────────────
  const wrap = $('#tl-items');
  data.experience.forEach((e, i) => {
    const item = document.createElement('article');
    item.className = `tl-item ${i % 2 === 0 ? 'left' : 'right'}`;
    item.innerHTML = `
      <span class="tl-dot" aria-hidden="true"></span>
      <div class="tl-card" data-hover>
        <p class="tl-tag mono">${e.tag}</p>
        <p class="tl-period mono">${e.period}</p>
        <h3 class="tl-role">${e.role}</h3>
        <p class="tl-company">@ ${e.company}</p>
        <ul class="tl-points">${e.points.map((p) => `<li>${p}</li>`).join('')}</ul>
      </div>`;
    wrap.appendChild(item);
  });

  if (REDUCED) {
    $('#tl-progress').style.transform = 'scaleY(1)';
    return;
  }

  // ── neon progress line, scrubbed to scroll position ──────────────────────
  animate('#tl-progress', {
    scaleY: [0, 1],
    ease: 'linear',
    autoplay: onScroll({
      target: '#timeline',
      enter: 'top 65%',
      leave: 'bottom 72%',
      sync: true,
    }),
  });

  // ── cards + dots reveal ───────────────────────────────────────────────────
  animate('.tl-card', {
    y: [70, 0],
    opacity: [0, 1],
    duration: 900,
    ease: 'out(3)',
    delay: stagger(160),
    autoplay: onScroll({ target: '#tl-items', enter: 'top 80%' }),
  });

  animate('.tl-dot', {
    scale: [0, 1],
    duration: 500,
    ease: 'outBack(2)',
    delay: stagger(160),
    autoplay: onScroll({ target: '#tl-items', enter: 'top 80%' }),
  });
}
