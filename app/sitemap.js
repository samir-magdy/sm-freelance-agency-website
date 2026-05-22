import { SITE_URL } from "./data/translations/lang";
import guides from "./data/guides";
import { projects } from "./data/projects";

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

  const portfolioEntries = projects
    .filter((project) => project.liveUrl.startsWith("/"))
    .map((project) => ({
      url: `${SITE_URL}/portfolio/${project.slug}`,
      lastModified: now,
      priority: 0.8,
    }));

  const premiumComponentsEntry = {
    url: `${SITE_URL}/react-components`,
    lastModified: now,
    priority: 0.5,
  };

  const showcaseEntry = {
    url: `${SITE_URL}/react-components-showcase`,
    lastModified: now,
    priority: 0.5,
  };

  return [
    ...homeEntries,
    ...guidesListingEntries,
    ...guideEntries,
    ...portfolioEntries,
    premiumComponentsEntry,
    showcaseEntry,
  ];
}
