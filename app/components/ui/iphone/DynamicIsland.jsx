/* ── Dynamic Island ── */
export function DynamicIsland() {
  return (
    <div
      className="size-3 rounded-full bg-[radial-gradient(circle_at_40%_35%,#1a1a2e_0%,#0a0a12_60%,#000_100%)] border-[1.5px] border-[#1a1a2e] relative shadow-[0_0_0_0.5px_hsla(0_0%_100%/0.06)]"
    >
      <div
        className="absolute top-0.5 left-[3px] size-[3px] rounded-full bg-[hsla(220_60%_60%/0.35)]"
      />
    </div>
  );
}
