import { useEffect, useRef } from 'react';
import { REDUCED } from '../lib/anim.js';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789✦<>-/#';

/** Hacker-style text scramble that resolves when scrolled into view. */
export default function ScrambleText({ text, className = '', speed = 26 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (REDUCED) {
      el.textContent = text;
      return;
    }

    let interval = null;
    let played = false;

    const play = () => {
      if (played) return;
      played = true;
      let frame = 0;
      const resolveAt = Array.from(text, (_, i) => 4 + i * 2);
      interval = setInterval(() => {
        let out = '';
        let done = 0;
        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ' || frame >= resolveAt[i]) {
            out += text[i];
            done++;
          } else {
            out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
          }
        }
        el.textContent = out;
        frame++;
        if (done === text.length) clearInterval(interval);
      }, speed);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          play();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      clearInterval(interval);
    };
  }, [text, speed]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
