"use client";

import { useEffect, useRef, useState } from "react";

export function Timeline({ data }) {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const beamRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [trackTop, setTrackTop] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const itemRefs = useRef([]);
  const trackTopRef = useRef(0);
  const activeIndexRef = useRef(-1);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const measure = () => {
      const items = itemRefs.current.filter(Boolean);
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
      const containerDocBottom = rect.bottom + window.scrollY;

      const startY = containerDocTop - wh * 0.4;
      const endY = containerDocBottom - wh * 0.5;

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
      <div ref={ref} className="relative max-w-7xl mx-auto">
        <ol className="list-none">
          {data.map((item, index) => (
            <li
              key={index}
              ref={(el) => { itemRefs.current[index] = el; }}
              className="flex justify-start min-h-[15rem] md:min-h-0 md:py-28"
            >
              <div className="sticky flex flex-col md:flex-row z-[1] items-center md:w-full">
                <div className="h-12 absolute start-3 w-10 rounded-full bg-background flex items-center justify-center">
                  <div
                    className={`h-4 w-4 rounded-full border transition-colors duration-500 ${
                      index <= activeIndex
                        ? "bg-zinc-200 border-zinc-200 shadow-[0_0_12px_rgb(228_228_231/0.7)]"
                        : "bg-surface-low border-border-subtle"
                    }`}
                  />
                </div>
                <h3 className="hidden md:block md:ps-16 md:text-heading font-bold text-content-heading">
                  {item.title}
                </h3>
              </div>

              <div className="relative ps-16 md:ps-0 w-full flex flex-col md:block pt-2 md:pt-0">
                <h3 className="md:hidden block text-heading text-start font-semibold text-content-heading">
                  {item.title}
                </h3>
                <div className="flex-1 flex items-center md:block max-w-[90%]">
                  {item.content}
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div
          style={{ height: height + "px", top: trackTop + "px" }}
          className="absolute md:start-8 start-8 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-border-subtle to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <div
            ref={beamRef}
            className="absolute inset-x-0 top-0 w-[2px] h-0 opacity-0 bg-gradient-to-t from-icon/60 via-icon to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
