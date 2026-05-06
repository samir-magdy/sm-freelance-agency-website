"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export interface TimelineItem {
  title: string;
  content: ReactNode;
}

export function Timeline({ data }: { data: TimelineItem[] }) {
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
      // Controls when the beam starts filling: 0.5 means the first dot must reach the vertical
      // center of the screen. Raise toward 0.8 to start earlier, lower toward 0.2 to start later.
      const startY = containerDocTop + trackOffset - wh * 0.5;
      // Controls when the beam finishes: 1 means the last dot reaches the bottom of the screen.
      // Raise toward 1.3 to finish later, lower toward 0.7 to finish sooner.
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

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [height]);

  return (
    <div className="w-full" ref={containerRef}>
      {/* max-w-5xl caps how wide the timeline spans on large screens.
          Change to max-w-3xl for narrower, max-w-7xl for wider, or remove the class for full width. */}
      <div ref={ref} className="relative max-w-5xl mx-auto">
        <ol className="list-none">
          {data.map((item, index) => (
            <li
              key={index}
              ref={(el) => { itemRefs.current[index] = el; }}
              // min-h-80 is the minimum row height on mobile.
              // md:py-28 is the vertical padding between steps on desktop — increase to md:py-36 or md:py-40 to spread steps further apart.
              className="flex min-h-80 md:min-h-0 md:py-28"
            >
              <div className="sticky flex flex-col justify-between md:flex-row z-1 items-center md:w-full">
                {/* Change bg-background to match your background color */}
                <div className="h-12 md:h-14 absolute inset-s-0 sm:inset-s-3 w-10 rounded-full bg-background flex items-center justify-center">
                  {/* Active dot (beam has reached this step):
                      bg-zinc-200 and border-zinc-200 are the fill and border — swap both to your brand color, e.g. bg-violet-400 border-violet-400.
                      The shadow-[...] is the glow — change the rgb values to match your color, or remove the shadow class entirely to kill the glow.
                      Inactive dot (not yet reached):
                      bg-zinc-900 and border-zinc-700 should closely match your page background so the dot blends in.
                      duration-500 is the transition speed in ms — lower is snappier, higher is slower. */}
                  <div
                    className={`h-4 w-4 rounded-full border transition-colors duration-500 ${
                      index <= activeIndex
                        ? "bg-zinc-200 border-zinc-200 shadow-[0_0_12px_rgb(228_228_231/0.7)]"
                        : "bg-zinc-900 border-zinc-700"
                    }`}
                  />
                </div>
                {/* Desktop title — change text-4xl (size), font-bold (weight), and text-zinc-200 (color) to match your design */}
                <h3 className="hidden md:block md:ps-18 text-4xl font-bold text-zinc-200">
                  {item.title}
                </h3>
              </div>

              <div className="relative ps-14 md:ps-0 w-full flex flex-col md:block pt-1.5 md:pt-0">
                {/* Mobile title — same idea: change text-3xl, font-semibold, and text-zinc-200 */}
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
        {/* Track line — the faint vertical line visible behind the beam.
            Change rgba(255,255,255,0.15) to adjust how visible it is — raise the opacity to make it more prominent.
            Leave the mask gradient as-is; it fades the line in and out at the top and bottom edges. */}
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
          {/* Beam — the bright light that fills as the user scrolls.
              To change its color, replace rgba(255,255,255,0.6) and #ffffff with your brand color.
              Example for a violet beam: rgba(167,139,250,0.6) and #a78bfa */}
          <div
            ref={beamRef}
            className="absolute inset-x-0 top-0 w-0.5 h-0 opacity-0 rounded-full"
            style={{
              background: "linear-gradient(to top, transparent 0%, rgba(255,255,255,0.6) 5%, #ffffff 15%, transparent 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
