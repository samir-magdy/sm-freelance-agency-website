"use client";

import { useState } from "react";
import { Timeline } from "./components/timeline/Timeline";
import type { TimelineProps } from "./components/timeline/Timeline";

const steps = [
  {
    title: "Discovery",
    icon: "Search",
    content: (
      <div className="rounded-xl md:border md:border-white/10 md:bg-white/5 md:p-6">
        <p className="text-zinc-300/90 text-xl leading-relaxed">
          We dig into your goals, your users, and your constraints. Every
          decision from here is grounded in research, not guesswork.
        </p>
      </div>
    ),
  },
  {
    title: "Design",
    icon: "Paintbrush",
    content: (
      <div className="rounded-xl md:border md:border-white/10 md:bg-white/5 md:p-6">
        <p className="text-zinc-300/90 text-xl leading-relaxed">
          Wireframes first, pixels second. We move fast in low-fidelity so
          there&apos;s room to challenge assumptions before anything is built.
        </p>
      </div>
    ),
  },
  {
    title: "Development",
    icon: "Code2",
    content: (
      <div className="rounded-xl md:border md:border-white/10 md:bg-white/5 md:p-6">
        <p className="text-zinc-300/90 text-xl leading-relaxed">
          Clean, performant code. No bloated libraries, no shortcuts that
          haunt you later.
        </p>
      </div>
    ),
  },
  {
    title: "Testing",
    icon: "FlaskConical",
    content: (
      <div className="rounded-xl md:border md:border-white/10 md:bg-white/5 md:p-6">
        <p className="text-zinc-300/90 text-xl leading-relaxed">
          Cross-browser checks, responsive testing, and edge cases caught
          before they become your problem.
        </p>
      </div>
    ),
  },
  {
    title: "Launch",
    icon: "Rocket",
    content: (
      <div className="rounded-xl md:border md:border-white/10 md:bg-white/5 md:p-6">
        <p className="text-zinc-300/90 text-xl leading-relaxed">
          We handle deployment and handover. You get a product that works —
          and a team that stays reachable after.
        </p>
      </div>
    ),
  },
];

type Variant = NonNullable<TimelineProps["variant"]>;
const VARIANTS: Variant[] = ["bullet", "icon", "numbered"];

export default function TimelineShowcase() {
  const [variant, setVariant] = useState<Variant>("bullet");

  return (
    <div className="w-full">
      <div className="flex justify-center gap-2 mb-10">
        {VARIANTS.map((v) => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            className={`px-4 py-1.5 rounded-full border text-sm font-medium capitalize transition-all duration-200 cursor-pointer ${
              variant === v
                ? "bg-white/15 text-white border-white/30"
                : "text-zinc-500 border-white/[0.06] hover:text-zinc-300 hover:border-white/15"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
      <Timeline data={steps} variant={variant} />
    </div>
  );
}
