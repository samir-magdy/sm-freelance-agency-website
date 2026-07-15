import type { Localized } from "@/app/types";

export type NavKey =
  | "portfolio"
  | "pricing"
  | "FAQs"
  | "guides"
  | "about"
  | "contact";

const nav: Record<NavKey, Localized> = {
  portfolio: { en: "Portfolio", ar: "أعمالنا" },
  pricing: { en: "Pricing", ar: "الأسعار" },
  FAQs: { en: "FAQs", ar: "الأسئلة الشائعة" },
  guides: { en: "Guides", ar: "الأدلة" },
  about: { en: "About", ar: "من نحن" },
  contact: { en: "Contact", ar: "تواصل معنا" },
};

// Leading contiguous hash-scroll links rendered by the loop, with `contact`
// last for the contactItem lookup.
export const navLinks = ["portfolio", "pricing", "contact"] as const satisfies readonly NavKey[];

export const langToggle: Localized = { en: "EN", ar: "عربي" };

export default nav;
