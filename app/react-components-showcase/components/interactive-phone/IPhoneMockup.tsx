"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Slide data passed into the carousel
export interface Slide {
  image: string;
  alt?: string;
}

// Props accepted by the main IPhoneMockup component
export interface IPhoneMockupProps {
  slides: Slide[];
  paginationDotColor?: string;
}

// Sub-components — phone chrome UI

// Pill-shaped notch at the top of the screen with a decorative camera lens inside
function DynamicIsland() {
  return (
    <div
      aria-hidden
      className="absolute top-[4px] sm:top-[5px] left-1/2 -translate-x-1/2 z-20
                 w-[34%] h-[24px] sm:h-[25px] rounded-full bg-black
                 flex items-center justify-end pr-[7px] sm:pr-[9px]"
      style={{ boxShadow: "inset 0 0 0 0.75px rgba(255,255,255,0.07)" }}
    >
      {/* Camera housing — dark recessed circle behind the lens */}
      <div
        className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] rounded-full shrink-0
                   flex items-center justify-center"
        style={{
          background: "radial-gradient(circle at 38% 38%, #1c1c22, #080808)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        {/* Lens — blue-tinted gradient with glow */}
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

// iOS-style status bar — time on the left, signal/wifi/battery icons on the right
function StatusBar() {
  return (
    <div
      aria-hidden
      className="flex justify-between items-center h-full ps-3 sm:ps-6 pe-2 sm:px-5
                 text-xs font-semibold tracking-[0.3px] text-white"
      style={{ fontFamily: "-apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif" }}
    >
      {/* Time — 9:41 is the classic Apple marketing timestamp */}
      <span className="inline-block mt-0.5">9:41</span>

      <div className="flex-1" />

      {/* Status icons — signal, wifi, battery */}
      <div className="flex gap-[1.5px] sm:gap-1 sm:items-center">

        {/* Signal */}
        <svg width="15" height="10" viewBox="0 0 16 12" fill="none" aria-hidden>
          <rect x="0"    y="8" width="3"   height="4"  rx="0.5" fill="white" />
          <rect x="4.5"  y="5" width="3"   height="7"  rx="0.5" fill="white" />
          <rect x="9"    y="2" width="3"   height="10" rx="0.5" fill="white" />
          <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" fill="white" opacity={0.35} />
        </svg>

        {/* WiFi */}
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

// Thin swipe-home bar pinned to the bottom of the screen
function HomeIndicator() {
  return (
    <div
      aria-hidden
      className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-25 h-1 rounded-xs z-20"
      style={{ background: "hsla(0 0% 100% / 0.25)" }}
    />
  );
}

// Left / right arrow buttons flanking the phone — hidden (not just disabled) when at the first or last slide
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
//==========================================================================
// MAIN COMPONENT — renders the phone shell, carousel, and pagination dots
//==========================================================================

export default function IPhoneMockup({
  slides,
  paginationDotColor = "white",
}: IPhoneMockupProps) {
  const [active, setActive] = useState(0);
  const snapRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

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

  useEffect(() => {
    return () => { if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current); };
  }, []);

  const scrollToSlide = (idx: number) => {
    const el = snapRef.current;
    if (!el || idx < 0 || idx >= slides.length) return;

    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    const start = el.scrollLeft;
    const target = idx * el.clientWidth;
    const delta = target - start;
    if (delta === 0) return;

    const duration = 420;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    el.style.scrollSnapType = "none";

    const step = (now: number) => {
      if (startTime === null) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      el.scrollLeft = start + delta * easeInOutCubic(progress);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        el.scrollLeft = target;
        el.style.scrollSnapType = "";
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  };

  return (
    <div className="flex flex-col items-center gap-3 select-none">

      {/* Row containing the prev/next arrows and the phone shell */}
      <div className="flex items-center justify-center gap-8">

        {slides.length > 1 && <NavArrow
          direction="prev"
          disabled={active === 0}
          onClick={() => scrollToSlide(active - 1)}
        />}

        {/* Phone outer shell — gradient aluminum bezel with hardware buttons */}
        <div className="w-[60vw] h-117 sm:w-65 sm:h-130 md:w-72.5 md:h-137.5 lg:w-[320px] lg:h-146 rounded-[46px] bg-[linear-gradient(145deg,#2a2a2e_0%,#1c1c1e_50%,#161618_100%)] p-1 relative shrink-0">

          {/* Left side — two volume buttons */}
          <div className="absolute -left-[2.5px] top-31.5 w-[2.5px] h-11 bg-[linear-gradient(180deg,#3a3a3e,#2a2a2e)] rounded-l-xs" />
          <div className="absolute -left-[2.5px] top-45    w-[2.5px] h-11 bg-[linear-gradient(180deg,#3a3a3e,#2a2a2e)] rounded-l-xs" />
          {/* Right side — power button */}
          <div className="absolute -right-0.75 top-35 w-0.75 h-15 bg-[linear-gradient(180deg,#3a3a3e,#2a2a2e)] rounded-r-xs" />

          {/* Screen — clipped rounded rectangle containing all screen UI */}
          <div className="w-full h-full rounded-[43px] overflow-hidden relative ">

            {/* Status chrome — fixed bar at the top holding the Dynamic Island and status bar */}
            <div className="absolute top-0 inset-x-0 z-15 px-2.5 sm:px-1 h-8 sm:h-9 bg-[#0e0e0e]">
              <DynamicIsland />
              <StatusBar />
            </div>

            {/* Horizontally scrollable snap carousel — one slide per full screen width */}
            <div
              ref={snapRef}
              className="iphone-snap flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] mt-8 w-full h-full"
            >
              {slides.map((slide, i) => (
                <div
                  key={i}
                  className="min-w-full w-full snap-start snap-always h-full"
                >
                  <div className="iphone-scroll overflow-y-auto h-full [scrollbar-width:none]">
                    <Image
                      src={slide.image}
                      alt={slide.alt ?? `Slide ${i + 1}`}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-full h-auto block"
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Fade gradient — softens the bottom edge of the screenshot into the bezel */}
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

      {/* Pagination dots — active slide shown as a wider pill, others as small circles */}
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
                : { width: "0.5rem",  height: "0.5rem", background: "rgba(255,255,255,0.3)" }
            }
          />
        ))}
      </div>}

    </div>
  );
}
