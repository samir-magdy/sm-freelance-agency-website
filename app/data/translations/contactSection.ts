import type { Localized } from "@/app/types";

interface ContactSection {
  heading: Localized;
  subheading: Localized;
  whatsappCta: Localized;
  questionnaireCta: Localized;
}

const contactSection: ContactSection = {
  heading: {
    en: "Get In Touch",
    ar: "طلب استشارة",
  },
  subheading: {
    en: "Chat on WhatsApp, or complete our project survey for a custom quote.",
    ar: "راسلنا مباشرة عبر واتساب، أو ابدأ استبيان المشروع السريع.",
  },
  whatsappCta: { en: "Chat On WhatsApp", ar: "تواصل عبر الواتساب" },
  questionnaireCta: { en: "Get a Custom Quote", ar: "ابدأ الاستبيان" },
};

export default contactSection;
