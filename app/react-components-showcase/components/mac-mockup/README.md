# MacMockup — Interactive MacBook Desktop Carousel Mockup

A plug-and-play React component that renders a realistic Space Gray MacBook frame with a browser chrome bar and scrollable screenshot carousel inside. Built with TypeScript and Tailwind CSS v4.

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
        { image: "/screenshots/project1.png", alt: "E-commerce store", url: "https://myproject1.com" },
        { image: "/screenshots/project2.png", alt: "SaaS dashboard",   url: "https://myproject2.com" },
        { image: "/screenshots/project3.png", alt: "Portfolio site" },
      ]}
    />
  );
}
```

With all optional props:

```tsx
<MacMockup
  slides={[...]}
  className="mx-auto my-12"
  paginationDotColor="#6366f1"
  inactiveDotColor="rgba(99,102,241,0.3)"
/>
```

---

## Props

### `MacMockupProps`

| Prop | Type | Default | Description |
|---|---|---|---|
| `slides` | `Slide[]` | — | **Required.** Array of slides to display. |
| `className` | `string` | — | Classes applied to the outer wrapper. Use for layout, positioning, or margin. |
| `paginationDotColor` | `string` | `"white"` | Color of the active pagination dot. Any valid CSS color — hex, hsl, rgb, or a named color. |
| `inactiveDotColor` | `string` | `"rgba(255,255,255,0.3)"` | Color of inactive pagination dots. Any valid CSS color. Override when using the component on a light background. |

### `Slide`

| Field | Type | Required | Description |
|---|---|---|---|
| `image` | `string` | ✅ | Path or URL to the screenshot image. |
| `alt` | `string` | — | Alt text for accessibility. Recommended. |
| `url` | `string` | — | Full URL (e.g. `"https://myproject.com"`). The domain is extracted and shown in the address bar as the user navigates. Falls back to `yourwebsite.com` if omitted. |

> **Single slide:** pass one item and the navigation arrows and pagination dots are hidden automatically.

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

- **Next.js App Router:** The `"use client"` directive is already set up. No action needed.
- **Other setups (Vite, CRA, etc.):** Remove the `"use client"` line at the top of the file. That's it.
- Screenshots should be **landscape / wide-format** (16:9 or 16:10 ratio) for best results. Portrait or square images will work but may look unusual inside a browser frame.
- The component is **fully responsive** — scales down gracefully on mobile. Navigation arrows are hidden below the `sm` breakpoint.
