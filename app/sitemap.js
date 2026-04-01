import { SITE_URL } from "./data/translations/lang";

export default function sitemap() {
  const modifyDate = new Date().toISOString();

  return [
    {
      url: `${SITE_URL}/`, 
      lastModified: modifyDate,
      priority: 1.0,
      alternates: {
        languages: {
          en: `${SITE_URL}/`, 
          ar: `${SITE_URL}/ar`,
          "x-default": `${SITE_URL}/`,
        },
      },
    },
    {
      url: `${SITE_URL}/ar`,
      lastModified: modifyDate,
      priority: 0.9,
      alternates: {
        languages: {
          en: `${SITE_URL}/`, 
          ar: `${SITE_URL}/ar`,
          "x-default": `${SITE_URL}/`,
        },
      },
    },
  ];
}