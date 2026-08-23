"use client";

import { useEffect, useState } from "react";
import { Code2, Settings, Zap, Rocket } from "lucide-react";
import { Timeline } from "./components/timeline/Timeline";
import type { TimelineProps } from "./components/timeline/Timeline";

const steps = [
  {
    title: "Add the file",
    icon: Code2,
    content: "Drop Timeline.tsx into your project and import it where needed.",
  },
  {
    title: "Set up your data",
    icon: Settings,
    content: "Create an array of steps. Each step needs a 'title' and 'content' property. When using the icon variant, add an 'icon' property too.",
  },

  {
    title: "Pick your colors",
    icon: Zap,
    content: "Pass colors via accentColor (beam + fallback marker) and markerColor props.",
  },
  {
    title: "You're all set",
    icon: Rocket,
    content: "That's it! If you need further customization check the README.md guide.",
  },
];

type Variant = NonNullable<TimelineProps["variant"]>;
const VARIANTS: Variant[] = ["bullet", "icon"];

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
    <div className="flex items-center gap-3 md:gap-6">
      <span className="text-caption font-medium tracking-widest text-zinc-500 uppercase w-12 shrink-0">
        {label}
      </span>
      <label className="ms-2 sm:ms-4 relative cursor-pointer shrink-0">
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
        className="w-[4.5rem] md:w-24 bg-white/5 border border-white/[0.08] rounded-md px-2 py-1 text-caption text-zinc-300 font-mono focus:outline-none focus:border-white/25 transition-colors"
        maxLength={7}
        spellCheck={false}
      />
    </div>
  );
}

export default function TimelineShowcase() {
  const [variant, setVariant] = useState<Variant>("bullet");
  const [beamColor, setBeamColor] = useState("#c8c4bb");
  const [markerColor, setMarkerColor] = useState("#c9a43d");

  return (
    <div className="w-full">
      <div className="flex justify-center mb-12">
        <div className="flex items-stretch gap-0 rounded-2xl border border-white/10 bg-white/[0.03] px-4 md:px-7 py-4 md:py-5 divide-x divide-white/10">

          <div className="flex flex-col gap-5 pe-4 md:pe-8">
            <span className="text-caption font-medium tracking-widest text-zinc-400 uppercase">
              Variant
            </span>
            <div className="flex rounded-lg bg-white/5 border border-white/[0.08] p-0.5 gap-1">
              {VARIANTS.map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`px-3 md:px-4 py-1.5 md:py-1.5 rounded-md text-caption md:text-base font-medium capitalize transition-all duration-200 cursor-pointer ${
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

          <div className="flex flex-col gap-2 md:gap-3.5 ps-4 md:ps-8">
            <span className="text-caption font-medium tracking-widest text-zinc-400 uppercase">
              Colors
            </span>
            <div className="flex flex-col gap-2.5 md:gap-3.5">
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
