import type { Localized } from "@/app/types";
import { SITE_NAME } from "@/app/constants";

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
  | "writtenBy"
  | "authorName"
  | "authorBio"
  | "aboutAuthorLink"
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
    en: "Ready to build your website?",
    ar: "جاهز تبني موقعك؟",
  },
  articleCtaButton: {
    en: "Request a Quote",
    ar: "اطلب عرض سعر",
  },
  relatedHeading: { en: "Related guides:", ar: "أدلة ذات صلة:" },
  egyptPricingNotice: {
    en: "Based outside Egypt?\nGet a quote in your local currency.",
    ar: "خارج مصر؟\nاحصل على عرض سعر بعملتك المحلية.",
  },
  updatedOn: { en: "Updated", ar: "آخر تحديث" },
  writtenBy: { en: "Written by", ar: "بقلم" },
  authorName: { en: "Samir Magdy", ar: "سمير مجدي" },
  authorBio: {
    en: `Founder of ${SITE_NAME}, a web design studio in Cairo, Egypt. Samir designs and builds custom, high-performance websites with Next.js and TypeScript, and writes these guides to help business owners invest in the web wisely.`,
    ar: `مؤسس ${SITE_NAME}، استوديو تصميم مواقع في القاهرة. يصمم سمير ويطوّر مواقع مخصصة عالية الأداء باستخدام Next.js وTypeScript، ويكتب هذه الأدلة لمساعدة أصحاب المشاريع على الاستثمار في الويب بذكاء.`,
  },
  aboutAuthorLink: { en: "More about the studio", ar: "المزيد عن الاستوديو" },
  faqHeading: { en: "Frequently asked questions", ar: "أسئلة شائعة" },
};

export default guidesTranslations;
