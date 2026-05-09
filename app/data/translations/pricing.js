export const pricingEstimator = {
  estimateLabel: { en: "Estimate:", ar: "التكلفة التقديرية:" },
  baseLabel: {
    en: "What kind of website do you need?",
    ar: "ما نوع الموقع الذي تحتاجه؟",
  },
  scopeLabel: { en: "How large is your site?", ar: "ما حجم الموقع المطلوب؟" },
  addonsLabel: { en: "Anything extra?", ar: "هل تحتاج إضافات؟" },
  cta: {
    en: "Discuss My Quote",
    ar: "ناقش عرض السعر",
  },
  disclaimer: {
    en: "The price displayed by this tool is an estimate for your reference. Final pricing is confirmed after our consultation.",
    ar: "السعر الظاهر في هذه الأداة هو تقدير استرشادي فقط. يتم تأكيد السعر النهائي بعد الاستشارة.",
  },
  usdExchangeRate: 50,
  bases: [
    {
      id: "landing",
      price: 5999,
      name: { en: "Landing Page", ar: "صفحة هبوط" },
      description: {
        en: "One-page site optimized for maximum ROI",
        ar: "موقع احترافي في صفحة واحدة",
      },
    },
    {
      id: "business",
      price: 8999,
      name: { en: "Business Website", ar: "موقع أعمال" },
      description: {
        en: "Expanded pages to cover your full range of services",
        ar: "صفحات إضافية تغطي كافة خدماتك بشكل شامل",
      },
    },
    {
      id: "ecommerce",
      price: 16999,
      name: { en: "Online Store", ar: "متجر إلكتروني" },
      description: {
        en: "A full Shopify store to sell your products online",
        ar: "متجر شوبيفاي احترافي لبيع منتجاتك أونلاين",
      },
    },
  ],
  scopesByBase: {
    landing: [
      {
        value: 0,
        multiplier: 0,
        name: { en: "3–5 Sections", ar: "٣–٥ أقسام" },
        description: {
          en: "Concise & conversion-focused",
          ar: "مختصر وعالي التحويل",
        },
      },
      {
        value: 1,
        multiplier: 0.25,
        name: { en: "6–8 Sections", ar: "٦–٨ أقسام" },
        description: {
          en: "More detail, testimonials & proof",
          ar: "تفاصيل أكثر وشهادات العملاء",
        },
      },
    ],
    business: [
      {
        value: 0,
        multiplier: 0,
        name: { en: "5 Pages", ar: "٥ صفحات" },
        description: {
          en: "Home, About, Services, Portfolio & Contact",
          ar: "الرئيسية، من نحن، الخدمات، الأعمال، تواصل",
        },
      },
      {
        value: 1,
        multiplier: 0.25,
        name: { en: "6–10 Pages", ar: "٦–١٠ صفحات" },
        description: {
          en: "Adds a Blog, Team page, extra service pages…",
          ar: "يضيف مدونة وصفحة الفريق وصفحات خدمات إضافية",
        },
      },
      {
        value: 2,
        multiplier: 0.35,
        name: { en: "11+ Pages", ar: "١١+ صفحة" },
        description: {
          en: "Large site with many sections, pages & sub-pages",
          ar: "موقع ضخم بأقسام رئيسية وفرعية متعددة",
        },
      },
    ],
    ecommerce: [
      {
        value: 0,
        multiplier: 0,
        name: { en: "Up to 50 Products", ar: "حتى ٥٠ منتج" },
        description: {
          en: "Perfect for a focused boutique",
          ar: "مثالي للمتاجر الصغيرة المتخصصة",
        },
      },
      {
        value: 1,
        multiplier: 0.2,
        name: { en: "50–200 Products", ar: "٥٠–٢٠٠ منتج" },
        description: {
          en: "A growing catalog with categories",
          ar: "كتالوج متنامٍ مع تصنيفات",
        },
      },
      {
        value: 2,
        multiplier: 0.45,
        name: { en: "200+ Products", ar: "٢٠٠+ منتج" },
        description: {
          en: "Large inventory, advanced filtering",
          ar: "مخزون كبير مع فلترة متقدمة",
        },
      },
    ],
  },
  addons: [
    {
      id: "cms",
      appliesTo: ["landing", "business"],
      price: 2999,
      scalesWithScope: true,
      name: { en: "Admin Panel", ar: "لوحة تحكم" },
      description: {
        en: "Edit content yourself",
        ar: "عدّل محتوى موقعك بنفسك",
      },
    },
    {
      id: "multilingual",
      appliesTo: ["landing", "business", "ecommerce"],
      isMultiplier: true,
      multiplierByBase: { landing: 0.25, business: 0.35, ecommerce: 0.4 },
      name: { en: "Bilingual", ar: "ثنائي اللغة" },
      description: {
        en: "Arabic & English versions",
        ar: "نسختان - عربي وإنجليزي",
      },
    },
  ],
};

const pricingSection = {
  heading: {
    en: "Get an Instant Quote",
    ar: "تقدير فوري لتكلفة الموقع",
  },
  subheading: {
    en: "A tool built for your convenience",
    ar: "أداة صُممت خصيصاً لاختصار وقتك",
  },
  tiers: [
    {
      seoName: {
        en: "Small Business Website Design in Egypt",
        ar: "تصميم موقع إلكتروني للمشاريع الصغيرة في مصر",
      },
      price: "7,500",
      tagline: {
        en: "Get online with the core essentials.",
        ar: "ابدأ بالأساسيات التي يحتاجها موقعك.",
      },
    },
    {
      seoName: {
        en: "Professional Website Design in Cairo Egypt",
        ar: "تصميم موقع احترافي للشركات في مصر",
      },
      price: "14,500",
      tagline: {
        en: "Greater Control. Wider Reach. More Content.",
        ar: "تحكم أفضل. وصول أوسع. محتوى أكثر.",
      },
    },
    {
      seoName: {
        en: "Shopify Ecommerce Website Design Egypt",
        ar: "تصميم متجر إلكتروني Shopify في مصر",
      },
      price: "19,500",
      tagline: {
        en: "Sell your products online using Shopify.",
        ar: "ابدأ البيع أونلاين مع متجر Shopify احترافي.",
      },
    },
  ],
};

export default pricingSection;
