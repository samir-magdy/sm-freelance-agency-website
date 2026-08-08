import type { Localized } from "@/app/types";

const footer = {
  sitemapLabel: { en: "Sitemap", ar: "خريطة الموقع" },
  legalLabel: { en: "Legal", ar: "روابط قانونية" },
  location: { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
  columns: {
    studio: { en: "Studio", ar: "الاستوديو" },
    work: { en: "Work", ar: "أعمالنا" },
    resources: { en: "Resources", ar: "الأدلة" },
  },
  legal: {
    privacy: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
    terms: { en: "Terms of Service", ar: "شروط الخدمة" },
  },
  pages: {
    services: { en: "Our Services", ar: "خدماتنا" },
    faq: { en: "FAQs", ar: "الأسئلة الشائعة" },
    about: { en: `About`, ar: "عن الاستوديو" },
    contact: { en: "Contact Us", ar: "تواصل معنا" },
  },
} satisfies {
  sitemapLabel: Localized;
  legalLabel: Localized;
  location: Localized;
  columns: Record<"studio" | "work" | "resources", Localized>;
  legal: Record<"privacy" | "terms", Localized>;
  pages: Record<"services" | "faq" | "about" | "contact", Localized>;
};

export default footer;
