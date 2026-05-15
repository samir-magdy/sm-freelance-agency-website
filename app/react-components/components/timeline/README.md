# Timeline

**UI Blocks** — Scroll-driven animated vertical timeline component.

A vertical timeline where a glowing beam fills as the user scrolls, activating each step's dot as it passes. Drop it in, pass your steps as data, done.

---

## Requirements

| | |
|---|---|
| React | 18+ |
| Tailwind CSS | **v4 only** |
| lucide-react | any (only needed for the `icon` variant) |

> **Tailwind v3?** This component uses v4 utility syntax and will not work on v3.

---

## Setup

Copy `Timeline.tsx` into your project (e.g. `src/components/Timeline.tsx`). No CSS changes, no config changes, no extra files.

If you use the `icon` variant, install lucide-react:

```bash
npm install lucide-react
```

If you only use `bullet` or `numbered`, lucide-react is never imported at runtime and you can skip this.

---

## Usage

### Minimal — bullet variant (default)

```tsx
import { Timeline } from "@/components/Timeline";

const steps = [
  {
    title: "Discovery",
    content: (
      <p className="text-zinc-400 text-lg px-2">
        We dig into your goals, your users, and your constraints.
      </p>
    ),
  },
  {
    title: "Design",
    content: (
      <p className="text-zinc-400 text-lg px-2">
        Wireframes first, pixels second.
      </p>
    ),
  },
  {
    title: "Launch",
    content: (
      <p className="text-zinc-400 text-lg px-2">
        We handle deployment and handover.
      </p>
    ),
  },
];

export default function Page() {
  return (
    <section className="py-24 px-4">
      <Timeline data={steps} />
    </section>
  );
}
```

### Icon variant with custom colors

```tsx
import { Timeline } from "@/components/Timeline";

const steps = [
  {
    title: "Discovery",
    icon: "Search",
    content: <p className="text-zinc-400 text-lg px-2">Research phase.</p>,
  },
  {
    title: "Design",
    icon: "Paintbrush",
    content: <p className="text-zinc-400 text-lg px-2">Design phase.</p>,
  },
  {
    title: "Launch",
    icon: "Rocket",
    content: <p className="text-zinc-400 text-lg px-2">Ship it.</p>,
  },
];

export default function Page() {
  return (
    <section className="py-24 px-4">
      <Timeline
        data={steps}
        variant="icon"
        accentColor="#a78bfa"
        markerColor="#a78bfa"
      />
    </section>
  );
}
```

---

## Props

### `Timeline`

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `data` | `TimelineItem[]` | — | ✅ | Array of timeline steps. |
| `variant` | `"bullet" \| "icon" \| "numbered"` | `"bullet"` | — | Controls what renders in the marker beside each step. |
| `accentColor` | `string` | `"white"` | — | Color of the scrolling beam. Any valid CSS color. |
| `markerColor` | `string` | same as `accentColor` | — | Color of the active dot / icon / number. Defaults to `accentColor` when omitted. |

### `TimelineItem`

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | ✅ | Step heading — shown beside the marker on desktop, above the content on mobile. |
| `content` | `ReactNode` | ✅ | Any React content — paragraph, card, image, custom component. You control the styling entirely. |
| `icon` | `string` | — | Icon name from the supported set below. Only used when `variant="icon"`. Ignored for other variants. |

### Supported icon names

The following strings are valid for the `icon` field:

`Search` `Paintbrush` `Code2` `FlaskConical` `Rocket` `Star` `Zap` `Globe` `Lock` `Settings` `Mail` `Bell` `Heart`

These map to the corresponding [Lucide](https://lucide.dev) icons. To add more, extend the `ICON_MAP` object at the top of `Timeline.tsx`.

---

## Variants

| Value | Marker |
|---|---|
| `"bullet"` | Small filled dot (default) |
| `"icon"` | Lucide icon from the `icon` field |
| `"numbered"` | Step number (1, 2, 3…) |

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
- **Content styling:** The `content` field accepts any `ReactNode`. You are fully responsible for styling it — font size, color, spacing. The component applies no styles to your content.
- **Step titles** render as `<h3>` elements. Wrap the Timeline in a section with an `<h2>` heading for a correct document outline.
