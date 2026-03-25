import { MetadataRoute } from "next";
import { SITE_URL } from "./data/translations/lang";

export default function sitemap(): MetadataRoute.Sitemap {
  const modifyDate = "2026-03-26";
  return [
    {
      url: SITE_URL,
      lastModified: modifyDate,
      alternates: {
        languages: {
          en: SITE_URL,
          ar: `${SITE_URL}/ar`,
        },
      },
    },
    {
      url: `${SITE_URL}/ar`,
      lastModified: modifyDate,
      alternates: {
        languages: {
          en: SITE_URL,
          ar: `${SITE_URL}/ar`,
        },
      },
    },
  ];
}