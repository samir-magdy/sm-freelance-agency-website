const pricingEstimator = {
  usdExchangeRate: 50,

  baseLabel: { en: "Website Type", ar: "نوع الموقع" },
  scopeLabel: { en: "Content Size", ar: "حجم المحتوى" },
  addonsLabel: { en: "Add-ons", ar: "الإضافات" },
  estimateLabel: { en: "Estimate", ar: "تقدير السعر" },
  cta: { en: "Get a Free Quote", ar: "احصل على عرض سعر مجاني" },
  disclaimer: {
    en: "Rough estimate only — final pricing is confirmed after a free consultation.",
    ar: "تقدير تقريبي فقط — السعر النهائي بيتحدد بعد استشارة مجانية.",
  },

  bases: [
    {
      id: "landing",
      name: { en: "Landing Page", ar: "صفحة هبوط" },
      description: { en: "One page, one goal", ar: "صفحة واحدة، هدف واحد" },
      price: 7500,
    },
    {
      id: "business",
      name: { en: "Business Website", ar: "موقع أعمال" },
      description: { en: "Multi-page company site", ar: "موقع متعدد الصفحات" },
      price: 12500,
    },
    {
      id: "ecommerce",
      name: { en: "E-commerce Store", ar: "متجر إلكتروني" },
      description: { en: "Full Shopify store", ar: "متجر شوبيفاي متكامل" },
      price: 15500,
    },
  ],

  scopesByBase: {
    landing: [
      {
        name: { en: "Essential", ar: "أساسي" },
        description: { en: "Up to 5 sections", ar: "حتى 5 أقسام" },
        multiplier: 0,
      },
      {
        name: { en: "Standard", ar: "قياسي" },
        description: { en: "6–10 sections", ar: "6–10 أقسام" },
        multiplier: 0.5,
      },
      {
        name: { en: "Full", ar: "شامل" },
        description: { en: "10+ sections", ar: "أكثر من 10 أقسام" },
        multiplier: 1.0,
      },
    ],
    business: [
      {
        name: { en: "Starter", ar: "بداية" },
        description: { en: "4–5 pages", ar: "4–5 صفحات" },
        multiplier: 0,
      },
      {
        name: { en: "Standard", ar: "قياسي" },
        description: { en: "6–10 pages", ar: "6–10 صفحات" },
        multiplier: 0.4,
      },
      {
        name: { en: "Full", ar: "شامل" },
        description: { en: "10+ pages", ar: "أكثر من 10 صفحات" },
        multiplier: 1.0,
      },
    ],
    ecommerce: [
      {
        name: { en: "Starter", ar: "بداية" },
        description: { en: "Up to 25 products", ar: "حتى 25 منتج" },
        multiplier: 0,
      },
      {
        name: { en: "Standard", ar: "قياسي" },
        description: { en: "Up to 100 products", ar: "حتى 100 منتج" },
        multiplier: 0.9,
      },
      {
        name: { en: "Full", ar: "شامل" },
        description: { en: "100+ products", ar: "100+ منتج" },
        multiplier: 2.2,
      },
    ],
  },

  addons: [
    {
      id: "bilingual",
      name: { en: "Bilingual (AR + EN)", ar: "ثنائي اللغة (عربي + إنجليزي)" },
      description: {
        en: "Arabic & English, full RTL support",
        ar: "عربي وإنجليزي مع دعم RTL الكامل",
      },
      appliesTo: ["landing", "business", "ecommerce"],
      isMultiplier: true,
      multiplierByBase: { landing: 0.35, business: 0.4, ecommerce: 0.3 },
      price: 0,
      scalesWithScope: false,
    },
    {
      id: "seo",
      name: { en: "SEO Setup", ar: "إعداد SEO" },
      description: {
        en: "Technical SEO from day one",
        ar: "تهيئة تقنية لجوجل من البداية",
      },
      appliesTo: ["landing", "business", "ecommerce"],
      isMultiplier: false,
      price: 1500,
      scalesWithScope: true,
    },
    {
      id: "copywriting",
      name: { en: "Copywriting", ar: "كتابة المحتوى" },
      description: {
        en: "Professional marketing copy",
        ar: "كتابة محتوى تسويقي احترافي",
      },
      appliesTo: ["landing", "business"],
      isMultiplier: false,
      price: 2500,
      scalesWithScope: true,
    },
    {
      id: "cms",
      name: { en: "CMS / Admin Panel", ar: "لوحة تحكم المحتوى" },
      description: {
        en: "Edit your content without a developer",
        ar: "تعديل المحتوى بنفسك بدون مبرمج",
      },
      appliesTo: ["landing", "business"],
      isMultiplier: false,
      price: 3000,
      scalesWithScope: false,
    },
    {
      id: "payments",
      name: { en: "Local Payment Gateways", ar: "بوابات الدفع المحلية" },
      description: {
        en: "Paymob, InstaPay, Vodafone Cash, Fawry",
        ar: "باي موب، انستا باي، فودافون كاش، فوري",
      },
      appliesTo: ["ecommerce"],
      isMultiplier: false,
      price: 5000,
      scalesWithScope: false,
    },
  ],
};

export default pricingEstimator;
