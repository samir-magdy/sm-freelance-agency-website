import type { Localized } from "@/app/types";

export type QuestionType = "single" | "multi" | "text";

export interface QuestionOption {
  value: string;
  label: Localized;
}

export interface QuoteQuestion {
  id: string;
  type: QuestionType;
  question: Localized;
  helper?: Localized;
  options?: QuestionOption[];
  placeholder?: Localized;
  optional?: boolean;
  showIf?: (answers: Record<string, string | string[]>) => boolean;
}

export const quoteQuestions: QuoteQuestion[] = [
  {
    id: "goal",
    type: "single",
    question: { en: "What's your main goal?", ar: "ما هدفك الأساسي؟" },
    options: [
      {
        value: "landing",
        label: {
          en: "Drive a specific action (call, form)",
          ar: "دفع الزائر لإجراء واحد (واتساب، اتصال، نموذج)",
        },
      },
      {
        value: "business",
        label: { en: "Showcase the full business", ar: "عرض الشركة بشكل كامل" },
      },
      {
        value: "store",
        label: { en: "Sell products online", ar: "بيع منتجات عبر الإنترنت" },
      },
      {
        value: "custom",
        label: {
          en: "Custom application",
          ar: "وظائف مخصصة (حجز، لوحة عملاء، إلخ)",
        },
      },
      {
        value: "notSure",
        label: { en: "Not sure yet", ar: "لست متأكداً بعد" },
      },
    ],
  },
  {
    id: "pageCount",
    type: "single",
    question: {
      en: "Roughly how many pages or sections do you need?",
      ar: "كم عدد الصفحات أو الأقسام التي تحتاجها تقريباً؟",
    },
    options: [
      { value: "under5", label: { en: "Under 5", ar: "أقل من 5" } },
      { value: "6to10", label: { en: "6–10", ar: "من 6 إلى 10" } },
      { value: "15plus", label: { en: "15+", ar: "أكثر من 15" } },
      {
        value: "notSure",
        label: { en: "Not sure yet", ar: "لست متأكداً بعد" },
      },
    ],
  },
  {
    id: "designComplexity",
    type: "single",
    question: {
      en: "What level of design do you have in mind?",
      ar: "ما مستوى التصميم الذي تريده؟",
    },
    options: [
      { value: "simple", label: { en: "Simple and clean", ar: "بسيط وأنيق" } },
      {
        value: "animated",
        label: {
          en: "Custom animations & interactions",
          ar: "حركات وتفاعلات مخصصة",
        },
      },
      {
        value: "notSure",
        label: { en: "Not sure — surprise me", ar: "لست متأكداً — فاجئني" },
      },
    ],
  },
  {
    id: "brandAssets",
    type: "single",
    question: {
      en: "Do you have a logo and brand assets ready?",
      ar: "هل لديك لوجو وهوية بصرية جاهزة؟",
    },
    options: [
      { value: "have", label: { en: "Yes, I have them", ar: "نعم، لدي" } },
      {
        value: "need",
        label: { en: "No, I need those designed", ar: "لا، أحتاج تصميمها" },
      },
    ],
  },
  {
    id: "contentReady",
    type: "single",
    question: {
      en: "Is your page content (text) ready?",
      ar: "هل نصوص المحتوى جاهزة؟",
    },
    options: [
      {
        value: "ready",
        label: { en: "Yes, I'll provide it", ar: "نعم، سأوفرها" },
      },
      {
        value: "need",
        label: { en: "No, I need it written", ar: "لا، أحتاج كتابتها" },
      },
    ],
  },
  {
    id: "bilingual",
    type: "single",
    question: {
      en: "Do you need the site in both English and Arabic?",
      ar: "هل تحتاج الموقع بلغتين، إنجليزي وعربي؟",
    },
    options: [
      { value: "yes", label: { en: "Yes, bilingual", ar: "نعم، ثنائي اللغة" } },
      {
        value: "no",
        label: { en: "No, one language is fine", ar: "لا، لغة واحدة تكفي" },
      },
    ],
  },
  {
    id: "seoDepth",
    type: "single",
    question: {
      en: "Beyond the SEO basics included by default, do you want deeper SEO work?",
      ar: "هل تريد إعداد SEO أعمق بخلاف الأساسيات المشمولة؟",
    },
    helper: {
      en: "SEO (search engine optimization) helps your site rank higher on Google so more people find you.",
      ar: "تحسين محركات البحث (SEO) يساعد موقعك على الظهور في مراتب أعلى على جوجل ليجدك عدد أكبر من الناس.",
    },
    options: [
      {
        value: "basic",
        label: { en: "Basics are enough", ar: "الأساسيات تكفي" },
      },
      {
        value: "deep",
        label: { en: "Yes, I want deeper SEO", ar: "نعم، أريد إعداد أعمق" },
      },
    ],
  },
  {
    id: "onlineStore",
    type: "single",
    question: {
      en: "Do you need online payments / an online store?",
      ar: "هل تحتاج دفع إلكتروني أو متجراً إلكترونياً؟",
    },
    options: [
      { value: "yes", label: { en: "Yes", ar: "نعم" } },
      { value: "no", label: { en: "No", ar: "لا" } },
    ],
  },
  {
    id: "storeScale",
    type: "single",
    question: {
      en: "Roughly how many products?",
      ar: "كم عدد المنتجات تقريباً؟",
    },
    showIf: (a) => a.onlineStore === "yes",
    options: [
      { value: "small", label: { en: "Under 20", ar: "أقل من 20" } },
      { value: "medium", label: { en: "20–100", ar: "من 20 إلى 100" } },
      { value: "large", label: { en: "100+", ar: "أكثر من 100" } },
    ],
  },
  {
    id: "aiChatbot",
    type: "single",
    question: {
      en: "Would you like an AI chatbot on your site?",
      ar: "هل ترغب بإضافة روبوت محادثة ذكي لموقعك؟",
    },
    options: [
      { value: "yes", label: { en: "Yes", ar: "نعم" } },
      { value: "no", label: { en: "No", ar: "لا" } },
    ],
  },
  {
    id: "contentFrequency",
    type: "single",
    question: {
      en: "Will you need to change content frequently after launch?",
      ar: "هل ستحتاج لتغيير المحتوى بشكل متكرر بعد الإطلاق؟",
    },
    options: [
      { value: "often", label: { en: "Yes, often", ar: "نعم، بشكل متكرر" } },
      { value: "occasionally", label: { en: "Occasionally", ar: "أحياناً" } },
      { value: "rarely", label: { en: "Rarely", ar: "نادراً" } },
    ],
  },
  {
    id: "timeline",
    type: "single",
    question: {
      en: "When would you like the site live?",
      ar: "متى تريد إطلاق الموقع؟",
    },
    options: [
      {
        value: "asap",
        label: { en: "As soon as possible", ar: "في أقرب وقت" },
      },
      { value: "month", label: { en: "Within a month", ar: "خلال شهر" } },
      { value: "flexible", label: { en: "Flexible", ar: "مرن" } },
    ],
  },
  {
    id: "maintenancePlan",
    type: "single",
    question: {
      en: "Interested in an ongoing maintenance plan after launch?",
      ar: "هل تهتم بخطة صيانة مستمرة بعد الإطلاق؟",
    },
    helper: {
      en: "Up to 3 free content changes, security audits, and updates.",
      ar: "حتى 3 تعديلات محتوى مجانية، فحوصات أمان، وتحديثات.",
    },
    options: [
      { value: "yes", label: { en: "Yes", ar: "نعم" } },
      { value: "no", label: { en: "No", ar: "لا" } },
      { value: "tellMeMore", label: { en: "Tell me more", ar: "أخبرني أكثر" } },
    ],
  },
  {
    id: "notes",
    type: "text",
    optional: true,
    question: {
      en: "Anything else you want us to know?",
      ar: "أي شيء آخر تريد إخبارنا به؟",
    },
    placeholder: { en: "Optional", ar: "اختياري" },
  },
];

