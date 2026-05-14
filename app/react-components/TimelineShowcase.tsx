"use client";

import { useEffect, useState } from "react";
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

function ColorControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [draft, setDraft] = useState(value);
  useEffect(() => { setDraft(value); }, [value]);

  const commit = (raw: string) => {
    const hex = raw.startsWith("#") ? raw : `#${raw}`;
    if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
      onChange(hex);
      setDraft(hex);
    } else {
      setDraft(value);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-medium tracking-widest text-zinc-500 uppercase w-12 shrink-0">
        {label}
      </span>
      <label className="relative cursor-pointer shrink-0">
        <span
          className="h-5 w-5 rounded-full border border-white/20 block"
          style={{ background: value }}
        />
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
        />
      </label>
      <input
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={(e) => commit(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && commit(e.currentTarget.value)}
        className="w-[4.5rem] bg-white/5 border border-white/[0.08] rounded-md px-2 py-1 text-xs text-zinc-300 font-mono focus:outline-none focus:border-white/25 transition-colors"
        maxLength={7}
        spellCheck={false}
      />
    </div>
  );
}

export default function TimelineShowcase() {
  const [variant, setVariant] = useState<Variant>("bullet");
  const [beamColor, setBeamColor] = useState("#ffffff");
  const [markerColor, setMarkerColor] = useState("#ffffff");

  return (
    <div className="w-full">
      <div className="flex justify-center mb-12">
        <div className="inline-flex flex-col sm:flex-row items-start sm:items-stretch gap-5 sm:gap-0 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 sm:divide-x divide-white/10">

          <div className="flex flex-col gap-2.5 sm:pe-6">
            <span className="text-[10px] font-medium tracking-widest text-zinc-600 uppercase">
              Variant
            </span>
            <div className="flex rounded-lg bg-white/5 border border-white/[0.08] p-0.5 gap-0.5">
              {VARIANTS.map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-all duration-200 cursor-pointer ${
                    variant === v
                      ? "bg-white/15 text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2.5 sm:ps-6">
            <span className="text-[10px] font-medium tracking-widest text-zinc-600 uppercase">
              Colors
            </span>
            <div className="flex flex-col gap-2.5">
              <ColorControl label="Beam" value={beamColor} onChange={setBeamColor} />
              <ColorControl label="Marker" value={markerColor} onChange={setMarkerColor} />
            </div>
          </div>

        </div>
      </div>

      <Timeline
        data={steps}
        variant={variant}
        accentColor={beamColor}
        markerColor={markerColor}
      />
    </div>
  );
}
