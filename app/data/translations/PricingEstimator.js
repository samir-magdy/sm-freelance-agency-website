const pricingEstimator = {
  baseLabel: { en: "Website Type", ar: "نوع الموقع" },
  scopeLabelByBase: {
    landing: { en: "Content Size", ar: "حجم المحتوى" },
    business: { en: "Content Size", ar: "حجم المحتوى" },
    ecommerce: { en: "Store Size", ar: "كمية المنتجات" },
  },
  addonsLabel: { en: "Add-ons", ar: "الإضافات" },
  estimateLabel: { en: "Estimate", ar: "تقدير السعر:" },
  cta: { en: "Get a Free Quote", ar: "احصل على عرض سعر رسمي" },
  disclaimer: {
    en: "Rough estimate only — final pricing is confirmed after a free consultation.",
    ar: " السعر المعروض تقدير تقريبي — السعر النهائي بيتحدد بعد الإستشارة.",
  },

  bases: [
    {
      id: "landing",
      name: { en: "Landing Page", ar: "صفحة هبوط" },
      description: { en: "One page, one goal", ar: " موقع صفحة واحدة" },
      price: 7500,
    },
    {
      id: "business",
      name: { en: "Business Website", ar: "موقع شركة" },
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
        multiplier: 0,
      },
      {
        name: { en: "Standard", ar: "قياسي" },
        multiplier: 0.5,
      },
      {
        name: { en: "Full", ar: "شامل" },
        multiplier: 1.0,
      },
    ],
    business: [
      {
        name: { en: "Essential", ar: "أساسي" },
        multiplier: 0,
      },
      {
        name: { en: "Standard", ar: "قياسي" },
        multiplier: 0.4,
      },
      {
        name: { en: "Full", ar: "شامل" },
        multiplier: 1.0,
      },
    ],
    ecommerce: [
      {
        name: { en: "Essential", ar: "أساسي" },
        multiplier: 0,
      },
      {
        name: { en: "Standard", ar: "قياسي" },
        multiplier: 0.9,
      },
      {
        name: { en: "Full", ar: "شامل" },
        multiplier: 2.2,
      },
    ],
  },

  addons: [
    {
      id: "bilingual",
      name: { en: "Bilingual (AR + EN)", ar: "ثنائي اللغة" },
      description: {
        en: "Arabic & English, full RTL support",
        ar: " دعم كامل، عربي وإنجليزي",
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
        ar: "تهيئة لجوجل من البداية",
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
        ar: "كتابة محتوى تسويقي",
      },
      appliesTo: ["landing", "business"],
      isMultiplier: false,
      price: 2500,
      scalesWithScope: true,
    },
    {
      id: "cms",
      name: { en: "CMS / Admin Panel", ar: "لوحة تحكم" },
      description: {
        en: "Edit your content without a developer",
        ar: "تعديل المحتوى بنفسك",
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
