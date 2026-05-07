"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/* ─────────────────────────────────────
   Types
   ───────────────────────────────────── */

export interface TimelineItem {
  title: string;
  content: ReactNode;
  icon?: ReactNode;
}

export interface TimelineProps {
  data: TimelineItem[];
  /**
   * Visual layout of the timeline.
   * @default "vertical"
   */
  variant?: "vertical" | "horizontal" | "icon" | "numbered";
  /**
   * Color of the beam and active dots. Accepts any valid CSS color.
   * @default "white"
   */
  accentColor?: string;
}

/* ─────────────────────────────────────
   Shared hook — vertical scroll beam
   Used by: vertical, icon, numbered
   ───────────────────────────────────── */

function useVerticalBeam(accentColor: string) {
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
      const lastItem = items[items.length - 1];
      const lastBottom = lastItem.getBoundingClientRect().bottom - containerRect.top;
      const newTrackTop = firstTop;
      const newHeight = lastBottom - firstTop;
      setTrackTop(newTrackTop);
      setHeight(newHeight);
      trackTopRef.current = newTrackTop;
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
      const trackOffset = trackTopRef.current;
      const startY = containerDocTop + trackOffset - wh * 0.5;
      const endY = containerDocTop + trackOffset + height - wh * 1;
      const progress = Math.max(0, Math.min(1, (window.scrollY - startY) / (endY - startY)));
      const beamHeight = progress * height;
      const opacity = Math.min(1, progress / 0.1);

      beam.style.height = `${beamHeight}px`;
      beam.style.opacity = `${opacity}`;

      if (!ref.current) return;
      const containerTop = ref.current.getBoundingClientRect().top + trackTopRef.current;
      let newActive = -1;
      for (let i = 0; i < itemRefs.current.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const bulletTop = el.getBoundingClientRect().top - containerTop;
        if (beamHeight >= bulletTop + 20) newActive = i;
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

  const beamGradient = `linear-gradient(to top, transparent 0%, ${accentColor} 15%, transparent 100%)`;

  return { ref, containerRef, beamRef, height, trackTop, activeIndex, itemRefs, beamGradient };
}

/* ─────────────────────────────────────
   VerticalTimeline
   ───────────────────────────────────── */

function VerticalTimeline({ data, accentColor }: { data: TimelineItem[]; accentColor: string }) {
  const { ref, containerRef, beamRef, height, trackTop, activeIndex, itemRefs, beamGradient } =
    useVerticalBeam(accentColor);

  return (
    <div className="w-full" ref={containerRef}>
      <div ref={ref} className="relative max-w-5xl mx-auto">
        <ol className="list-none">
          {data.map((item, index) => (
            <li
              key={index}
              ref={(el) => { itemRefs.current[index] = el; }}
              className="flex min-h-80 md:min-h-0 md:py-28"
            >
              <div className="sticky flex flex-col justify-between md:flex-row z-1 items-center md:w-full">
                <div className="h-12 md:h-14 absolute inset-s-0 sm:inset-s-3 w-10 rounded-full bg-background flex items-center justify-center">
                  <div
                    className={`h-4 w-4 rounded-full border transition-colors duration-500 ${
                      index <= activeIndex ? "" : "bg-zinc-900 border-zinc-700"
                    }`}
                    style={
                      index <= activeIndex
                        ? {
                            background: accentColor,
                            borderColor: accentColor,
                            filter: `drop-shadow(0 0 6px ${accentColor})`,
                          }
                        : undefined
                    }
                  />
                </div>
                <h3 className="hidden md:block md:ps-18 text-4xl font-bold text-zinc-200">
                  {item.title}
                </h3>
              </div>

              <div className="relative ps-14 md:ps-0 w-full flex flex-col md:block pt-1.5 md:pt-0">
                <h3 className="md:hidden text-3xl block text-start font-semibold text-zinc-200">
                  {item.title}
                </h3>
                <div className="flex-1 flex items-center md:block md:max-w-[90%]">
                  {item.content}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div
          className="absolute md:inset-s-8 inset-s-5 overflow-hidden w-0.5"
          style={{
            height: height + "px",
            top: trackTop + "px",
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 99%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
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

/* ─────────────────────────────────────
   IconTimeline
   Vertical layout — item.icon in dot
   ───────────────────────────────────── */

function IconTimeline({ data, accentColor }: { data: TimelineItem[]; accentColor: string }) {
  const { ref, containerRef, beamRef, height, trackTop, activeIndex, itemRefs, beamGradient } =
    useVerticalBeam(accentColor);

  return (
    <div className="w-full" ref={containerRef}>
      <div ref={ref} className="relative max-w-5xl mx-auto">
        <ol className="list-none">
          {data.map((item, index) => (
            <li
              key={index}
              ref={(el) => { itemRefs.current[index] = el; }}
              className="flex min-h-80 md:min-h-0 md:py-28"
            >
              <div className="sticky flex flex-col justify-between md:flex-row z-1 items-center md:w-full">
                <div className="h-14 absolute inset-s-0 sm:inset-s-1 w-12 rounded-full bg-background flex items-center justify-center">
                  <div
                    className="h-10 w-10 rounded-full border flex items-center justify-center transition-all duration-500"
                    style={
                      index <= activeIndex
                        ? {
                            borderColor: accentColor,
                            filter: `drop-shadow(0 0 8px ${accentColor})`,
                            background: "rgba(255,255,255,0.05)",
                          }
                        : {
                            borderColor: "rgba(255,255,255,0.15)",
                            background: "transparent",
                          }
                    }
                  >
                    {item.icon ?? (
                      <span
                        className="text-xs font-bold"
                        style={{ color: index <= activeIndex ? accentColor : "rgba(255,255,255,0.35)" }}
                      >
                        {index + 1}
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="hidden md:block md:ps-20 text-4xl font-bold text-zinc-200">
                  {item.title}
                </h3>
              </div>

              <div className="relative ps-16 md:ps-0 w-full flex flex-col md:block pt-1.5 md:pt-0">
                <h3 className="md:hidden text-3xl block text-start font-semibold text-zinc-200">
                  {item.title}
                </h3>
                <div className="flex-1 flex items-center md:block md:max-w-[90%]">
                  {item.content}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div
          className="absolute md:inset-s-8 inset-s-5 overflow-hidden w-0.5"
          style={{
            height: height + "px",
            top: trackTop + "px",
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 99%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
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

/* ─────────────────────────────────────
   NumberedTimeline
   Vertical layout — step number in dot
   ───────────────────────────────────── */

function NumberedTimeline({ data, accentColor }: { data: TimelineItem[]; accentColor: string }) {
  const { ref, containerRef, beamRef, height, trackTop, activeIndex, itemRefs, beamGradient } =
    useVerticalBeam(accentColor);

  return (
    <div className="w-full" ref={containerRef}>
      <div ref={ref} className="relative max-w-5xl mx-auto">
        <ol className="list-none">
          {data.map((item, index) => (
            <li
              key={index}
              ref={(el) => { itemRefs.current[index] = el; }}
              className="flex min-h-80 md:min-h-0 md:py-28"
            >
              <div className="sticky flex flex-col justify-between md:flex-row z-1 items-center md:w-full">
                <div className="h-14 absolute inset-s-0 sm:inset-s-1 w-12 rounded-full bg-background flex items-center justify-center">
                  <div
                    className="h-10 w-10 rounded-full border flex items-center justify-center text-sm font-bold transition-all duration-500"
                    style={
                      index <= activeIndex
                        ? {
                            color: accentColor,
                            borderColor: accentColor,
                            filter: `drop-shadow(0 0 6px ${accentColor})`,
                          }
                        : {
                            color: "rgba(255,255,255,0.35)",
                            borderColor: "rgba(255,255,255,0.15)",
                          }
                    }
                  >
                    {index + 1}
                  </div>
                </div>
                <h3 className="hidden md:block md:ps-20 text-4xl font-bold text-zinc-200">
                  {item.title}
                </h3>
              </div>

              <div className="relative ps-16 md:ps-0 w-full flex flex-col md:block pt-1.5 md:pt-0">
                <h3 className="md:hidden text-3xl block text-start font-semibold text-zinc-200">
                  {item.title}
                </h3>
                <div className="flex-1 flex items-center md:block md:max-w-[90%]">
                  {item.content}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div
          className="absolute md:inset-s-8 inset-s-5 overflow-hidden w-0.5"
          style={{
            height: height + "px",
            top: trackTop + "px",
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 99%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
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

/* ─────────────────────────────────────
   HorizontalTimeline
   Left-to-right scroll-driven beam
   ───────────────────────────────────── */

function HorizontalTimeline({ data, accentColor }: { data: TimelineItem[]; accentColor: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [trackLeft, setTrackLeft] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const [trackY, setTrackY] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const trackWidthRef = useRef(0);
  const dotXRef = useRef<number[]>([]);
  const activeIndexRef = useRef(-1);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const measure = () => {
      const dots = dotRefs.current.filter(Boolean) as HTMLDivElement[];
      if (dots.length < 2) return;
      const wRect = wrapper.getBoundingClientRect();
      const firstDot = dots[0].getBoundingClientRect();
      const lastDot = dots[dots.length - 1].getBoundingClientRect();
      const firstCX = firstDot.left + firstDot.width / 2 - wRect.left;
      const lastCX = lastDot.left + lastDot.width / 2 - wRect.left;
      const centerY = firstDot.top + firstDot.height / 2 - wRect.top - 1;
      const tw = lastCX - firstCX;
      const positions = dots.map((dot) => {
        const r = dot.getBoundingClientRect();
        return r.left + r.width / 2 - wRect.left - firstCX;
      });
      setTrackLeft(firstCX);
      setTrackWidth(tw);
      setTrackY(centerY);
      trackWidthRef.current = tw;
      dotXRef.current = positions;
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const beam = beamRef.current;
    if (!container || !beam || trackWidth === 0) return;

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const wh = window.innerHeight;
      const rect = container.getBoundingClientRect();
      const containerDocTop = rect.top + window.scrollY;
      const startY = containerDocTop - wh * 0.7;
      const endY = containerDocTop + rect.height - wh * 0.3;
      const progress = Math.max(0, Math.min(1, (window.scrollY - startY) / (endY - startY)));
      const beamWidth = progress * trackWidthRef.current;
      const opacity = Math.min(1, progress / 0.05);

      beam.style.width = `${beamWidth}px`;
      beam.style.opacity = `${opacity}`;

      const positions = dotXRef.current;
      let newActive = -1;
      for (let i = 0; i < positions.length; i++) {
        if (beamWidth >= positions[i] + 4) newActive = i;
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
  }, [trackWidth]);

  return (
    <div className="w-full" ref={containerRef}>
      <div className="max-w-5xl mx-auto overflow-x-auto">
        <div className="relative" ref={wrapperRef}>
          <ol className="flex list-none">
            {data.map((item, index) => (
              <li
                key={index}
                className="flex flex-col items-center gap-3 flex-1 min-w-[100px] px-2 pb-4"
              >
                <div
                  ref={(el) => { dotRefs.current[index] = el; }}
                  className="w-4 h-4 rounded-full border transition-colors duration-500 relative z-10 shrink-0"
                  style={
                    index <= activeIndex
                      ? {
                          background: accentColor,
                          borderColor: accentColor,
                          filter: `drop-shadow(0 0 6px ${accentColor})`,
                        }
                      : { background: "#18181b", borderColor: "#3f3f46" }
                  }
                />
                <h3 className="text-sm md:text-base font-bold text-zinc-200 text-center leading-tight">
                  {item.title}
                </h3>
              </li>
            ))}
          </ol>

          {/* Track + beam — rendered after measurement */}
          {trackWidth > 0 && (
            <div
              className="absolute pointer-events-none"
              style={{ top: trackY, left: trackLeft, width: trackWidth, height: 2 }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: "rgba(255,255,255,0.10)" }}
              />
              <div
                ref={beamRef}
                className="absolute inset-y-0 left-0 w-0 opacity-0 rounded-full"
                style={{
                  background: accentColor,
                  filter: `drop-shadow(0 0 4px ${accentColor})`,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   Public export — dispatcher
   ───────────────────────────────────── */

export function Timeline({
  data,
  variant = "vertical",
  accentColor = "white",
}: TimelineProps) {
  if (variant === "horizontal") return <HorizontalTimeline data={data} accentColor={accentColor} />;
  if (variant === "icon")       return <IconTimeline data={data} accentColor={accentColor} />;
  if (variant === "numbered")   return <NumberedTimeline data={data} accentColor={accentColor} />;
  return <VerticalTimeline data={data} accentColor={accentColor} />;
}
