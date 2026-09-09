import './styles/base.css';
import './styles/sections.css';

import { initLenis, getLenis } from './scroll.js';
import { data } from './data.js';
import { $, REDUCED } from './utils.js';

import { initCursor } from './js/cursor.js';
import { initNav } from './js/nav.js';
import { initHeadings } from './js/headings.js';
import { initHero } from './js/hero.js';
import { initAbout } from './js/about.js';
import { initSkills } from './js/skills.js';
import { initExperience } from './js/experience.js';
import { initProjects } from './js/projects.js';
import { initVault } from './js/vault.js';
import { initContact } from './js/contact.js';
import { runPreloader } from './js/preloader.js';

// ── boot ────────────────────────────────────────────────────────────────────
initLenis();
const lenis = getLenis();
lenis.stop(); // locked until the preloader lifts

initCursor();
initNav();
initHeadings();
const playHeroIntro = initHero();
initAbout();
initSkills();
initExperience();
initProjects();
initVault();
initContact();

console.log(
  `%c★ YOU OPENED THE CONSOLE. NICE.%c\n\nCuriosity like that gets people hired.\nDrop a line → ${data.email} · ${data.phone}`,
  'color:#ff2d95;font-size:18px;font-weight:bold;font-family:monospace',
  'color:#00e5ff;font-size:12px;font-family:monospace'
);

// ── preloader → hero handoff ────────────────────────────────────────────────
if (REDUCED) {
  $('#preloader')?.remove();
  lenis.start();
  playHeroIntro();
} else {
  runPreloader(
    () => {
      // curtain is lifting — play the hero intro underneath it
      playHeroIntro();
    },
    () => {
      // fully gone — unlock scroll
      lenis.start();
    }
  );
}
