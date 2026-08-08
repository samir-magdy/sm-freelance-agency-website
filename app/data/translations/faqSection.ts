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
        en: "Every project includes a custom-built, responsive site with baseline SEO, an admin panel to edit your own content, a design mockup to review before build, two rounds of design revisions, first-year hosting, domain setup, and a 90-day post-launch guarantee.",
        ar: "يشمل كل مشروع بناء موقع مخصص ومتجاوب مع جميع الأجهزة، مع تهيئة أساسية لمحركات البحث، ولوحة تحكم لتعديل المحتوى بنفسك. كما يتضمن عرضاً للتصميم لمراجعته قبل التنفيذ، وجولتين من التعديلات على التصميم، بالإضافة إلى استضافة للسنة الأولى، وإعداد النطاق (الدومين)، وضمان لمدة 90 يوماً بعد الإطلاق.",
      },
    },

    {
      question: {
        en: "How long does it take to create a website?",
        ar: "ما المدة التي يستغرقها إنجاز الموقع؟",
      },
      answer: {
        en: "Landing pages typically take 5–7 days, business websites take 1–3 weeks, and custom web apps take 3+ weeks depending on project complexity.",
        ar: "تستغرق صفحات الهبوط عادةً من 5 إلى 7 أيام، بينما تستغرق مواقع الشركات من أسبوع إلى 3 أسابيع. أما تطبيقات الويب المخصصة، فقد تستغرق 3 أسابيع أو أكثر بناءً على مدى تعقيد المشروع.",
      },
    },
    {
      question: {
        en: "What is the process for getting my website?",
        ar: "ما هي خطوات تنفيذ الموقع؟",
      },
      answer: {
        en: "First, we learn about your business and understand your vision. Next, we design a visual mockup for your review. Once approved, we develop your fully functional website and launch after a final review.",
        ar: "نبدأ أولاً بالتواصل معك لفهم طبيعة عملك ومتطلباتك ورؤيتك للموقع. بعد ذلك، نُعد تصوراً مرئياً للتصميم لمراجعته. وبمجرد موافقتك، نقوم بتطوير موقعك بشكل كامل ونطلقه بعد إجراء مراجعة نهائية.",
      },
    },
    {
      question: {
        en: "How does payment work?",
        ar: "كيف تتم عملية الدفع؟",
      },
      answer: {
        en: "Payment is split into three stages: 25% upfront to start the design, 50% when we begin development, and the remaining 25% upon final delivery.",
        ar: "تُقسم عملية الدفع على 3 مراحل: 25% كمقدم للبدء في التصميم، و50% عند بدء مرحلة التطوير (البرمجة)، والـ 25% المتبقية تُدفع عند التسليم النهائي للمشروع.",
      },
    },
    {
      question: {
        en: "What do I need to provide to get started?",
        ar: "ما هي المتطلبات اللازمة للبدء في العمل؟",
      },
      answer: {
        en: "Your basic brand assets like your logo, the text content for each page, and any high-quality photos or videos you want to showcase. In the case that you don't have any brand assets, we have a dedicated designer who can design them for you.",
        ar: "كل ما نحتاجه منك للبدء هو أساسيات هويتك التجارية، مثل الشعار (اللوجو)، والنصوص التي تود إضافتها في كل صفحة، وأي صور أو مقاطع فيديو عالية الجودة ترغب في عرضها. وفي حال لم تكن تمتلك هذه العناصر بعد، لدينا مصمم متخصص يمكنه تصميمها لك، بالإضافة إلى بناء هوية بصرية متكاملة.",
      },
    },
    {
      question: {
        en: "Will I be able to edit my website myself?",
        ar: "هل سيمكنني تعديل محتوى الموقع بنفسي؟",
      },
      answer: {
        en: "Yes. Every site ships with a built-in admin panel so you can edit your own content. We'll walk you through it before handover; it's user-friendly and requires zero technical knowledge.",
        ar: "نعم بالتأكيد. يُسلم كل موقع مزوداً بلوحة تحكم مدمجة لتتمكن من تعديل محتواك بنفسك. وقبل تسليمك الموقع، سنشرح لك كيفية استخدامها بكل بساطة؛ فهي سهلة الاستخدام ولن تحتاج إلى أي خبرة تقنية سابقة لإدارتها.",
      },
    },
    {
      question: {
        en: "Do I get the source code?",
        ar: "هل سأستلم الكود الخاص بالموقع؟",
      },
      answer: {
        en: "Yes. The site is fully yours after delivery, source code included.",
        ar: "نعم. بعد التسليم، يصبح الموقع ملكاً لك بالكامل، بما في ذلك الكود المصدري (Source code).",
      },
    },
    {
      question: {
        en: "Do you handle hosting and maintenance?",
        ar: "هل تقدمون خدمات الاستضافة والصيانة؟",
      },
      answer: {
        en: "Yes, we handle all the technical details to deploy and keep your site live. The first year is included in the initial price, after that there will be a yearly charge to keep your site live.",
        ar: "نعم، نحن نتولى كافة التفاصيل التقنية لإطلاق موقعك وضمان استمرار عمله. تكلفة السنة الأولى مشمولة في السعر المبدئي، وبعد ذلك ستكون هناك رسوم سنوية للحفاظ على بقاء الموقع متاحاً على الإنترنت. كما نوفر خطط صيانة مستمرة (شهرية أو سنوية) لنضمن بقاء موقعك آمناً، وسريعاً، ومُحدّثاً أولاً بأول.",
      },
    },
    {
      question: {
        en: "Can I add more to my website later on?",
        ar: "هل يمكنني تطوير الموقع في المستقبل؟",
      },
      answer: {
        en: "Absolutely. We can expand your site with new pages or features at any time without having to rebuild it from scratch.",
        ar: "بكل تأكيد. يمكننا توسيع موقعك وتطويره بإضافة صفحات أو ميزات جديدة في أي وقت، دون الحاجة إلى إعادة بنائه من الصفر.",
      },
    },
    // for vercel again
    {
      question: {
        en: "Do you help with domain registration?",
        ar: "هل تساعدون في تسجيل الدومين؟",
      },
      answer: {
        en: "Yes, we can handle the technical setup steps so you don't have to deal with them yourself. We recommend creating an account with a trusted domain registrar such as <a href='https://www.namecheap.com' target='_blank'>Namecheap</a> or <a href='https://www.godaddy.com' target='_blank'>GoDaddy</a> so we can transfer full ownership directly to you.",
        ar: "نعم، نحن نتولى كافة خطوات الإعداد التقني بالكامل حتى لا تضطر للتعامل معها بنفسك. لكننا ننصحك بإنشاء حساب لدى شركة تسجيل نطاقات موثوقة مثل <a href='https://www.namecheap.com' target='_blank'>Namecheap</a> أو <a href='https://www.godaddy.com' target='_blank'>GoDaddy</a> لنتمكن من نقل ملكية النطاق (الدومين) والتحكم الكامل إليك مباشرة.",
      },
    },
    {
      question: {
        en: "Do you work with clients outside Egypt?",
        ar: "هل تعملون مع عملاء من خارج مصر؟",
      },
      answer: {
        en: "Yes. We're based in Egypt but work remotely with clients worldwide. Everything from initial consultation to delivery can be handled online.",
        ar: "نعم. يقع مقرنا في مصر، لكننا نعمل عن بُعد مع عملاء من جميع أنحاء العالم. تتم جميع الخطوات، بدءاً من الاستشارة الأولى وحتى التسليم النهائي، عبر الإنترنت بالكامل وبكل سلاسة.",
      },
    },
  ],
};

export default faqSection;
