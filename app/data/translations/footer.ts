import { SITE_NAME } from "@/app/constants";
import type { Localized } from "@/app/types";

const footer = {
  sitemapLabel: { en: "Sitemap", ar: "خريطة الموقع" },
  legalLabel: { en: "Legal", ar: "روابط قانونية" },
  columns: {
    studio: { en: "Studio", ar: "الاستوديو" },
    work: { en: "Work", ar: "أعمالنا" },
    resources: { en: "Resources", ar: "موارد" },
  },
  labels: {
    privacy: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
    terms: { en: "Terms of Service", ar: "شروط الخدمة" },
    location: { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
  },
  pages: {
    pricing: { en: "Services & Pricing", ar: "الخدمات والأسعار" },
    faq: { en: "FAQs", ar: "الأسئلة الشائعة" },
    about: { en: `About ${SITE_NAME}`, ar: "من نحن" },
    contact: { en: "Contact Us", ar: "تواصل معنا" },
  },
} satisfies {
  sitemapLabel: Localized;
  legalLabel: Localized;
  columns: Record<"studio" | "work" | "resources", Localized>;
  labels: Record<
    "privacy" | "terms" | "location",
    Localized
  >;
  pages: Record<"pricing" | "faq" | "about" | "contact", Localized>;
};

export default footer;
