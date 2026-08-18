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
  | "egyptPricingNoticeCta",
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
    en: "Ready to build your website?",
    ar: "جاهز تبني موقعك؟",
  },
  articleCtaButton: {
    en: "Get Started",
    ar: "ابدأ مشروعك",
  },
  relatedHeading: { en: "Related guides:", ar: "أدلة ذات صلة:" },
  egyptPricingNotice: {
    en: "Based outside Egypt? Get a quote in your local currency.",
    ar: "خارج مصر؟ احصل على عرض سعر بعملتك المحلية.",
  },
  egyptPricingNoticeCta: {
    en: "Request a Consultation",
    ar: "اطلب استشارة",
  },
};

export default guidesTranslations;