export const quoteFormStrings = {
  close: { en: "Close", ar: "إغلاق" },
  introBody: {
    en: "Answer a few questions so we can provide you with an accurate quote.",
    ar: "أجب عن بعض الأسئلة السريعة لنجهز لك عرض سعر دقيق.",
  },
  start: { en: "Get Started", ar: "ابدأ الاستبيان" },
  stepLabel: { en: "Step", ar: "خطوة" },
  ofLabel: { en: "of", ar: "من" },
  back: { en: "Back", ar: "السابق" },
  next: { en: "Next", ar: "التالي" },
  submit: { en: "Submit", ar: "إرسال الاستبيان" },
  submitting: { en: "Submitting...", ar: "جاري الإرسال..." },
  success: {
    en: "Thanks — we'll review your answers and get back to you within 24 hours.",
    ar: "شكراً — سنراجع إجاباتك ونتواصل معك خلال 24 ساعة.",
  },
  error: {
    en: "Something went wrong. Please try again.",
    ar: "حدث خطأ ما. حاول مرة أخرى.",
  },
  errorRateLimit: {
    en: "Please wait a few minutes before submitting again.",
    ar: "يرجى الانتظار بضع دقائق قبل الإرسال مرة أخرى.",
  },
  contactHeading: {
    en: "Almost done — how should we reach you?",
    ar: "على وشك الانتهاء — كيف نتواصل معك؟",
  },
  name: { en: "Name", ar: "الاسم" },
  namePlaceholder: { en: "Your Name", ar: "الاسم" },
  contactMethod: { en: "Contact method", ar: "طريقة التواصل" },
  whatsapp: { en: "WhatsApp", ar: "واتساب" },
  phoneCall: { en: "Phone Call", ar: "موبايل" },
  email: { en: "Email", ar: "الإيميل" },
  phone: { en: "Mobile Number", ar: "رقم الموبايل" },
  phonePlaceholder: { en: "01XXXXXXXXX", ar: "01XXXXXXXXX" },
  emailPlaceholder: { en: "example@gmail.com", ar: "example@gmail.com" },
} satisfies Record<string, Localized>;
