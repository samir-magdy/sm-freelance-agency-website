import { SITE_URL } from "./constants";
import guides from "./data/guides";

const langs = ["en", "ar"];

function homeUrl(lang) {
  return lang === "en" ? `${SITE_URL}/` : `${SITE_URL}/ar`;
}

function pageUrl(lang, path) {
  return `${SITE_URL}/${lang}${path}`;
}

function alternates(enUrl, arUrl) {
  return { languages: { en: enUrl, ar: arUrl, "x-default": enUrl } };
}

export default function sitemap() {
  const now = new Date().toISOString();

  const homeEntries = langs.map((lang) => ({
    url: homeUrl(lang),
    lastModified: now,
    priority: lang === "en" ? 1.0 : 0.9,
    alternates: alternates(homeUrl("en"), homeUrl("ar")),
  }));

  const aboutEntries = langs.map((lang) => ({
    url: pageUrl(lang, "/about"),
    lastModified: now,
    priority: 0.8,
    alternates: alternates(pageUrl("en", "/about"), pageUrl("ar", "/about")),
  }));

  const guidesListingEntries = langs.map((lang) => ({
    url: pageUrl(lang, "/guides"),
    lastModified: now,
    priority: 0.8,
    alternates: alternates(pageUrl("en", "/guides"), pageUrl("ar", "/guides")),
  }));

  const guideEntries = guides.flatMap((resource) =>
    langs.map((lang) => ({
      url: pageUrl(lang, `/guides/${resource.slug}`),
      lastModified: now,
      priority: 0.7,
      alternates: alternates(
        pageUrl("en", `/guides/${resource.slug}`),
        pageUrl("ar", `/guides/${resource.slug}`)
      ),
    }))
  );

  const privacyEntries = langs.map((lang) => ({
    url: pageUrl(lang, "/privacy"),
    lastModified: now,
    priority: 0.4,
    alternates: alternates(pageUrl("en", "/privacy"), pageUrl("ar", "/privacy")),
  }));

  const termsEntries = langs.map((lang) => ({
    url: pageUrl(lang, "/terms"),
    lastModified: now,
    priority: 0.4,
    alternates: alternates(pageUrl("en", "/terms"), pageUrl("ar", "/terms")),
  }));

  const showcaseEntry = {
    url: `${SITE_URL}/react-components-showcase`,
    lastModified: now,
    priority: 0.5,
  };

  return [
    ...homeEntries,
    ...aboutEntries,
    ...guidesListingEntries,
    ...guideEntries,
    ...privacyEntries,
    ...termsEntries,
    showcaseEntry,
  ];
}
