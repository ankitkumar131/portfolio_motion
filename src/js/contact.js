import { animate, onScroll, stagger } from 'animejs';
import { data } from '../data.js';
import { $, buildMarquee, REDUCED } from '../utils.js';

/** Contact: kinetic chrome CTA, keycap links, footer marquee. */
export function initContact() {
  // ── big lines ─────────────────────────────────────────────────────────────
  const big = $('#contact-big');
  data.contactLines.forEach((line, i) => {
    const s = document.createElement('span');
    s.className = `cb-line${i === data.contactLines.length - 1 ? ' chrome' : ''}`;
    s.textContent = line;
    big.appendChild(s);
  });

  // ── contact keys ──────────────────────────────────────────────────────────
  const keys = $('#contact-keys');
  const keyData = [
    { label: 'EMAIL', handle: data.email, href: `mailto:${data.email}` },
    { label: 'PHONE', handle: data.phone, href: data.phoneHref },
    { label: 'LINKEDIN', handle: data.linkedinHandle, href: data.linkedin },
    { label: 'GITHUB', handle: data.githubHandle, href: data.github },
  ];
  keyData.forEach((k) => {
    const a = document.createElement('a');
    a.className = 'key';
    a.href = k.href;
    if (k.href.startsWith('http')) {
      a.target = '_blank';
      a.rel = 'noreferrer';
    }
    a.dataset.hover = '';
    a.innerHTML = `<span class="key-label mono">${k.label}</span><span class="key-handle mono">${k.handle}</span>`;
    keys.appendChild(a);
  });

  // ── footer ────────────────────────────────────────────────────────────────
  buildMarquee($('#footer-marquee'), data.footerMarquee, { duration: 28 });
  $('#footer-legal').textContent = `© ${new Date().getFullYear()} ANKIT KUMAR — MADE WITH ♥, ANIME.JS & QUESTIONABLE AMOUNTS OF COFFEE`;

  if (REDUCED) return;

  animate('.cb-line', {
    y: [90, 0],
    opacity: [0, 1],
    duration: 1000,
    ease: 'out(4)',
    delay: stagger(120),
    autoplay: onScroll({ target: '.contact-inner', enter: 'top 78%' }),
  });

  animate('#contact-cta', {
    scale: [0.85, 1],
    opacity: [0, 1],
    duration: 800,
    ease: 'outBack(1.6)',
    autoplay: onScroll({ target: '.contact-inner', enter: 'top 62%' }),
  });

  animate('.key', {
    y: [40, 0],
    opacity: [0, 1],
    duration: 600,
    ease: 'out(3)',
    delay: stagger(90),
    autoplay: onScroll({ target: '#contact-keys', enter: 'top 90%' }),
  });
}
