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
    en: "Browse all web guides",
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
        en: "What is the process for getting my website?",
        ar: "إيه هي خطوات تنفيذ الموقع؟",
      },
      answer: {
        en: "First, we learn about your business and understand your vision. Next, we design a visual mockup for your review. Once approved, we develop and launch your fully functional website after a final review.",
        ar: "بنبدأ بالتواصل علشان نفهم شغلك ومتطلباتك من الموقع. بعدين بنعمل تصور لتصميم الموقع للمراجعه، واخيراً بنطور التصميم لموقع إلكتروني فعلي.",
      },
    },
    {
      question: {
        en: "How long does it take to create a website?",
        ar: "الموقع بياخد وقت قد إيه علشان يجهز؟",
      },
      answer: {
        en: "Landing pages typically take 5–7 days, business websites take 1–2 weeks, and e-commerce platforms take around 2–3 weeks.",
        ar: "صفحات الهبوط عادةً بتخلص في أسبوع، مواقع الشركات بتخلص في خلال أسبوع الي أسبوعين، والمتاجر الإلكترونية بتخلص في خلال أسبوعين الي 3 أسابيع.",
      },
    },
    {
      question: {
        en: "What do I need to provide to get started?",
        ar: "إيه اللي محتاج أجهزه علشان نبدأ؟",
      },
      answer: {
        en: "Your basic brand assets like your logo, the text content for each page, and any high-quality photos or videos you want to showcase.",
        ar: "كل اللي بنحتاجه منك هو أساسيات الهوية الخاصة بيك، زي اللوجو، والنصوص اللي عايزها تظهر في كل قسم، و صور أو فيديوهات بجودة كويسة تحب تعرضها على الموقع.",
      },
    },
    {
      question: {
        en: "Will I be able to edit my website myself?",
        ar: "هعرف أعدل في محتوى الموقع بنفسي؟",
      },
      answer: {
        en: "If you choose to include a CMS (Admin Panel), then yes. We'll explain how it works before handover; it's user-friendly and requires zero technical knowledge.",
        ar: "لو موقعك فيه لوحة تحكم (نظام إدارة المحتوى CMS)، طبعاً هتعرف. قبل ما نسلمك الموقع، بنشرحلك إزاي تستخدم اللوحة دي ببساطة، ومش هتحتاج أي خبرة تقنية علشان تدير المحتوى بتاعك.",
      },
    },
    {
      question: {
        en: "Can I add more to my website later on?",
        ar: "ممكن أضيف مميزات للموقع في المستقبل؟",
      },
      answer: {
        en: "Absolutely. We can expand your site with new pages, features, or an admin panel at any time without having to rebuild it from scratch.",
        ar: "أكيد طبعاً، سواء عايز تضيف صفحات جديدة، أو أقسام تانية، أو حتى لوحة تحكم لإدارة المحتوى، نقدر نوسع ونطور الموقع في أي وقت ومن غير ما نضطر نبدأ من الصفر.",
      },
    },
    {
      question: {
        en: "Do you handle hosting and maintenance?",
        ar: "بتوفروا الاستضافة والصيانة؟",
      },
      answer: {
        en: "Yes, we help you set up hosting under your own account, and the cost is covered in the initial price for the first year. We also offer an ongoing maintenance plan to ensure your website stays secure, fast, and up to date.",
        ar: "بنساعدك في إعداد الاستضافة تحت حسابك الخاص، والتكلفة بتكون مشمولة في السعر المبدئي للسنة الأولى. كمان بنوفر خطة صيانة مستمرة علشان نضمن إن موقعك يفضل آمن، سريع، ومتحدث أول بأول.",
      },
    },
    {
      question: {
        en: "Do I get the source code?",
        ar: "هستلم الكود المصدري للموقع؟",
      },
      answer: {
        en: "Yes, you completely own the code. We recommend that you create a <a href='https://github.com' target='_blank'>GitHub</a> account so we can transfer the repository directly to you, giving you full control to host it anywhere or hand it off to another developer in the future.",
        ar: "الموقع بيبقى ملكك بالكامل بعد التسليم، بما في ذلك الكود المصدري. تقدر تستضيفه في أي مكان أو تسلمه الي مطور أخر.",
      },
    },
    {
      question: {
        en: "How does payment work?",
        ar: "اى هو نظام الدفع؟",
      },
      answer: {
        en: "Payment is split into three stages: 25% upfront to start the design, 50% when we begin development, and the remaining 25% upon final delivery.",
        ar: "الدفع بيتقسم على 3 مراحل: 25% مقدم علشان نبدأ التصميم، 50% مع بداية مرحلة التطوير (البرمجة)، والـ 25% الباقية عند التسليم النهائي.",
      },
    },
    {
      question: {
        en: "How many rounds of revisions are included?",
        ar: "هقدر اطلب تعديلات خلال مراحل التصميم والتطوير؟",
      },
      answer: {
        en: "You get one round of revisions on the initial design and another round before final delivery. Any additional revisions will be added to the final cost.",
        ar: "بنوفر تعديل بعد مرحلة التصميم البدائية، وتعديل اخر قبل التسليم النهائي، أي تعديلات إضافية هيتم إضافتها على التكلفة النهائية.",
      },
    },
    {
      question: {
        en: "Is SEO included?",
        ar: "تحسين محركات البحث (SEO) مشمول؟",
      },
      answer: {
        en: "SEO isn't included in the basic build, but we can add it as an extra service to help your site rank better on Google and reach the right audience.",
        ar: "تحسين محركات البحث غير مشمول في الباقة الأساسية، لكن نقدر نضيفه كخدمة إضافية علشان موقعك يظهر بشكل أفضل على جوجل ويوصل للجمهور المناسب.",
      },
    },
    {
      question: {
        en: "Do you offer any sort of guarantee after launch?",
        ar: "بتوفروا دعم بعد إطلاق الموقع؟",
      },
      answer: {
        en: "Yes, every project comes with a 90-day warranty period after launch, during which we fix any bugs or issues that arise at no extra cost.",
        ar: "كل مشروع بيجي معاه فترة ضمان 90 يوم بعد الإطلاق، بنصلح فيها أي مشاكل أو أخطاء ممكن تظهر في الموقع من غير أي تكلفة إضافية.",
      },
    },
    {
      question: {
        en: "Do you help with domain registration?",
        ar: "بتساعدوا في تسجيل الدومين؟",
      },
      answer: {
        en: "Yes, we recommend creating an account with a domain registrar so we can transfer full ownership and DNS control directly to you. We will handle the technical setup steps so you don't have to deal with them yourself.",
        ar: "إحنا هنتولى خطوات الإعداد التقني بالكامل، بننصحك بإنشاء حساب لدى شركة تسجيل نطاقات علشان ننقل ملكية الدومين والتحكم الكامل ليك مباشرة.",
      },
    },
    {
      question: {
        en: "Do you write the content for my website?",
        ar: "بتكتبوا محتوى الموقع؟",
      },
      answer: {
        en: "Copywriting isn't included in the basic build, but we can add it as an extra service if you'd like our marketing expert to handle it.",
        ar: "كتابة المحتوى غير مشمولة في الباقة الأساسية، لكن نقدر نضيفها كخدمة إضافية.",
      },
    },
  ],
};

export default faqSection;
