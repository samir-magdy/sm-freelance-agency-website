import { CURRENT_YEAR } from "@/app/constants";
import type { Localized } from "@/app/types";

const guidesTranslations: Record<
  | "pageTitle"
  | "metaTitle"
  | "metaDescription"
  | "minRead"
  | "readGuideButton"
  | "backToGuides"
  | "articleCta"
  | "articleCtaButton"
  | "relatedHeading",
  Localized
> = {
  pageTitle: {
    en: "Guides & Resources",
    ar: "الأدلة والموارد",
  },
  metaTitle: {
    en: `Web Design Guides for Egyptian Businesses (${CURRENT_YEAR})`,
    ar: `أدلة تصميم المواقع للسوق المصري (${CURRENT_YEAR})`,
  },
  metaDescription: {
    en: "Useful guides for Egyptian business owners and freelancers. Covering topics like 'how websites are priced' and 'website builders vs hiring a professional developer'.",
    ar: "أدلة عملية لأصحاب الأعمال والمستقلين في مصر. اكتشف تكلفة المواقع، مقارنة بين إنشاء موقعك بنفسك أو توظيف محترف، وكيفية اختيار شريكك الرقمي المناسب.",
  },
  minRead: { en: "min read", ar: "دقايق قراءة" },
  readGuideButton: { en: "Read Guide", ar: "اقرأ الدليل" },
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
