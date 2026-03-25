# CLAUDE.md — samirmagdy.com Codebase

## Quick Start

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint
```

---

## Tech Stack

| Layer        | Technology                              |
| ------------ | --------------------------------------- |
| Framework    | Next.js 16.1.6 (App Router, Turbopack) |
| Language     | TypeScript (strict mode)                |
| Styling      | Tailwind CSS 3.4.1 + custom CSS tokens |
| Font         | Google Cairo (Arabic + Latin subsets)   |
| Icons        | Lucide React                            |
| Email        | Resend                                  |
| Rate Limit   | Upstash Redis                           |
| Analytics    | Vercel Analytics                        |
| Deployment   | Vercel                                  |

---

## Architecture Overview

### Directory Structure

```
app/
├── [lang]/
│   ├── layout.tsx              # Root layout (fonts, metadata, JSON-LD, nav, footer)
│   └── page.tsx                # Home page — composes all sections
├── api/contact/route.ts        # POST endpoint (Resend email + Redis rate limit)
├── components/
│   ├── sections/               # Full-page sections (server components unless noted)
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── AddOnsSection.tsx
│   │   ├── GoalSection.tsx
│   │   ├── WorkflowSection.tsx
│   │   ├── FAQSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/                     # Reusable UI components
│       ├── iphone/             # iPhone mockup parts (DynamicIsland, StatusBar, HomeIndicator)
│       ├── navigation/         # NavArrow (carousel prev/next)
│       ├── ContactForm.tsx     # "use client" — multi-step form with validation
│       ├── DesktopNavLinks.tsx  # "use client" — IntersectionObserver active tracking
│       ├── FAQSearch.tsx        # "use client" — Arabic-aware fuzzy search
│       ├── Footer.tsx          # Server component
│       ├── HeroNav.tsx         # Server component — composes nav bar
│       ├── LanguageToggle.tsx   # "use client" — preserves scroll position on switch
│       ├── MobileMenu.tsx      # "use client" — hamburger drawer
│       ├── PortfolioShowcase.tsx # "use client" — iPhone frame + snap scroll carousel
│       ├── ScrollLink.tsx      # Server component — smooth scroll anchor
│       ├── SocialIcons.tsx     # Server component
│       └── Timeline.tsx        # "use client" — scroll-driven beam animation
├── data/
│   ├── projects.ts             # Project[] array + structured data
│   └── translations/           # Bilingual content (en/ar)
│       ├── index.ts            # Central re-export hub
│       ├── lang.ts             # type Lang = "en" | "ar"
│       └── *.ts                # One file per section/concern
├── styles/globals.css          # Design tokens, keyframes, hero effects
├── utils/scrollToSection.ts    # document.getElementById → scrollIntoView
├── not-found.tsx
└── sitemap.ts
lib/redis.ts                    # Upstash Redis singleton (graceful null if unconfigured)
proxy.ts                        # Language routing middleware (/ → /en rewrite)
```

### Routing

- **Dynamic segment**: `[lang]` accepts `"en"` or `"ar"` only; anything else → `notFound()`
- **Middleware** (`proxy.ts`): Rewrites bare `/` to `/en`. Passes through `/en/*`, `/ar/*`, `/_next/*`, `/api/*`, and static files.
- **Static generation**: `generateStaticParams()` returns `[{lang:"en"},{lang:"ar"}]`
- **No root `app/layout.tsx`** — the `[lang]/layout.tsx` is the root layout.

### Page Composition Order

`app/[lang]/page.tsx` renders sections top-to-bottom:

1. `<HeroSection />`        — `#home`
2. `<ServicesSection />`     — `#services`
3. `<AddOnsSection />`       — `#add-ons`
4. `<GoalSection />`         — `#goals`
5. `<PortfolioShowcase />`   — `#portfolio` (dynamic import)
6. `<WorkflowSection />`     — `#how-it-works`
7. `<FAQSection />`          — `#faq`
8. `<ContactSection />`      — `#contact`

Every section receives a single `lang: Lang` prop. The layout adds `<HeroNav>` (header) and `<Footer>`.

---

## Content / i18n System

### Pattern

All text lives in `app/data/translations/*.ts`. Each file exports a `const` object with `{ en: "...", ar: "..." }` pairs. The central `index.ts` re-exports everything as a single `translations` object.

**Access pattern in components:**
```tsx
const t = translations;
const title = t.heroSection.hook[lang];
```

### Translation Files

| File             | Covers                                         |
| ---------------- | ---------------------------------------------- |
| `hero.ts`        | Headline lines, subheading, CTA labels         |
| `services.ts`    | 8 shared features (title + desc)               |
| `addons.ts`      | 8 add-on services (title + desc)               |
| `projects.ts`    | Project copy, CTAs, badges                     |
| `workflow.ts`    | 5 workflow steps (title + desc)                |
| `faq.ts`         | ~20 Q&As grouped by awareness/research/decision|
| `contact.ts`     | Section heading + subtitle                     |
| `form.ts`        | Form labels, placeholders, success/error msgs  |
| `nav.ts`         | 6 navigation link labels                       |
| `goal.ts`        | Brand mission tagline                          |
| `a11y.ts`        | ARIA labels, screen reader text                |
| `lang-toggle.ts` | Language toggle button label                   |

### Projects Data

`app/data/projects.ts` defines the `Project` interface and array:

```typescript
interface Project {
  id: string;
  liveUrl: string;
  screenshot: StaticImageData;
  schemaName: string;         // EN name
  schemaNameAr: string;       // AR name
  description / descriptionAr: string;
  genre / genreAr: string;
  keywords: string[];
  badge?: { en: string; ar: string };
  accentColor: string;        // Hex — used for project branding
}
```

Currently 2 projects: **Weddings** (e-commerce) and **Skyway** (travel agency).

---

## Styling System

### Design Tokens (CSS Custom Properties)

Defined in `app/styles/globals.css` `:root`. Dark theme only — no light mode.

| Token              | HSL Value          | Purpose                            |
| ------------------ | ------------------ | ---------------------------------- |
| `--background`     | `222 18% 8%`      | Page background (deep blue-black)  |
| `--surface-low`    | `222 14% 16%`     | Input fields (+8pt from bg)        |
| `--surface-card`   | `222 18% 12%`     | Cards (+4pt from bg)               |
| `--content-heading`| `222 10% 90%`     | Headings (near-white, cool tint)   |
| `--content-body`   | `222 10% 78%`     | Body text                          |
| `--content-muted`  | `222 10% 68%`     | Secondary text (4.5:1 contrast)    |
| `--border-subtle`  | `0 0% 100% / 0.07`| Subtle dividers                    |
| `--border-strong`  | `0 0% 100% / 0.14`| Hover/active borders               |
| `--icon`           | `222 12% 62%`     | Informational icons                |
| `--gold`           | `46 65% 52%`      | Brand accent (CTAs, highlights)    |
| `--gold-light`     | `46 100% 45%`     | Lighter gold                       |
| `--gold-dark`      | `46 50% 32%`      | Gradient endpoint                  |

Tokens are consumed via Tailwind theme extensions: `bg-background`, `text-content-heading`, `border-border-subtle`, `text-gold`, etc.

### Tailwind Theme Extensions

**Fluid typography** (clamp-based):
- `text-heading`: `clamp(1.5rem, 1.1rem + 1.7vw, 2.25rem)`
- `text-subheading`: `clamp(1.175rem, 1rem + 0.65vw, 1.5rem)`
- `text-base`: `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)`
- `text-caption`: `clamp(0.9375rem, 0.9rem + 0.15vw, 1rem)`

**Custom hover variant** (plugin): Only activates on devices with fine pointer + hover capability:
```css
@media (hover: hover) and (pointer: fine) { &:hover }
```

### CSS Animations (globals.css)

| Animation Class           | Effect                                      | Timing                        |
| ------------------------- | ------------------------------------------- | ----------------------------- |
| `.hero-fade`              | Opacity fade-in                             | Base class                    |
| `.hero-fade-hook-{1,2,3}` | Staggered headline lines                    | 0.4s / 0.8s / 1.2s delays    |
| `.hero-fade-label`        | "Web Designer" label                        | 2s delay, 0.3s duration       |
| `.hero-fade-nav`          | Navigation entrance                         | 1.6s delay                    |
| `.hero-fade-secondary-cta`| Secondary CTA button                        | 2s delay                      |
| `.cta-primary`            | Entrance slide-up + infinite shimmer loop   | 1.6s entrance, 5s shimmer     |
| `.cta-primary:hover`      | Manual shimmer sweep                        | 0.4s                          |
| `.btn-label`              | Form button label fade                      | 0.18s                         |
| `.btn-success-entrance`   | Success state entrance                      | 0.55s                         |
| `.portfolio-info-enter`   | Project info slide-up                       | 0.3s                          |
| `.phone-frame-pulse`      | Gold drop-shadow pulse                      | 1s, repeats 3x               |
| `.nav-link-underline`     | Gold gradient underline on hover/active     | 0.15s transition              |

All shimmer and entrance animations have **RTL variants** (reversed gradient directions, mirrored translate).

### Hero Visual Effects

- `.hero-grid` — Dot matrix background (28px grid, 1px radial dots, masked with elliptical gradient)
- `.hero-glow` — Subtle gold radial glow centered behind content (0.025 opacity)
- Both have mobile-specific overrides (22px grid, wider mask)

---

## Section-by-Section UI Implementation

### HeroSection (`#home`)

- **Layout**: Full viewport height (`h-[100dvh]`), flex column centered
- **Background**: `.hero-grid` dot pattern + `.hero-glow` radial gold
- **Headline**: Multi-line with per-word gold highlighting. Font: `clamp(2rem, 16vw, 7rem)`, RTL: `clamp(2.2rem, 11vw, 6rem)`
- **CTAs**: Primary gold gradient button (`.cta-primary` with shimmer) + secondary outline button
- **Animations**: Staggered CSS fade-in (no JS); each line appears sequentially

### ServicesSection (`#services`)

- **Layout**: Flex wrap with calculated widths: `w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-18px)]`
- **Cards**: `bg-surface-card/80`, `rounded-2xl`, `border border-border-subtle`
- **Icons**: Lucide icons (ShieldCheck, MonitorSmartphone, Zap, Globe, Search, MessageCircle, RefreshCw) at `w-12 h-12 md:w-16 md:h-16`
- **Hover**: `-translate-y-1.5` lift + `border-border-strong` transition (300ms)
- **Header**: "Every project includes" with centered heading

### AddOnsSection (`#add-ons`)

- **Layout**: Responsive grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-8` with `xl:col-span-2` per card
- **Special positioning**: Items 4 and 6 use `col-start` offsets for visual centering on XL screens
- **Cards**: Same style as ServicesSection cards
- **Icons**: LayoutDashboard, Languages, FileSearch, MapPin, PenLine, Palette, Mail

### GoalSection (`#goals`)

- **Layout**: Text-centered, decorative gradient background (`via-surface-card/40`)
- **Typography**: `text-4xl md:text-7xl` — largest text on the page
- **Feature**: `highlightWords()` function wraps specific keywords in gold (`text-gold`)
- **RTL**: Custom `md:rtl:leading-snug` for Arabic line-height

### PortfolioShowcase (`#portfolio`)

- **Layout**: iPhone mockup frame with horizontal snap-scroll carousel
- **iPhone frame**: Realistic bezels with DynamicIsland, StatusBar, HomeIndicator sub-components
- **Scroll**: CSS snap scroll (`portfolio-snap`, `phone-scroll` classes hide scrollbars)
- **Navigation**: NavArrow prev/next buttons with disabled states
- **Tracking**: Scroll position determines active project; IntersectionObserver triggers phone pulse animation
- **Info**: Project badge (genre) + CTA button to live site; animated entrance (`.portfolio-info-enter`)
- **SEO**: Inline JSON-LD structured data per project
- **Dynamic import**: Loaded via `next/dynamic` for code splitting

### WorkflowSection (`#how-it-works`)

- **Layout**: Delegates to Timeline component (dynamic import)
- **Timeline**: 5 steps — Consultation, UI/UX Design, Development, Launch, Ongoing Support
- **Timeline.tsx**: Scroll-driven beam animation using ResizeObserver + RAF scroll handler
  - Vertical line with gradient mask
  - Active bullet transitions (color change)
  - Linear progress calculation based on viewport position
  - Responsive: sticky sidebar on mobile, flex-row on desktop

### FAQSection (`#faq`)

- **Layout**: Native `<details>` accordion (grouped via `name="faq"`)
- **Search**: FAQSearch client component with Arabic text normalization (alef variants, diacritics, elongation marks, ZWJ/ZWNJ removal)
- **Expand/collapse**: Custom indicators using absolute-positioned spans (rotation on open)
- **RTL**: Conditional margin direction for indicator placement

### ContactSection (`#contact`)

- **Layout**: Max-width container (`max-w-5xl`) with centered heading
- **Form** (ContactForm.tsx — dynamic import):
  - Industry dropdown (10 bilingual options)
  - Contact method chips (WhatsApp, Phone, Email) — clicking reveals relevant fields
  - Phone validation: Egyptian format `01[0125]\d{8}`
  - Date/time pickers for phone call scheduling
  - Status states: idle → loading → success/error
  - Rate limiting error display

---

## Common Patterns

| Pattern                    | Implementation                                                    |
| -------------------------- | ----------------------------------------------------------------- |
| Section props              | All sections accept `{ lang: Lang }` only                         |
| RTL detection              | `const isRtl = lang === "ar"`; `dir={isRtl ? "rtl" : "ltr"}`     |
| Section spacing            | `py-24 md:py-36` vertical padding (consistent)                    |
| Container width            | `max-w-7xl mx-auto` (most sections)                               |
| Card hover                 | `hover:-translate-y-1.5 hover:border-border-strong duration-300`  |
| Accessibility              | `aria-labelledby`, `aria-label`, `aria-hidden` on decoratives     |
| Code splitting             | `next/dynamic` for PortfolioShowcase, ContactForm, Timeline       |
| Scroll anchors             | Section `id` attrs matched to nav links via IntersectionObserver  |
| Client boundary            | Only interactive components are `"use client"`; sections stay server|

---

## API Route

### POST `/api/contact`

- Validates input (name, phone, industry, contact method, optional email/date/time/message)
- Length limits on all fields
- Rate limiting: 1 submission per 180s per IP (via Upstash Redis; degrades gracefully if Redis unavailable)
- Sends email via Resend to `CONTACT_EMAIL`
- Returns JSON `{ success: boolean, error?: string }`

---

## SEO

- **JSON-LD schemas** in layout: ProfessionalService, Person, WebSite, WebPage, FAQPage
- **Metadata**: Dynamic per-language title, description, canonical URL, hreflang alternates
- **OpenGraph**: Image, locale, locale alternates
- **Twitter Card**: Large image summary
- **Sitemap**: `app/sitemap.ts`
- **robots.txt**: `public/robots.txt`

---

## Important Conventions

1. **No light mode** — dark theme only with HSL-based CSS custom properties
2. **No CSS-in-JS** — all styling via Tailwind utilities + globals.css custom classes
3. **No state management library** — React useState/useEffect only
4. **No Framer Motion** — all animations are pure CSS keyframes (explicitly replaced)
5. **Cairo font everywhere** — set globally via CSS variable `--font-cairo`
6. **RTL-first considerations** — every component handles `dir`, letter-spacing reset, mirrored gradients/arrows
7. **Minimal dependencies** — only essential packages; no component library
8. **Server components by default** — client boundary pushed to leaf components only
