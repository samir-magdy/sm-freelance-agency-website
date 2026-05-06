"use client";

import { useState, useRef, useEffect } from "react";

export interface Slide {
  image: string;
  alt?: string;
  url?: string;
}

export interface MacMockupProps {
  slides: Slide[];
  paginationDotColor?: string;
}

function extractDomain(url?: string): string {
  // Fallback shown in the address bar when a slide has no url — change to your own placeholder if you prefer.
  if (!url) return "yourwebsite.com";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function TrafficLights() {
  return (
    <div className="flex items-center gap-[7px] shrink-0">
      <div className="w-3 h-3 rounded-full bg-[#ff5f57] ring-[0.5px] ring-black/20" />
      <div className="w-3 h-3 rounded-full bg-[#febc2e] ring-[0.5px] ring-black/20" />
      <div className="w-3 h-3 rounded-full bg-[#28c840] ring-[0.5px] ring-black/20" />
    </div>
  );
}

function LockIcon() {
  return (
    <svg
      width="9"
      height="11"
      viewBox="0 0 9 11"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <rect
        x="0.75"
        y="4.75"
        width="7.5"
        height="5.5"
        rx="1.25"
        stroke="#6e6e73"
        strokeWidth="1.1"
      />
      <path
        d="M2.5 4.75V3.25a2 2 0 014 0v1.5"
        stroke="#6e6e73"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BrowserChrome({ url }: { url?: string }) {
  const domain = extractDomain(url);
  return (
    <div
      className="flex items-center gap-3 px-4 h-10 shrink-0 border-b border-black/40"
      style={{
        background: "linear-gradient(180deg, #272729 0%, #222224 100%)",
      }}
    >
      <TrafficLights />
      <div className="flex-1 flex justify-center">
        <div
          className="flex items-center gap-1.5 h-[26px] w-full max-w-[260px] rounded-[6px] px-2.5"
          style={{ background: "rgba(255,255,255,0.07)" }}
        >
          <LockIcon />
          <span
            className="text-[#8e8e93] truncate"
            style={{
              fontSize: "11.5px",
              fontFamily:
                "-apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif",
              fontWeight: 400,
              letterSpacing: "0.1px",
            }}
          >
            {domain}
          </span>
        </div>
      </div>
      <div className="w-[52px] shrink-0" />
    </div>
  );
}

interface NavArrowProps {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}

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
        ${
          disabled
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

export default function MacMockup({
  slides,
  // Active pagination dot color — any valid CSS color: "white", "#f5a623", "hsl(270 80% 60%)", etc.
  paginationDotColor = "white",
}: MacMockupProps) {
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
    return () => {
      if (animFrameRef.current !== null)
        cancelAnimationFrame(animFrameRef.current);
    };
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

    // Slide transition duration in milliseconds — lower is snappier, higher is more gradual.
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

  const activeSlide = slides[active];

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      <div className="flex items-center justify-center gap-8">
        <NavArrow
          direction="prev"
          disabled={active === 0}
          onClick={() => scrollToSlide(active - 1)}
        />

        {/* Browser window */}
        <div
          // Responsive widths — adjust these breakpoint values to fit your layout.
          // aspect-[13/10] on mobile and aspect-[15/10] on desktop set the window height relative to its width.
          // Match the aspect ratio to your screenshot dimensions for the best fit (e.g. aspect-video for 16:9 shots).
          className="w-[88vw] sm:w-[460px] md:w-[560px] lg:w-[660px] overflow-hidden flex flex-col aspect-[13/10] md:aspect-[15/10]"
          style={{
            borderRadius: "10px",
            background: "#000",
            // Drop shadow depth and the subtle outline around the window frame.
            // The last layer (0 0 0 1px rgba(255,255,255,0.06)) is a thin border glow — increase its opacity to make it more visible.
            boxShadow:
              "0 24px 80px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)",
          }}
        >
          <BrowserChrome url={activeSlide?.url} />

          <div
            ref={snapRef}
            className="mac-snap flex flex-1 min-h-0 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none]"
            dir="ltr"
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className="min-w-full h-full snap-start snap-always overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {slide.url ? (
                  <img
                    src={slide.image}
                    alt={slide.alt ?? `Slide ${i + 1}`}
                    className="w-full h-auto block"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                ) : (
                  <img
                    src={slide.image}
                    alt={slide.alt ?? `Slide ${i + 1}`}
                    className="w-full h-auto block"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <NavArrow
          direction="next"
          disabled={active === slides.length - 1}
          onClick={() => scrollToSlide(active + 1)}
        />
      </div>

      {/* Pagination dots */}
      <div
        className="flex items-center gap-1.5"
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
            // Inactive dot: circle (0.5rem × 0.5rem) — change rgba(255,255,255,0.3) to adjust the inactive dot color and opacity.
            style={
              i === active
                ? {
                    width: "1.25rem",
                    height: "0.5rem",
                    background: paginationDotColor,
                  }
                : {
                    width: "0.5rem",
                    height: "0.5rem",
                    background: "rgba(255,255,255,0.3)",
                  }
            }
          />
        ))}
      </div>
    </div>
  );
}
