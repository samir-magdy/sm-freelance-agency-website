import type { Localized } from "@/app/types";

export interface Guide {
  slug: string;
  datePublished: string;
  dateModified: Date;
  title: Localized;
  metaTitle?: Localized;
  excerpt: Localized;
  metaDescription: Localized;
  content: Localized;
}
