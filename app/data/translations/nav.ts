import type { Localized } from "@/app/types";

export type NavKey =
  | "portfolio"
  | "services"
  | "faq"
  | "about"
  | "guides"
  | "contact";

const navTranslations: Record<NavKey, Localized> = {
  portfolio: { en: "Portfolio", ar: "الأعمال" },
  services: { en: "Services", ar: "الخدمات" },
  faq: { en: "FAQs", ar: "الأسئلة الشائعة" },
  about: { en: "About", ar: "الاستوديو" },
  guides: { en: "Guides", ar: "الأدلة" },
  contact: { en: "Contact", ar: "تواصل معنا" },
};

export const breadcrumbHome: Localized = { en: "Home", ar: "الرئيسية" };

type NavItem =
  | { key: NavKey; kind: "hash"; target: string }
  | { key: NavKey; kind: "route"; path: string };

// Single source of truth for nav order and link kind. Reorder here to reorder
// both the desktop nav and the mobile menu.
export const navItems: readonly NavItem[] = [
  { key: "portfolio", kind: "hash", target: "portfolio" },
  { key: "services", kind: "hash", target: "services" },
  { key: "faq", kind: "hash", target: "FAQs" },
  { key: "about", kind: "route", path: "about" },
  { key: "guides", kind: "route", path: "guides" },
  { key: "contact", kind: "hash", target: "contact" },
];

export const langToggle: Localized = { en: "EN", ar: "عربي" };

export default navTranslations;
