import { useMemo } from 'react';

/** Randomized twinkling starfield for the hero sky. */
export default function Stars({ count = 80 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 62,
        size: Math.random() * 2.2 + 1,
        delay: Math.random() * 4,
        dur: 2 + Math.random() * 3.5,
      })),
    [count]
  );

  return (
    <div className="stars" aria-hidden="true">
      {stars.map((s, i) => (
        <span
          key={i}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
    </div>
  );
}
