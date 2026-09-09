import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { REDUCED } from '../lib/anim.js';
import { profile } from '../data/profile.js';
import SectionHeading from './SectionHeading.jsx';
import Marquee from './Marquee.jsx';

/** Retro power meters that charge up on scroll. */
export default function Skills() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const setFinal = () => {
      root.querySelectorAll('.skill').forEach((el) => {
        el.querySelector('.meter-fill').style.width = `${el.dataset.level}%`;
      });
    };

    if (REDUCED) {
      setFinal();
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.from('.skill-group', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.skills-grid', start: 'top 80%', once: true },
      });

      root.querySelectorAll('.skill').forEach((el, i) => {
        const level = Number(el.dataset.level);
        const fill = el.querySelector('.meter-fill');
        const pct = el.querySelector('.skill-pct');
        const obj = { v: 0 };

        gsap.to(fill, {
          width: `${level}%`,
          duration: 1.3,
          ease: 'power3.out',
          delay: (i % 3) * 0.1 + Math.floor(i / 3) * 0.2,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
        gsap.to(obj, {
          v: level,
          duration: 1.3,
          ease: 'power3.out',
          delay: (i % 3) * 0.1 + Math.floor(i / 3) * 0.2,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onUpdate: () => {
            pct.textContent = `${Math.round(obj.v)}%`;
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section skills" id="skills" ref={rootRef}>
      <SectionHeading no="02" ghost="SKILLS" title="SKILL TREE (MAXED)" note="/ no cheat codes used" />

      <div className="skills-grid">
        {profile.skillGroups.map((g) => (
          <div className="skill-group" key={g.title} data-hover>
            <h3 className="skill-group-title mono">// {g.title}</h3>
            {g.skills.map((s) => (
              <div className="skill" key={s.name} data-level={s.level}>
                <div className="skill-top">
                  <span className="skill-name">{s.name}</span>
                  <span className="skill-pct mono">0%</span>
                </div>
                <div className="meter">
                  <span className="meter-fill" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <Marquee className="tools-marquee" items={profile.toolsMarquee} reverse duration={32} />
    </section>
  );
}
