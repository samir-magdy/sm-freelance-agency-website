# CLAUDE.md - SM Web Studio (samirmagdy.com)

## Project Overview

Bilingual (English/Arabic) portfolio & services site for SM Web Studio. Single-page app with section-based navigation. Built with Next.js 16 App Router, React 19, Tailwind CSS v3.4, deployed on Vercel.

## Quick Reference

- **Framework:** Next.js 16 (App Router) with Turbopack dev
- **Styling:** Tailwind CSS v3.4.1 + custom CSS in `app/styles/globals.css`
- **i18n:** `[lang]` dynamic route (`en` / `ar`), translations in `app/data/translations/`
- **Fonts:** Cairo (Google Fonts, `display: "block"`) — loaded once in layout
- **Email:** Resend (`resend` package)
- **Rate Limiting:** Upstash Redis (`@upstash/redis`, `lib/redis.js`)
- **Analytics:** `@vercel/analytics`
- **Icons:** `lucide-react`
- **Images:** Next.js `<Image>` with AVIF + WebP formats

## Commands

```bash
npm run dev       # Start dev server (Turbopack)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint
```

## Architecture

### Routing

- `app/[lang]/layout.jsx` — Root layout. Generates metadata, JSON-LD structured data, sets `dir` and `lang` attributes.
- `app/[lang]/page.jsx` — Home page. Renders all sections in order.
- `app/not-found.jsx` — 404 page.
- `app/sitemap.js` — Dynamic sitemap generation.

### Navigation

Uses **native browser fragment handling** — plain `<a href="#section">` links with `scroll-behavior: smooth` in CSS. No IntersectionObserver, no JS scroll tracking. Section IDs match nav link labels exactly:

| Nav Key    | Section ID   | Component             |
|------------|-------------|-----------------------|
| features   | `#features` | ServicesSection       |
| services   | `#services` | AddOnsSection         |
| portfolio  | `#portfolio`| page.jsx (wrapper)    |
| process    | `#process`  | WorkflowSection       |
| FAQs       | `#FAQs`     | FAQSection            |
| contact    | `#contact`  | ContactSection        |

Other section IDs: `#home` (HeroSection), `#goals` (GoalSection).

### i18n Strategy

- Language detected/routed via `proxy.js` (see Known Issues below).
- `LanguageToggle.jsx` swaps `/en` <-> `/ar` while preserving the current fragment hash.
- All user-facing strings live in `app/data/translations/*.js` and are resolved by `[lang]` in the layout.
- RTL: `[dir="rtl"]` set on `<html>`, global `letter-spacing: 0 !important` override for Arabic.

### Component Inventory

**Server Components (18):**

| Component | Path |
|-----------|------|
| Layout | `app/[lang]/layout.jsx` |
| Page | `app/[lang]/page.jsx` |
| NotFound | `app/not-found.jsx` |
| HeroSection | `app/components/sections/HeroSection.jsx` |
| GoalSection | `app/components/sections/GoalSection.jsx` |
| ServicesSection | `app/components/sections/ServicesSection.jsx` |
| AddOnsSection | `app/components/sections/AddOnsSection.jsx` |
| ContactSection | `app/components/sections/ContactSection.jsx` |
| FAQSection | `app/components/sections/FAQSection.jsx` |
| WorkflowSection | `app/components/sections/WorkflowSection.jsx` |
| HeroNav | `app/components/ui/HeroNav.jsx` |
| DesktopNavLinks | `app/components/ui/DesktopNavLinks.jsx` |
| Footer | `app/components/ui/Footer.jsx` |
| SocialIcons | `app/components/ui/SocialIcons.jsx` |
| NavArrow | `app/components/ui/navigation/NavArrow.jsx` |
| DynamicIsland | `app/components/ui/iphone/DynamicIsland.jsx` |
| HomeIndicator | `app/components/ui/iphone/HomeIndicator.jsx` |
| StatusBar | `app/components/ui/iphone/StatusBar.jsx` |

**Client Components (7):**

| Component | Path | Why Client |
|-----------|------|------------|
| MobileMenu | `app/components/ui/MobileMenu.jsx` | useState for open/close |
| LanguageToggle | `app/components/ui/LanguageToggle.jsx` | Hash preservation on lang switch |
| FontReadyTrigger | `app/components/ui/FontReadyTrigger.jsx` | document.fonts API |
| FAQSearch | `app/components/ui/FAQSearch.jsx` | Search input state |
| ContactForm | `app/components/ui/ContactForm.jsx` | Form state + submission |
| PortfolioShowcase | `app/components/ui/PortfolioShowcase.jsx` | Scroll snap + phone pulse |
| Timeline | `app/components/ui/Timeline.jsx` | Scroll-driven step reveal |

### CSS Architecture

- Design tokens as CSS custom properties in `:root` (`globals.css`)
- Tailwind extends theme with token-based colors (`hsl(var(--gold))`, etc.)
- Custom `hover:` variant redefined in `tailwind.config.mjs` to `@media (hover: hover) and (pointer: fine)` — hover effects only on pointer devices
- Hero fade-in sequence: CSS keyframes gated on `html.fonts-ready` class (set by `FontReadyTrigger`)
- CTA shimmer: CSS `::before`/`::after` pseudo-elements with RTL variants
- Phone pulse: `.phone-frame-pulse` class added via one-shot scroll listener in `PortfolioShowcase`
- Nav underline: `.nav-link-underline` with `::before` pseudo-element

### API

- `POST /api/contact` — Contact form handler. Validates fields, rate-limits (180s per IP via Upstash Redis), sends email via Resend.

## Known Issues (Not Yet Fixed)

1. **`proxy.js` is dead code** — File exports `proxy` (not `middleware`) and is named `proxy.js` (not `middleware.js`). It's never imported. Next.js cannot pick it up. The site still works because `generateStaticParams` handles `/en` and `/ar`, and the root `/` is likely handled by Vercel config or defaults to `/en`. Needs investigation on whether middleware-based language routing is actually needed.

2. **`console.log` in production API route** — `app/api/contact/route.js:140` has `console.log("CONTACT ROUTE ERROR:", error)`. Should use a proper logging approach or be removed.

3. **Missing `scroll-padding-top`** — Fixed navbar overlaps anchor targets when navigating via fragment. Should add `scroll-padding-top` to `html` matching nav height (~131px desktop, ~73px mobile).

4. **Phone validation is client-only** — `ContactForm.jsx` validates phone format in JS but the API route doesn't re-validate. Server-side validation should be added.

5. **Form inputs lack `maxLength`** — Contact form text inputs have no `maxLength` attribute.

6. **DynamicIsland missing `aria-hidden`** — The iPhone notch component is decorative but lacks `aria-hidden="true"`.

7. **Form error messages missing `role="alert"`** — Validation errors in `ContactForm` don't have `role="alert"` for screen readers.

## Conventions

- Section components in `app/components/sections/`, UI components in `app/components/ui/`
- Translation keys mirror component structure: `nav.js`, `hero.js`, `services.js`, etc.
- All translations export a default object with `{ en: string, ar: string }` shape per key
- Server components are the default; only use `"use client"` when state/effects are required
- CSS animations gated on `html.fonts-ready` to prevent FOUC
- Structured data (JSON-LD) built in layout with `@graph` pattern (ProfessionalService, WebSite, WebPage, Person, FAQPage)
