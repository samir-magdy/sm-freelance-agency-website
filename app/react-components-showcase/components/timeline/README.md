# Timeline

A scroll-driven animated vertical timeline. A glowing beam fills as the user scrolls, activating each step's marker as it passes.

---

## Requirements

| | |
|---|---|
| React | 18+ |
| Tailwind CSS | **v4 only** |
| lucide-react | any (only needed for the `icon` variant) |

---

## Installation

Copy `Timeline.tsx` into your project (e.g. `src/components/Timeline.tsx`).

If you use the `icon` variant, install lucide-react:

```bash
npm install lucide-react
```

If you only use `bullet`, lucide-react is never imported and you can skip this.

---

## Usage

### Bullet variant (default)

```tsx
import { Timeline } from "@/components/Timeline";

const steps = [
  { title: "Discovery", content: <p className="text-zinc-400 text-lg">Research phase.</p> },
  { title: "Design",    content: <p className="text-zinc-400 text-lg">Wireframes first.</p> },
  { title: "Launch",    content: <p className="text-zinc-400 text-lg">Ship it.</p> },
];

export default function Page() {
  return (
    <section className="py-24 px-4">
      <Timeline data={steps} />
    </section>
  );
}
```

### Icon variant

```tsx
import { Search, Paintbrush, Rocket } from "lucide-react";

const steps = [
  { title: "Discovery", icon: Search,     content: <p className="text-zinc-400 text-lg">Research phase.</p> },
  { title: "Design",    icon: Paintbrush, content: <p className="text-zinc-400 text-lg">Wireframes first.</p> },
  { title: "Launch",    icon: Rocket,     content: <p className="text-zinc-400 text-lg">Ship it.</p> },
];

export default function Page() {
  return (
    <section className="py-24 px-4">
      <Timeline data={steps} variant="icon" accentColor="#a78bfa" />
    </section>
  );
}
```

---

## Props

### `Timeline`

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `TimelineItem[]` | — | **Required.** Array of timeline steps. |
| `className` | `string` | — | Classes applied to the outer wrapper. |
| `variant` | `"bullet" \| "icon"` | `"bullet"` | Controls what renders in the marker beside each step. |
| `accentColor` | `string` | `"white"` | Color of the scrolling beam. Any valid CSS color. |
| `markerColor` | `string` | same as `accentColor` | Color of the active marker. Defaults to `accentColor` when omitted. |

### `TimelineItem`

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | ✅ | Step heading — shown beside the marker on desktop, above the content on mobile. |
| `content` | `ReactNode` | ✅ | The step body. You control all styling — the component renders it as-is with no wrapper styles applied. |
| `icon` | `ComponentType` | — | A React component to render as the marker. Pass the component itself (e.g. `Search` from lucide-react), not a string. Only used when `variant="icon"`. |

---

## Variants

| Value | Marker |
|---|---|
| `"bullet"` | Small filled dot |
| `"icon"` | Icon from the `icon` field — falls back to the step index if no icon is provided on an item |

When switching variants the markers fade out and back in over 150 ms to avoid a jarring swap.

---

## How the scroll animation works

- The beam starts filling when the first item reaches the vertical center of the viewport
- The beam finishes filling when the last item reaches the bottom of the viewport
- Each marker activates the moment the beam tip passes it
- All scroll updates run through `requestAnimationFrame` — no layout thrashing

---

## Notes

- **Next.js App Router:** The `"use client"` directive is already at the top of the file. No action needed.
- **Other setups (Vite, CRA, etc.):** Remove the `"use client"` line — the component works identically.
- **Step titles** render as `<h3>` elements. Wrap the Timeline in a section with an `<h2>` heading for a correct document outline.
- **Light backgrounds:** The component has four hardcoded dark-theme values. Search for the `Light theme:` comments in `Timeline.tsx` — each one tells you exactly what to replace and suggests a dark equivalent:
  - Track line color (`rgba(255,255,255,0.15)`)
  - Inactive icon / number marker color (`rgba(255,255,255,0.35)`)
  - Title text class (`text-zinc-200`)
  - Content text class (`text-white/90`)
