import type { MetadataRoute } from "next";
import { SITE_URL } from "./constants";
import guides from "./data/guides";
import { projects } from "./data/portfolio";
import { LANGS, type Lang } from "./types";

function homeUrl(lang: Lang): string {
  return lang === "en" ? SITE_URL : `${SITE_URL}/ar`;
}

function pageUrl(lang: Lang, path: string): string {
  return `${SITE_URL}/${lang}${path}`;
}

function alternates(enUrl: string, arUrl: string) {
  return { languages: { en: enUrl, ar: arUrl, "x-default": enUrl } };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const homeEntries = LANGS.map((lang) => ({
    url: homeUrl(lang),
    lastModified: now,
    priority: lang === "en" ? 1.0 : 0.9,
    alternates: alternates(homeUrl("en"), homeUrl("ar")),
  }));

  const aboutEntries = LANGS.map((lang) => ({
    url: pageUrl(lang, "/about"),
    lastModified: now,
    priority: 0.8,
    alternates: alternates(pageUrl("en", "/about"), pageUrl("ar", "/about")),
  }));

  const guidesListingEntries = LANGS.map((lang) => ({
    url: pageUrl(lang, "/guides"),
    lastModified: now,
    priority: 0.8,
    alternates: alternates(pageUrl("en", "/guides"), pageUrl("ar", "/guides")),
  }));

  const guideEntries = guides.flatMap((resource) =>
    LANGS.map((lang) => ({
      url: pageUrl(lang, `/guides/${resource.slug}`),
      lastModified: resource.dateModified,
      priority: 0.7,
      alternates: alternates(
        pageUrl("en", `/guides/${resource.slug}`),
        pageUrl("ar", `/guides/${resource.slug}`),
      ),
    })),
  );

  const demoEntries = projects
    .filter((p) => p.liveUrl.startsWith("/portfolio/"))
    .map((p) => ({
      url: `${SITE_URL}${p.liveUrl}`,
      lastModified: now,
      priority: 0.6,
    }));

  return [
    ...homeEntries,
    ...aboutEntries,
    ...guidesListingEntries,
    ...guideEntries,
    ...demoEntries,
  ];
}
