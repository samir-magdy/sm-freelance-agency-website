"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Slide data passed into the carousel
export interface Slide {
  image: string;
  alt?: string;
  url?: string;
}

// Props accepted by the main MacMockup component
export interface MacMockupProps {
  slides: Slide[];
  paginationDotColor?: string;
}

// Sub-components — browser chrome UI

// Extracts the bare hostname from a slide URL for the address bar — falls back to a placeholder
function extractDomain(url?: string): string {
  if (!url) return "yourwebsite.com";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

// Three colored circles in the top-left corner of the browser chrome
function TrafficLights() {
  return (
    <div className="flex items-center gap-[7px] shrink-0">
      <div className="w-3 h-3 rounded-full bg-[#ff5f57] ring-[0.5px] ring-black/20" />
      <div className="w-3 h-3 rounded-full bg-[#febc2e] ring-[0.5px] ring-black/20" />
      <div className="w-3 h-3 rounded-full bg-[#28c840] ring-[0.5px] ring-black/20" />
    </div>
  );
}

// Padlock icon shown to the left of the domain in the address bar
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

// macOS-style dark browser toolbar with traffic lights, address bar, and lock icon
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
        {/* Address bar — centered pill showing the lock icon and current slide domain */}
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
      {/* Spacer — mirrors the traffic lights width to keep the address bar visually centered */}
      <div className="w-[52px] shrink-0" />
    </div>
  );
}

// Left / right arrow buttons flanking the mockup — hidden (not just disabled) when at the first or last slide
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

// Main component — renders the browser shell, carousel, and pagination dots
export default function MacMockup({
  slides,
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

      {/* Row containing the prev/next arrows and the browser window */}
      <div className="flex items-center justify-center gap-8">
        {slides.length > 1 && <NavArrow
          direction="prev"
          disabled={active === 0}
          onClick={() => scrollToSlide(active - 1)}
        />}

        {/* Browser window — macOS dark chrome with a scrollable screenshot area below */}
        <div
          className="w-[88vw] sm:w-[460px] md:w-[560px] lg:w-[660px] overflow-hidden flex flex-col aspect-[13/10] md:aspect-[15/10]"
          style={{
            borderRadius: "10px",
            background: "#000",
            boxShadow:
              "0 24px 80px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)",
          }}
        >
          <BrowserChrome url={activeSlide?.url} />

          {/* Horizontally scrollable snap carousel — one slide per full window width */}
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
            ))}
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
      </div>}

    </div>
  );
}
