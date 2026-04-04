/* ── Home Indicator ── */
export function HomeIndicator({ opacity = 0.25 }) {
  return (
    <div
      aria-hidden
      className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-25 h-1 rounded-xs z-20"
      style={{ background: `hsla(0 0% 100% / ${opacity})` }}
    />
  );
}
