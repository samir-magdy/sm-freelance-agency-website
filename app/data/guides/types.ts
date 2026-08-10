import type { Localized } from "@/app/types";

export interface Guide {
  slug: string;
  datePublished: string;
  dateModified: Date;
  title: Localized;
  excerpt: Localized;
  content: Localized;
  readingMinutes: Localized<number>;
}
