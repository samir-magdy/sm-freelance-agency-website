import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://samirmagdy.com", // Add the root domain
      lastModified: new Date(),
      changeFrequency: "weekly",     // Changed to weekly to encourage faster updates
      priority: 1,
    },
    {
      url: "https://samirmagdy.com/en",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,                 // Slightly lower so Google focuses on the root
    },
    {
      url: "https://samirmagdy.com/ar",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}