import type { MetadataRoute } from "next";
import { SITE_URL } from "./constants";
import guides from "./data/guides";
import { projects } from "./data/portfolio";
import { LANGS } from "./types";
import { homeUrl, pageUrl, homeAlternates, pageAlternates } from "@/lib/urls";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const homeEntries = LANGS.map((lang) => ({
    url: homeUrl(lang),
    lastModified: now,
    alternates: { languages: homeAlternates(lang).languages },
  }));

  const staticPathEntries = ["/services", "/guides", "/privacy", "/terms"].flatMap((path) =>
    LANGS.map((lang) => ({
      url: pageUrl(lang, path),
      lastModified: now,
      alternates: { languages: pageAlternates(lang, path).languages },
    })),
  );

  const guideEntries = guides.flatMap((resource) =>
    LANGS.map((lang) => {
      const path = `/guides/${resource.slug}`;
      return {
        url: pageUrl(lang, path),
        lastModified: resource.dateModified,
        alternates: { languages: pageAlternates(lang, path).languages },
      };
    }),
  );

  const demoEntries = projects
    .filter((p) => p.liveUrl.startsWith("/portfolio/"))
    .map((p) => ({
      url: `${SITE_URL}${p.liveUrl}`,
      lastModified: now,
    }));

  return [...homeEntries, ...staticPathEntries, ...guideEntries, ...demoEntries];
}
