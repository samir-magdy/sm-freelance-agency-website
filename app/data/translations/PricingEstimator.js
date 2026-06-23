const pricingEstimator = {
  baseLabel: { en: "Website Type:", ar: "نوع الموقع" },
  scopeLabelByBase: {
    landing: { en: "Content Size:", ar: "حجم المحتوى" },
    business: { en: "Content Size:", ar: "حجم المحتوى" },
    ecommerce: { en: "Store Size:", ar: "كمية المنتجات" },
  },
  addonsLabel: { en: "Add-ons:", ar: "الإضافات" },
  estimateLabel: { en: "Estimate:", ar: "تقدير السعر:" },
  cta: { en: "Get an Official Quote", ar: "احصل على عرض سعر رسمي" },
  disclaimer: {
    en: "Rough estimate only. Final pricing is confirmed after consultation.",
    ar: "السعر المعروض تقدير تقريبي. السعر النهائي بيتحدد بعد الإستشارة.",
  },

  bases: [
    {
      id: "landing",
      name: { en: "Landing Page", ar: "صفحة هبوط" },
      description: { en: "One page, one goal", ar: " موقع صفحة واحدة" },
      price: 5999,
    },
    {
      id: "business",
      name: { en: "Business Site", ar: "موقع شركة" },
      description: { en: "Multi-page website", ar: "موقع متعدد الصفحات" },
      price: 7999,
    },
    {
      id: "ecommerce",
      name: { en: "Online Store", ar: "متجر إلكتروني" },
      description: { en: "Full Shopify store", ar: "متجر شوبيفاي متكامل" },
      price: 14999,
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
        multiplier: 0.1,
      },
      {
        name: { en: "Full", ar: "شامل" },
        multiplier: 0.2,
      },
    ],
    business: [
      {
        name: { en: "Essential", ar: "أساسي" },
        multiplier: 0,
      },
      {
        name: { en: "Standard", ar: "قياسي" },
        multiplier: 0.1,
      },
      {
        name: { en: "Full", ar: "شامل" },
        multiplier: 0.2,
      },
    ],
    ecommerce: [
      {
        name: { en: "Essential", ar: "أساسي" },
        multiplier: 0,
      },
      {
        name: { en: "Standard", ar: "قياسي" },
        multiplier: 0.2,
      },
      {
        name: { en: "Full", ar: "شامل" },
        multiplier: 0.3,
      },
    ],
  },

  addons: [
    {
      id: "bilingual",
      name: { en: "Bilingual", ar: "ثنائي اللغة" },
      description: {
        en: "Full Bilingual support",
        ar: "دعم كامل لللغتين",
      },
      appliesTo: ["landing", "business", "ecommerce"],
      isMultiplier: true,
      multiplierByBase: { landing: 0.35, business: 0.35, ecommerce: 0.4 },
      price: 0,
      scalesWithScope: false,
    },
    {
      id: "seo",
      name: { en: "SEO Setup", ar: "إعداد SEO" },
      description: {
        en: "Technical SEO Setup",
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
        en: "We write the content",
        ar: "كتابة محتوى تسويقي",
      },
      appliesTo: ["landing", "business"],
      isMultiplier: false,
      price: 2500,
      scalesWithScope: true,
    },
    {
      id: "cms",
      name: { en: "Admin Panel", ar: "لوحة تحكم" },
      description: {
        en: "Edit content yourself",
        ar: "تعديل المحتوى بنفسك",
      },
      appliesTo: ["landing", "business"],
      isMultiplier: false,
      price: 3000,
      scalesWithScope: false,
    },
    {
      id: "payments",
      name: { en: "Payment Gateways", ar: "بوابات الدفع" },
      description: {
        en: "Online payments",
        ar: "الدفع الإلكتروني",
      },
      appliesTo: ["ecommerce"],
      isMultiplier: false,
      price: 5000,
      scalesWithScope: false,
    },
  ],
};

export default pricingEstimator;
