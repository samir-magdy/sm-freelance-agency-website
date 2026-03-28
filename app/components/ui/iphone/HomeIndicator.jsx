/* ── Home Indicator ── */
export function HomeIndicator({ opacity = 0.25 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[100px] h-1 rounded-[2px] z-20"
      style={{ background: `hsla(0 0% 100% / ${opacity})` }}
    />
  );
}
