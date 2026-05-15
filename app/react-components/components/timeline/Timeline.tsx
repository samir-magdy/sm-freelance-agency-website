"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  Search, Paintbrush, Code2, FlaskConical, Rocket,
  Star, Zap, Globe, Lock, Settings, Mail, Bell, Heart,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Search, Paintbrush, Code2, FlaskConical, Rocket,
  Star, Zap, Globe, Lock, Settings, Mail, Bell, Heart,
};

export interface TimelineItem {
  title: string;
  content: ReactNode;
  icon?: string;
}

export interface TimelineProps {
  data: TimelineItem[];
  variant?: "bullet" | "icon";
  accentColor?: string;
  markerColor?: string;
}

function useBulletBeam(accentColor: string) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [trackTop, setTrackTop] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const trackTopRef = useRef(0);
  const activeIndexRef = useRef(-1);

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
      const endY = containerDocTop + trackTopRef.current + height - wh;
      const progress = Math.max(0, Math.min(1, (window.scrollY - startY) / (endY - startY)));
      const beamHeight = progress * height;
      beam.style.height = `${beamHeight}px`;
      beam.style.opacity = `${Math.min(1, progress / 0.1)}`;
      if (!ref.current) return;
      const containerTop = ref.current.getBoundingClientRect().top + trackTopRef.current;
      let newActive = -1;
      for (let i = 0; i < itemRefs.current.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        if (beamHeight >= el.getBoundingClientRect().top - containerTop + 20) newActive = i;
      }
      if (newActive !== activeIndexRef.current) {
        activeIndexRef.current = newActive;
        setActiveIndex(newActive);
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
    ref, containerRef, beamRef, height, trackTop, activeIndex, itemRefs,
    beamGradient: `linear-gradient(to top, transparent 0%, ${accentColor} 15%, transparent 100%)`,
  };
}

export function Timeline({ data, variant = "bullet", accentColor = "white", markerColor }: TimelineProps) {
  const { ref, containerRef, beamRef, height, trackTop, activeIndex, itemRefs, beamGradient } =
    useBulletBeam(accentColor);
  const activeMarkerColor = markerColor ?? accentColor;

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
      <div ref={ref} className="relative max-w-5xl mx-auto">
        <ol className="list-none">
          {data.map((item, index) => {
            const active = index <= activeIndex;
            const Icon = item.icon ? ICON_MAP[item.icon] : undefined;

            return (
              <li
                key={index}
                ref={(el) => { itemRefs.current[index] = el; }}
                className="flex min-h-80 md:min-h-0 md:py-28"
              >
                <div className="sticky flex flex-col justify-between md:flex-row z-1 items-center md:w-full">
                  <div
                    className={`absolute rounded-full bg-background flex items-center justify-center ${
                      large
                        ? "h-14 w-12 inset-s-0 sm:inset-s-1"
                        : "h-12 md:h-14 w-10 inset-s-0 sm:inset-s-3"
                    }`}
                    style={{ opacity: markerOpacity, transition: "opacity 150ms ease" }}
                  >
                    {large ? (
                      <div
                        className="h-20 w-20 sm:ps-2 flex items-center justify-center"
                      >
                        {displayedVariant === "icon" && Icon ? (
                          <Icon size={30} className="transition-colors duration-500 sm:pe-0 pe-1.5" style={{ color: active ? activeMarkerColor : "rgba(255,255,255,0.35)" }} />
                        ) : (
                          <span
                            className="font-bold border rounded-full p-4 transition-colors duration-500 sm:pe-0 pe-1.5 text-3xl"
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
                  <h3 className={`hidden md:block text-4xl font-bold text-zinc-200 ${large ? "md:ps-20" : "md:ps-18"}`}>
                    {item.title}
                  </h3>
                </div>

                <div className={`relative md:ps-0 w-full flex flex-col md:block pt-1.5 md:pt-0 ${large ? "ps-16" : "ps-14"}`}>
                  <h3 className="md:hidden text-3xl block text-start font-semibold text-zinc-200">
                    {item.title}
                  </h3>
                  <div className="flex-1 flex items-center md:block md:max-w-[90%]">
                    {item.content}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

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
