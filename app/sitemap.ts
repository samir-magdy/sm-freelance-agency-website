import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const modifyDate = "2026-03-14";
  return [
    {
      url: "https://samirmagdy.com",
      lastModified: modifyDate,
      alternates: {
        languages: {
          en: "https://samirmagdy.com",
          ar: "https://samirmagdy.com/ar",
        },
      },
    },
    {
      url: "https://samirmagdy.com/ar",
      lastModified: modifyDate,
      alternates: {
        languages: {
          en: "https://samirmagdy.com",
          ar: "https://samirmagdy.com/ar",
        },
      },
    },
  ];
}