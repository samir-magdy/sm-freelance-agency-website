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
    ar: "تواصل معنا",
  },
  subheading: {
    en: "Ask us anything on WhatsApp or complete our project survey for a custom quote.",
    ar: "راسلنا مباشرة عبر واتساب، أو ابدأ استبيان المشروع السريع.",
  },
  whatsappCta: { en: "Chat On WhatsApp", ar: "تواصل عبر الواتساب" },
  questionnaireCta: { en: "Get a Custom Quote", ar: "اطلب عرض سعر" },
};

export default contactSection;
