import type { Localized } from "@/app/types";

export interface Guide {
  slug: string;
  datePublished: string;
  dateModified: Date;
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
}
