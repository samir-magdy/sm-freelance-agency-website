import type { Localized } from "@/app/types";

const guidesTranslations: Record<
  | "pageTitle"
  | "pageSubtitle"
  | "minRead"
  | "readGuideButton"
  | "stayTunedHeading"
  | "stayTunedDescription"
  | "backToGuides"
  | "articleCta"
  | "articleCtaButton"
  | "relatedHeading"
  | "egyptPricingNotice"
  | "updatedOn"
  | "faqHeading",
  Localized
> = {
  pageTitle: {
    en: "Guides & Resources",
    ar: "الأدلة والموارد",
  },
  pageSubtitle: {
    en: "Learn the basics before investing",
    ar: "تعلم الأساسيات قبل أن تستثمر",
  },
  minRead: { en: "min read", ar: "دقايق قراءة" },
  readGuideButton: { en: "Read Guide", ar: "اقرأ الدليل" },
  stayTunedHeading: { en: "Stay Tuned", ar: "ترقب المزيد" },
  stayTunedDescription: {
    en: "We are working on more useful guides for you.",
    ar: "نعمل على إعداد المزيد من الأدلة المميزة من أجلك.",
  },
  backToGuides: { en: "All Guides", ar: "جميع الأدلة" },
  articleCta: {
    en: "Ready for your website?",
    ar: "جاهز تبني موقعك؟",
  },
  articleCtaButton: {
    en: "Get Started",
    ar: "اطلب عرض سعر",
  },
  relatedHeading: { en: "Related guides:", ar: "أدلة ذات صلة:" },
  egyptPricingNotice: {
    en: "Based outside Egypt?\nGet a quote in your local currency.",
    ar: "خارج مصر؟\nاحصل على عرض سعر بعملتك المحلية.",
  },
  updatedOn: { en: "Updated", ar: "آخر تحديث" },
  faqHeading: { en: "Frequently asked questions", ar: "أسئلة شائعة" },
};

export default guidesTranslations;
