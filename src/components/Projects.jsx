import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { REDUCED } from '../lib/anim.js';
import { profile } from '../data/profile.js';
import SectionHeading from './SectionHeading.jsx';

/**
 * Featured builds — a pinned, scroll-scrubbed horizontal gallery on desktop;
 * a native snap-scroll carousel on touch/small screens.
 */
export default function Projects() {
  const secRef = useRef(null);
  const scrollRef = useRef(null);
  const trackRef = useRef(null);
  const pbarRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── DESKTOP: pin the section, scrub the track horizontally ────────────
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const track = trackRef.current;
        const sec = secRef.current;
        if (!track || !sec) return undefined;

        const dist = () => Math.max(track.scrollWidth - sec.clientWidth, 0);
        const tween = gsap.to(track, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: sec,
            start: 'top top',
            end: () => `+=${dist() + 300}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (pbarRef.current) pbarRef.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
        return () => {
          tween.scrollTrigger && tween.scrollTrigger.kill();
          tween.kill();
        };
      });

      // ── MOBILE: native snap scroll drives the progress bar ────────────────
      mm.add('(max-width: 899px)', () => {
        const sc = scrollRef.current;
        if (!sc) return undefined;
        const onScroll = () => {
          const max = sc.scrollWidth - sc.clientWidth;
          const p = max > 0 ? sc.scrollLeft / max : 0;
          if (pbarRef.current) pbarRef.current.style.transform = `scaleX(${p})`;
        };
        onScroll();
        sc.addEventListener('scroll', onScroll, { passive: true });
        return () => sc.removeEventListener('scroll', onScroll);
      });
    }, secRef);

    return () => ctx.revert();
  }, []);

  // 3D tilt on hover (desktop only)
  const onCardMove = (e) => {
    if (REDUCED || !window.matchMedia('(pointer: fine)').matches) return;
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -7;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 9;
    gsap.to(card, { rotateX: rx, rotateY: ry, duration: 0.5, ease: 'power2.out', transformPerspective: 900 });
  };
  const onCardLeave = (e) => {
    gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
  };

  return (
    <section className="section projects" id="projects" ref={secRef}>
      <div className="projects-head">
        <SectionHeading no="04" ghost="BUILDS" title="FEATURED BUILDS" note="/ swipe, don't be shy" />
        <div className="projects-progress" aria-hidden="true">
          <span ref={pbarRef} />
        </div>
      </div>

      <div className="projects-scroller" ref={scrollRef} data-lenis-prevent>
        <div className="projects-track" ref={trackRef}>
          {profile.projects.map((p, i) => (
            <article
              className="p-card"
              key={p.id}
              data-hover
              onPointerMove={onCardMove}
              onPointerLeave={onCardLeave}
            >
              <div className="p-cover">
                <img src={p.cover} alt={`${p.title} cover art`} loading="lazy" />
                <span className="p-idx mono">BUILD_{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="p-body">
                <h3 className="p-title">{p.title}</h3>
                <p className="p-desc">{p.desc}</p>
                <div className="p-tech">
                  {p.tech.map((t) => (
                    <span className="p-chip mono" key={t}>{t}</span>
                  ))}
                </div>
                <div className="p-links">
                  <a className="p-link mono" href={p.repo} target="_blank" rel="noreferrer">CODE ↗</a>
                  <a className="p-link mono" href={p.live} target="_blank" rel="noreferrer">LIVE ↗</a>
                </div>
              </div>
            </article>
          ))}

          <article className="p-card p-card-cta" data-hover>
            <p className="mono ct-eyebrow">MORE IN THE VAULT</p>
            <h3 className="ct-title">WANNA SEE<br />EVERYTHING?</h3>
            <a className="ct-link mono" href="https://github.com/ankitkumar131" target="_blank" rel="noreferrer">
              GITHUB ↗
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
