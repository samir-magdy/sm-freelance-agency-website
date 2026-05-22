"use client";

import { useState, useRef, useEffect } from "react";

export interface Slide {
  image: string;
  alt?: string;
}

export interface IPhoneMockupProps {
  slides: Slide[];
  className?: string;
  paginationDotColor?: string;
  inactiveDotColor?: string;
}

// The pill-shaped cutout at the top of the screen
function DynamicIsland() {
  return (
    <div
      aria-hidden
      className="absolute top-[4px] sm:top-[5px] left-1/2 -translate-x-1/2 z-20
                 w-[34%] h-[24px] sm:h-[25px] rounded-full bg-black
                 flex items-center justify-end pr-[7px] sm:pr-[9px]"
      style={{ boxShadow: "inset 0 0 0 0.75px rgba(255,255,255,0.07)" }}
    >
      {/* Camera housing */}
      <div
        className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] rounded-full shrink-0
                   flex items-center justify-center"
        style={{
          background: "radial-gradient(circle at 38% 38%, #1c1c22, #080808)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        {/* Lens */}
        <div
          className="w-[8px] h-[8px] sm:w-[9px] sm:h-[9px] rounded-full"
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
      className="flex justify-between items-center h-full ps-3 sm:ps-6 pe-2 sm:px-5
                 text-xs font-semibold tracking-[0.3px] text-white"
      style={{ fontFamily: "-apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif" }}
    >
      {/* 9:41 is Apple's classic marketing timestamp */}
      <span className="inline-block mt-0.5">9:41</span>

      <div className="flex-1" />

      {/* Signal, wifi, battery icons */}
      <div className="flex gap-[1.5px] sm:gap-1 sm:items-center">

        {/* Signal bars */}
        <svg width="15" height="10" viewBox="0 0 16 12" fill="none" aria-hidden>
          <rect x="0"    y="8" width="3"   height="4"  rx="0.5" fill="white" />
          <rect x="4.5"  y="5" width="3"   height="7"  rx="0.5" fill="white" />
          <rect x="9"    y="2" width="3"   height="10" rx="0.5" fill="white" />
          <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" fill="white" opacity={0.35} />
        </svg>

        {/* Wifi */}
        <svg width="13" height="10" viewBox="0 0 14 11" fill="none" aria-hidden>
          <path d="M7 9.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" fill="white" />
          <path d="M4.17 8.17a4 4 0 015.66 0"            stroke="white" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M2.05 6.05a7 7 0 019.9 0"             stroke="white" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M0.34 3.34a10.05 10.05 0 0113.32 0"   stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity={0.35} />
        </svg>

        {/* Battery */}
        <svg width="20" height="11" viewBox="0 0 26 12" fill="none" aria-hidden>
          <rect x="0.5" y="0.5" width="22" height="11" rx="2.5" stroke="white" strokeWidth="1" opacity={0.4} />
          <rect x="2"   y="2"   width="16" height="8"  rx="1.5" fill="white" />
          <path d="M24 4.5v3a1.5 1.5 0 000-3z" fill="white" opacity={0.4} />
        </svg>

      </div>
    </div>
  );
}

// The swipe bar at the bottom of the screen
function HomeIndicator() {
  return (
    <div
      aria-hidden
      className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-25 h-1 rounded-xs z-20"
      style={{ background: "hsla(0 0% 100% / 0.25)" }}
    />
  );
}

// Left / right navigation arrows shown on desktop
interface NavArrowProps {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}

function NavArrow({ direction, disabled, onClick }: NavArrowProps) {
  if (disabled) return <div className="hidden sm:block w-11 h-11 shrink-0" />;

  const leftPath = <path d="m15 18-6-6 6-6" />;
  const rightPath = <path d="m9 18 6-6-6-6" />;

  return (
    <button
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      className="hidden sm:flex items-center justify-center w-11 h-11 rounded-full shrink-0 p-0 transition-all duration-300 ease-out border bg-white/[0.1] border-white/[0.12] text-white cursor-pointer hover:border-white/30"
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
        {direction === "prev" ? leftPath : rightPath}
      </svg>
    </button>
  );
}

export default function IPhoneMockup({
  slides,
  className,
  paginationDotColor = "white",
  inactiveDotColor = "rgba(255,255,255,0.3)",
}: IPhoneMockupProps) {
  const [active, setActive] = useState(0);
  const snapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = snapRef.current;
    if (!el) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const idx = Math.round(el.scrollLeft / el.clientWidth);
        setActive(idx);
        ticking = false;
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSlide = (idx: number) => {
    const el = snapRef.current;
    if (!el || idx < 0 || idx >= slides.length) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className={`flex flex-col items-center gap-3 select-none${className ? ` ${className}` : ""}`}>

      {/* Arrows + phone */}
      <div className="flex items-center justify-center gap-8">

        {slides.length > 1 && <NavArrow
          direction="prev"
          disabled={active === 0}
          onClick={() => scrollToSlide(active - 1)}
        />}

        {/* Phone shell */}
        <div className="w-[59vw] h-[58svh] sm:w-[16.4vw] rounded-[46px] bg-[linear-gradient(145deg,#2a2a2e_0%,#1c1c1e_50%,#161618_100%)] p-1 relative shrink-0">

          {/* Volume buttons (left) */}
          <div className="absolute -left-[2.5px] top-31.5 w-[2.5px] h-11 bg-[linear-gradient(180deg,#3a3a3e,#2a2a2e)] rounded-l-xs" />
          <div className="absolute -left-[2.5px] top-45    w-[2.5px] h-11 bg-[linear-gradient(180deg,#3a3a3e,#2a2a2e)] rounded-l-xs" />
          {/* Power button (right) */}
          <div className="absolute -right-0.75 top-35 w-0.75 h-15 bg-[linear-gradient(180deg,#3a3a3e,#2a2a2e)] rounded-r-xs" />

          {/* Screen */}
          <div className="w-full h-full rounded-[43px] overflow-hidden relative">

            {/* Status bar area */}
            <div className="absolute top-0 inset-x-0 z-15 px-2.5 sm:px-1 h-8 sm:h-9 bg-[#0e0e0e]">
              <DynamicIsland />
              <StatusBar />
            </div>

            {/* Slide carousel */}
            <div
              ref={snapRef}
              className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] mt-8 sm:mt-9 w-full h-full"
            >
              {slides.map((slide, i) => (
                <div
                  key={i}
                  className="min-w-full w-full snap-start snap-always h-full"
                >
                  <div className="overflow-y-auto h-full [scrollbar-width:none]">
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

            <HomeIndicator />
          </div>
        </div>

        {slides.length > 1 && <NavArrow
          direction="next"
          disabled={active === slides.length - 1}
          onClick={() => scrollToSlide(active + 1)}
        />}

      </div>

      {/* Pagination dots */}
      {slides.length > 1 && <div
        className="flex items-center gap-1.5 mb-1.5"
        role="tablist"
        aria-label="Slides"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === active}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => scrollToSlide(i)}
            className="rounded-full transition-all duration-300 cursor-pointer"
            style={
              i === active
                ? { width: "1.25rem", height: "0.5rem", background: paginationDotColor }
                : { width: "0.5rem",  height: "0.5rem", background: inactiveDotColor }
            }
          />
        ))}
      </div>}

    </div>
  );
}
