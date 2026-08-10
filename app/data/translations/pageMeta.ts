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
  about: PageMeta;
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
      en: "Professional, affordable websites that help you attract more customers and strengthen your online presence. Get your quote today.",
      ar: "تصميم مواقع إلكترونية احترافية واقتصادية تساعدك على جذب المزيد من العملاء وتعزيز حضورك الرقمي. احصل على عرض سعر اليوم.",
    },
  },
  // SPECIALIZED SERVICES -> /services
  services: {
    title: {
      en: "Specialized Services — Branding, Copywriting, SEO, Bilingual",
      ar: "خدمات متخصصة — هوية بصرية، محتوى، SEO، ثنائي اللغة",
    },
    description: {
      en: `Branding, copywriting, SEO setup, and full bilingual support from ${SITE_NAME}. Layer onto a website build, or hire on its own.`,
      ar: `هوية بصرية، كتابة محتوى، إعداد SEO، ودعم كامل ثنائي اللغة من ${SITE_NAME}. أضفها لمشروع موقع، أو استفد منها كمشروع مستقل.`,
    },
  },
  // ABOUT PAGE -> /about
  about: {
    title: {
      en: "Website Designer & Developer in Egypt",
      ar: "مصمم ومطور مواقع إلكترونية في مصر",
    },
    description: {
      en: `Samir Magdy is a web designer, developer & the founder of ${SITE_NAME}, specializing in high-performance, custom web development.`,
      ar: "سمير مجدي هو مصمم ومطور مواقع في مصر ومؤسس شركة إس إم ويب ستوديو. متخصص في خدمات تصميم المواقع المخصصة للشركات والأفراد.",
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
        en: `Find out how much a professional website costs in Egypt in ${CURRENT_YEAR}. An honest EGP breakdown of what drives the price for landing pages, business sites, and online stores.`,
        ar: "هل تريد معرفة كم سيكلفك موقعك الإلكتروني؟ احسب تكلفة موقعك فوراً باستخدام حاسبة الأسعار الذكية، واكتشف العوامل التي تحدد الأسعار في مصر.",
      },
    },
    "diy-vs-professional-web-design": {
      title: {
        en: `DIY Website Builders vs Hiring a Developer (${CURRENT_YEAR})`,
        ar: ` استخدام منصات إنشاء المواقع الجاهزة أم الاستعانة بمصمم محترف؟ (${CURRENT_YEAR})`,
      },
      description: {
        en: "Should you build your own website on Wix or Squarespace, or hire a professional? Compare real costs (including hidden USD subscriptions), risks, and long-term tradeoffs.",
        ar: "هل تصمم موقعك بنفسك على Wix أو Squarespace، أم تستعين بمحترف؟ قارن التكاليف الحقيقية (بما فيها الاشتراكات الخفية بالدولار)، والمخاطر، والفروق على المدى البعيد.",
      },
    },
    "choose-web-design-company-egypt": {
      title: {
        en: `Choosing the Best Web Design Company (${CURRENT_YEAR})`,
        ar: `كيف تختار أفضل شركة تصميم مواقع إلكترونية في مصر؟ (${CURRENT_YEAR})`,
      },
      description: {
        en: `Choosing the wrong web design company in Egypt costs more than money. Learn the key questions to ask, red flags to spot, and how to choose right in ${CURRENT_YEAR}.`,
        ar: `اختيار شركة تصميم مواقع غير مناسبة في مصر مكلف: تأخير، ورسوم خفية بالدولار، ومواقع لا تعمل. تعرف على الأسئلة التي يجب أن تطرحها، والعلامات التحذيرية، ومعايير اختيار فريلانسر أو استوديو أو شركة في ${CURRENT_YEAR}.`,
      },
    },
    "why-your-business-needs-a-website": {
      title: {
        en: `Do I Need a Website for My Business? (${CURRENT_YEAR})`,
        ar: `هل تحتاج شركتك إلى موقع إلكتروني؟ (${CURRENT_YEAR})`,
      },
      description: {
        en: `Discover why your business in Egypt needs a website in ${CURRENT_YEAR}: real credibility, Google visibility, and ROI that Instagram and Facebook simply cannot match.`,
        ar: `هل تحتاج فعلاً إلى موقع إلكتروني في مصر في ${CURRENT_YEAR}؟ اكتشف الفوائد الحقيقية: المصداقية، والتحكم، والظهور في جوجل، والعائد بالجنيه. ولماذا لا يكفي وجودك على إنستجرام وفيسبوك.`,
      },
    },
    "is-seo-still-important-in-2026": {
      title: {
        en: `Is SEO Still Important in ${CURRENT_YEAR}? (AI & GEO Guide)`,
        ar: `هل السيو (SEO) لا يزال مهماً في ${CURRENT_YEAR}؟ (تأثير الذكاء الاصطناعي)`,
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
        en: "Confused by the new search landscape? Learn the differences between SEO (Search), AEO (Answer), and GEO (Generative) optimization, and how to master all three.",
        ar: "عالم البحث تغير! تعرف على الفروق الأساسية بين السيو التقليدي (SEO)، وتحسين الإجابات (AEO)، وتحسين محركات الذكاء الاصطناعي (GEO) وكيفية تطبيقها في موقعك.",
      },
    },
    "why-ai-website-builders-fail-businesses": {
      title: {
        en: "Why AI Website Builders Fail Businesses",
        ar: "لماذا تفشل مواقع الذكاء الاصطناعي في جذب العملاء؟",
      },
      description: {
        en: "AI website builders promise speed, but they often fail to generate leads. Discover why generic AI sites lack the SEO, UX, and conversion optimization your business needs.",
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
