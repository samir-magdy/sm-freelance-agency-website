import { CURRENT_YEAR, SITE_NAME } from "@/app/constants";
import type { Localized } from "@/app/types";

// SEO metadata (browser tab title + <meta name="description">) for every
// route on the site. Static pages live at the top level; individual guide
// articles live under `guideArticles`, keyed by slug. Legal pages duplicate
// their document heading as `title` so this file stays the single source of
// truth for all page-level SEO copy.

interface PageMeta {
  title: Localized;
  description: Localized;
}

// Guide articles allow an optional distinct SEO title. When omitted, the
// consumer falls back to the guide's own `title` (the H1).
interface GuideArticleMeta {
  title?: Localized;
  description: Localized;
}

const pageMeta: {
  home: PageMeta;
  services: PageMeta;
  guides: PageMeta;
  privacy: PageMeta;
  terms: PageMeta;
  guideArticles: Record<string, GuideArticleMeta>;
} = {
  // MAIN LANDING PAGE -> /en and /ar
  home: {
    title: {
      en: `Web Design & Development | ${SITE_NAME}`,
      ar: `تصميم وتطوير مواقع إلكترونية | ${SITE_NAME}`,
    },
    description: {
      en: "Stand out from competitors with modern, custom web development that builds instant trust with your clients. Request a free quote today.",
      ar: "تميز عن منافسيك بموقع إلكتروني مخصص وعالي الجودة يبني الثقة الفورية مع عملائك. احصل على عرض سعر مجاني اليوم.",
    },
  },
  // SPECIALIZED SERVICES -> /services
  services: {
    title: {
      en: "Services - Branding, SEO, Copywriting & AI",
      ar: "الخدمات - هوية بصرية، سيو، كتابة محتوى، وذكاء اصطناعي",
    },
    description: {
      en: `Logo design & branding, SEO setup, website copywriting, AI chatbots, professional business email, and website maintenance from ${SITE_NAME}.`,
      ar: `تصميم لوجو وهوية تجارية، سيو (SEO)، كتابة محتوى، ذكاء اصطناعي، إيميل رسمي باسم شركتك، وصيانة مواقع من ${SITE_NAME}.`,
    },
  },
  // ALL GUIDES PAGE /guides
  guides: {
    title: {
      en: `Web Design Guides for Egyptian Businesses (${CURRENT_YEAR})`,
      ar: `أدلة تصميم المواقع للسوق المصري (${CURRENT_YEAR})`,
    },
    description: {
      en: "Useful guides for Egyptian business owners and freelancers. Covering topics like 'how websites are priced' and 'website builders vs hiring a professional developer'.",
      ar: "أدلة عملية لأصحاب الأعمال والمستقلين في مصر. اكتشف تكلفة المواقع، مقارنة بين إنشاء موقعك بنفسك أو توظيف محترف، وكيفية اختيار شريكك الرقمي المناسب.",
    },
  },
  // INDIVIDUAL GUIDES -> /guides/foo
  guideArticles: {
    "website-cost-in-egypt": {
      title: {
        en: `How Much Does a Website Cost in Egypt (${CURRENT_YEAR})`,
        ar: `كم تكلفة تصميم موقع إلكتروني احترافي في مصر؟ (${CURRENT_YEAR})`,
      },
      description: {
        en: `How much does a website cost in Egypt in ${CURRENT_YEAR}? An honest EGP price breakdown by website type, plus the ten factors that move the price up or down.`,
        ar: "كم تكلفة تصميم موقع إلكتروني في مصر؟ تعرّف على متوسط الأسعار بالجنيه حسب نوع الموقع، والعوامل العشرة التي تحدد التكلفة النهائية لتستثمر بذكاء.",
      },
    },
    "diy-vs-professional-web-design": {
      title: {
        en: `DIY Website Builders vs Hiring a Developer (${CURRENT_YEAR})`,
        ar: `منصات إنشاء المواقع الجاهزة أم مصمم محترف؟ (${CURRENT_YEAR})`,
      },
      description: {
        en: "Should you build your own website on Wix or Squarespace, or hire a professional? Compare the real costs, hidden USD subscriptions, and long-term tradeoffs.",
        ar: "هل تصمم موقعك بنفسك على Wix أو Squarespace أم تستعين بمحترف؟ قارن التكاليف الحقيقية والاشتراكات الخفية بالدولار والفروق على المدى البعيد.",
      },
    },
    "choose-web-design-company-egypt": {
      title: {
        en: `Choosing the Best Web Design Company in Egypt (${CURRENT_YEAR})`,
        ar: `كيف تختار أفضل شركة تصميم مواقع إلكترونية في مصر؟ (${CURRENT_YEAR})`,
      },
      description: {
        en: `Choosing the wrong web design company in Egypt costs more than money. Learn the key questions to ask, red flags to spot, and how to choose right in ${CURRENT_YEAR}.`,
        ar: `اختيار شركة تصميم مواقع غير مناسبة في مصر مكلف. تعرف على الأسئلة التي يجب طرحها، والعلامات التحذيرية، وكيف تختار بين مستقل أو استوديو أو شركة في ${CURRENT_YEAR}.`,
      },
    },
    "why-your-business-needs-a-website": {
      title: {
        en: `Do I Need a Website for My Business? (${CURRENT_YEAR})`,
        ar: `هل تحتاج شركتك إلى موقع إلكتروني؟ (${CURRENT_YEAR})`,
      },
      description: {
        en: `Discover why your business in Egypt needs a website in ${CURRENT_YEAR}: real credibility, Google visibility, and ROI that Instagram and Facebook simply cannot match.`,
        ar: `هل تحتاج فعلاً إلى موقع إلكتروني في مصر في ${CURRENT_YEAR}؟ اكتشف الفوائد الحقيقية: المصداقية، والظهور في جوجل، والعائد الذي لا توفره صفحات السوشيال ميديا.`,
      },
    },
    "is-seo-still-important-in-2026": {
      title: {
        en: `Is SEO Still Important in ${CURRENT_YEAR}? (AI & GEO Guide)`,
        ar: `هل لا يزال السيو (SEO) مهماً في ${CURRENT_YEAR}؟`,
      },
      description: {
        en: `Discover why SEO is still crucial in ${CURRENT_YEAR} and how Generative Engine Optimization (GEO) and AI Overviews are changing the way businesses rank on Google.`,
        ar: `اكتشف لماذا لا يزال السيو (SEO) أساسياً في ${CURRENT_YEAR}، وكيف يغير الذكاء الاصطناعي (AI Overviews) و (GEO) قواعد تصدر نتائج بحث جوجل للشركات.`,
      },
    },
    "what-is-seo-geo-and-aeo": {
      title: {
        en: `What is SEO, GEO, and AEO? (${CURRENT_YEAR} Guide)`,
        ar: `ما هو السيو (SEO)، والـ GEO، والـ AEO؟ (${CURRENT_YEAR})`,
      },
      description: {
        en: "Confused by the new search landscape? Learn the differences between SEO, AEO, and GEO — and how one well-built strategy can master all three at once.",
        ar: "عالم البحث تغير! تعرف على الفروق الأساسية بين السيو التقليدي (SEO)، وتحسين الإجابات (AEO)، وتحسين محركات الذكاء الاصطناعي (GEO) وكيفية تطبيقها في موقعك.",
      },
    },
    "why-ai-website-builders-fail-businesses": {
      title: {
        en: "Why AI Website Builders Fail Businesses",
        ar: "لماذا تفشل مواقع الذكاء الاصطناعي في جذب العملاء؟",
      },
      description: {
        en: "AI website builders promise speed but often fail to generate leads. See why generic AI sites lack the SEO, UX, and conversion strategy a business needs.",
        ar: "تعدك أدوات الذكاء الاصطناعي بالسرعة، لكنها تفشل في جذب العملاء. اكتشف لماذا تفتقر هذه المواقع إلى التهيئة لمحركات البحث وتجربة المستخدم التي يحتاجها عملك.",
      },
    },
  },
  // LEGAL PAGES /privacy and /terms
  privacy: {
    title: {
      en: "Privacy Policy",
      ar: "سياسة الخصوصية",
    },
    description: {
      en: `Read ${SITE_NAME}'s privacy policy to understand how we collect, use, and protect your personal data when you use our services.`,
      ar: `اطّلع على سياسة الخصوصية الخاصة بـ ${SITE_NAME} وتعرّف على كيفية جمع بياناتك الشخصية واستخدامها وحمايتها.`,
    },
  },
  terms: {
    title: {
      en: "Terms of Service",
      ar: "شروط الخدمة",
    },
    description: {
      en: `Read the terms of service for ${SITE_NAME}. Learn about your rights and obligations when using our web design and development services.`,
      ar: `اطّلع على شروط الخدمة الخاصة بـ ${SITE_NAME} وتعرّف على حقوقك والتزاماتك عند استخدام خدمات تصميم المواقع لدينا.`,
    },
  },
};

export default pageMeta;
