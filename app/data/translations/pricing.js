export const pricingEstimator = {
  currencyToggle: { en: "Currency", ar: "العملة:" },
  baseLabel: { en: "Type of Website", ar: "نوع الموقع المطلوب" },
  scopeLabel: { en: "Amount of Content", ar: "كمية المحتوى" },
  addonsLabel: { en: "Enhancements & Add-ons", ar: "الإضافات والتحسينات" },
  estimateLabel: { en: "Estimate:", ar: "التكلفة التقديرية" },
  cta: {
    en: "Verify My Calculation",
    ar: "تأكد من حساباتي",
  },
  disclaimer: {
    en: "Note that our work is entirely custom. Therefore, price may vary depending on specific requests not listed in this tool.",
    ar: "يرجى العلم أن أعمالنا مخصصة بالكامل، لذا قد تختلف التكلفة النهائية بناءً على متطلبات غير مدرجة في هذه الأداة.",
  },
  usdExchangeRate: 50,
  bases: [
    {
      id: "landing",
      price: 4999,
      name: {
        en: "Landing Page (Single Page Site)",
        ar: "صفحة هبوط (صفحة واحدة)",
      },
    },
    {
      id: "business",
      price: 8999,
      name: {
        en: "Business Website (Multiple Pages)",
        ar: "موقع أعمال (متعدد الصفحات)",
      },
    },
    {
      id: "ecommerce",
      price: 19999,
      name: { en: "Online Store (Shopify)", ar: "متجر إلكتروني (شوبيفاي)" },
    },
  ],
  scopesByBase: {
    landing: [
      {
        value: 0,
        multiplier: 0,
        name: { en: "3–5 Sections", ar: "٣–٥ أقسام" },
      },
      {
        value: 1,
        multiplier: 0.3,
        name: { en: "6+ Sections", ar: "٦+ أقسام" },
      },
    ],
    business: [
      {
        value: 0,
        multiplier: 0,
        name: { en: "1–3 Pages", ar: "١–٣ صفحات" },
      },
      {
        value: 1,
        multiplier: 0.15,
        name: { en: "4–8 Pages", ar: "٤–٨ صفحات" },
      },
      {
        value: 2,
        multiplier: 0.4,
        name: { en: "9+ Pages", ar: "٩+ صفحات" },
      },
    ],
    ecommerce: [
      {
        value: 0,
        multiplier: 0,
        name: { en: "Up to 50 Products", ar: "حتى ٥٠ منتج" },
      },
      {
        value: 1,
        multiplier: 0.2,
        name: { en: "50–200 Products", ar: "٥٠–٢٠٠ منتج" },
      },
      {
        value: 2,
        multiplier: 0.45,
        name: { en: "200+ Products", ar: "٢٠٠+ منتج" },
      },
    ],
  },
  addons: [
    {
      id: "cms",
      appliesTo: ["landing", "business"],
      price: 3499,
      name: { en: "Admin Panel", ar: "لوحة تحكم" },
    },
    {
      id: "multilingual",
      appliesTo: ["landing", "business", "ecommerce"],
      isMultiplier: true,
      multiplierByBase: {
        landing: 0.2,
        business: 0.3,
        ecommerce: 0.4,
      },
      name: { en: "Bilingual", ar: "ثنائي اللغة" },
    },
  ],
};

const pricingSection = {
  heading: {
    en: "Our Price Estimator",
    ar: "أداة تقدير الأسعار",
  },
    subheading: {
    en: "Estimate your investment instantly",
    ar: "احصل على رقم تقريبي لاستثمارك فوراً",
  },
  cta: {
    en: "Chat",
    ar: "تواصل معنا",
  },
  tiers: [
    {
      name: { en: "Essential", ar: "الأساسية" },
      seoName: {
        en: "Small Business Website Design in Egypt",
        ar: "تصميم موقع إلكتروني للمشاريع الصغيرة في مصر",
      },
      price: "7,500",
      tagline: {
        en: "Get online with the core essentials.",
        ar: "ابدأ  بالأساسيات التي يحتاجها موقعك.",
      },
      features: [
        { en: "Up to 6 Sections", ar: "حتى ٦ أقسام" },

        { en: "Basic SEO Setup", ar: "إعداد أساسي لمحركات البحث" },
        { en: "2 Content Updates per Month", ar: "٢ تحديثات للمحتوى شهرياً" },
      ],
      delivery: { en: "7–10 days", ar: "٧–١٠ أيام" },
    },
    {
      name: { en: "Professional", ar: "الاحترافية" },
      seoName: {
        en: "Professional Website Design in Cairo Egypt",
        ar: "تصميم موقع احترافي للشركات في مصر",
      },
      price: "14,500",
      tagline: {
        en: "Greater Control. Wider Reach. More Content.",
        ar: "تحكم أفضل. وصول أوسع. محتوى أكثر.",
      },
      features: [
        { en: "More Content", ar: "محتوى أكثر" },
        { en: "Built-in Control Panel", ar: "لوحة تحكم" },

        { en: "Basic SEO Setup", ar: "إعداد أساسي لمحركات البحث" },
      ],

      delivery: { en: "10–14 days", ar: "١٠–١٤ أيام" },
    },
    {
      name: { en: "E-commerce", ar: "متجر إلكتروني" },
      seoName: {
        en: "Shopify Ecommerce Website Design Egypt",
        ar: "تصميم متجر إلكتروني Shopify في مصر",
      },
      price: "19,500",
      tagline: {
        en: "Sell your products online using Shopify.",
        ar: "ابدأ البيع أونلاين مع متجر Shopify احترافي.",
      },
      features: [
        { en: "Product & Collection Setup", ar: "إعداد المنتجات والتصنيفات" },
        // { en: "Payment & Shipping Integration", ar: "دمج وسائل الدفع والشحن" },
        {
          en: "Basic SEO",
          ar: "إعداد أساسي لمحركات البحث",
        },
        { en: "Training & Support", ar: "تدريب ودعم فني" },
      ],
      delivery: { en: "14–21 days", ar: "١٤–٢١ يوم" },
    },
  ],
  deliveryLabel: {
    en: "Delivery",
    ar: "مدة التنفيذ",
  },
  currency: {
    en: "EGP",
    ar: "ج.م",
  },
  includesLabel: {
    en: "Includes:",
    ar: "تشمل:",
  },
  disclaimer: {
    en: "Think of our packages as a conversation starter. Since every project is unique, we’ll work with you to determine the final pricing to match your exact requirements.",
    ar: "الأسعار المذكورة هي مجرد بداية لتسهيل الأمر عليك. لأن كل مشروع فريد من نوعه، نقوم بتسعير مشروعك بما يتناسب تماماً مع احتياجاتك.",
  },
  whatsappMessage: {
    en: "Hello, I'm interested in the {{package}} package for my brand.",
    ar: "مرحباً، أنا مهتم بباقة {{package}} لمشروعي.",
  },
};

export default pricingSection;
