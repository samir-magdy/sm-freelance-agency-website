import { SITE_URL } from "@/app/constants";
import type { Lang } from "@/app/types";

// Both languages live under /<lang>/… — `/` 301-redirects to `/en` (see
// next.config.ts). Keeping the pattern symmetric makes hreflang, canonicals,
// and hash-link navigation predictable.

export function homeUrl(lang: Lang): string {
  return `${SITE_URL}/${lang}`;
}

export function pageUrl(lang: Lang, path: string): string {
  return `${SITE_URL}/${lang}${path}`;
}

function languageAlternates(build: (lang: Lang) => string) {
  const en = build("en");
  return { en, ar: build("ar"), "x-default": en };
}

export function homeAlternates(lang: Lang) {
  return {
    canonical: homeUrl(lang),
    languages: languageAlternates(homeUrl),
  };
}

export function pageAlternates(lang: Lang, path: string) {
  return {
    canonical: pageUrl(lang, path),
    languages: languageAlternates((l) => pageUrl(l, path)),
  };
}

export function ogImage(lang: Lang): string {
  return `${SITE_URL}/open-graph${lang === "ar" ? "-ar" : ""}.png`;
}
