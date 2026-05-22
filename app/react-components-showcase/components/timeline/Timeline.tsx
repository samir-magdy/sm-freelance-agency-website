"use client";

import React, { useEffect, useRef, useState } from "react";

// Data shape for a single timeline entry
export interface TimelineItem {
  title: string;
  content: string;
  icon?: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
}

// Props accepted by the Timeline component
export interface TimelineProps {
  data: TimelineItem[];
  variant?: "bullet" | "icon";
  accentColor?: string;
  markerColor?: string;
}

// Scroll-driven hook — measures the track, grows the beam as the user scrolls, and tracks which items are active
function useBulletBeam(accentColor: string) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [trackTop, setTrackTop] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [initialized, setInitialized] = useState(false);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const trackTopRef = useRef(0);
  const activeIndexRef = useRef(-1);
  const initializedRef = useRef(false);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const measure = () => {
      const items = itemRefs.current.filter(Boolean) as HTMLLIElement[];
      if (items.length === 0) {
        setHeight(container.getBoundingClientRect().height);
        setTrackTop(0);
        trackTopRef.current = 0;
        return;
      }
      const containerRect = container.getBoundingClientRect();
      const firstTop = items[0].getBoundingClientRect().top - containerRect.top;
      const lastBottom = items[items.length - 1].getBoundingClientRect().bottom - containerRect.top;
      setTrackTop(firstTop);
      setHeight(lastBottom - firstTop);
      trackTopRef.current = firstTop;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const beam = beamRef.current;
    if (!container || !beam || height === 0) return;
    let rafId = 0;
    const update = () => {
      rafId = 0;
      const wh = window.innerHeight;
      const rect = container.getBoundingClientRect();
      const containerDocTop = rect.top + window.scrollY;
      const startY = containerDocTop + trackTopRef.current - wh * 0.5;
      const naturalEnd = containerDocTop + trackTopRef.current + height - wh;
      const scrollRange = (naturalEnd - startY) / 0.8;
      const progress = Math.max(0, Math.min(1, (window.scrollY - startY) / scrollRange));
      const beamHeight = progress * height;
      beam.style.height = `${beamHeight}px`;
      beam.style.opacity = `${Math.min(1, progress / 0.1)}`;
      if (!ref.current) return;
      const containerTop = ref.current.getBoundingClientRect().top + trackTopRef.current;
      let newActive = -1;
      for (let i = 0; i < itemRefs.current.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const pt = parseFloat(getComputedStyle(el).paddingTop) || 0;
        if (beamHeight > 0 && beamHeight >= el.getBoundingClientRect().top - containerTop + pt) newActive = i;
      }
      if (newActive !== activeIndexRef.current) {
        activeIndexRef.current = newActive;
        setActiveIndex(newActive);
      }
      if (!initializedRef.current) {
        initializedRef.current = true;
        setInitialized(true);
      }
    };
    const onScroll = () => { if (!rafId) rafId = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [height]);

  return {
    ref, containerRef, beamRef, height, trackTop, activeIndex, initialized, itemRefs,
    beamGradient: `linear-gradient(to top, transparent 0%, ${accentColor} 15%, transparent 100%)`,
  };
}

