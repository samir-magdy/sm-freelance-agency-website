import { ArrowLeft, ArrowRight } from "lucide-react";

/* ── Nav Arrow ── */
export function NavArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  const nudge =
    direction === "prev"
      ? "can-hover:group-hover:-translate-x-0.5"
      : "can-hover:group-hover:translate-x-0.5";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous project" : "Next project"}
      className={`group flex items-center justify-center w-11 h-11 rounded-full shrink-0 p-0 transition-all duration-300 ease-out border ${
        disabled
          ? "bg-transparent border-white/[0.06] text-content-muted/40 cursor-default"
          : "bg-white/[0.1] border-white/[0.12] text-content-heading cursor-pointer can-hover:hover:bg-gold/[0.12] can-hover:hover:border-gold/30 can-hover:hover:text-gold can-hover:hover:scale-110 can-hover:hover:shadow-[0_0_16px_hsla(var(--gold)/0.15)]"
      }`}
    >
      <Icon
        size={18}
        strokeWidth={2.5}
        className={`transition-transform duration-300 ease-out ${nudge}`}
      />
    </button>
  );
}
