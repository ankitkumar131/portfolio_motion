import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToEl, getLenis } from '../lib/scroll.js';
import { REDUCED } from '../lib/anim.js';
import { profile } from '../data/profile.js';

const LINKS = [
  { id: '#about', no: '01', label: 'ABOUT' },
  { id: '#skills', no: '02', label: 'SKILLS' },
  { id: '#work', no: '03', label: 'QUEST LOG' },
  { id: '#projects', no: '04', label: 'BUILDS' },
  { id: '#contact', no: '05', label: 'CONTACT' },
];

export default function Nav({ ready }) {
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const firstRun = useRef(true);

  useEffect(() => {
    if (!ready || !navRef.current) return;
    if (REDUCED) {
      gsap.set(navRef.current, { yPercent: 0 });
    } else {
      gsap.fromTo(navRef.current, { yPercent: -110 }, { yPercent: 0, duration: 0.8, ease: 'power4.out', delay: 0.15 });
    }
    const st = ScrollTrigger.create({
      start: 80,
      end: 'max',
      onToggle: (self) => {
        if (navRef.current) navRef.current.classList.toggle('is-scrolled', self.isActive);
      },
    });
    return () => st.kill();
  }, [ready]);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const lenis = getLenis();
    const menu = menuRef.current;
    if (open && menu) {
      document.documentElement.classList.add('menu-open');
      if (lenis) lenis.stop();
      gsap.fromTo(menu, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(
        '.menu-link',
        { y: 44, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out', delay: 0.1 }
      );
    } else {
      document.documentElement.classList.remove('menu-open');
      if (lenis) lenis.start();
    }
  }, [open]);

  const go = (id) => {
    setOpen(false);
    window.setTimeout(() => scrollToEl(id), 420);
  };

  return (
    <>
      <header className="nav" ref={navRef}>
        <button className="nav-logo mono" onClick={() => scrollToEl(0)} aria-label="Back to top">
          {profile.monogram}
        </button>
        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <button key={l.id} className="nav-link mono" onClick={() => go(l.id)}>
              <em>{l.no}</em> {l.label}
            </button>
          ))}
        </nav>
        <button className="nav-cta mono" onClick={() => go('#contact')}>
          HIRE ME
        </button>
        <button
          className={`burger ${open ? 'is-open' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span />
          <span />
        </button>
      </header>

      <div className={`menu ${open ? 'is-open' : ''}`} ref={menuRef} aria-hidden={!open}>
        <nav className="menu-inner" aria-label="Mobile">
          {LINKS.map((l) => (
            <button key={l.id} className="menu-link" onClick={() => go(l.id)}>
              <em className="mono">{l.no}</em>
              <span>{l.label}</span>
            </button>
          ))}
        </nav>
        <div className="menu-foot">
          {profile.socials.slice(0, 3).map((s) => (
            <a key={s.label} className="mono" href={s.url} target="_blank" rel="noreferrer">
              {s.label} ↗
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
