import { animate, onScroll, stagger } from 'animejs';
import { data } from '../data.js';
import { $, $$, buildMarquee, REDUCED } from '../utils.js';

/** Skills: scroll-charged LED power meters + tools marquee. */
export function initSkills() {
  // ── render ────────────────────────────────────────────────────────────────
  const wrap = $('#skill-groups');
  data.skillGroups.forEach((g) => {
    const card = document.createElement('div');
    card.className = 'skill-group';
    const title = document.createElement('h3');
    title.className = 'skill-group-title mono';
    title.textContent = `// ${g.title}`;
    card.appendChild(title);
    g.skills.forEach((s) => {
      const row = document.createElement('div');
      row.className = 'skill';
      row.dataset.level = String(s.level);
      row.innerHTML = `
        <div class="skill-top">
          <span class="skill-name">${s.name}</span>
          <span class="skill-pct mono">0%</span>
        </div>
        <div class="meter"><span class="meter-fill"></span></div>`;
      card.appendChild(row);
    });
    wrap.appendChild(card);
  });

  buildMarquee($('#tools-marquee'), data.toolsMarquee, { reverse: true, duration: 36 });

  const skills = $$('#skill-groups .skill');

  // ── reduced motion: charge everything instantly ───────────────────────────
  if (REDUCED) {
    skills.forEach((el) => {
      el.querySelector('.meter-fill').style.width = `${el.dataset.level}%`;
      el.querySelector('.skill-pct').textContent = `${el.dataset.level}%`;
    });
    return;
  }

  // ── group cards reveal ────────────────────────────────────────────────────
  animate('.skill-group', {
    y: [60, 0],
    opacity: [0, 1],
    duration: 900,
    ease: 'out(3)',
    delay: stagger(120),
    autoplay: onScroll({ target: '#skill-groups', enter: 'top 82%' }),
  });

  // ── meters charge + percentage counters ──────────────────────────────────
  skills.forEach((el, i) => {
    const level = Number(el.dataset.level);
    const fill = el.querySelector('.meter-fill');
    const pct = el.querySelector('.skill-pct');
    const o = { v: 0 };
    const params = {
      duration: 1300,
      ease: 'out(3)',
      delay: (i % 4) * 90,
      autoplay: onScroll({ target: el, enter: 'top 92%' }),
    };
    animate(fill, { width: [`0%`, `${level}%`], ...params });
    animate(o, {
      v: level,
      ...params,
      onUpdate: () => {
        pct.textContent = `${Math.round(o.v)}%`;
      },
    });
  });
}
