import { SITE_URL } from "./data/translations/lang";
import resources from "./data/resources";

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

  const resourcesListingEntries = langs.map((lang) => ({
    url: pageUrl(lang, "/resources"),
    lastModified: now,
    priority: 0.8,
    alternates: alternates(pageUrl("en", "/resources"), pageUrl("ar", "/resources")),
  }));

  const resourceEntries = resources.flatMap((resource) =>
    langs.map((lang) => ({
      url: pageUrl(lang, `/resources/${resource.slug}`),
      lastModified: new Date(resource.publishedAt).toISOString(),
      priority: 0.7,
      alternates: alternates(
        pageUrl("en", `/resources/${resource.slug}`),
        pageUrl("ar", `/resources/${resource.slug}`)
      ),
    }))
  );

  const privacyEntries = langs.map((lang) => ({
    url: pageUrl(lang, "/privacy"),
    lastModified: now,
    priority: 0.3,
    alternates: alternates(pageUrl("en", "/privacy"), pageUrl("ar", "/privacy")),
  }));

  const termsEntries = langs.map((lang) => ({
    url: pageUrl(lang, "/terms"),
    lastModified: now,
    priority: 0.3,
    alternates: alternates(pageUrl("en", "/terms"), pageUrl("ar", "/terms")),
  }));

  const premiumComponentsEntry = {
    url: `${SITE_URL}/premium-react-components`,
    lastModified: now,
    priority: 0.5,
  };

  return [
    ...homeEntries,
    ...resourcesListingEntries,
    ...resourceEntries,
    ...privacyEntries,
    ...termsEntries,
    premiumComponentsEntry,
  ];
}
