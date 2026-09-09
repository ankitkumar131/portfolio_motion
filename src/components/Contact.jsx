import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { REDUCED } from '../lib/anim.js';
import { profile } from '../data/profile.js';
import SectionHeading from './SectionHeading.jsx';
import Marquee from './Marquee.jsx';

/** Final boss: giant chrome CTA, keycap socials, scrolling footer. */
export default function Contact() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (REDUCED) return;
    const ctx = gsap.context(() => {
      gsap.from('.contact-big .cb-line', {
        y: 90,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.contact-inner', start: 'top 75%', once: true },
      });
      gsap.from('.contact-cta', {
        scale: 0.85,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.8)',
        scrollTrigger: { trigger: '.contact-inner', start: 'top 60%', once: true },
      });
      gsap.from('.key', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-keys', start: 'top 88%', once: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section contact" id="contact" ref={rootRef}>
      <SectionHeading no="05" ghost="GG WP" title="FINAL BOSS: YOUR INBOX" note="/ no doorbell here" />

      <div className="contact-inner">
        <h3 className="contact-big">
          {profile.contactLines.map((line, i) => (
            <span className={`cb-line ${i === profile.contactLines.length - 1 ? 'chrome' : ''}`} key={i}>
              {line}
            </span>
          ))}
        </h3>

        <a className="contact-cta" href={`mailto:${profile.email}`} data-hover>
          <span className="cta-text">START A PROJECT</span>
          <span className="cta-arrow" aria-hidden="true">↗</span>
        </a>

        <div className="contact-keys">
          {profile.socials.map((s) => (
            <a className="key" key={s.label} href={s.url} target="_blank" rel="noreferrer" data-hover>
              <span className="key-label mono">{s.label}</span>
              <span className="key-handle mono">{s.handle}</span>
            </a>
          ))}
        </div>
      </div>

      <footer className="footer">
        <Marquee items={profile.footerMarquee} duration={28} />
        <p className="footer-note mono blink">INSERT COIN TO CONTINUE</p>
        <p className="footer-legal mono">
          © {new Date().getFullYear()} ANKIT KUMAR — MADE WITH ♥, GSAP & QUESTIONABLE AMOUNTS OF COFFEE
        </p>
      </footer>
    </section>
  );
}
