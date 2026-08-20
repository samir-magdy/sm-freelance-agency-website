import type { Localized } from "@/app/types";

export type QuestionType = "single" | "multi" | "text" | "list";

// Macro grouping for the two-tier step indicator: every question belongs to
// one of these; "contact" is a synthetic final category for the contact-info
// step, which isn't part of quoteQuestions.
export type CategoryId =
  | "scope"
  | "design"
  | "features"
  | "timeline"
  | "contact";

export const quoteCategories: { id: CategoryId; name: Localized }[] = [
  { id: "scope", name: { en: "Project Scope", ar: "نطاق المشروع" } },
  { id: "design", name: { en: "Design & Content", ar: "التصميم والمحتوى" } },
  { id: "features", name: { en: "Features", ar: "الميزات" } },
  {
    id: "timeline",
    name: { en: "Timeline & Extras", ar: "الجدول الزمني والتفاصيل الإضافية" },
  },
  { id: "contact", name: { en: "Contact Info", ar: "بيانات التواصل" } },
];

export interface QuestionOption {
  value: string;
  label: Localized;
}

export interface QuoteQuestion {
  id: string;
  type: QuestionType;
  category: CategoryId;
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
    category: "scope",
    question: { en: "What's your main goal?", ar: "ما هدفك الأساسي؟" },
    options: [
      {
        value: "landing",
        label: {
          en: "Capture direct leads",
          ar: "دفع الزائر لإجراء محدد (واتساب، تعبئة نموذج)",
        },
      },
      {
        value: "business",
        label: { en: "Build brand trust", ar: "عرض الشركة وخدماتها بشكل كامل" },
      },
      {
        value: "store",
        label: { en: "Sell products online", ar: "بيع منتجات عبر الإنترنت" },
      },
      {
        value: "custom",
        label: {
          en: "Build a custom web app",
          ar: "بناء تطبيق ويب مخصص",
        },
      },
    ],
  },
  {
    id: "customScope",
    type: "multi",
    category: "scope",
    question: {
      en: "What does your custom app need to include?",
      ar: "ما الذي يتضمنه تطبيقك المخصص؟",
    },
    helper: {
      en: "Select everything that applies.",
      ar: "اختر كل ما ينطبق.",
    },
    showIf: (a) => a.goal === "custom",
    options: [
      {
        value: "onlineStore",
        label: {
          en: "Online store / payments",
          ar: "متجر إلكتروني / دفع إلكتروني",
        },
      },
      {
        value: "booking",
        label: { en: "Booking / scheduling", ar: "نظام حجز / مواعيد" },
      },
      {
        value: "clientPortal",
        label: { en: "Client login / portal", ar: "حساب عملاء / لوحة تحكم" },
      },
      {
        value: "other",
        label: { en: "Something else", ar: "شيء آخر" },
      },
    ],
  },
  {
    id: "storeScale",
    type: "single",
    category: "scope",
    question: {
      en: "Roughly how many products?",
      ar: "كم عدد المنتجات تقريباً؟",
    },
    showIf: (a) =>
      a.goal === "store" ||
      (Array.isArray(a.customScope) && a.customScope.includes("onlineStore")),
    options: [
      { value: "small", label: { en: "Under 20", ar: "أقل من 20" } },
      { value: "medium", label: { en: "20 to 100", ar: "من 20 إلى 100" } },
      { value: "large", label: { en: "More than 100", ar: "أكثر من 100" } },
    ],
  },
  {
    id: "sectionCount",
    type: "single",
    category: "scope",
    question: {
      en: "How many sections will you need on your page?",
      ar: "ما الحجم المتوقع لصفحتك؟",
    },
    helper: {
      en: "A section is each content block a visitor would scroll through — e.g. About, Services, Contact.",
      ar: "القسم هو كل جزء محتوى يمر به الزائر، مثل: الخدمات، آراء العملاء، اتصل بنا.",
    },
    showIf: (a) => a.goal === "landing",
    options: [
      {
        value: "small",
        label: { en: "Up to 5 sections", ar: "حتى 5 أقسام" },
      },
      {
        value: "medium",
        label: {
          en: "6–10 sections",
          ar: "من 6 إلى 10 أقسام",
        },
      },
      {
        value: "large",
        label: { en: "More than 10 sections", ar: "أكثر من 10 أقسام" },
      },
      {
        value: "notSure",
        label: {
          en: "Not sure — I'd like help estimating",
          ar: "لست متأكد",
        },
      },
    ],
  },
  {
    id: "pageCount",
    type: "single",
    category: "scope",
    question: {
      en: "How large is your website likely to be?",
      ar: "ما الحجم المتوقع لموقعك؟",
    },
    helper: {
      en: "A page is each distinct piece of content a visitor would navigate to — e.g. About, Services, Portfolio, Contact.",
      ar: "الصفحة هي كل جزء محتوى مستقل يتنقل إليه الزائر — مثل: من نحن، الخدمات، اتصل بنا.",
    },
    showIf: (a) => a.goal === "business",
    options: [
      {
        value: "small",
        label: { en: "Up to 10 pages", ar: "حتى 10 صفحات" },
      },
      {
        value: "medium",
        label: { en: "11 to 30 pages", ar: "من 11 إلى 30 صفحة" },
      },
      {
        value: "large",
        label: { en: "More than 30 pages", ar: "أكثر من 30 صفحة" },
      },
      {
        value: "notSure",
        label: {
          en: "Not sure, I'd like help estimating",
          ar: "لست متأكد، أرغب بالمساعدة في التقدير",
        },
      },
    ],
  },
  {
    id: "designComplexity",
    type: "single",
    category: "design",
    question: {
      en: "What level of design do you have in mind?",
      ar: "ما مستوى التصميم الذي تريده؟",
    },
    helper: {
      en: "Custom animations enhance engagement and branding, but require extra development time.",
      ar: "الحركات والتفاعلات المخصصة تمنح تجربة فريدة، وتتطلب وقتاً إضافياً في التطوير.",
    },
    options: [
      { value: "simple", label: { en: "Modern and sleek", ar: "بسيط وأنيق" } },
      {
        value: "animated",
        label: {
          en: "Custom animations & interactions",
          ar: "حركات وتفاعلات مخصصة",
        },
      },
    ],
  },
  {
    id: "brandAssets",
    type: "single",
    category: "design",
    question: {
      en: "Will you provide your brand assets?",
      ar: "هل ستوفر الملفات الخاصة بهويتك التجارية؟",
    },
    helper: {
      en: "These include logo, color palette, and typography.",
      ar: "يشمل ذلك الشعار، ألوان الهوية، والخطوط.",
    },
    options: [
      {
        value: "have",
        label: {
          en: "Yes, I'll provide them",
          ar: "نعم، سأقوم بتوفيرها",
        },
      },
      {
        value: "need",
        label: {
          en: "No, I need them designed",
          ar: "لا، أحتاج تصميمها",
        },
      },
    ],
  },
  {
    id: "contentReady",
    type: "single",
    category: "design",
    question: {
      en: "Will you provide the page content?",
      ar: "هل ستوفر نصوص المحتوى؟",
    },
    helper: {
      en: "Refers to the written text copy, headlines, and details for each page or section.",
      ar: "يقصد بذلك النصوص المكتوبة، العناوين، والتفاصيل لكل صفحة أو قسم.",
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
    category: "design",
    question: {
      en: "Do you need bilingual functionality?",
      ar: "هل تحتاج الموقع بلغتين؟",
    },
    options: [
      { value: "yes", label: { en: "Yes", ar: "نعم" } },
      {
        value: "no",
        label: { en: "No, one language is fine", ar: "لا، لغة واحدة تكفي" },
      },
    ],
  },
  {
    id: "seoDepth",
    type: "single",
    category: "features",
    question: {
      en: "Do you require advanced SEO setup?",
      ar: "هل تحتاج إلى إعداد متقدم لتحسين محركات البحث (SEO)؟",
    },
    helper: {
      en: "SEO (search engine optimization) is the process of optimizing your site so it ranks higher on Google.",
      ar: "تحسين محركات البحث (SEO) هو عملية تهيئة موقعك ليظهر في مراتب أعلى على جوجل.",
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
    id: "aiChatbot",
    type: "single",
    category: "features",
    question: {
      en: "Would you like an AI chatbot on your site?",
      ar: "هل ترغب بإضافة تشات بوت ذكي لموقعك؟",
    },
    helper: {
      en: "An AI chatbot that provides 24/7 customer support.",
      ar: "يجيب على استفسارات الزوار تلقائياً ويجمع بيانات التواصل على مدار الساعة.",
    },
    options: [
      { value: "yes", label: { en: "Yes", ar: "نعم" } },
      { value: "no", label: { en: "No", ar: "لا" } },
    ],
  },
  {
    id: "contentFrequency",
    type: "single",
    category: "features",
    question: {
      en: "How often will you need to change content once your website is live?",
      ar: "هل ستحتاج لتغيير المحتوى بشكل متكرر بعد استلام الموقع؟",
    },
    helper: {
      en: "Determines whether you need an admin dashboard (CMS) to modify your content.",
      ar: "يحدد إذا كنت بحاجة لنظام لوحة تحكم وإدارة محتوى.",
    },
    showIf: (a) => !(a.goal === "custom" || a.goal === "store"),
    options: [
      {
        value: "often",
        label: { en: "A few times a week", ar: "نعم، بشكل متكرر" },
      },
      {
        value: "occasionally",
        label: { en: "Occasionally, a couple times a month", ar: "أحياناً" },
      },
      { value: "rarely", label: { en: "Rarely", ar: "نادراً" } },
    ],
  },
  {
    id: "timeline",
    type: "single",
    category: "timeline",
    question: {
      en: "How soon do you need the website live?",
      ar: "متى تريد إطلاق الموقع؟",
    },
    helper: {
      en: "Helps us allocate time and resources effectively.",
      ar: "يساعدنا في تخصيص الموارد والوقت بشكل فعال.",
    },
    options: [
      {
        value: "asap",
        label: {
          en: "As soon as possible",
          ar: "في أقرب وقت ممكن",
        },
      },
      {
        value: "month",
        label: {
          en: "Within a month",
          ar: "خلال شهر",
        },
      },
      {
        value: "flexible",
        label: {
          en: "Flexible",
          ar: "موعد مرن",
        },
      },
    ],
  },
  {
    id: "maintenancePlan",
    type: "single",
    category: "timeline",
    question: {
      en: "Do you need ongoing maintenance after launch?",
      ar: "هل تحتاج إلى صيانة مستمرة بعد الإطلاق؟",
    },
    helper: {
      en: "Includes 5 monthly content updates, weekly security audits, updates, and ongoing SEO.",
      ar: "تتضمن 5 تعديلات محتوى شهرياً، فحوصات أمان أسبوعية، تحديثات، وتحسينات SEO مستمرة.",
    },
    options: [
      { value: "yes", label: { en: "Yes", ar: "نعم" } },
      { value: "no", label: { en: "No", ar: "لا" } },
    ],
  },
  {
    id: "referenceWebsites",
    type: "list",
    category: "timeline",
    optional: true,
    question: {
      en: "Any reference websites whose style you like?",
      ar: "هل توجد مواقع مرجعية يعجبك تصميمها؟",
    },
    helper: {
      en: "Share a few links, it helps us understand the look and feel you're going for.",
      ar: "شارِك بعض الروابط، يساعدنا ذلك على فهم الطابع والمظهر الذي تريده.",
    },
    placeholder: {
      en: "referencesite.com",
      ar: "referencesite.com",
    },
  },
  {
    id: "notes",
    type: "text",
    category: "timeline",
    optional: true,
    question: {
      en: "Anything else we should know?",
      ar: "أي شيء آخر تريد إخبارنا به؟",
    },
    helper: {
      en: "Specific feature requests or technical requirements you'd like us to know about.",
      ar: "أي ميزات خاصة ترغب بها أو متطلبات فنية تريد إخبارنا بها.",
    },
    placeholder: {
      en: "I also want a reservation system integrated into the website...",
      ar: "أرغب أيضًا في دمج نظام للحجوزات في الموقع الإلكتروني",
    },
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
  skip: { en: "Skip", ar: "تخطي" },
  addAnother: { en: "Add another", ar: "إضافة رابط آخر" },
  submit: { en: "Submit", ar: "إرسال الاستبيان" },
  submitting: { en: "Submitting...", ar: "جاري الإرسال..." },
  success: {
    en: "Thank you, we'll review your details and get back to you as soon as possible.",
    ar: "شكراً، سنراجع بياناتك ونتواصل معك في أقرب وقت ممكن.",
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
    en: "How should we reach you?",
    ar: "كيف يمكننا التواصل معك؟",
  },
  name: { en: "Name", ar: "الاسم" },
  namePlaceholder: { en: "Your Name", ar: "الاسم" },
  contactMethod: { en: "Contact method", ar: "طريقة التواصل" },
  whatsapp: { en: "WhatsApp", ar: "واتساب" },
  phoneCall: { en: "Phone Call", ar: "موبايل" },
  email: { en: "Email", ar: "الإيميل" },
  phone: { en: "Mobile Number", ar: "رقم الموبايل" },
  emailPlaceholder: { en: "example@gmail.com", ar: "example@gmail.com" },
  nameInvalid: {
    en: "Please enter a valid name.",
    ar: "يرجى إدخال اسم صحيح.",
  },
  phoneInvalid: {
    en: "Please enter a valid phone number.",
    ar: "يرجى إدخال رقم موبايل صحيح.",
  },
  emailInvalid: {
    en: "Please enter a valid email address.",
    ar: "يرجى إدخال بريد إلكتروني صحيح.",
  },
} satisfies Record<string, Localized>;
