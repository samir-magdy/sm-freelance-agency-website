# Hero Font Loading Optimization

## The Problem

The hero section uses a component called `FontReadyWrapper` that holds all hero content at `opacity: 0` until the Cairo font has finished loading. Only then does it add an `is-ready` class that triggers a staggered entrance animation sequence.

This mechanism is essential — without it, the animation would play with a fallback font and then visually snap when Cairo arrives, causing layout shift and a broken first impression.

The issue: on slow connections (common for the Egyptian target audience), the Cairo font files (30-50 KB depending on language) took 2-5 seconds to download. During that entire time, the user stared at a completely blank hero section.

## Why It Was Happening

The loading chain looked like this:

```
HTML arrives -> CSS parses -> browser discovers @font-face -> HTTP request for .woff2 -> download 30-50 KB -> fonts.ready resolves -> animation plays
```

Two things made this slow:

1. **The font was a network dependency.** Cairo was loaded via `next/font/google`, which self-hosts the files but still serves them as separate HTTP requests. On a slow connection, those requests are the bottleneck.

2. **`document.fonts.ready` waits for ALL fonts on the page.** The original `FontReadyWrapper` used `document.fonts.ready`, which is a promise that resolves when every font load on the entire page completes — not just the hero's font. So even if the hero only needed a few characters, it waited for the nav, footer, and every other section's font to finish downloading too.

## The Fix

### 1. Inline hero font via base64 (`app/fonts/heroFontInline.js`)

A subset of Cairo covering the full English alphabet (A-Z, a-z, 0-9, punctuation) and the full Arabic alphabet (all 28 letters + diacritics) was generated using `pyftsubset` from the `fonttools` Python library. These subsets were compressed as woff2 and base64-encoded.

The base64 strings are exported from `app/fonts/heroFontInline.js` and injected as a `<style>` tag in the layout (`app/[lang]/layout.jsx`). The layout conditionally injects the English or Arabic subset based on the current language route.

This means the font data arrives inside the HTML payload itself — zero additional network requests.

### 2. Isolated font-family name (`"Cairo Hero"`)

The inline font is registered under `font-family: "Cairo Hero"`, not `"Cairo"`. This is critical. An earlier attempt used the same `"Cairo"` name, which caused the browser to use the subset font for matching characters across the entire page — not just the hero. Because the subset had incomplete Arabic shaping tables (GSUB lookups for contextual letter forms like initial/medial/final), Arabic text broke sitewide. Letters appeared but didn't join together.

By using a separate name, the inline font is completely isolated. It only applies where explicitly referenced.

### 3. Scoped via CSS (`app/globals.css`)

```css
#home {
  font-family: "Cairo Hero", var(--font-cairo), sans-serif;
}
```

The hero section (`id="home"`) uses `"Cairo Hero"` as its primary font, with the full `Cairo` (from `next/font/google`) as the fallback. Every other element on the page uses the full `Cairo` font as before, completely unaffected.

### 4. Targeted font load check (`app/components/ui/FontReadyWrapper.jsx`)

```js
document.fonts.load('700 1em "Cairo Hero"', probe).then(() => setIsReady(true));
```

Instead of `document.fonts.ready` (which waits for ALL fonts), the wrapper now uses `document.fonts.load()` targeting specifically `"Cairo Hero"`. Since that font is already available from the base64 data in the HTML, this promise resolves immediately. The animation fires without waiting for any network request.

## Why It Works

The speed gain comes from eliminating the network from the critical path entirely:

- **Before:** HTML -> CSS -> HTTP request -> download -> render
- **After:** HTML (contains the font) -> render

The font data is part of the HTML payload. By the time the browser parses the `<style>` tag, the `@font-face` with the base64 source is registered. When `FontReadyWrapper` mounts and calls `document.fonts.load()`, the font is already available. The promise resolves synchronously (on the next microtask). The `is-ready` class is added. The animation plays.

The full Cairo font from `next/font/google` still loads normally in the background for the rest of the page. Nothing about the page-wide font setup changed.

## Files Changed

| File | What changed |
|------|-------------|
| `app/fonts/heroFontInline.js` | New. Exports base64-encoded `@font-face` CSS strings for EN (16 KB) and AR (20 KB) subsets under the name `"Cairo Hero"`. |
| `app/[lang]/layout.jsx` | Added import of `heroFontInline`. Injects a `<style>` tag with the appropriate language's inline font. |
| `app/globals.css` | Added `#home { font-family: "Cairo Hero", var(--font-cairo), sans-serif; }` to scope the inline font to the hero section. |
| `app/components/ui/FontReadyWrapper.jsx` | Changed from `document.fonts.ready` to `document.fonts.load('700 1em "Cairo Hero"', probe)`. |

## Tradeoffs

- **HTML size increased by ~21 KB (EN) or ~27 KB (AR)** due to the base64 font data. This is a one-time cost that arrives with the HTML — no extra round-trip. On the connections where the original 2-5 second delay was a problem, this is a clear win.
- **Hero text can be changed freely** without regenerating font files. The subsets cover the full English and Arabic alphabets. Only adding an entirely different script (e.g. Chinese) would require regeneration.
