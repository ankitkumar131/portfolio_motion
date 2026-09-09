import { animate, createTimeline, onScroll, stagger, svg } from 'animejs';
import { data } from '../data.js';
import { $, $$, REDUCED, buildMarquee, scrambleTo, splitMasked } from '../utils.js';

/**
 * Hero: drawn mountains, rising sun, chrome letter reveal, scramble
 * role rotator, VHS timecode — plus a scroll-synced parallax scene.
 * Returns a `playIntro()` callback used by main once the preloader lifts.
 */
export function initHero() {
  // ── render content ────────────────────────────────────────────────────────
  const title = $('#hero-title');
  const chars = splitMasked(title, data.heroLines);
  $('#hero-tag').textContent = data.tagline;
  buildMarquee($('#hero-marquee'), data.heroMarquee, { duration: 30 });

  const stars = $('#stars');
  for (let i = 0; i < 90; i++) {
    const s = document.createElement('span');
    const size = Math.random() * 2.2 + 1;
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 62}%`;
    s.style.width = `${size}px`;
    s.style.height = `${size}px`;
    s.style.animationDelay = `${Math.random() * 4}s`;
    s.style.animationDuration = `${2 + Math.random() * 3.5}s`;
    stars.appendChild(s);
  }

  // ── role scramble rotator ─────────────────────────────────────────────────
  const roleEl = $('#role-text');
  if (!REDUCED) {
    let ri = 0;
    setInterval(() => {
      ri = (ri + 1) % data.roles.length;
      scrambleTo(roleEl, data.roles[ri], 24);
    }, 3000);
  } else {
    roleEl.textContent = data.roles[0];
  }

  // ── VHS REC timecode ──────────────────────────────────────────────────────
  const tc = $('#timecode');
  if (!REDUCED) {
    let f = 0;
    const p = (n) => String(n).padStart(2, '0');
    setInterval(() => {
      f += 1;
      tc.textContent = `${p(Math.floor(f / 90000) % 24)}:${p(Math.floor(f / 1500) % 60)}:${p(Math.floor(f / 25) % 60)}:${p(f % 25)}`;
    }, 40);
  }

  // ── scroll-synced scene parallax (scrub both directions) ──────────────────
  if (!REDUCED) {
    createTimeline({
      defaults: { ease: 'linear', duration: 1000 },
      autoplay: onScroll({
        target: '#hero',
        enter: 'top top',
        leave: 'bottom top',
        sync: true,
      }),
    })
      .add('.hero-content', { y: [0, -110], opacity: [1, 0.1] }, 0)
      .add('.sun', { y: [0, 80], scale: [1, 1.08] }, 0)
      .add('.scene-svg', { y: [0, 26] }, 0)
      .add('.hero-grid', { opacity: [1, 0.25] }, 0);

    // idle float on the title block (starts after the intro)
    animate('.hero-title', {
      y: [0, 10],
      duration: 3600,
      alternate: true,
      loop: true,
      ease: 'inOut(2)',
      delay: 3200,
    });
  }

  // ── entrance choreography (paused until the preloader lifts) ──────────────
  let introTl = null;
  if (!REDUCED) {
    const mountains = svg.createDrawable('.scene-svg .m-draw');
    introTl = createTimeline({ defaults: { ease: 'out(3)' }, autoplay: false });

    introTl
      // 1. neon mountain ranges draw themselves
      .add(mountains, {
        draw: ['0 0', '0 1'],
        duration: 1600,
        ease: 'inOut(2)',
        delay: stagger(160),
      }, 0)
      // 2. fills fade in behind the strokes
      .add('.m-fills', { opacity: [0, 1], duration: 900, ease: 'linear' }, '-=0.6')
      // 3. sun rises from behind the range
      .add('.sun-core', { y: [140, 0], opacity: [0, 1], duration: 1400, ease: 'out(4)' }, 150)
      // 4. kicker + chrome letters
      .add('.hero-kicker', { opacity: [0, 1], y: [24, 0], duration: 600 }, 500)
      .add(chars, {
        y: ['112%', '0%'],
        rotate: [7, 0],
        duration: 900,
        ease: 'out(4)',
        delay: stagger(35),
      }, 800)
      // 5. role, tagline, HUD bits, marquee
      .add('.hero-role', { opacity: [0, 1], y: [16, 0], duration: 500 }, '-=0.5')
      .add('.hero-tag', { opacity: [0, 1], y: [16, 0], duration: 500 }, '-=0.35')
      .add(['.hero-rec', '.hero-scroll'], { opacity: [0, 1], duration: 400 }, '-=0.25')
      .add('.hero-marquee', { y: ['100%', '0%'], duration: 600, ease: 'out(3)' }, '-=0.4');
  }

  const setFinalStates = () => {
    $$('.m-fills').forEach((g) => {
      g.style.opacity = '1';
    });
  };
  if (REDUCED) setFinalStates();

  return function playIntro() {
    if (REDUCED || !introTl) {
      setFinalStates();
      return;
    }
    introTl.play();
  };
}
