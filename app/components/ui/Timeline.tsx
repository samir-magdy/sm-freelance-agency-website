"use client";

import { useScroll, useTransform, motion, useMotionValueEvent } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export function Timeline({ data }: { data: TimelineEntry[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [trackTop, setTrackTop] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const measure = () => {
      const items = itemRefs.current.filter(Boolean) as HTMLElement[];
      if (items.length === 0) {
        setHeight(container.getBoundingClientRect().height);
        setTrackTop(0);
        return;
      }
      const containerRect = container.getBoundingClientRect();
      const firstTop = items[0].getBoundingClientRect().top - containerRect.top;
      const lastItem = items[items.length - 1];
      const lastBottom = lastItem.getBoundingClientRect().bottom - containerRect.top;
      setTrackTop(firstTop);
      setHeight(lastBottom - firstTop);
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Track which bullet points the beam has passed
  useMotionValueEvent(heightTransform, "change", (beamHeight) => {
    if (!ref.current) return;
    const containerTop = ref.current.getBoundingClientRect().top + trackTop;
    let newActive = -1;
    for (let i = 0; i < itemRefs.current.length; i++) {
      const el = itemRefs.current[i];
      if (!el) continue;
      const bulletTop = el.getBoundingClientRect().top - containerTop;
      if (beamHeight >= bulletTop + 20) {
        newActive = i;
      }
    }
    setActiveIndex(newActive);
  });

  return (
    <div className="w-full md:pt-8 pt-16" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto ">
        {data.map((item, index) => (
          <div
            key={index}
            ref={(el) => { itemRefs.current[index] = el; }}
            className="flex justify-start min-h-[20rem] md:min-h-0 md:py-24 md:gap-24"
          >
            <div className="sticky flex flex-col md:flex-row z-[1] items-center md:w-full">
              <div className="h-14 absolute start-3 w-10 rounded-full bg-background flex items-center justify-center">
                <div
                  className={`h-4 w-4 rounded-full border transition-colors duration-500 ${
                    index <= activeIndex
                      ? "bg-brand-accent border-brand-accent shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                      : "bg-surface-low border-border-subtle"
                  }`}
                />
              </div>
              <h3 className="hidden md:block md:ps-20 md:text-heading font-bold text-content-heading">
                {item.title}
              </h3>
            </div>

            <div className="relative ps-20 pe-4 md:ps-4 w-full flex flex-col md:block">
              <h3 className="md:hidden block text-heading text-start font-semibold text-content-heading">
                {item.title}
              </h3>
              <div className="flex-1 flex items-center md:block">
                {item.content}
              </div>
            </div>
          </div>
        ))}
        <div
          style={{ height: height + "px", top: trackTop + "px" }}
          className="absolute md:start-8 start-8 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-border-subtle to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-brand-accent via-brand-secondary to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
