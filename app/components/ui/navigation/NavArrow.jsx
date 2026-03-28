import { ArrowLeft, ArrowRight } from "lucide-react";

/* ── Nav Arrow ── */
export function NavArrow({ direction, disabled, onClick }) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous project" : "Next project"}
      className={`group flex items-center justify-center w-11 h-11 rounded-full shrink-0 p-0 transition-all duration-300 ease-out border ${
        disabled
          ? "bg-transparent border-white/[0.06] text-content-muted/40 cursor-default"
          : "bg-white/[0.1] border-white/[0.12] text-content-heading cursor-pointer hover:bg-gold/[0.08]  hover:border-gold/30 hover:scale-105"
      }`}
    >
      <Icon
        size={18}
        strokeWidth={2.5}
        className={`transition-transform duration-100 ease-out`}
      />
    </button>
  );
}
