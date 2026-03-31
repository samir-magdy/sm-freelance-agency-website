const pricingSection = {
  heading: {
    en: "Pricing",
    ar: "الأسعار",
  },
  mostPopular: {
    en: "Recommended",
    ar: "الأكثر طلباً",
  },
  cta: {
    en: "Chat With Us",
    ar: "تواصل معنا",
  },
 tiers: [
  {
    name: { en: "Essential", ar: "الأساسية" },
    price: "5,500",
    tagline: {
      en: "Get online with the core essentials.",
      ar: "ابدأ تواجدك الإلكتروني بصفحة هبوط احترافية.",
    },
    features: [
      {
        en: "Website with up to 5 sections",
        ar: "موقع يضم حتى 5 أقسام",
      },
      {
        en: "Standard design",
        ar: "تصميم قياسي مخصص لهوية علامتك التجارية",
      },
      {
        en: "Socials + contact integration",
        ar: "واتساب، وسائل التواصل وبيانات الاتصال",
      },
      {
        en: "Google Maps embed",
        ar: "خريطة جوجل مدمجة",
      },
      {
        en: "Technical on-page SEO",
        ar: "أسس محركات البحث",
      },
    ],
    delivery: { en: "5–7 days", ar: "٥–٧ أيام" },
  },
  {
    name: { en: "Premium", ar: "الاحترافية" },
    price: "9,500",
    tagline: {
      en: "Stand out with a feature-rich site.",
      ar: "تميّز بموقع ثنائي اللغة غني بالمميزات.",
    },
    highlighted: true,
    features: [
      {
        en: "Everything in Essential, plus:",
        ar: "كل ما في الأساسية، بالإضافة إلى:",
      },
      {
        en: "Premium custom design",
        ar: "تصميم مخصص متقدم",
      },
      {
        en: "Bilingual support (Arabic/English, RTL/LTR)",
        ar: "دعم ثنائي اللغة (عربي/إنجليزي)",
      },
      {
        en: "Up to 8 sections",
        ar: "حتى 8 أقسام",
      },
      {
        en: "Advanced SEO",
        ar: "تحسين محركات بحث متقدم",
      },
      // {
      //   en: "Contact form",
      //   ar: "نموذج تواصل",
      // },
    ],
    delivery: { en: "1–2 weeks", ar: "١–٢ أسابيع" },
  },
  {
    name: { en: "E-Commerce", ar: "المتقدمة" },
    price: "12,500",
    tagline: {
      en: "A full multi-page online store.",
      ar: "موقع متعدد الصفحات مصمم للنمو.",
    },
    features: [
     
      {
        en: "Premium custom design",
        ar: "تصميم مخصص متقدم",
      },
      {
        en: "Content Managment Dashboard",
        ar: "لوحة تحكم للمحتوى",
      },
      {
        en: "Advanced SEO",
        ar: "تحسين محركات بحث متقدم",
      },
      {
        en: "Payment On Delivery",
        ar: "الدفع عند التسليم",
      },
       {
        en: "Whatsapp checkout",
        ar: "موقع متعدد الصفحات يضم حتى 6 صفحات",
      },
      {
        en: "English OR Arabic",
        ar: "عربي أو انجليزي",
      },
    ],
    delivery: { en: "2 weeks", ar: "أسبوعين" },
  },
],
deliveryLabel: {
  en: "Delivery",
  ar: "التسليم",
},
  currency: {
    en: "EGP",
    ar: "ج.م",
  },
  whatsappMessage: {
    en: "Hello, I'm interested in the {{package}} package for my brand.",
    ar: "مرحبًا، أنا مهتم بباقة {{package}} لعلامتي التجارية.",
  },
};

export default pricingSection;
