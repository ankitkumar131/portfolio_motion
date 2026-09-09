import { animate, onScroll, stagger } from 'animejs';
import { data } from '../data.js';
import { $, REDUCED } from '../utils.js';

/** Trophy room: achievements pop-in, certifications flip-in, education card. */
export function initVault() {
  // ── trophies ──────────────────────────────────────────────────────────────
  const tg = $('#trophy-grid');
  data.trophies.forEach((t) => {
    const el = document.createElement('div');
    el.className = `trophy c-${t.color}`;
    el.dataset.hover = '';
    el.innerHTML = `
      <span class="trophy-sym" aria-hidden="true">${t.symbol}</span>
      <p class="trophy-title">${t.title}</p>
      <p class="trophy-sub">${t.sub}</p>`;
    tg.appendChild(el);
  });

  // ── certifications ────────────────────────────────────────────────────────
  const cg = $('#certs-grid');
  data.certifications.forEach((c) => {
    const el = document.createElement('div');
    el.className = 'cert-card';
    el.innerHTML = `<p class="cert-issuer mono">[${c.issuer}]</p><p class="cert-title">${c.title}</p>`;
    cg.appendChild(el);
  });

  // ── education ─────────────────────────────────────────────────────────────
  const e = data.education;
  $('#edu-card').innerHTML = `
    <p class="edu-period mono">${e.period}</p>
    <h3 class="edu-degree">${e.degree}</h3>
    <p class="edu-field mono">// ${e.field}</p>
    <p class="edu-school">${e.school}</p>
    <div class="edu-stats">
      <div class="edu-gpa">
        <span class="edu-gpa-val chrome">0</span>
        <span class="edu-gpa-label mono">GPA / 10</span>
      </div>
      <span class="edu-badge mono">★ ${e.badge}</span>
    </div>`;

  const gpaEl = $('.edu-gpa-val');

  if (REDUCED) {
    gpaEl.textContent = e.gpa.toFixed(2);
    return;
  }

  // trophies pop in with a springy overshoot
  animate('.trophy', {
    scale: [0.6, 1],
    opacity: [0, 1],
    duration: 700,
    ease: 'outBack(1.7)',
    delay: stagger(120),
    autoplay: onScroll({ target: '#trophy-grid', enter: 'top 84%' }),
  });

  // certifications flip in
  animate('.cert-card', {
    rotateY: [70, 0],
    opacity: [0, 1],
    duration: 700,
    ease: 'out(3)',
    delay: stagger(80),
    autoplay: onScroll({ target: '#certs-grid', enter: 'top 86%' }),
  });

  // education card slides up
  animate('#edu-card', {
    y: [50, 0],
    opacity: [0, 1],
    duration: 800,
    ease: 'out(3)',
    autoplay: onScroll({ target: '#edu-card', enter: 'top 88%' }),
  });

  // GPA counts up
  const o = { v: 0 };
  animate(o, {
    v: e.gpa,
    duration: 1500,
    ease: 'out(3)',
    autoplay: onScroll({ target: '#edu-card', enter: 'top 82%' }),
    onUpdate: () => {
      gpaEl.textContent = o.v.toFixed(2);
    },
  });
}
