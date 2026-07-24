import type { Localized } from "@/app/types";

interface FAQItem {
  question: Localized;
  answer: Localized;
}

interface FAQSection {
  heading: Localized;
  subheading: Localized;
  browseGuides: Localized;
  ctaHeading: Localized;
  cta: Localized;
  items: FAQItem[];
}

const faqSection: FAQSection = {
  heading: { en: "FAQs", ar: "الأسئلة الشائعة" },

  subheading: {
    en: "Answers to common questions",
    ar: "أسئلة شائعة عن تصميم المواقع",
  },

  browseGuides: {
    en: "browse resources & guides",
    ar: "تصفح أدلة تصميم المواقع",
  },

  ctaHeading: {
    en: "Still have questions?",
    ar: "لسا عندك أسئلة؟",
  },

  cta: {
    en: "Request a Consultation",
    ar: "اطلب استشارة مجانية",
  },
items: [
  {
    question: {
      en: "What's included in the base price?",
      ar: "ما الذي يشمله السعر الأساسي؟",
    },
    answer: {
      en: "Every project includes a custom site of up to 5 pages, 1st-year hosting, domain setup & a guarantee. The following are NOT included in the base price: an admin panel (modify content yourself), SEO (keyword research & technical on-page), copywriting (strategic content writing) & localized bilingual support (SEO-friendly). See <a href='#pricing'>pricing</a> or use our <a href='/en/guides/website-cost-in-egypt#pricing-calculator'>pricing estimator</a> for reference.",
      ar: "كل مشروع بيشمل موقع مخصص بحد أقصى 5 صفحات، استضافة السنة الأولى، إعداد الدومين، وضمان لمدة 90 يوم بعد الإطلاق. الخدمات التالية غير مشمولة في السعر الأساسي: لوحة تحكم (تعديل المحتوى بنفسك)، SEO (بحث الكلمات المفتاحية والتحسين التقني)، كتابة المحتوى، ودعم محلي بلغتين. اطلع على <a href='#pricing'>الأسعار</a> أو استخدم <a href='/ar/guides/website-cost-in-egypt#pricing-calculator'>حاسبة الأسعار</a> للمرجع.",
    },
  },
  {
    question: {
      en: "How long does it take to create a website?",
      ar: "ما هي المدة المستغرقة لإنجاز الموقع الإلكتروني؟",
    },
    answer: {
      en: "Landing pages typically take 5–7 days, business websites take 1–2 weeks, and e-commerce platforms take around 2–3 weeks.",
      ar: "صفحات الهبوط عادةً بتخلص خلال أسبوع، مواقع الشركات خلال أسبوع إلى أسبوعين، والمتاجر الإلكترونية خلال أسبوعين إلى 3 أسابيع.",
    },
  },
  {
    question: {
      en: "What is the process for getting my website?",
      ar: "ما هي خطوات تنفيذ الموقع الإلكتروني؟",
    },
    answer: {
      en: "First, we learn about your business and understand your vision. Next, we design a visual mockup for your review. Once approved, we develop your fully functional website and launch after a final review.",
      ar: "بنبدأ بالتواصل علشان نفهم شغلك ومتطلباتك من الموقع. بعدين بنعمل تصور لتصميم الموقع للمراجعه، واخيراً بنطور التصميم لموقع إلكتروني فعلي.",
    },
  },
  {
    question: {
      en: "How does payment work?",
      ar: "كيف تتم عملية الدفع؟",
    },
    answer: {
      en: "Payment is split into three stages: 25% upfront to start the design, 50% when we begin development, and the remaining 25% upon final delivery.",
      ar: "الدفع بيتقسم على 3 مراحل: 25% مقدم علشان نبدأ التصميم، 50% مع بداية مرحلة التطوير (البرمجة)، والـ 25% الباقية عند التسليم النهائي.",
    },
  },
  {
    question: {
      en: "What do I need to provide to get started?",
      ar: "ما هي المتطلبات اللازم توفيرها للبدء في العمل؟",
    },
    answer: {
      en: "Your basic brand assets like your logo, the text content for each page, and any high-quality photos or videos you want to showcase.",
      ar: "كل اللي بنحتاجه منك هو أساسيات الهوية الخاصة بيك، زي اللوجو، والنصوص اللي عايزها تظهر في كل قسم، وأي صور أو فيديوهات تحب تعرضها على الموقع.",
    },
  },
  {
    question: {
      en: "How many rounds of revisions are included?",
      ar: "هل يمكنني طلب تعديلات خلال مرحلتي التصميم والتطوير؟",
    },
    answer: {
      en: "You get one round of revision on the initial design and another round before final delivery. Any additional revisions will be added to the final cost.",
      ar: "بنوفر تعديل بعد مرحلة التصميم البدائية، وتعديل آخر قبل التسليم النهائي، أي تعديلات إضافية هيتم إضافتها على التكلفة النهائية.",
    },
  },
  {
    question: {
      en: "Will I be able to edit my website myself?",
      ar: "هل سيمكنني تعديل محتوى الموقع بنفسي لاحقاً؟",
    },
    answer: {
      en: "If you choose to include a CMS (Admin Panel), then yes. We'll explain how it works before handover; it's user-friendly and requires zero technical knowledge.",
      ar: "لو موقعك فيه لوحة تحكم (نظام إدارة المحتوى CMS)، طبعاً هتعرف. قبل ما نسلمك الموقع، بنشرحلك إزاي تستخدم اللوحة دي ببساطة، ومش هتحتاج أي خبرة تقنية علشان تدير المحتوى بتاعك.",
    },
  },
  {
    question: {
      en: "Do I get the source code?",
      ar: "هل سأستلم الكود المصدري (Source Code) الخاص بالموقع؟",
    },
    answer: {
      en: "Yes. We recommend that you create a <a href='https://github.com' target='_blank'>GitHub</a> account so we can transfer the repository directly to you, giving you full control to host it anywhere or hand it off to another developer in the future.",
      ar: "الموقع بيبقى ملكك بالكامل بعد التسليم، بما في ذلك الكود المصدري. تقدر تستضيفه في أي مكان أو تسلمه إلى مطور آخر.",
    },
  },
  {
    question: {
      en: "Do you handle hosting and maintenance?",
      ar: "هل تقدمون خدمات الاستضافة والصيانة؟",
    },
    answer: {
      en: "Yes, we handle all the technical details to deploy and keep your site live. The first year is included in the initial price, after that there will be a yearly charge to keep your site live. We also offer an ongoing maintenance plan (monthly/annually) to ensure your website stays secure, fast, and up to date.",
      ar: "بنساعدك في إعداد الاستضافة تحت حسابك الخاص، والتكلفة بتكون مشمولة في السعر المبدئي للسنة الأولى. كمان بنوفر خطة صيانة مستمرة علشان نضمن إن موقعك يفضل آمن، سريع، ومحدَّث أول بأول.",
    },
  },
  {
    question: {
      en: "Can I add more to my website later on?",
      ar: "هل يمكنني إضافة ميزات أو صفحات جديدة للموقع في المستقبل؟",
    },
    answer: {
      en: "Absolutely. We can expand your site with new pages, features, or an admin panel at any time without having to rebuild it from scratch.",
      ar: "أكيد طبعاً، سواء عايز تضيف صفحات جديدة، أو أقسام تانية، أو حتى لوحة تحكم لإدارة المحتوى، نقدر نوسع ونطور الموقع في أي وقت ومن غير ما نضطر نبدأ من الصفر.",
    },
  },
  // for vercel
  {
    question: {
      en: "Do you help with domain registration?",
      ar: "هل تساعدون في تسجيل ونقل ملكية اسم النطاق (الدومين)؟",
    },
    answer: {
      en: "Yes, we can handle the technical setup steps so you don't have to deal with them yourself. We recommend creating an account with a trusted domain registrar such as <a href='https://www.namecheap.com' target='_blank'>Namecheap</a> or <a href='https://www.godaddy.com' target='_blank'>GoDaddy</a> so we can transfer full ownership and DNS control directly to you.",
      ar: "إحنا هنتولى خطوات الإعداد التقني بالكامل، بننصحك بإنشاء حساب لدى شركة تسجيل نطاقات موثوقة زي <a href='https://www.namecheap.com' target='_blank'>Namecheap</a> أو <a href='https://www.godaddy.com' target='_blank'>GoDaddy</a> علشان ننقل ملكية الدومين والتحكم الكامل ليك مباشرة.",
    },
  },
]
};

export default faqSection;
