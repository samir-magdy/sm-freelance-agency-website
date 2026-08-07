import type { Localized } from "@/app/types";

interface FAQItem {
  question: Localized;
  answer: Localized;
}

interface FAQSection {
  heading: Localized;
  subheading: Localized;
  browseGuides: Localized;
  ctaLabel: Localized;
  orDivider: Localized;
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
    en: "Browse Guides & Resources",
    ar: "تصفح أدلة تصميم المواقع",
  },

  ctaLabel: {
    en: "Still have questions?",
    ar: "لديك أسئلة آخرى؟",
  },

  cta: {
    en: "Request a Consultation",
    ar: "اطلب استشارة مجانية",
  },

  orDivider: {
    en: "or",
    ar: "أو",
  },
  items: [
    {
      question: {
        en: "What's included in the base price?",
        ar: "ما الذي يشمله السعر الأساسي؟",
      },
      answer: {
        en: "Every project includes a custom-built, responsive site with baseline SEO, an admin panel to edit your own content (we walk you through it at handover), a design mockup to review before build, two rounds of design revisions, first-year hosting, domain setup, and a 90-day post-launch guarantee. For a breakdown of optional add-ons and pricing, use our <a href='/en/guides/website-cost-in-egypt#pricing-calculator'>pricing estimator</a> or <a href='#contact'>contact us</a> if you have any questions.",
        ar: "كل مشروع بيشمل موقع مخصص ومتجاوب مع كل الأجهزة مع تهيئة أساسية لمحركات البحث، لوحة تحكم لتعديل المحتوى بنفسك (بنشرحلك إزاي تستخدمها قبل التسليم)، عرض تصميم للمراجعة قبل التنفيذ، جولتين تعديلات على التصميم، استضافة السنة الأولى، إعداد الدومين، وضمان لمدة 90 يوم بعد الإطلاق. لمعرفة الإضافات الاختيارية والأسعار، استخدم <a href='/ar/guides/website-cost-in-egypt#pricing-calculator'>حاسبة الأسعار</a> أو <a href='#contact'>تواصل معنا</a> إذا كان لديك أي استفسار.",
      },
    },

    {
      question: {
        en: "How long does it take to create a website?",
        ar: "ما المدة التي يستغرقها إنجاز الموقع؟",
      },
      answer: {
        en: "Landing pages typically take 5–7 days, business websites take 1–3 weeks, and custom web apps take 3+ weeks depending on project complexity.",
        ar: "صفحات الهبوط عادةً بتخلص خلال أسبوع، مواقع الشركات خلال أسبوع إلى 3 أسابيع، وتطبيقات الويب المخصصة بتاخد 3 أسابيع أو أكتر حسب تعقيد المشروع.",
      },
    },
    {
      question: {
        en: "What is the process for getting my website?",
        ar: "ما هي خطوات تنفيذ الموقع؟",
      },
      answer: {
        en: "First, we learn about your business and understand your vision. Next, we design a visual mockup for your review. Once approved, we develop your fully functional website and launch after a final review.",
        ar: "بنبدأ بالتواصل علشان نفهم شغلك ومتطلباتك من الموقع. بعدين بنعمل تصور لتصميم الموقع للمراجعة. وبعد الموافقة، بنطور موقعك بشكل كامل وبنطلقه بعد مراجعة نهائية.",
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
        ar: "ما هي المتطلبات اللازمة للبدء في العمل؟",
      },
      answer: {
        en: "Your basic brand assets like your logo, the text content for each page, and any high-quality photos or videos you want to showcase. We also have a dedicated designer who can design them for you, as well as your full branding and visual identity.",
        ar: "كل اللي بنحتاجه منك هو أساسيات الهوية الخاصة بيك، زي اللوجو، والنصوص اللي عايزها تظهر في كل صفحة، وأي صور أو فيديوهات تحب تعرضها على الموقع. وعندنا مصمم متخصص يقدر يصممهم لك، وكمان يعملك هوية بصرية كاملة.",
      },
    },
    {
      question: {
        en: "How many rounds of revisions are included?",
        ar: "هل يمكنني طلب تعديلات للتصميم؟",
      },
      answer: {
        en: "You get two rounds of revision during the design phase. Any additional revisions will be added to the final cost.",
        ar: "نوفر تعديلين خلال مرحلة التصميم. أي تعديلات إضافية سوف يتم إضافتها إلى التكلفة النهائية.",
      },
    },
    {
      question: {
        en: "Will I be able to edit my website myself?",
        ar: "هل سيمكنني تعديل محتوى الموقع بنفسي؟",
      },
      answer: {
        en: "Yes. Every site ships with a built-in admin panel so you can edit your own content. We'll walk you through it before handover; it's user-friendly and requires zero technical knowledge.",
        ar: "أيوة. كل موقع بيتسلم ومعاه لوحة تحكم مدمجة علشان تقدر تعدّل المحتوى بنفسك. قبل ما نسلمك الموقع، بنشرحلك إزاي تستخدمها ببساطة، ومش هتحتاج أي خبرة تقنية علشان تدير المحتوى بتاعك.",
      },
    },
    {
      question: {
        en: "Do I get the source code?",
        ar: "هل سأستلم الكود الخاص بالموقع؟",
      },
      answer: {
        en: "Yes. The site is fully yours after delivery, source code included.",
        ar: "أيوة. الموقع ملكك بالكامل بعد التسليم، بما فيه الكود المصدري.",
      },
    },
    {
      question: {
        en: "Do you handle hosting and maintenance?",
        ar: "هل تقدمون خدمات الاستضافة والصيانة؟",
      },
      answer: {
        en: "Yes, we handle all the technical details to deploy and keep your site live. The first year is included in the initial price, after that there will be a yearly charge to keep your site live. We also offer an ongoing maintenance plan (monthly/annually) to ensure your website stays secure, fast, and up to date.",
        ar: "أيوة، بنتولى كل التفاصيل التقنية لإطلاق موقعك واستمرار عمله. تكلفة السنة الأولى مشمولة في السعر المبدئي، وبعد كده فيه رسوم سنوية علشان الموقع يفضل شغال. كمان بنوفر خطة صيانة مستمرة (شهرية/سنوية) علشان نضمن إن موقعك يفضل آمن، سريع، ومحدَّث أول بأول.",
      },
    },
    {
      question: {
        en: "Can I add more to my website later on?",
        ar: "هل يمكنني تطوير الموقع في المستقبل؟",
      },
      answer: {
        en: "Absolutely. We can expand your site with new pages or features at any time without having to rebuild it from scratch.",
        ar: "أكيد طبعاً، سواء عايز تضيف صفحات جديدة أو مزايا جديدة، نقدر نوسع ونطور الموقع في أي وقت ومن غير ما نضطر نبدأ من الصفر.",
      },
    },
    // for vercel again
    {
      question: {
        en: "Do you help with domain registration?",
        ar: "هل تساعدون في تسجيل الدومين؟",
      },
      answer: {
        en: "Yes, we can handle the technical setup steps so you don't have to deal with them yourself. We recommend creating an account with a trusted domain registrar such as <a href='https://www.namecheap.com' target='_blank'>Namecheap</a> or <a href='https://www.godaddy.com' target='_blank'>GoDaddy</a> so we can transfer full ownership and DNS control directly to you.",
        ar: "إحنا هنتولى خطوات الإعداد التقني بالكامل، بننصحك بإنشاء حساب لدى شركة تسجيل نطاقات موثوقة زي <a href='https://www.namecheap.com' target='_blank'>Namecheap</a> أو <a href='https://www.godaddy.com' target='_blank'>GoDaddy</a> علشان ننقل ملكية الدومين والتحكم الكامل ليك مباشرة.",
      },
    },
    {
      question: {
        en: "Do you work with clients outside Egypt?",
        ar: "هل تعملون مع عملاء من خارج مصر؟",
      },
      answer: {
        en: "Yes. We're based in Egypt but work remotely with clients worldwide. Everything from initial consultation to delivery is handled online.",
        ar: "أيوة. إحنا مقرنا في مصر، لكن بنشتغل عن بُعد مع عملاء من أي مكان في العالم. كل حاجة من الاستشارة الأولى للتسليم بتتم أونلاين.",
      },
    },
  ],
};

export default faqSection;
