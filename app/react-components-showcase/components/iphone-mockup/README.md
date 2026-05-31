# IPhoneMockup

A realistic, interactive iPhone mockup with a built-in screenshot carousel. Single file, zero dependencies.

Requires **React 18+** and **Tailwind CSS v4**.

---

## Installation

Copy `IPhoneMockup.tsx` into your project.

**Next.js App Router** — works as-is. The `"use client"` directive is already included.

**Vite / CRA / other** — remove the `"use client"` line at the top of the file.

---

## Basic usage

```tsx
import IPhoneMockup from "@/components/IPhoneMockup";

<IPhoneMockup
  slides={[
    { image: "/screenshots/home.png",      alt: "Home screen" },
    { image: "/screenshots/dashboard.png", alt: "Dashboard" },
  ]}
/>
```

---

## Props

**`slides`** (required) — an array of slide objects. Each slide has an `image` (path or URL) and an optional `alt` string for accessibility.

**`theme`** — `"dark"` or `"light"`, defaults to `"dark"`. Controls the color of the navigation arrows and pagination dots. Use `"light"` when placing the component on a white or light-colored background.

**`autoPlay`** — boolean, defaults to `false`. When true, slides advance automatically on a timer and loop back to the first slide.

**`autoPlayInterval`** — number in milliseconds, defaults to `4000`. How long each slide stays visible before advancing. Only applies when `autoPlay` is true.

**`onSlideChange`** — a callback `(index: number) => void` that fires whenever the active slide changes. Use this to sync external content — like a text block or a heading — to the current slide.

**`className`** — classes applied to the outer wrapper. Use for margin, positioning, or layout.

**`sizeClassName`** — replaces the default responsive width and aspect ratio on the phone shell. Use this when you need a fixed size.

---

## Examples

### Auto-playing carousel

```tsx
<IPhoneMockup
  slides={slides}
  autoPlay
  autoPlayInterval={3000}
/>
```

The carousel pauses automatically when the user hovers over or touches the phone, and resumes the interval timer once they move away.

### Syncing text to the active slide

```tsx
const descriptions = ["First screen", "Second screen"];
const [active, setActive] = useState(0);

<IPhoneMockup
  slides={slides}
  onSlideChange={setActive}
/>
<p>{descriptions[active]}</p>
```

### Custom size

```tsx
<IPhoneMockup
  slides={slides}
  sizeClassName="w-80 h-150 sm:w-100"
/>
```

---

## Navigation

On desktop, users click the left and right arrows or the pagination dots. The component also supports keyboard navigation — focus it and use the `←` `→` arrow keys to move between slides. On mobile, arrows are hidden and users swipe natively.

---

## Preparing screenshots

Screenshots should be **390px wide** (iPhone logical width) for a perfect fit.

**Browser DevTools** — open DevTools, toggle the device toolbar (`Ctrl+Shift+M` / `Cmd+Shift+M`), set the width to `390`, then open the Command Menu (`Ctrl+Shift+P` / `Cmd+Shift+P`) and run `Capture full size screenshot`.

**Figma** — export your mobile frame at 1x, 390px wide.
