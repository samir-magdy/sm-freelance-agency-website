# IPhoneMockup — Interactive iPhone Carousel Mockup

A plug-and-play React component that renders a realistic iPhone frame with a scrollable screenshot carousel inside. Built with TypeScript and Tailwind CSS v4.

---

## Requirements

| Requirement | Version |
|---|---|
| React | 18+ |
| Tailwind CSS | **v4 only** |

No extra packages required.

---

## Installation

Copy `IPhoneMockup.tsx` into your components folder (e.g. `src/components/IPhoneMockup.tsx`)

That's it.

---

## Usage

```tsx
import IPhoneMockup from "@/components/IPhoneMockup";

export default function MyPage() {
  return (
    <IPhoneMockup
      slides={[
        { image: "/screenshots/screen1.png", alt: "Home screen" },
        { image: "/screenshots/screen2.png", alt: "Dashboard" },
        { image: "/screenshots/screen3.png", alt: "Settings" },
      ]}
      paginationDotColor="white"
    />
  );
}
```

---

## Props

### `IPhoneMockupProps`

| Prop | Type | Default | Description |
|---|---|---|---|
| `slides` | `Slide[]` | — | **Required.** Array of slides to display. |
| `paginationDotColor` | `string` | `"white"` | Color of the active pagination dot. Any valid CSS color — hex, hsl, rgb, or a named color. |

### `Slide`

| Field | Type | Required | Description |
|---|---|---|---|
| `image` | `string` | ✅ | Path or URL to the screenshot image. |
| `alt` | `string` | — | Alt text for accessibility. Recommended. |

---

## Preparing your screenshots

Screenshots should be **390px wide** (iPhone 14 logical width) for a perfect fit inside the phone frame.

**Option 1 — Browser DevTools**
1. Open the page you want to capture
2. Open DevTools (`F12`)
3. Toggle the device toolbar (`Ctrl+Shift+M` on Windows / `Cmd+Shift+M` on Mac)
4. Set the width to **390** in the dimensions field at the top
5. Open the Command Menu (`Ctrl+Shift+P` on Windows / `Cmd+Shift+P` on Mac)
6. Type `screenshot` and select **Capture full size screenshot**

> Shortcuts and menu labels may vary depending on your browser and operating system.

**Option 2 — GoFullPage** (free Chrome extension) — activate the device toolbar first (step 3–4 above), then run GoFullPage.

**Option 3 — Figma** — export your mobile frame at 1x as PNG at 390px width.

---

## Notes

- **Next.js App Router:** The `"use client"` directive and the `next/image` import are already set up. No action needed.
- **Other setups (Vite, CRA, etc.):** Remove the `"use client"` line **and** replace `import Image from "next/image"` with a plain `<img>` tag. Swap every `<Image ... />` instance in the file with:
  ```tsx
  <img src={slide.image} alt={slide.alt ?? `Slide ${i + 1}`} className="w-full h-auto block" loading={i === 0 ? "eager" : "lazy"} />
  ```
- Screenshots should match the full width of the phone screen for best results. A width of **390px** (iPhone 14 logical width) is ideal.
- The component is **fully responsive** — scales down gracefully on mobile. Navigation arrows are hidden below the `sm` breakpoint; users swipe natively on touch screens.
- Use alongside `MacMockup` to showcase both mobile and desktop versions of your projects side by side.