// Main component — renders a vertical timeline with a scroll-animated beam and per-item markers
export function Timeline({ data, variant = "bullet", accentColor = "white", markerColor }: TimelineProps) {
  const { ref, containerRef, beamRef, height, trackTop, activeIndex, initialized, itemRefs, beamGradient } =
    useBulletBeam(accentColor);
  const activeMarkerColor = markerColor ?? accentColor;

  const everActiveRef = useRef<Set<number>>(new Set());

  // Variant switch — fades markers out and back in when the variant prop changes
  const [displayedVariant, setDisplayedVariant] = useState(variant);
  const [markerOpacity, setMarkerOpacity] = useState(1);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    setMarkerOpacity(0);
    const t = setTimeout(() => {
      setDisplayedVariant(variant);
      setMarkerOpacity(1);
    }, 150);
    return () => clearTimeout(t);
  }, [variant]);

  const large = displayedVariant !== "bullet";

  return (
    <div className="w-full" ref={containerRef}>
      <div ref={ref} className="relative max-w-5xl mx-auto overflow-x-hidden">

        {/* List of timeline entries */}
        <ol className="list-none">
          {data.map((item, index) => {
            const active = index <= activeIndex;
            const Icon = item.icon;

            if (initialized && active) everActiveRef.current.add(index);
            const revealed = everActiveRef.current.has(index);

            // Entrance animation — slides and fades in from the right when the beam reaches this item
            const fadeStyle: React.CSSProperties | undefined = initialized ? {
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateX(0)" : "translateX(30px)",
              transition: "opacity 600ms ease 200ms, transform 600ms ease 200ms",
            } : undefined;

            return (
              <li
                key={index}
                ref={(el) => { itemRefs.current[index] = el; }}
                className="flex min-h-70 md:min-h-0 md:py-40"
              >
                {/* Left column — sticky marker and desktop title */}
                <div className="sticky flex flex-col justify-between md:flex-row z-1 items-center md:w-full">

                  {/* Marker — bullet dot, numbered circle, or icon depending on variant */}
                  <div
                    className={`absolute rounded-full bg-background flex items-center justify-center ${
                      displayedVariant === "icon"
                        ? "h-20 w-12 inset-s-0 sm:inset-s-1"
                        : large
                        ? "h-14 w-12 inset-s-0 sm:inset-s-1"
                        : "h-12 w-10 inset-s-0 sm:inset-s-3"
                    }`}
                    style={{ opacity: markerOpacity, transition: "opacity 150ms ease" }}
                  >
                    {large ? (
                      <div className="h-20 w-20 sm:ps-2 flex items-center justify-center">
                        {displayedVariant === "icon" && Icon ? (
                          <Icon size={40} className="transition-colors duration-500 sm:pe-0 pe-1.5" style={{ color: active ? activeMarkerColor : "rgba(255,255,255,0.35)" }} />
                        ) : (
                          <span
                            className="font-bold border rounded-full p-4 transition-colors duration-500 sm:pe-0 pe-1.5 text-heading"
                            style={{ color: active ? activeMarkerColor : "rgba(255,255,255,0.35)" }}
                          >
                            {index + 1}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div
                        className={`h-4 w-4 rounded-full border transition-colors duration-500 ${active ? "" : "bg-zinc-900 border-zinc-700"}`}
                        style={active ? { background: activeMarkerColor, borderColor: activeMarkerColor, filter: `drop-shadow(0 0 6px ${activeMarkerColor})` } : undefined}
                      />
                    )}
                  </div>

                  {/* Title — desktop only, sits inline with the marker */}
                  <h3 className={`hidden md:block text-heading font-bold text-zinc-200 ${large ? "md:ps-20" : "md:ps-18"}`}>
                    {item.title}
                  </h3>
                </div>

                {/* Right column — mobile title and content paragraph */}
                <div className={`relative md:ps-0 w-full flex flex-col md:block pt-1.5 md:pt-0 ${large ? "ps-16" : "ps-14"}`}>

                  {/* Title — mobile only */}
                  <h3 className={`md:hidden text-heading block text-start font-semibold text-zinc-200 ${displayedVariant === "icon" ? "pt-4" : "" }`}>
                    {item.title}
                  </h3>

                  {/* Content — fades and slides in when activated by the beam */}
                  <div className="flex-1 flex items-center md:block md:max-w-[90%]" style={fadeStyle}>
                    <p className="text-zinc-300/90 text-subheading leading-relaxed">{item.content}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Track — the static vertical line running the full height of the list */}
        <div
          className="absolute md:inset-s-8 inset-s-5 overflow-hidden w-0.5"
          style={{
            height: height + "px",
            top: trackTop + "px",
            background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 99%)",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          {/* Beam — glowing fill that grows downward as the user scrolls */}
          <div
            ref={beamRef}
            className="absolute inset-x-0 top-0 w-0.5 h-0 opacity-0 rounded-full"
            style={{ background: beamGradient }}
          />
        </div>

      </div>
    </div>
  );
}
