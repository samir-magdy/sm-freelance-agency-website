import type { Localized } from "@/app/types";

export interface LegalSection {
  title: Localized;
  content: Localized;
}

export interface LegalDocument {
  heading: Localized;
  subheading: Localized;
  sections: LegalSection[];
}
