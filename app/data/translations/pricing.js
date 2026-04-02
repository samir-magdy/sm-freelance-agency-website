const pricingSection = {
  heading: {
    en: "Website Design Packages",
    ar: "باقات تصميم المواقع",
  },
  mostPopular: {
    en: "Best Value",
    ar: "الأكثر طلبًا",
  },
  cta: {
    en: "Get Started",
    ar: "ابدأ الآن",
  },
  tiers: [
    {
      name: { en: "Essential", ar: "الأساسية" },
      seoName: {
        en: "Starter Website Package for Small Businesses",
        ar: "باقة الموقع الأساسية للمشاريع الصغيرة",
      },
      price: "5,500",
      tagline: {
        en: "A professional website to help customers find and contact you.",
        ar: "ابدأ تواجدك الرقمي بالأساسيات.",
      },
      features: [
        { en: "Up to 5 Main Sections", ar: "حتى 5 أقسام رئيسية" },
        {
          en: "Direct WhatsApp & Contact Links",
          ar: "ربط بالواتساب ووسائل التواصل",
        },
        {
          en: "Google Search Basics Setup",
          ar: "تهيئة للظهور في نتائج جوجل",
        },
      ],
      delivery: { en: "5–7 days", ar: "٥–٧ أيام" },
    },
    {
      name: { en: "Premium", ar: "الاحترافية" },
      seoName: {
        en: "Premium Website Package for Authority Brands",
        ar: "باقة الموقع الاحترافية للعلامات التجارية القوية",
      },
      price: "12,500",
      tagline: {
        en: "For brands that want a stronger image, broader reach, and higher conversion.",
        ar: "صورة أقوى، انتشار أكبر.",
      },
      highlighted: true,
      features: [
        {
          en: "Built-in Dashboard",
          ar: "لوحة تحكم مدمجة لإدارة الموقع",
        },
        {
          en: "Bilingual Website (AR/EN)",
          ar: "موقع ثنائي اللغة (عربي / إنجليزي)",
        },
        { en: "Premium Custom Design", ar: "تصميم مخصص بمظهر مميز" },
        { en: "Advanced SEO Research", ar: "تحسين متقدم لمحركات البحث" },
      ],
      delivery: { en: "10–14 days", ar: "١٠–١٤ يوم" },
    },
    {
      name: { en: "Standard", ar: "القياسية" },
      seoName: {
        en: "Business Website Package for Growing Brands",
        ar: "باقة موقع الأعمال للعلامات التجارية المتنامية",
      },
      price: "8,500",
      tagline: {
        en: "A stronger business presence with more sections and better lead capture.",
        ar: "حضور أقوى، لجذب العملاء.",
      },
      features: [
        { en: "Up to 8 Main Sections", ar: "حتى 8 أقسام رئيسية" },
        // { en: "Premium Custom Design", ar: "تصميم مخصص بمظهر احترافي مميز" },

        {
          en: "Custom Contact Form",
          ar: "نموذج تواصل مخصص",
        },
        {
          en: "Google Business Profile Setup",
          ar: "إعداد الملف التجاري على جوجل",
        },
      ],
      delivery: { en: "7–10 days", ar: "٧–١٠ أيام" },
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
  whatsappMessage: {
    en: "Hello, I'm interested in the {{package}} package for my brand.",
    ar: "مرحباً، أنا مهتم بباقة {{package}} لمشروعي.",
  },
};

export default pricingSection;
