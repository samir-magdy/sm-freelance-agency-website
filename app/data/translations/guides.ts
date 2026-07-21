import type { Localized } from "@/app/types";

const guidesTranslations: Record<
  | "pageTitle"
  | "metaTitle"
  | "metaDescription"
  | "minRead"
  | "readMore"
  | "backToGuides"
  | "articleCta"
  | "articleCtaButton"
  | "relatedHeading",
  Localized
> = {
  pageTitle: {
    en: "Web Guides for Entrepreneurs",
    ar: "أدلة ويب لأصحاب المشاريع",
  },
  metaTitle: {
    en: "Web Guides for Entrepreneurs in Egypt",
    ar: "أدلة تصميم المواقع لأصحاب المشاريع في مصر",
  },
  metaDescription: {
    en: "Useful guides for Egyptian business owners and freelancers. Covering topics like how websites are priced and online website builders vs hiring a pro.",
    ar: "أدلة عملية لأصحاب الأعمال والمستقلين في مصر. اكتشف تكلفة المواقع، مقارنة بين إنشاء موقعك بنفسك أو توظيف محترف، وكيفية اختيار شريكك الرقمي المناسب.",
  },
  minRead: { en: "min read", ar: "دقايق قراءة" },
  readMore: { en: "Read Guide", ar: "اقرأ الدليل" },
  backToGuides: { en: "All Guides", ar: "جميع الأدلة" },
  articleCta: {
    en: "Ready to build your website?",
    ar: "جاهز تبني موقعك؟",
  },
  articleCtaButton: {
    en: "Get In Touch",
    ar: "تواصل معنا",
  },
  relatedHeading: { en: "Related guides:", ar: "أدلة ذات صلة:" },
};

export default guidesTranslations;
