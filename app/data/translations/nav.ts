import type { Localized } from "@/app/types";

export type NavKey =
  | "portfolio"
  | "pricing"
  | "faq"
  | "about"
  | "guides"
  | "contact";

const nav: Record<NavKey, Localized> = {
  portfolio: { en: "Portfolio", ar: "سابقة الأعمال" },
  pricing: { en: "Services", ar: "الخدمات والأسعار" },
  faq: { en: "FAQs", ar: "الأسئلة الشائعة" },
  about: { en: "About", ar: "من نحن" },
  guides: { en: "Guides", ar: "الأدلة" },
  contact: { en: "Contact", ar: "تواصل معنا" },
};

type NavItem =
  | { key: NavKey; kind: "hash"; target: string }
  | { key: NavKey; kind: "route"; path: string };

// Single source of truth for nav order and link kind. Reorder here to reorder
// both the desktop nav and the mobile menu.
export const navItems: readonly NavItem[] = [
  { key: "portfolio", kind: "hash", target: "portfolio" },
  { key: "pricing", kind: "hash", target: "pricing" },
  { key: "faq", kind: "hash", target: "FAQs" },
  { key: "about", kind: "route", path: "about" },
  { key: "guides", kind: "route", path: "guides" },
  { key: "contact", kind: "hash", target: "contact" },
];

export const langToggle: Localized = { en: "EN", ar: "عربي" };

export default nav;
