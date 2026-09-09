import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { REDUCED } from '../lib/anim.js';
import { profile } from '../data/profile.js';
import SectionHeading from './SectionHeading.jsx';

/** "Main quest log" — a timeline whose neon line draws itself as you scroll. */
export default function Experience() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (REDUCED) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // the neon progress line, scrubbed to scroll position
      gsap.fromTo(
        '.timeline-progress',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline',
            start: 'top 65%',
            end: 'bottom 70%',
            scrub: 0.6,
          },
        }
      );

      // each node pulses when its card enters
      root.querySelectorAll('.tl-item').forEach((item) => {
        gsap.from(item.querySelector('.tl-card'), {
          y: 70,
          opacity: 0,
          scale: 0.97,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 82%', once: true },
        });
        gsap.from(item.querySelector('.tl-dot'), {
          scale: 0,
          duration: 0.5,
          ease: 'back.out(3)',
          scrollTrigger: { trigger: item, start: 'top 82%', once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section xp" id="work" ref={rootRef}>
      <SectionHeading no="03" ghost="QUEST" title="MAIN QUEST LOG" note="/ xp farming since 2021" />

      <div className="timeline">
        <span className="timeline-line" aria-hidden="true" />
        <span className="timeline-progress" aria-hidden="true" />

        {profile.experience.map((e, i) => (
          <article className={`tl-item ${i % 2 === 0 ? 'left' : 'right'}`} key={i}>
            <span className="tl-dot" aria-hidden="true" />
            <div className="tl-card" data-hover>
              <p className="tl-tag mono">{e.tag}</p>
              <p className="tl-period mono">{e.period}</p>
              <h3 className="tl-role">{e.role}</h3>
              <p className="tl-company">@ {e.company}</p>
              <ul className="tl-points">
                {e.points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}

        <p className="tl-end mono blink">// TO BE CONTINUED…</p>
      </div>
    </section>
  );
}
