export type Lang = "en" | "ar";

const translations = {
  // Navigation
  nav: {
    home: { en: "Home", ar: "الرئيسية" },
    howItWorks: { en: "Workflow", ar: "إطار العمل" },
    projects: { en: "Portfolio", ar: "سابقة أعمالي" },
    faq: { en: "FAQ", ar: " أسئلة شائعه" },
    contact: { en: "Contact", ar: "تواصل" },
  },

  // Hero
  hero: {
    name: {
      en: "Websites that Sell..",
      ar: "مش مجرد موقع..",
    },
    subtitle: {
      en: "Designing landing pages that convert visitors into clients.",
      ar: "بصمملك صفحة هبوط هدفها البيع، مش بس منظر.",
    },
    cta: {
      en: "Chat",
      ar: "تواصل",
    },
    secondaryCta: {
      en: "View Portfolio",
      ar: "سابقة أعمالي",
    },
  },

  // Projects section
  projectsSection: {
    heading: { en: "Portfolio", ar: "سابقة أعمالي" },
    subtitle: {
      en: "A selection of projects I've built for clients.",
      ar: "مجموعة من المشاريع اللي بنيتها لعملائي.",
    },
  },

  // Workflow section
  workflowSection: {
    heading: { en: "Workflow", ar: "إطار العمل" },
    subtitle: {
      en: "A structured process from start to finish.",
      ar: "عملية واضحة ومنظمة من البداية للنهاية.",
    },
    steps: {
      discovery: {
        title: { en: "Communication", ar: "التنسيق" },
        description: {
          en: "We communicate on a call or meeting to define your vision. The goal is to have a clear plan and timeline for your website.",
          ar: "بنتواصل من خلال مكالمة أو اجتماع لتحديد أهدافك. هدفنا هو وضع خطة واضحة وجدول زمني محدد لموقعك.",
        },
      },
      design: {
        title: { en: "Design", ar: "التصميم" },
        description: {
          en: "I design a custom look tailored to your brand. Once you are satisfied and approve the design, a 50% deposit initializes the development phase.",
          ar: "بصمم واجهة مخصصة تعبر عن علامتك التجارية. بمجرد رضاك واعتمادك للتصميم، بنبدأ مرحلة التنفيذ بدفعة مقدمة 50%.",
        },
      },
      development: {
        title: { en: "Development", ar: "التنفيذ" },
        description: {
          en: "I turn design into a fast, mobile-responsive, and SEO-ready website.",
          ar: "بنحول التصميم لموقع حقيقي، سريع، متوافق مع الموبايل، ومجهز لمحركات البحث (SEO).",
        },
      },
      launch: {
        title: { en: "Handover", ar: "التسليم" },
        description: {
          en: "After final approval and settling the remaining 50%, your site goes live! I handover the product and provide ongoing support when needed.",
          ar: "بعد الموافقة النهائية وتسوية الـ 50% المتبقية، موقعك بينطلق! بسلمك المنتج النهائي وبوفرلك دعم مستمر عند الحاجة.",
        },
      },
    },
  },

  // FAQ section
  faqSection: {
    heading: { en: "FAQ", ar: "أسئلة الشائعة" },
    subtitle: {
      en: "Answers to commonly asked questions.",
      ar: "إجابات على الأسئلة الأكثر شيوعًا.",
    },
    items: [
      {
        question: {
          en: "How long does it take to build a website?",
          ar: "كم يستغرق بناء الموقع؟",
        },
        answer: {
          en: "Most landing pages are delivered within 1–2 weeks. Larger projects with multiple pages or custom features may take 3–4 weeks depending on complexity.",
          ar: "معظم صفحات الهبوط بتتسلم خلال أسبوع لأسبوعين. المشاريع الأكبر اللي فيها صفحات متعددة أو مميزات مخصصة ممكن تاخد من 3 لـ 4 أسابيع حسب التعقيد.",
        },
      },
      {
        question: {
          en: "What do I need to provide to get started?",
          ar: "إيه اللي محتاج أجهزه عشان نبدأ؟",
        },
        answer: {
          en: "Just your brand details (logo, colors, content) and a clear idea of what you want to achieve. If you don't have these ready, I can help guide you through the process.",
          ar: "بس تفاصيل البراند بتاعك (لوجو، ألوان، محتوى) وفكرة واضحة عن هدفك. لو مش جاهز بالحاجات دي، أقدر أساعدك خطوة بخطوة.",
        },
      },
      {
        question: {
          en: "Do you offer revisions?",
          ar: "فيه تعديلات بعد التسليم؟",
        },
        answer: {
          en: "Yes. During the design phase you get unlimited revisions until you are fully satisfied before development begins. After launch, I provide a support period for any necessary adjustments.",
          ar: "أيوه. في مرحلة التصميم عندك تعديلات غير محدودة لحد ما تكون راضي تمامًا قبل ما نبدأ التنفيذ. وبعد الإطلاق، بوفرلك فترة دعم لأي تعديلات ضرورية.",
        },
      },
      {
        question: {
          en: "Will my website work on phones and tablets?",
          ar: "الموقع هيشتغل على الموبايل والتابلت؟",
        },
        answer: {
          en: "Absolutely. Every website I build is fully responsive and tested across all screen sizes, ensuring a smooth experience on mobile, tablet, and desktop.",
          ar: "طبعًا. كل موقع ببنيه بيكون متجاوب بالكامل ومختبر على جميع أحجام الشاشات، عشان يكون التجربة سلسة على الموبايل والتابلت والكمبيوتر.",
        },
      },
      {
        question: {
          en: "Do you handle hosting and domain setup?",
          ar: "بتتكفل بالاستضافة وإعداد الدومين؟",
        },
        answer: {
          en: "Yes. I can help you choose the right hosting plan and set up your custom domain. I'll handle all the technical configuration so your site is live and accessible without you worrying about the details.",
          ar: "أيوه. أقدر أساعدك تختار خطة الاستضافة المناسبة وأجهزلك الدومين الخاص بيك. هتكفل بكل الإعدادات التقنية عشان موقعك يكون شغال ومتاح من غير ما تشيل هم التفاصيل.",
        },
      },
      {
        question: {
          en: "Will my website be optimized for search engines (SEO)?",
          ar: "الموقع هيكون مجهز لمحركات البحث (SEO)؟",
        },
        answer: {
          en: "Yes. Every site I build follows SEO best practices including fast load times, clean code structure, proper meta tags, and mobile-friendliness — all of which help your site rank higher on Google.",
          ar: "أيوه. كل موقع ببنيه بيتبع أفضل ممارسات الـ SEO زي سرعة التحميل وكود نظيف وعلامات meta صحيحة والتوافق مع الموبايل — وكل ده بيساعد موقعك يظهر أعلى في نتائج جوجل.",
        },
      },
    ],
  },

  // Contact section
  contactSection: {
    heading: { en: "Get In Touch", ar: "تواصل معنا" },
    subtitle: {
      en: "To discuss a potential project, please submit your inquiry via the form below.",
      ar: "لمناقشة مشروع محتمل، يرجى إرسال استفسارك عبر النموذج أدناه.",
    },
    copyright: { en: "Samir Magdy", ar: "سمير مجدي" },
  },

  // Contact form
  form: {
    legend: { en: "Contact information", ar: "معلومات التواصل" },
    name: { en: "Name", ar: "الاسم" },
    namePlaceholder: { en: "Your name", ar: "اسمك" },
    phone: { en: "Phone", ar: "الهاتف" },
    phonePlaceholder: { en: "01XXXXXXXXX", ar: "01XXXXXXXXX" },
    message: { en: "Message", ar: "الرسالة" },
    messagePlaceholder: {
      en: "Describe your project or inquiry...",
      ar: "صف مشروعك أو استفسارك...",
    },
    submit: { en: "Submit Form", ar: "إرسال" },
    sending: { en: "Sending...", ar: "جاري الإرسال..." },
    success: {
      en: "Message sent successfully!",
      ar: "تم إرسال الرسالة بنجاح!",
    },
  },

  // Accessibility
  a11y: {
    openMenu: { en: "Open menu", ar: "فتح القائمة" },
    closeMenu: { en: "Close menu", ar: "إغلاق القائمة" },
    mobileNav: { en: "Mobile navigation", ar: "قائمة الهاتف" },
    socialLinks: { en: "Social links", ar: "روابط التواصل" },
    linkedIn: {
      en: "LinkedIn (opens in new tab)",
      ar: "لينكدإن (يفتح في تبويب جديد)",
    },
    skipToContent: { en: "Skip to main content", ar: "تخطى إلى المحتوى" },
    loading: { en: "Loading", ar: "جاري التحميل" },
    contactForm: { en: "Contact form", ar: "نموذج التواصل" },
    screenshotOf: { en: "Screenshot of", ar: "لقطة شاشة لـ" },
  },

  // Project data
  projectData: {
    skyway: {
      title: {
        en: "Sky Way Travel",
        ar: "Sky Way Travel",
      },
      description: {
        en: "A conversion-focused landing page for a travel agency. Designed to showcase tour packages, build trust, and drive direct bookings.",
        ar: "صفحة هبوط لشركة سياحة مصممة لعرض عروض الرحلات وبناء الثقة وتحويل الزوار لحجوزات مباشرة.",
      },
      cta: { en: "Live Demo", ar: "عرض مباشر" },
    },
    weddings: {
      title: {
        en: "Weddings Landing Page",
        ar: "صفحة هبوط للأفراح",
      },
      description: {
        en: "A landing page for wedding service providers. Built to showcase portfolios, highlight testimonials, and convert visitors into clients.",
        ar: "صفحة هبوط لمقدمي خدمات الأفراح. مصممة لعرض الأعمال وإبراز التقييمات وتحويل الزوار لعملاء.",
      },
      cta: { en: "Live Demo", ar: "عرض مباشر" },
    },
    gym: {
      title: {
        en: "Gym Landing Page",
        ar: "صفحة هبوط لجيم",
      },
      description: {
        en: "A landing page for a fitness center. Designed to present membership plans, highlight facilities, and drive sign-ups.",
        ar: "صفحة هبوط لمركز لياقة بدنية. مصممة لعرض خطط الاشتراكات وإبراز المرافق وزيادة التسجيلات.",
      },
      cta: { en: "Live Demo", ar: "عرض مباشر" },
    },
    kindergarten: {
      title: {
        en: "Kindergarten Landing Page",
        ar: "صفحة هبوط لحضانة",
      },
      description: {
        en: "A landing page for a kindergarten. Designed to showcase programs, build parent trust, and drive enrollments.",
        ar: "صفحة هبوط لحضانة أطفال. مصممة لعرض البرامج التعليمية وبناء ثقة الأهالي وزيادة التسجيلات.",
      },
      cta: { en: "Live Demo", ar: "عرض مباشر" },
    },
    modeling: {
      title: {
        en: "Modeling Agency Landing Page",
        ar: "صفحة هبوط لوكالة عارضين",
      },
      description: {
        en: "A landing page for a modeling agency. Designed to showcase talent portfolios, attract clients, and drive bookings.",
        ar: "صفحة هبوط لوكالة عارضين. مصممة لعرض ملفات المواهب وجذب العملاء وزيادة الحجوزات.",
      },
      cta: { en: "Live Demo", ar: "عرض مباشر" },
    },
    supplements: {
      title: {
        en: "Supplements Store",
        ar: "متجر مكملات غذائية",
      },
      description: {
        en: "A landing page for a supplements store. Designed to highlight products, build credibility, and drive sales.",
        ar: "صفحة هبوط لمتجر مكملات غذائية. مصممة لإبراز المنتجات وبناء المصداقية وزيادة المبيعات.",
      },
      cta: { en: "Live Demo", ar: "عرض مباشر" },
    },
  },

  // Language toggle
  langToggle: {
    en: "English",
    ar: "عربي",
  },
} as const;

export default translations;
