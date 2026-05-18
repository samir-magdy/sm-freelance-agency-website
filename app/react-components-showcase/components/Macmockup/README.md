# MacMockup — Interactive MacBook Desktop Carousel Mockup

A plug-and-play React component that renders a realistic Space Gray MacBook frame with a browser chrome bar and scrollable screenshot carousel inside. The faithful desktop companion to `IPhoneMockup`.

Built with TypeScript and Tailwind CSS v4.

---

## Requirements

| Requirement | Version |
|---|---|
| React | 18+ |
| Tailwind CSS | **v4 only** |

No extra packages required.

---

## Installation

Copy `MacMockup.tsx` into your components folder (e.g. `src/components/MacMockup.tsx`)

That's it.

---

## Usage

```tsx
import MacMockup from "@/components/MacMockup";

export default function MyPage() {
  return (
    <MacMockup
      slides={[
        {
          image: "/screenshots/project1.png",
          alt: "Project 1 — E-commerce store",
          url: "https://myproject1.com",
        },
        {
          image: "/screenshots/project2.png",
          alt: "Project 2 — SaaS dashboard",
          url: "https://myproject2.com",
        },
        {
          image: "/screenshots/project3.png",
          alt: "Project 3 — Portfolio site",
        },
      ]}
      paginationDotColor="white"
    />
  );
}
```

---

## Props

### `MacMockupProps`

| Prop | Type | Default | Description |
|---|---|---|---|
| `slides` | `Slide[]` | — | **Required.** Array of slides to display. |
| `paginationDotColor` | `string` | `"white"` | Color of the active pagination dot. Any valid CSS color — hex, hsl, rgb, or a named color. |

### `Slide`

| Field | Type | Required | Description |
|---|---|---|---|
| `image` | `string` | ✅ | Path or URL to the screenshot image. |
| `alt` | `string` | — | Alt text for accessibility. Recommended. |
| `url` | `string` | — | Full URL (e.g. `"https://myproject.com"`). The domain is extracted and shown in the browser chrome address bar as the user navigates. If omitted, the address bar shows `yourwebsite.com`. |

---

## Preparing your screenshots

Screenshots should be **landscape / wide-format**. A viewport width of at least **1400px** gives the sharpest result inside the frame.

**Option 1 — Browser DevTools**
1. Open the page you want to capture
2. Open DevTools (`F12`)
3. Open the Command Menu (`Ctrl+Shift+P` on Windows / `Cmd+Shift+P` on Mac)
4. Type `screenshot` and select **Capture full size screenshot**

> Shortcuts and menu labels may vary depending on your browser and operating system.

**Option 2 — GoFullPage** (free Chrome extension) — one-click full-page capture, saves as PNG. No DevTools needed.

**Option 3 — Figma** — export your desktop frame at 1x as PNG with a width of at least 1400px.

---

## Notes

- **Next.js App Router:** The `"use client"` directive and the `next/image` import are already set up. No action needed.
- **Other setups (Vite, CRA, etc.):** Remove the `"use client"` line **and** replace `import Image from "next/image"` with a plain `<img>` tag. Swap every `<Image ... />` instance in the file with:
  ```tsx
  <img src={slide.image} alt={slide.alt ?? `Slide ${i + 1}`} className="w-full h-auto block" loading={i === 0 ? "eager" : "lazy"} />
  ```
- Screenshots should be **landscape / wide-format** (16:9 or 16:10 ratio) for best results. Portrait or square images will work but may look unusual inside a laptop frame.
- The address bar automatically extracts and displays the domain from each slide's `url`, updating as the user navigates. If no `url` is provided for a slide, it falls back to `yourwebsite.com`.
- The component is **fully responsive** — scales down gracefully on mobile. Navigation arrows are hidden below the `sm` breakpoint.
- Use alongside `IPhoneMockup` to showcase both mobile and desktop versions of your projects side by side.
