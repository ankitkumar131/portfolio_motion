import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { REDUCED } from '../lib/anim.js';
import { profile } from '../data/profile.js';
import SectionHeading from './SectionHeading.jsx';

/** Terminal window that types out the bio + animated stat counters. */
export default function About() {
  const rootRef = useRef(null);

  // typewriter for the terminal lines
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const typeAll = () => {
      const spans = root.querySelectorAll('.t-line');
      spans.forEach((s) => {
        s.textContent = s.dataset.text;
      });
    };

    if (REDUCED) {
      typeAll();
      return undefined;
    }

    const ctx = gsap.context(() => {
      const spans = root.querySelectorAll('.t-line');
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '.terminal', start: 'top 75%', once: true },
      });

      // "$ whoami" prompt flashes in first
      tl.from('.t-cmd', { opacity: 0, duration: 0.25 });

      spans.forEach((span) => {
        const text = span.dataset.text;
        const obj = { p: 0 };
        tl.to(obj, {
          p: 1,
          duration: Math.min(text.length * 0.022, 1.6),
          ease: 'none',
          onUpdate: () => {
            span.textContent = text.slice(0, Math.round(obj.p * text.length));
          },
        });
      });

      tl.from('.t-caret', { opacity: 0, duration: 0.1 });
    }, root);

    return () => ctx.revert();
  }, []);

  // stat counters
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const setFinal = () => {
      root.querySelectorAll('.stat-val').forEach((el) => {
        el.textContent = el.dataset.val + (el.dataset.suffix || '');
      });
    };

    if (REDUCED) {
      setFinal();
      return undefined;
    }

    const ctx = gsap.context(() => {
      root.querySelectorAll('.stat-val').forEach((el, i) => {
        const target = Number(el.dataset.val);
        const suffix = el.dataset.suffix || '';
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power3.out',
          delay: i * 0.15,
          scrollTrigger: { trigger: '.about-side', start: 'top 80%', once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.v) + suffix;
          },
        });
      });

      gsap.from('.stat', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-side', start: 'top 85%', once: true },
      });
      gsap.from('.chip', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.chip-row', start: 'top 90%', once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section about" id="about" ref={rootRef}>
      <SectionHeading no="01" ghost="ABOUT" title="WHO'S THIS GUY?" note="/ a human, probably" />

      <div className="about-grid">
        <div className="terminal" data-hover>
          <div className="terminal-bar">
            <span className="tdot red" />
            <span className="tdot yellow" />
            <span className="tdot green" />
            <span className="terminal-title mono">ankit@portfolio: ~/about</span>
          </div>
          <div className="terminal-body mono">
            <p>
              <span className="t-prompt">$</span> <span className="t-cmd">whoami --verbose</span>
            </p>
            {profile.aboutLines.map((line, i) => (
              <p className="t-line" key={i} data-text={line} />
            ))}
            <p className="t-cmd-row">
              <span className="t-prompt">$</span> <span className="t-caret" aria-hidden="true" />
            </p>
          </div>
        </div>

        <div className="about-side">
          {profile.stats.map((s) => (
            <div className="stat" key={s.label} data-hover>
              <p className="stat-num">
                <span className="stat-val chrome" data-val={s.value} data-suffix={s.suffix}>0</span>
              </p>
              <p className="stat-label mono">{s.label}</p>
            </div>
          ))}

          <div className="chip-row">
            {profile.chips.map((c) => (
              <span className="chip mono" key={c.k}>
                {c.live && <i className="chip-dot" aria-hidden="true" />}
                {c.k}: <b>{c.v}</b>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
