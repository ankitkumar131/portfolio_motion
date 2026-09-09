import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { REDUCED } from '../lib/anim.js';
import { profile } from '../data/profile.js';
import Stars from './Stars.jsx';
import Marquee from './Marquee.jsx';

/** Full-screen synthwave hero: striped sun, chrome name, neon grid floor. */
export default function Hero({ started }) {
  const rootRef = useRef(null);
  const timecodeRef = useRef(null);

  // ── entrance choreography, fires once the preloader lifts ─────────────────
  useEffect(() => {
    if (!started || !rootRef.current) return;
    if (REDUCED) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from('.hero-kicker', { y: 24, opacity: 0, duration: 0.6 })
        .from(
          '.hero-title .char',
          { yPercent: 118, rotate: 7, duration: 0.9, stagger: 0.035 },
          '-=0.35'
        )
        .from('.hero-role', { opacity: 0, y: 18, duration: 0.5 }, '-=0.5')
        .from('.hero-tag', { opacity: 0, y: 18, duration: 0.5 }, '-=0.35')
        .from(['.hero-rec', '.hero-scroll'], { opacity: 0, duration: 0.45, stagger: 0.12 }, '-=0.2')
        .from('.hero-marquee', { yPercent: 101, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');

      // gentle idle float on the whole title block
      gsap.to('.hero-title', {
        y: 10,
        duration: 3.6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 1.6,
      });
    }, rootRef);
    return () => ctx.revert();
  }, [started]);

  // ── scroll parallax: content lifts away, sun sinks, grid fades ────────────
  useEffect(() => {
    if (REDUCED) return;
    const ctx = gsap.context(() => {
      const st = { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true };
      gsap.to('.hero-content', { yPercent: -16, opacity: 0.15, ease: 'none', scrollTrigger: st });
      gsap.to('.hero-sun', { yPercent: 42, scale: 1.1, ease: 'none', scrollTrigger: st });
      gsap.to('.hero-grid', { opacity: 0.25, ease: 'none', scrollTrigger: st });
      gsap.to('.hero-mountains', { yPercent: 12, ease: 'none', scrollTrigger: st });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // ── VHS REC timecode ───────────────────────────────────────────────────────
  useEffect(() => {
    if (REDUCED) return undefined;
    let f = 0;
    const iv = setInterval(() => {
      f += 1;
      const fr = f % 25;
      const s = Math.floor(f / 25) % 60;
      const m = Math.floor(f / 1500) % 60;
      const h = Math.floor(f / 90000) % 24;
      const p = (n) => String(n).padStart(2, '0');
      if (timecodeRef.current) timecodeRef.current.textContent = `${p(h)}:${p(m)}:${p(s)}:${p(fr)}`;
    }, 40);
    return () => clearInterval(iv);
  }, []);

  // ── cheeky hover: letters hop ──────────────────────────────────────────────
  const onTitleEnter = (e) => {
    if (REDUCED) return;
    const c = e.target.closest('.char');
    if (!c) return;
    gsap.fromTo(
      c,
      { yPercent: 0 },
      { yPercent: -14, duration: 0.16, yoyo: true, repeat: 1, ease: 'power2.out', overwrite: true }
    );
  };

  return (
    <section className="hero" id="top" ref={rootRef}>
      <div className="hero-sky">
        <Stars />
        <div className="hero-sun" aria-hidden="true" />
        <div className="hero-mountains" aria-hidden="true" />
        <div className="hero-horizon" aria-hidden="true" />
      </div>
      <div className="hero-grid" aria-hidden="true" />

      <div className="hero-content">
        <p className="hero-kicker mono">{profile.kicker}</p>

        <h1 className="hero-title chrome" aria-label={profile.name} onMouseEnter={onTitleEnter}>
          {profile.heroLines.map((line, i) => (
            <span className="line" key={i}>
              {line.split('').map((ch, j) => (
                <span className="char-wrap" key={j} aria-hidden="true">
                  <span className="char">{ch}</span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p className="hero-role mono">
          <span className="dash" aria-hidden="true" />
          {profile.role}
          <span className="dash is-right" aria-hidden="true" />
        </p>

        <p className="hero-tag">{profile.tagline}</p>
      </div>

      <div className="hero-rec mono" aria-hidden="true">
        <span className="rec-dot" />REC <span ref={timecodeRef}>00:00:00:00</span>
      </div>

      <div className="hero-scroll mono blink" aria-hidden="true">▼ INSERT COIN — SCROLL ▼</div>

      <Marquee className="hero-marquee" items={profile.heroMarquee} duration={30} />
    </section>
  );
}
