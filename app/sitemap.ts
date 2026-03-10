import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://samirmagdy.com",
      lastModified: "2026-03-10",
      alternates: {
        languages: {
          en: "https://samirmagdy.com",
          ar: "https://samirmagdy.com/ar",
        },
      },
    },
    {
      url: "https://samirmagdy.com/ar",
      lastModified: "2026-03-10",
      alternates: {
        languages: {
          en: "https://samirmagdy.com",
          ar: "https://samirmagdy.com/ar",
        },
      },
    },
  ];
}