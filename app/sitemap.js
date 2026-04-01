import { SITE_URL } from "./data/translations/lang";

export default function sitemap() {
  const modifyDate = new Date().toISOString();
  return [
    {
      url: `${SITE_URL}/en`,
      lastModified: modifyDate,
      alternates: {
        languages: {
          en: `${SITE_URL}/en`,
          ar: `${SITE_URL}/ar`,
        },
      },
    },
    {
      url: `${SITE_URL}/ar`,
      lastModified: modifyDate,
      alternates: {
        languages: {
          en: `${SITE_URL}/en`,
          ar: `${SITE_URL}/ar`,
        },
      },
    },
  ];
}