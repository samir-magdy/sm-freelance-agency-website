# Timeline

**UI Blocks** — Scroll-driven animated vertical timeline component.

A vertical timeline where a glowing beam fills as the user scrolls, activating each step's dot as it passes. Drop it in, pass your steps as data, done.

---

## Requirements

| | |
|---|---|
| React | 18+ |
| Tailwind CSS | **v4 only** |

No extra packages required.

> **Tailwind v3?** This component uses v4 utility syntax and will not work on v3.

---

## Setup

Copy `Timeline.tsx` into your project (e.g. `src/components/Timeline.tsx`). No CSS changes, no config changes, no extra files.

---

## Usage

```tsx
import { Timeline } from "@/components/Timeline";

const steps = [
  {
    title: "Discovery",
    content: (
      <p className="text-zinc-400 text-lg px-2">
        We dig into your goals, your users, and your constraints. Every
        decision from here is grounded in research, not guesswork.
      </p>
    ),
  },
  {
    title: "Design",
    content: (
      <p className="text-zinc-400 text-lg px-2">
        Wireframes first, pixels second. We move fast in low-fidelity so
        there's room to challenge assumptions before anything is built.
      </p>
    ),
  },
  {
    title: "Development",
    content: (
      <p className="text-zinc-400 text-lg px-2">
        Clean, performant code. No bloated libraries, no shortcuts that
        haunt you later.
      </p>
    ),
  },
  {
    title: "Launch",
    content: (
      <p className="text-zinc-400 text-lg px-2">
        We handle deployment and handover. You get a product that works —
        and a team that stays reachable after.
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

---

## Props

### `Timeline`

| Prop | Type | Required |
|---|---|---|
| `data` | `TimelineItem[]` | ✅ |

### `TimelineItem`

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | ✅ | Step heading — shown beside the dot on desktop, above the content on mobile |
| `content` | `ReactNode` | ✅ | Any React content — paragraph, card, image, custom component. You control the styling entirely. |

---

## How the scroll animation works

- The beam starts filling when the first item reaches the vertical center of the viewport
- The beam finishes filling when the last item reaches the bottom of the viewport
- Each dot activates the moment the beam tip passes it
- All scroll updates run through `requestAnimationFrame` — no layout thrashing

---

## Notes

- **Next.js App Router:** The `"use client"` directive is already at the top of the file. No action needed.
- **Other setups (Vite, CRA, etc.):** Remove the `"use client"` line — the component works identically.
- **Content styling:** The `content` field accepts any `ReactNode`. You are fully responsible for styling it — font size, color, spacing. The component applies no styles to your content.
- **Step titles** render as `<h3>` elements. Wrap the Timeline in a section with an `<h2>` heading for a correct document outline.
