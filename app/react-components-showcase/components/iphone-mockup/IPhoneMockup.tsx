"use client";

import { useState, useRef, useEffect } from "react";

export interface Slide {
  image: string;
  alt?: string;
}

export interface IPhoneMockupProps {
  slides: Slide[];
  className?: string;
  sizeClassName?: string;
  theme?: "light" | "dark";
  autoPlay?: boolean;
  autoPlayInterval?: number;
  onSlideChange?: (index: number) => void;
}

// The pill-shaped cutout at the top of the screen
function DynamicIsland() {
  return (
    <div
      aria-hidden
      className="absolute top-1 sm:top-1.25 left-1/2 -translate-x-1/2 z-20
                 w-[34%] h-6 sm:h-6.25 rounded-full bg-black
                 flex items-center justify-end pr-1.75 sm:pr-2.25"
      style={{ boxShadow: "inset 0 0 0 0.75px rgba(255,255,255,0.07)" }}
    >
      {/* Camera housing */}
      <div
        className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full shrink-0 flex items-center justify-center"
        style={{
          background: "radial-gradient(circle at 38% 38%, #1c1c22, #080808)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        {/* Lens */}
        <div
          className="w-2 h-2 sm:w-2.25 sm:h-2.25 rounded-full"
          style={{
            background: "radial-gradient(circle at 33% 33%, #20215a, #0a0b1e)",
            boxShadow: "0 0 5px 2px rgba(50,70,210,0.22)",
          }}
        />
      </div>
    </div>
  );
}

// Time and status icons at the top of the screen
function StatusBar() {
  return (
    <div
      aria-hidden
      className="flex justify-between items-center h-full ps-3 sm:ps-6 pe-2 sm:px-5 text-xs font-semibold tracking-[0.3px] text-white"
      style={{
        fontFamily:
          "-apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* 9:41 is Apple's classic marketing timestamp */}
      <span className="inline-block mt-0.5">9:41</span>
      <div className="flex-1" />

      {/* Signal, wifi, battery icons */}
      <div className="flex gap-[1.5px] sm:gap-1 sm:items-center">
        {/* Signal bars */}
        <svg width="15" height="10" viewBox="0 0 16 12" fill="none" aria-hidden>
          <rect x="0" y="8" width="3" height="4" rx="0.5" fill="currentColor" />
          <rect x="4.5" y="5" width="3" height="7" rx="0.5" fill="currentColor" />
          <rect x="9" y="2" width="3" height="10" rx="0.5" fill="currentColor" />
          <rect
            x="13.5"
            y="0"
            width="2.5"
            height="12"
            rx="0.5"
            fill="currentColor"
            opacity={0.35}
          />
        </svg>
        {/* Wifi */}
        <svg width="13" height="10" viewBox="0 0 14 11" fill="none" aria-hidden>
          <path
            d="M7 9.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"
            fill="currentColor"
          />
          <path
            d="M4.17 8.17a4 4 0 015.66 0"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="M2.05 6.05a7 7 0 019.9 0"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="M0.34 3.34a10.05 10.05 0 0113.32 0"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            opacity={0.35}
          />
        </svg>
        {/* Battery */}
        <svg width="20" height="11" viewBox="0 0 26 12" fill="none" aria-hidden>
          <rect
            x="0.5"
            y="0.5"
            width="22"
            height="11"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1"
            opacity={0.4}
          />
          <rect x="2" y="2" width="16" height="8" rx="1.5" fill="currentColor" />
          <path d="M24 4.5v3a1.5 1.5 0 000-3z" fill="currentColor" opacity={0.4} />
        </svg>
      </div>
    </div>
  );
}

// Left / right navigation arrows shown on desktop
interface NavArrowProps {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
  navArrowColor: "light" | "dark";
}

function NavArrow({
  direction,
  disabled,
  onClick,
  navArrowColor,
}: NavArrowProps) {
  if (disabled) return <div className="hidden sm:block w-11 h-11 shrink-0" />;
  // You can customize the nav arrows as you wish here
  const colorClass =
    navArrowColor === "dark"
      ? // Styling for dark theme
        "border-white/20 bg-white/[0.03] text-white hover:bg-white/[0.09] hover:border-white/50 hover:scale-[1.07] hover:shadow-[0_0_22px_rgba(255,255,255,0.13)]"
      : // Styling for light theme
        "border border-black/80 bg-transparent text-black hover:bg-black/90 hover:text-white hover:border-black hover:scale-[1.07]";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      className={`hidden sm:flex items-center justify-center w-11 h-11 rounded-full shrink-0 p-0 transition-all duration-200 ease-out border cursor-pointer ${colorClass}`}
      style={
        navArrowColor === "dark"
          ? { boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)" }
          : undefined
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {direction === "prev" ? (
          <path d="m15 18-6-6 6-6" />
        ) : (
          <path d="m9 18 6-6-6-6" />
        )}
      </svg>
    </button>
  );
}

const themes = {
  dark: {
    navArrowColor: "dark" as const,
    paginationDotColor: "white",
    inactiveDotColor: "rgba(255,255,255,0.25)",
  },
  light: {
    navArrowColor: "light" as const,
    paginationDotColor: "#1c1c1e",
    inactiveDotColor: "rgba(0,0,0,0.25)",
  },
};

export default function IPhoneMockup({
  slides,
  className,
  sizeClassName,
  theme = "dark",
  autoPlay = false,
  autoPlayInterval = 6000,
  onSlideChange,
}: IPhoneMockupProps) {
  const { navArrowColor, paginationDotColor, inactiveDotColor } = themes[theme];
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const snapRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
    onSlideChange?.(active);
  }, [active]);

  useEffect(() => {
    const el = snapRef.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setActive(Math.round(el.scrollLeft / el.clientWidth));
        ticking = false;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!autoPlay || slides.length <= 1 || isPaused) return;
    const id = setInterval(() => {
      const el = snapRef.current;
      if (!el) return;
      const next = (activeRef.current + 1) % slides.length;
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    }, autoPlayInterval);
    return () => clearInterval(id);
  }, [autoPlay, autoPlayInterval, slides.length, isPaused]);

  const scrollToSlide = (idx: number) => {
    const el = snapRef.current;
    if (!el || idx < 0 || idx >= slides.length) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div
      className={`flex flex-col items-center gap-3 select-none${className ? ` ${className}` : ""}`}
    >
      {/* Arrows + phone */}
      <div className="flex items-center justify-center gap-8">
        {slides.length > 1 && (
          <NavArrow
            direction="prev"
            disabled={active === 0}
            onClick={() => scrollToSlide(active - 1)}
            navArrowColor={navArrowColor}
          />
        )}

        {/* Phone shell */}
        <div
          className={`${sizeClassName ?? "w-65 sm:w-75 aspect-10.5/19"} rounded-[46px] bg-[linear-gradient(145deg,#272727_0%,#1c1c1c_50%,#141414_100%)] p-1 relative shrink-0`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Volume buttons (left) */}
          <div className="absolute left-[-2.5px] top-[30%] w-[2.5px] h-[10%] bg-[linear-gradient(180deg,#363636,#262626)] rounded-l-xs" />
          <div className="absolute left-[-2.5px] top-[43%] w-[2.5px] h-[10%] bg-[linear-gradient(180deg,#363636,#262626)] rounded-l-xs" />
          {/* Power button (right) */}
          <div className="absolute -right-0.75 top-[36%] w-0.75 h-[18%] bg-[linear-gradient(180deg,#363636,#262626)] rounded-r-xs" />

          {/* Screen */}
          <div className="w-full h-full rounded-[43px] overflow-hidden relative bg-[#0e0e0e]">
            {/* Status bar area */}
            <div className="absolute top-0 inset-x-0 z-15 px-2.5 sm:px-1 h-8 sm:h-9 bg-[#0e0e0e]">
              <DynamicIsland />
              <StatusBar />
            </div>

            {/* Slide carousel logic */}
            <div
              ref={snapRef}
              className="flex overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden snap-x snap-mandatory mt-8 sm:mt-9 w-full h-full"
            >
              {slides.map((slide, i) => (
                <div
                  key={i}
                  className="w-full shrink-0 snap-start snap-always h-full"
                >
                  <div className="overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden h-full">
                    <img
                      src={slide.image}
                      alt={slide.alt ?? `Slide ${i + 1}`}
                      className="w-full h-auto block"
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom fade overlay */}
            <div className="absolute bottom-0 inset-x-0 h-10 bg-[linear-gradient(transparent,rgba(0,0,0,0.5))] pointer-events-none z-10" />

          </div>
        </div>

        {slides.length > 1 && (
          <NavArrow
            direction="next"
            disabled={active === slides.length - 1}
            onClick={() => scrollToSlide(active + 1)}
            navArrowColor={navArrowColor}
          />
        )}
      </div>

      {/* Pagination dots */}
      {slides.length > 1 && (
        <div
          className="flex items-center gap-1.5 mb-1.5"
          role="tablist"
          aria-label="Slides"
        >
          {slides.map((_, i) => (
            <button
              type="button"
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollToSlide(i)}
              className="rounded-full transition-all duration-300 cursor-pointer"
              // You can customize pagination dots as you wish here
              style={
                i === active
                  ? // Active dot
                    {
                      width: "1.25rem",
                      height: "0.5rem",
                      background: paginationDotColor,
                    }
                  : // Inactive dot
                    {
                      width: "0.5rem",
                      height: "0.5rem",
                      background: inactiveDotColor,
                    }
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}