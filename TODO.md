# Open tech debt

Items flagged during the 2026-07-28 audits (DRY, dead-code, scroll-consolidation lenses) that were **not** addressed in that session.

---

## To fix

### 1. Redundant `dir={dir}` on page/section roots

The `<html>` element in `app/[lang]/layout.tsx:108` already sets `dir` based on `lang`, and `dir` is inherited by descendants. Setting `dir={dir}` on page/section roots re-declares the value that's already being inherited — no behavior change.

Legit `dir="ltr"` **overrides** (SocialIcons, phone-number spans, etc.) must stay — they override the RTL inheritance for LTR-only content like phone numbers.

**Files with the redundant pattern** (verify at time of work):

- `app/[lang]/about/page.tsx` — `const dir = lang === "ar" ? "rtl" : "ltr"` (line 67) + `<div dir={dir}>` (line 93)
- `app/[lang]/guides/page.tsx` — same pattern (line 43, line 82)
- `app/[lang]/guides/[slug]/page.tsx` — 3 occurrences: root `<div dir={dir}>` and two `<article dir={dir}>` inside the render
- `app/components/sections/FAQSection.tsx` — line 11 + `<section dir={dir}>` line 18

**How to fix:** delete the `const dir = …` line and each `dir={dir}` attribute (keep any `dir="ltr"` overrides).

**Verify after:** load the site in Arabic (`/ar`) and confirm all pages render right-to-left with no regressions. Deletes ~10 lines.

---

### 2. OG-locale ternary duplication

`lang === "en" ? "en_US" : "ar_EG"` (plus the inverse `alternateLocale`) is duplicated in:

- `app/[lang]/layout.tsx:54` — `locale`
- `app/[lang]/guides/[slug]/page.tsx` — both `locale` and `alternateLocale`

**How to fix:** add to `lib/urls.ts`:

```ts
export function ogLocale(lang: Lang) {
  return {
    locale: lang === "en" ? "en_US" : "ar_EG",
    alternateLocale: lang === "en" ? "ar_EG" : "en_US",
  };
}
```

Then spread `...ogLocale(lang)` into each `openGraph` block. Marginal — only 2 places — but consistent with the `homeUrl` / `pageUrl` / `ogImage` helpers already in `lib/urls.ts`.

---

### 3. `LightRaysBackground.tsx:12` — `setState` synchronously in a `useEffect`

Pre-existing lint error (`npm run lint` → 1 error). Predates the audit session.

```tsx
useEffect(() => {
  setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
}, []);
```

Fails `react-hooks/set-state-in-effect`. React 19 discourages this pattern because it triggers a second render right after mount.

**How to fix (two options):**

- **Lazy `useState` initializer** — read the media query once during initialization, gate on `typeof window !== "undefined"` for SSR safety.
- **`useSyncExternalStore`** — subscribe to the media query properly. Also gives you responsive re-renders when the viewport crosses the breakpoint at runtime (the current code only reads it once at mount).

The second is the correct long-term fix if you want desktop/mobile detection to update when the user resizes.

---

## Intentionally not worth fixing

Listed for transparency. Each is technically a repetition, but the abstraction cost outweighs the win.

- **`const isRtl = lang === "ar"`** in 4 components. Used 3–8× per file for various inline decisions. A hook or helper adds indirection for a one-line derivation.
- **`if (!isLang(rawLang)) notFound()`** in 3 pages. 1 line × 3 places. Not worth a helper.
- **`const t = someTranslation`** rename pattern. Trivial one-line alias, load-bearing when files mix multiple translation sources.

---

## Scope caveat

The audits done in that session covered three lenses:
- Dead / unused code
- DRY violations
- Scroll-code consolidation

The following lenses were **not** audited:
- Accessibility (aria labels, keyboard nav, focus management, screen-reader coverage)
- Performance (bundle size, unnecessary client components, image loading strategy)
- Security patterns (input validation, XSS surface)
- Error-handling consistency
- SEO details beyond metadata/alternates
- Test coverage
- Component composition and naming conventions

Each of those would surface its own list.
