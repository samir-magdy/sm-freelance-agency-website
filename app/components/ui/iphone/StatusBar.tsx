/* ── Status Bar (iPhone chrome) ── */
export function StatusBar({
  color = "white",
}: {
  opacity?: number;
  color?: string;
}) {
  return (
    <div
      dir="ltr"
      aria-hidden
      className="origin-top scale-[0.85] sm:scale-100 flex justify-between items-center px-1 sm:px-4 h-5 text-xs font-semibold font-[-apple-system,'SF_Pro_Text','Helvetica_Neue',sans-serif] tracking-[0.3px]"
      style={{ color }}
    >
      <span className="w-[54px] text-left">9:41</span>
      <div className="flex-1" />
      <div className="flex gap-1">
        <svg width="16" height="10" viewBox="0 0 16 12" fill="none">
          <rect x="0" y="8" width="3" height="4" rx="0.5" fill={color} />
          <rect x="4.5" y="5" width="3" height="7" rx="0.5" fill={color} />
          <rect x="9" y="2" width="3" height="10" rx="0.5" fill={color} />
          <rect
            x="13.5"
            y="0"
            width="2.5"
            height="12"
            rx="0.5"
            fill={color}
            opacity={0.35}
          />
        </svg>
        <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
          <path
            d="M7 9.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"
            fill={color}
          />
          <path
            d="M4.17 8.17a4 4 0 015.66 0"
            stroke={color}
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="M2.05 6.05a7 7 0 019.9 0"
            stroke={color}
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="M0.34 3.34a10.05 10.05 0 0113.32 0"
            stroke={color}
            strokeWidth="1.3"
            strokeLinecap="round"
            opacity={0.35}
          />
        </svg>

        <svg width="22" height="12" viewBox="0 0 26 12" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="22"
            height="11"
            rx="2.5"
            stroke={color}
            strokeWidth="1"
            opacity={0.4}
          />
          <rect x="2" y="2" width="16" height="8" rx="1.5" fill={color} />
          <path d="M24 4.5v3a1.5 1.5 0 000-3z" fill={color} opacity={0.4} />
        </svg>
      </div>
    </div>
  );
}
