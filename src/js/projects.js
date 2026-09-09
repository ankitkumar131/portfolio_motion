import { animate, onScroll, stagger } from 'animejs';
// NOTE: onScroll() returns the ScrollObserver itself — we keep a reference so
// we can properly revert it when the horizontal module rebuilds on resize.
import { data } from '../data.js';
import { $, debounce, REDUCED } from '../utils.js';

/**
 * Featured builds — full-viewport panels gliding horizontally as you
 * scroll vertically (desktop: sticky + anime.js onScroll sync scrub;
 * mobile: native snap carousel). Includes a live 01/03 index counter.
 */
export function initProjects() {
  const track = $('#projects-track');
  const wrap = $('#projects-wrap');
  const sticky = $('.projects-sticky');
  const scroller = $('#projects-scroller');
  const bar = $('#proj-progress');
  const idxEl = $('#proj-idx');
  const mq = window.matchMedia('(min-width: 900px)');
  const total = data.projects.length + 1;
  const p2 = (n) => String(n).padStart(2, '0');

  // ── render panels ─────────────────────────────────────────────────────────
  const panel = (p, i) => {
    const el = document.createElement('article');
    el.className = `p-panel${i % 2 === 1 ? ' alt' : ''}`;
    el.innerHTML = `
      <div class="pp-visual">
        <img src="${p.cover}" alt="${p.title} — ${p.sub}" loading="lazy" />
        <span class="pp-idx mono">BUILD_${p2(Number(p.idx))}</span>
      </div>
      <div class="pp-body">
        <p class="pp-period mono">${p.period}</p>
        <h3 class="pp-title chrome">${p.title}</h3>
        <p class="pp-sub">${p.sub}</p>
        <ul class="pp-points">${p.points.map((pt) => `<li>${pt}</li>`).join('')}</ul>
        <div class="pp-stats">
          ${p.stats.map((s) => `<div class="pp-stat"><b>${s.big}</b><span>${s.small}</span></div>`).join('')}
        </div>
        <div class="pp-tech">${p.tech.map((t) => `<span class="pp-chip mono">${t}</span>`).join('')}</div>
        <div class="pp-links">
          <a class="pp-link mono" href="${p.repo}" target="_blank" rel="noreferrer">CODE ↗</a>
          <a class="pp-link mono" href="${p.live}" target="_blank" rel="noreferrer">LIVE ↗</a>
        </div>
      </div>`;
    return el;
  };

  const cta = () => {
    const el = document.createElement('article');
    el.className = 'p-panel p-cta';
    el.innerHTML = `
      <p class="ct-eyebrow mono">MORE IN THE VAULT</p>
      <h3 class="ct-title">WANNA SEE<br />EVERYTHING?</h3>
      <a class="ct-link mono" href="${data.github}" target="_blank" rel="noreferrer">GITHUB ↗</a>`;
    return el;
  };

  data.projects.forEach((p, i) => track.appendChild(panel(p, i)));
  track.appendChild(cta());

  const setIdx = (progress) => {
    const cur = Math.min(total, Math.round(progress * (total - 1)) + 1);
    idxEl.textContent = `${p2(cur)} / ${p2(total)}`;
  };

  // ── mode builders ─────────────────────────────────────────────────────────
  let cleanups = [];

  function desktop() {
    const dist = () => Math.max(track.scrollWidth - sticky.clientWidth, 0);
    const setHeight = () => {
      wrap.style.height = `${window.innerHeight + dist()}px`;
    };
    setHeight();

    animate(track, {
      x: [0, () => -dist()],
      ease: 'linear',
      duration: 1000,
      autoplay: onScroll({
        target: wrap,
        enter: 'top top',
        leave: 'bottom bottom',
        sync: true,
      }),
      onUpdate: (self) => {
        bar.style.transform = `scaleX(${self.progress})`;
        setIdx(self.progress);
      },
    });

    cleanups.push(() => {
      wrap.style.height = '';
      track.style.transform = '';
    });
  }

  function mobile() {
    const onNativeScroll = () => {
      const max = scroller.scrollWidth - scroller.clientWidth;
      const p = max > 0 ? scroller.scrollLeft / max : 0;
      bar.style.transform = `scaleX(${p})`;
      setIdx(p);
    };
    scroller.addEventListener('scroll', onNativeScroll, { passive: true });
    onNativeScroll();
    cleanups.push(() => scroller.removeEventListener('scroll', onNativeScroll));
  }

  const apply = () => {
    cleanups.forEach((fn) => fn());
    cleanups = [];
    if (mq.matches && !REDUCED) desktop();
    else mobile();
  };
  apply();

  // rebuild when the viewport meaningfully changes (crossing breakpoints,
  // big resizes that change the required scroll distance)
  let lastW = window.innerWidth;
  window.addEventListener(
    'resize',
    debounce(() => {
      if (Math.abs(window.innerWidth - lastW) < 40) return;
      lastW = window.innerWidth;
      apply();
    }, 300)
  );

  // ── panel content reveal ──────────────────────────────────────────────────
  if (!REDUCED) {
    animate('.pp-body > *', {
      y: [26, 0],
      opacity: [0, 1],
      duration: 700,
      ease: 'out(3)',
      delay: stagger(55),
      autoplay: onScroll({ target: '#projects', enter: 'top 72%' }),
    });
  }
}
