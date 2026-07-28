import type { Localized } from "@/app/types";

export interface LegalItem {
  title: Localized;
  content: Localized;
}

export interface LegalDocument {
  heading: Localized;
  subheading: Localized;
  items: LegalItem[];
}
