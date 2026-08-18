import type { Localized } from "@/app/types";

export type QuestionType = "single" | "multi" | "text" | "list";

// Macro grouping for the two-tier step indicator: every question belongs to
// one of these; "contact" is a synthetic final category for the contact-info
// step, which isn't part of quoteQuestions.
export type CategoryId = "scope" | "design" | "features" | "timeline" | "contact";

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
    helper: {
      en: "Helps us recommend the best tech stack and project scope for your needs.",
      ar: "يساعدنا في تحديد التقنيات ونطاق العمل الأنسب لاحتياجاتك.",
    },
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
    ],
  },
  {
    id: "customScope",
    type: "multi",
    category: "scope",
    question: {
      en: "What does your custom application need to include?",
      ar: "ما الذي يجب أن يتضمنه تطبيقك المخصص؟",
    },
    helper: {
      en: "Select everything that applies — this shapes the features and integrations we plan for.",
      ar: "اختر كل ما ينطبق — يساعدنا ذلك في تحديد الميزات والتكاملات المطلوبة.",
    },
    showIf: (a) => a.goal === "custom",
    options: [
      {
        value: "onlineStore",
        label: { en: "Online store / payments", ar: "متجر إلكتروني / دفع إلكتروني" },
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
    helper: {
      en: "Determines the optimal e-commerce architecture and inventory setup.",
      ar: "يساعد في اختيار النظام الأنسب لإدارة منتجاتك ومخزونك.",
    },
    showIf: (a) =>
      a.goal === "store" ||
      (Array.isArray(a.customScope) && a.customScope.includes("onlineStore")),
    options: [
      { value: "small", label: { en: "Under 20", ar: "أقل من 20" } },
      { value: "medium", label: { en: "20–100", ar: "من 20 إلى 100" } },
      { value: "large", label: { en: "100+", ar: "أكثر من 100" } },
    ],
  },
  {
    id: "sectionCount",
    type: "single",
    category: "scope",
    question: {
      en: "How large is your page likely to be?",
      ar: "ما الحجم المتوقع لصفحتك؟",
    },
    helper: {
      en: "An estimate is perfectly fine — we'll help define the exact section structure during planning. What counts as a section? Each distinct content block a visitor would scroll through — e.g. Hero, About, Services, Testimonials, Contact. Don't worry about being exact.",
      ar: "التقدير التقريبي يكفي — سنساعدك على تحديد هيكل الأقسام بدقة أثناء التخطيط. ما الذي يُحتسب كقسم؟ كل جزء محتوى مستقل يمر به الزائر أثناء التمرير — مثل: الترحيب، من نحن، الخدمات، آراء العملاء، اتصل بنا. لا داعي للدقة الكاملة.",
    },
    showIf: (a) => a.goal === "landing",
    options: [
      {
        value: "small",
        label: { en: "Small — Up to 5 sections", ar: "صغير — حتى 5 أقسام" },
      },
      {
        value: "medium",
        label: {
          en: "Medium — 6–10 sections",
          ar: "متوسط — من 6 إلى 10 أقسام",
        },
      },
      {
        value: "large",
        label: { en: "Large — 11–15 sections", ar: "كبير — 11–15 قسمًا" },
      },
      {
        value: "notSure",
        label: {
          en: "Not sure — I'd like help estimating",
          ar: "لست متأكداً — أرغب بالمساعدة في التقدير",
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
      en: "An estimate is perfectly fine — we'll help define the exact page structure during planning. What counts as a page? Each distinct piece of content a visitor would navigate to — e.g. About, Services, individual service pages, Case Studies, Contact. Don't worry about being exact.",
      ar: "التقدير التقريبي يكفي — سنساعدك على تحديد هيكل الصفحات بدقة أثناء التخطيط. ما الذي يُحتسب كصفحة؟ كل جزء محتوى مستقل يتنقل إليه الزائر — مثل: من نحن، الخدمات، صفحات الخدمات الفردية، دراسات الحالة، اتصل بنا. لا داعي للدقة الكاملة.",
    },
    showIf: (a) => a.goal === "business",
    options: [
      {
        value: "small",
        label: { en: "Small — Up to 10 pages", ar: "صغير — حتى 10 صفحات" },
      },
      {
        value: "medium",
        label: { en: "Medium — 11–30 pages", ar: "متوسط — من 11 إلى 30 صفحة" },
      },
      {
        value: "large",
        label: { en: "Large — 31–75 pages", ar: "كبير — من 31 إلى 75 صفحة" },
      },
      {
        value: "veryLarge",
        label: {
          en: "Very large — 76–150 pages",
          ar: "كبير جداً — من 76 إلى 150 صفحة",
        },
      },
      {
        value: "notSure",
        label: {
          en: "Not sure — I'd like help estimating",
          ar: "لست متأكداً — أرغب بالمساعدة في التقدير",
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
    category: "design",
    question: {
      en: "Do you have a logo and brand assets ready?",
      ar: "هل لديك لوجو وهوية بصرية جاهزة؟",
    },
    helper: {
      en: "Includes high-res logo files, color palette guidelines, and brand fonts.",
      ar: "يشمل ذلك ملفات الشعار عالية الدقة، ألوان الهوية، وتوجيهات الخطوط.",
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
    category: "design",
    question: {
      en: "Is your page content (text) ready?",
      ar: "هل نصوص المحتوى جاهزة؟",
    },
    helper: {
      en: "Refers to the written text copy, headlines, and details for each page.",
      ar: "يقصد بذلك النصوص المكتوبة، العناوين، والتفاصيل لكل صفحة.",
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
      en: "Do you need the site in both English and Arabic?",
      ar: "هل تحتاج الموقع بلغتين، إنجليزي وعربي؟",
    },
    helper: {
      en: "Includes dual-language layouts with full Right-to-Left (RTL) and Left-to-Right (LTR) support.",
      ar: "يتضمن تصميم الواجهات باللغتين مع دعم كامل للاتجاهين (RTL) و(LTR).",
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
    category: "features",
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
    id: "aiChatbot",
    type: "single",
    category: "features",
    question: {
      en: "Would you like an AI chatbot on your site?",
      ar: "هل ترغب بإضافة روبوت محادثة ذكي لموقعك؟",
    },
    helper: {
      en: "Answers visitor questions automatically and captures leads 24/7 based on your site content.",
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
      en: "Will you need to change content frequently after launch?",
      ar: "هل ستحتاج لتغيير المحتوى بشكل متكرر بعد الإطلاق؟",
    },
    helper: {
      en: "Determines whether you need an easy Content Management System (CMS) like Sanity or Strapi.",
      ar: "يحدد ما إذا كنت بحاجة لنظام لوحة تحكم وإدارة محتوى (CMS) سهل الاستخدام.",
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
    category: "timeline",
    question: {
      en: "When would you like the site live?",
      ar: "متى تريد إطلاق الموقع؟",
    },
    helper: {
      en: "Helps us plan sprint milestones and schedule production resources effectively.",
      ar: "يساعدنا في جدولة مراحل العمل وتخصيص فريق التطوير للالتزام بجدولك.",
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
    category: "timeline",
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
    id: "referenceWebsites",
    type: "list",
    category: "timeline",
    optional: true,
    question: {
      en: "Any reference websites whose style you like?",
      ar: "هل توجد مواقع مرجعية يعجبك تصميمها؟",
    },
    helper: {
      en: "Share one or two links — it helps us understand the look and feel you're going for.",
      ar: "شارِك رابطاً أو رابطين — يساعدنا ذلك على فهم الطابع والمظهر الذي تريده.",
    },
    placeholder: {
      en: "https://stripe.com",
      ar: "https://stripe.com",
    },
  },
  {
    id: "notes",
    type: "text",
    category: "timeline",
    optional: true,
    question: {
      en: "Anything else?",
      ar: "أي شيء آخر تريد إخبارنا به؟",
    },
    helper: {
      en: "Specific feature requests or technical requirements you'd like us to know about.",
      ar: "أي ميزات خاصة ترغب بها أو متطلبات فنية تريد إخبارنا بها.",
    },
    placeholder: {
      en: "I also want a reservation system integrated into the website",
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
  addAnother: { en: "Add another", ar: "إضافة رابط آخر" },
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
