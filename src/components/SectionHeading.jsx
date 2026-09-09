import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { REDUCED } from '../lib/anim.js';
import ScrambleText from './ScrambleText.jsx';

/**
 * Standard section header: giant outlined ghost word behind, scrambling
 * index line, sassy title and a neon rule that draws itself in.
 */
export default function SectionHeading({ no, ghost, title, note }) {
  const rootRef = useRef(null);

  useEffect(() => {
    if (REDUCED) return;
    const ctx = gsap.context(() => {
      gsap.from('.sec-no, .sec-title', {
        y: 42,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 82%', once: true },
      });
      gsap.from('.sec-rule', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.9,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: rootRef.current, start: 'top 75%', once: true },
      });
      gsap.fromTo(
        '.sec-ghost',
        { xPercent: -6 },
        {
          xPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="sec-head" ref={rootRef}>
      <span className="sec-ghost" aria-hidden="true">{ghost}</span>
      <p className="sec-no mono">
        <ScrambleText text={`${no} //`} />
      </p>
      <h2 className="sec-title">{title}</h2>
      <span className="sec-rule" aria-hidden="true" />
      {note && <p className="sec-note mono">{note}</p>}
    </div>
  );
}
