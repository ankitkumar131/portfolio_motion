# ANKIT KUMAR — PORTFOLIO.EXE v2

A retro-futuristic, scroll-driven portfolio built from scratch on **Anime.js v4** —
no frameworks, no React, just vanilla JS, one animation engine, and a synthwave soul.

![engine](https://img.shields.io/badge/Anime.js-v4%20onScroll-ff2d95) ![stack](https://img.shields.io/badge/Vite-vanilla%20JS-61dafb) ![size](https://img.shields.io/badge/bundle-38KB%20gzipped-88ce02)

## ✦ The motion graphics

Every section is choreographed to the scrollbar via anime.js `onScroll` observers
(`sync: true` = scrubbed both directions):

| Section | What moves on scroll |
| --- | --- |
| **Preloader** | Boot sequence — 0→100 counter (object tween), glitch flash, curtain lift |
| **Hero** | SVG mountain ranges **draw themselves** (`svg.createDrawable`), striped sun rises, chrome letters cascade in, scramble role-rotator, VHS REC timecode — then the whole scene parallaxes away, scrubbed |
| **About** | Terminal that *types* the real resume summary + animated stat counters (1.5+ yrs, 9.13 GPA, 7 certs) |
| **Skills** | 18 LED power meters charge up as they enter view + a reverse marquee of the full arsenal |
| **Experience** | "Main quest log" — neon progress line draws itself, scrubbed to scroll position |
| **Projects** | **Full-viewport panels glide horizontally as you scroll vertically** (sticky + onScroll sync), with a live `01/03` index. Mobile: native snap carousel |
| **Trophy Room** | Achievements pop in with `outBack` overshoot, 7 certifications flip in (`rotateY`), GPA counts up |
| **Contact** | Chrome kinetic type, springy CTA, keycap links, footer marquee |

Plus: custom crosshair cursor, scroll progress bar, film grain + scanlines + rolling
scan-bar, `splitText` char reveals on every heading, Lenis buttery smooth scrolling,
`prefers-reduced-motion` support, responsive from 360px → 4K.

## ✦ Run it

```bash
npm install
npm run dev      # → http://localhost:5173
npm run build    # production build → /dist (38KB gzipped JS)
```

## ✦ Make it yours

**All content lives in [`src/data.js`](src/data.js)** — name, roles, summary, stats,
skills, experience, projects, trophies, certifications, education, contact links.
Edit that one file and the entire site re-renders.

Cover art lives in `public/covers/`, colors are CSS custom properties at the top of
[`src/styles/base.css`](src/styles/base.css).

## ✦ Architecture

```
index.html          → full markup + inline SVG synthwave scene
src/main.js         → boot sequence (Lenis → modules → preloader → hero intro)
src/data.js         → resume content (single source of truth)
src/scroll.js       → Lenis smooth-scroll singleton
src/utils.js        → DOM helpers, scramble, masked char split, marquee builder
src/js/*.js         → one module per section: render + its scroll choreography
src/styles/*.css    → base design system + section styles
```
