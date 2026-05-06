"use client";
// ^ Next.js App Router directive. Safe to remove if you're using Vite / CRA / any other React setup.

/**
 * ╔══════════════════════════════════════════════════════╗
 * ║              IPhoneMockup Component                  ║
 * ║       Interactive iPhone carousel phone mockup       ║
 * ╚══════════════════════════════════════════════════════╝
 *
 * DEPENDENCIES
 *   - React 18+
 *   - Tailwind CSS v4
 *
 * USAGE
 *   import IPhoneMockup from "@/components/IPhoneMockup";
 *
 *   <IPhoneMockup
 *     slides={[
 *       { image: "/screenshots/screen1.png", alt: "Home screen" },
 *       { image: "/screenshots/screen2.png", alt: "Dashboard" },
 *       { image: "/screenshots/screen3.png", alt: "Settings" },
 *     ]}
 *     paginationDotColor="white"
 *   />
 */

import { useState, useRef, useEffect } from "react";

/* ─────────────────────────────────────
   Types
   ───────────────────────────────────── */

export interface Slide {
  /** Path or URL to the screenshot image */
  image: string;
  /** Alt text for the image — recommended for accessibility */
  alt?: string;
}

export interface IPhoneMockupProps {
  /** Array of slides to display inside the phone carousel */
  slides: Slide[];
  /**
   * Color of the active pagination dot.
   * Accepts any valid CSS color string.
   * @default "white"
   */
  paginationDotColor?: string;
}

/* ─────────────────────────────────────
   Sub-components (internal)
   ───────────────────────────────────── */

/**
 * Dynamic Island pill — centered at the top of the screen.
 * Width is a percentage of the screen so it scales with every phone size.
 * The camera housing uses a radial gradient + inset shadow to simulate depth;
 * the lens gets a blue tint glow that reads as a real sensor under ambient light.
 */
