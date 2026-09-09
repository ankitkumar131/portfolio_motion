import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const BOOT_LINES = [
  'BOOTING NEON DRIVERS v2.0',
  'LOADING 80s AESTHETICS...',
  'CALIBRATING CHROME TEXT',
  'COMPILING SASS_LEVELS',
  'SHARPENING PIXELS ✦',
];

/** Retro boot-sequence overlay. Counts 0→100 then slides away. */
export default function Preloader({ onComplete }) {
  const rootRef = useRef(null);
  const numRef = useRef(null);
  const barRef = useRef(null);
  const lineRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      let rot = null;

      const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });

      tl.to(counter, {
        v: 100,
        duration: 1.9,
        onUpdate: () => {
          if (numRef.current) {
            numRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0');
          }
          if (barRef.current) {
            barRef.current.style.transform = `scaleX(${counter.v / 100})`;
          }
        },
      })
        .to('.pre-flash', { opacity: 0.9, duration: 0.08 })
        .to('.pre-flash', { opacity: 0, duration: 0.08 })
        .to(rootRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
          delay: 0.2,
          onStart: () => {
            if (rot) clearInterval(rot);
            if (lineRef.current) lineRef.current.textContent = 'GO GO GO';
          },
          onComplete: () => onCompleteRef.current && onCompleteRef.current(),
        });

      let li = 0;
      rot = setInterval(() => {
        li = (li + 1) % BOOT_LINES.length;
        if (lineRef.current) lineRef.current.textContent = BOOT_LINES[li];
      }, 380);

      return () => clearInterval(rot);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="preloader" ref={rootRef}>
      <div className="pre-inner">
        <p className="pre-logo mono">AK.EXE</p>
        <p className="pre-boot mono" ref={lineRef}>{BOOT_LINES[0]}</p>
        <div className="pre-bar">
          <span ref={barRef} />
        </div>
        <p className="pre-count chrome">
          <span ref={numRef}>000</span>
          <em>%</em>
        </p>
        <p className="pre-coin mono blink">INSERT COIN</p>
      </div>
      <div className="pre-flash" aria-hidden="true" />
    </div>
  );
}
