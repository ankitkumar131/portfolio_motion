# ANKIT KUMAR — PORTFOLIO.EXE

A retro-futuristic, scroll-driven portfolio with a synthwave soul. Chrome text,
neon grids, VHS grain, and motion on every scroll tick.

![stack](https://img.shields.io/badge/React-Vite-61dafb) ![motion](https://img.shields.io/badge/GSAP-ScrollTrigger-88ce02) ![smooth](https://img.shields.io/badge/Lenis-smooth%20scroll-ff2d95)

## ✦ What's inside

| Section | Motion |
| --- | --- |
| **Preloader** | Retro boot sequence — counter, loading bar, flash, curtain lift |
| **Hero** | Chrome letter-by-letter reveal, striped synthwave sun, animated perspective grid, twinkling stars, parallax on scroll, VHS REC timecode, marquee ticker |
| **About** | Terminal window that *types* your bio on scroll + animated stat counters |
| **Skills** | Segmented LED power meters that charge up + reverse marquee of tools |
| **Experience** | "Main quest log" timeline with a neon progress line scrubbed to scroll |
| **Projects** | Pinned horizontal gallery scrubbed by vertical scroll (native snap carousel on mobile), 3D tilt cards |
| **Contact** | Giant chrome CTA, keycap socials, footer marquee |

Plus: custom crosshair cursor (desktop), scroll progress bar, film grain + scanlines + rolling scan-bar overlays, hacker text-scramble section headers, mobile fullscreen menu, `prefers-reduced-motion` support.

## ✦ Run it

```bash
npm install
npm run dev      # → http://localhost:5173
npm run build    # production build in /dist
```

## ✦ Make it yours

**All content lives in one file: [`src/data/profile.js`](src/data/profile.js)** —
name, tagline, about lines, stats, skills, experience, projects, socials.
Edit that file and the whole site re-renders itself.

Swap cover art in `public/covers/`, fonts via the Google Fonts link in
`index.html`, and the color palette via CSS custom properties at the top of
`src/styles/global.css`.

## ✦ Tech

React 18 · Vite 5 · GSAP 3 (ScrollTrigger, matchMedia) · Lenis · pure CSS (no UI framework)
