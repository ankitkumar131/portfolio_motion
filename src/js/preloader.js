import { createTimeline } from 'animejs';
import { $ } from '../utils.js';

const BOOT_LINES = [
  'BOOTING NEON DRIVERS v4.5',
  'LOADING 80s AESTHETICS...',
  'CALIBRATING CHROME TEXT',
  'COMPILING SASS_LEVELS',
  'SHARPENING PIXELS ✦',
];

/**
 * Retro boot sequence: 0→100 counter, glitch flash, curtain lift.
 * `onReveal` fires as the curtain STARTS lifting (so the hero intro
 * can play underneath it); `onDone` fires when it's fully gone.
 */
export function runPreloader(onReveal, onDone) {
  const root = $('#preloader');
  const num = $('#pre-num');
  const fill = $('#pre-fill');
  const boot = $('#pre-boot');
  if (!root) {
    onReveal && onReveal();
    onDone && onDone();
    return;
  }

  let li = 0;
  const rot = setInterval(() => {
    li = (li + 1) % BOOT_LINES.length;
    boot.textContent = BOOT_LINES[li];
  }, 380);

  const counter = { v: 0 };
  const tl = createTimeline({
    defaults: { ease: 'out(2)' },
    onComplete: () => {
      clearInterval(rot);
      root.remove();
      onDone && onDone();
    },
  });

  tl.add(counter, {
    v: 100,
    duration: 1900,
    ease: 'inOut(2)',
    onUpdate: () => {
      num.textContent = String(Math.round(counter.v)).padStart(3, '0');
      fill.style.transform = `scaleX(${counter.v / 100})`;
    },
  })
    .add('#pre-flash', { opacity: [0, 0.9, 0], duration: 180 }, '+=0.1')
    .add(
      root,
      {
        translateY: '-100%',
        duration: 900,
        ease: 'inOut(4)',
        onStart: () => {
          clearInterval(rot);
          boot.textContent = 'GO GO GO';
          onReveal && onReveal();
        },
      },
      '+=0.15'
    );
}
