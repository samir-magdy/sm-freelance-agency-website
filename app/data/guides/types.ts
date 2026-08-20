import type { Localized } from "@/app/types";

export interface Guide {
  slug: string;
  datePublished: string;
  // ISO date (YYYY-MM-DD). Bump ONLY alongside a genuine content update —
  // schema.org dateModified and the sitemap lastmod both read from this, and
  // search engines learn to ignore lastmod values that change without cause.
  dateModified: string;
  title: Localized;
  excerpt: Localized;
  content: Localized;
  readingMinutes: Localized<number>;
  // Drives Nollie's condition_2_topic_to_guide matching (see nolliePrompt.ts).
  // Omit only for guides surfaced through a different chat trigger (e.g. the
  // cost guide, which condition_1_cost includes unconditionally).
  chatTrigger?: {
    topic: string;
    arabicExamples: string[];
  };
  // Rendered as a visible FAQ section AND emitted as FAQPage JSON-LD from the
  // same data, so the markup can never drift from the visible content.
  // Answers are plain text (no HTML).
  faq?: {
    question: Localized;
    answer: Localized;
  }[];
}