function DynamicIsland() {
  return (
    <div
      aria-hidden
      className="absolute top-[4px] sm:top-[5px] left-1/2 -translate-x-1/2 z-20
                 w-[34%] h-[24px] sm:h-[25px] rounded-full bg-black
                 flex items-center justify-end pr-[7px] sm:pr-[9px]"
      style={{ boxShadow: "inset 0 0 0 0.75px rgba(255,255,255,0.07)" }}
    >
      {/* Camera housing — slightly recessed dark circle */}
      <div
        className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] rounded-full shrink-0
                   flex items-center justify-center"
        style={{
          background: "radial-gradient(circle at 38% 38%, #1c1c22, #080808)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        {/* Lens — blue-tinted gradient + glow simulates the camera sensor */}
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

/** iPhone-style status bar — time left, icons right, flanking the Dynamic Island */
function StatusBar() {
  return (
    <div
      aria-hidden
      className="flex justify-between items-center h-full ps-4 sm:ps-6 pe-2 sm:px-5
                 text-[11px] sm:text-xs font-semibold tracking-[0.3px] text-white"
      style={{ fontFamily: "-apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif" }}
    >
      {/* 9:41 is the classic Apple demo time */}
      <span className="inline-block mt-0.5">9:41</span>

      {/* Spacer — the Dynamic Island sits absolutely on top of this gap */}
      <div className="flex-1" />

      <div className="flex gap-[2.5px] sm:gap-1.5 sm:items-center">

        {/* Signal bars */}
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

/** The thin swipe-home bar at the bottom of the screen */
function HomeIndicator() {
  return (
    <div
      aria-hidden
      className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-25 h-1 rounded-xs z-20"
      style={{ background: "hsla(0 0% 100% / 0.25)" }}
    />
  );
}

interface NavArrowProps {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}

/** Left / right carousel navigation arrows flanking the phone */
function NavArrow({ direction, disabled, onClick }: NavArrowProps) {
  const leftPath = <path d="m15 18-6-6 6-6" />;
  const rightPath = <path d="m9 18 6-6-6-6" />;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      className={`
        hidden sm:flex items-center justify-center
        w-11 h-11 rounded-full shrink-0 p-0
        transition-all duration-300 ease-out border
        ${disabled
          ? "bg-transparent border-white/[0.06] text-white/40 cursor-default"
          : "bg-white/[0.1] border-white/[0.12] text-white cursor-pointer hover:border-white/30"
        }
      `}
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

/* ─────────────────────────────────────
   Main Export
   ───────────────────────────────────── */

export default function IPhoneMockup({
  slides,
  paginationDotColor = "white",
}: IPhoneMockupProps) {
  const [active, setActive] = useState(0);
  const snapRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  /* ── Sync native scroll position → active index ── */
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

  /* ── Programmatic scroll to a slide by index ── */
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

    // Slide transition duration in milliseconds — lower is snappier, higher is more gradual.
    const duration = 420;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // Disable snap during animation — prevents end-of-scroll snap correction jitter
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

      {/* ── Arrow ← | Phone | Arrow → ── */}
      <div className="flex items-center justify-center gap-8">

        <NavArrow
          direction="prev"
          disabled={active === 0}
          onClick={() => scrollToSlide(active - 1)}
        />

        {/* ── Phone outer shell — gradient bezel + hardware buttons ── */}
        {/* Responsive phone size — the w/h pairs at each breakpoint control the phone's proportions.
            Keep width and height in roughly a 9:19.5 ratio (standard iPhone) if you change them.
            rounded-[46px] is the outer corner radius; the inner screen uses rounded-[43px] to follow the same curve.
            The gradient simulates a Space Black aluminum finish — swap the hex values to try silver or gold tones. */}
        <div className="w-[61vw] h-115 sm:w-65 sm:h-130 md:w-72.5 md:h-137.5 lg:w-[320px] lg:h-146 rounded-[46px] bg-[linear-gradient(145deg,#2a2a2e_0%,#1c1c1e_50%,#161618_100%)] p-1 relative shrink-0">

          {/* Left volume buttons */}
          <div className="absolute -left-[2.5px] top-31.5 w-[2.5px] h-11 bg-[linear-gradient(180deg,#3a3a3e,#2a2a2e)] rounded-l-xs" />
          <div className="absolute -left-[2.5px] top-45    w-[2.5px] h-11 bg-[linear-gradient(180deg,#3a3a3e,#2a2a2e)] rounded-l-xs" />
          {/* Right power button */}
          <div className="absolute -right-0.75 top-35 w-0.75 h-15 bg-[linear-gradient(180deg,#3a3a3e,#2a2a2e)] rounded-r-xs" />

          {/* ── Phone screen ── */}
          <div className="w-full h-full rounded-[43px] overflow-hidden relative ">

            {/* ── Top chrome: Dynamic Island + status bar ──
                h-11 (44px) matches real iOS status bar proportions at this scale.
                DynamicIsland is absolutely centred inside; StatusBar spans full width
                with the time on the left and icons on the right, flanking the pill. */}
            <div className="absolute top-0 inset-x-0 z-15 px-2.5 sm:px-1 h-8 sm:h-9 bg-[#0e0e0e]">
              <DynamicIsland />
              <StatusBar />
            </div>

            {/* ── Horizontal snap-scroll carousel ── */}
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

            {/* Bottom fade gradient — softens the edge where the screenshot meets the home indicator.
                Change h-10 to increase or decrease the fade height. Remove this div entirely for a hard edge. */}
            <div className="absolute bottom-0 inset-x-0 h-10 bg-[linear-gradient(transparent,rgba(0,0,0,0.5))] pointer-events-none z-10" />

            <HomeIndicator />
          </div>
        </div>

        <NavArrow
          direction="next"
          disabled={active === slides.length - 1}
          onClick={() => scrollToSlide(active + 1)}
        />

      </div>

      {/* ── Pagination dots ── */}
      <div
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
            // Active dot: pill shape (1.25rem wide × 0.5rem tall), filled with paginationDotColor.
            // Inactive dot: circle (0.5rem × 0.5rem) — change rgba(255,255,255,0.3) to adjust inactive dot color/opacity.
            style={
              i === active
                ? { width: "1.25rem", height: "0.5rem", background: paginationDotColor }
                : { width: "0.5rem",  height: "0.5rem", background: "rgba(255,255,255,0.3)" }
            }
          />
        ))}
      </div>

    </div>
  );
}
