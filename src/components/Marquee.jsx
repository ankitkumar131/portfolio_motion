/** Infinite neon ticker. Content is duplicated for a seamless loop. */
export default function Marquee({ items, className = '', reverse = false, duration = 26 }) {
  const Row = () => (
    <div className="marquee-row" style={{ animationDuration: `${duration}s` }}>
      {items.map((t, i) => (
        <span className="marquee-item mono" key={i}>
          {t}
          <i className="sep" aria-hidden="true">✦</i>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee ${reverse ? 'is-rev' : ''} ${className}`} aria-hidden="true">
      <Row />
      <Row />
    </div>
  );
}
