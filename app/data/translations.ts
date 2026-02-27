export type Lang = "en" | "ar";

const translations = {
  // Navigation
  nav: {
    home: { en: "Home", ar: "الرئيسية" },
    howItWorks: { en: "Process", ar: "آلية العمل" },
    projects: { en: "Portfolio", ar: "سابقة الأعمال" },
    faq: { en: "FAQ", ar: "الأسئلة الشائعة" },
    contact: { en: "Contact", ar: "تواصل معنا" },
  },

  // Hero
  hero: {
    name: {
      en: "Your Partner in Success",
      ar: "شريكك في النجاح",
    },
    cta: {
      en: "Chat",
      ar: "تواصل",
    },
    primaryCta: {
      en: "Book a Free Consultation",
      ar: "احصل على استشارة مجانية",
    },
    seoLabel: {
      en: "Web Design & Development in Cairo",
      ar: "أفضل شركة تصميم مواقع في القاهرة",
    },
  },

  // Projects section
  projectsSection: {
    heading: {
      en: "Our Work",
      ar: "سابقة الأعمال",
    },
    subtitle: {
      en: "A selection of our latest projects",
      ar: "مجموعة من أحدث مشاريعنا",
    },
  },

  // Our Process section
  workflowSection: {
    heading: { en: "Our Process", ar: "آلية العمل" },
    subtitle: {
      en: "A structured process from start to finish",
      ar: "عملية واضحة ومنظمة من البداية للنهاية",
    },
    steps: {
      discovery: {
        title: {
          en: "Communication",
          ar: "التنسيق",
        },
        description: {
          en: "We connect to understand your business goals and target audience in Cairo, then define the website strategy, timeline, and transparent pricing.",
          ar: "نتواصل لفهم نشاطك التجاري وأهدافك والجمهور المستهدف في القاهرة، ثم نحدد استراتيجية تصميم الموقع، الجدول الزمني، والتكلفة بشكل واضح.",
        },
      },

      design: {
        title: {
          en: "Design",
          ar: "التصميم",
        },
        description: {
          en: "We create a modern website design that reflects your brand identity. Once approved, a 50% deposit is paid to begin professional web development.",
          ar: "نصمم واجهة موقع عصرية تعكس هوية علامتك التجارية. بعد الموافقة، يتم دفع 50٪ لبدء تطوير الموقع بشكل احترافي.",
        },
      },

      development: {
        title: {
          en: "Development",
          ar: "التطوير",
        },
        description: {
          en: "We develop a fast, secure, and mobile-friendly website optimized for search engines and strong online visibility.",
          ar: "نقوم بتطوير موقع سريع وآمن ومتوافق مع الموبايل، ومهيأ لتحسين محركات البحث وزيادة الظهور في نتائج جوجل.",
        },
      },

      launch: {
        title: {
          en: "Handover",
          ar: "التسليم",
        },
        description: {
          en: "After final approval and remaining payment, your website goes live fully optimized and ready to rank on Google.",
          ar: "بعد الموافقة النهائية وسداد المبلغ المتبقي، يتم إطلاق موقعك الإلكتروني مهيأ بالكامل وجاهز للظهور في نتائج بحث جوجل.",
        },
      },
    },
  },

  // FAQ section
  faqSection: {
    heading: { en: "FAQ", ar: "الأسئلة الشائعة" },
    subtitle: {
      en: "Answers to commonly asked questions",
      ar: "إجابات على الأسئلة الأكثر شيوعًا",
    },
    // TO DO. STUDY AND PLAN BEFORE IMPLEMENTING! ==========================================================================================
    items: [
      {
        question: {
          en: "How much does it cost to design a website in Cairo, Egypt?",
          ar: "تكلفة تصميم موقع في القاهرة كام؟",
        },
        answer: {
          en: "The cost of website design in Cairo depends on your business goals. A professional landing page starts from around 4,000 EGP, while a full business website with custom features and SEO can reach 30,000 EGP. As a web design company in Cairo, we provide clear pricing with no hidden fees after our first consultation.",
          ar: "تكلفة تصميم موقع في القاهرة بتختلف حسب احتياجات نشاطك. صفحة هبوط احترافية بتبدأ من حوالي 4,000 جنيه، بينما موقع شركة متكامل مع مميزات مخصصة وتحسين محركات البحث ممكن يوصل لـ 30,000 جنيه. كشركة تصميم مواقع في القاهرة بنقدملك عرض سعر واضح بعد أول استشارة بدون أي رسوم مخفية.",
        },
      },
      {
        question: {
          en: "What is the difference between a landing page and a full business website?",
          ar: "إيه الفرق بين صفحة الهبوط والموقع الإلكتروني المتكامل للشركات؟",
        },
        answer: {
          en: "A landing page is a single conversion-focused page designed to generate leads quickly. A full business website includes multiple pages like About, Services, and Blog, making it better for branding and SEO growth. As a web design company in Cairo, we help you choose the right structure based on your market and competition.",
          ar: "صفحة الهبوط هي صفحة واحدة هدفها الأساسي تجيب عملاء بسرعة. أما الموقع الإلكتروني المتكامل للشركات بيضم صفحات متعددة زي من نحن والخدمات والمدونة، وده بيساعد في بناء براند أقوى وتحقيق ترتيب أفضل في جوجل. كشركة تصميم مواقع في القاهرة بنساعدك تختار الهيكل المناسب حسب مجالك والمنافسة.",
        },
      },
      {
        question: {
          en: "How long does it take for a new website to rank on Google in Cairo?",
          ar: "الموقع بياخد قد إيه عشان يترتب على جوجل في القاهرة؟",
        },
        answer: {
          en: "Google may index your website within days, but ranking for competitive keywords in Cairo usually takes 1 to 3 months. As an SEO-focused web design company in Cairo, we optimize your website speed, structure, and content from day one to improve your visibility in local search results.",
          ar: "جوجل ممكن يأرشف موقعك خلال أيام، لكن الترتيب على كلمات تنافسية في القاهرة غالبًا بياخد من شهر لـ 3 شهور. كشركة تصميم مواقع في القاهرة متخصصة في تحسين محركات البحث بنظبط سرعة الموقع، الهيكلة، والمحتوى من أول يوم علشان نرفع ظهورك في نتائج البحث المحلية.",
        },
      },
      {
        question: {
          en: "Will my website work perfectly on Android and iPhone devices?",
          ar: "هل الموقع هيكون متوافق مع أندرويد وآيفون؟",
        },
        answer: {
          en: "Yes. Every website we develop is fully responsive and tested across Android and iOS devices. As a professional web design company in Cairo, we follow modern development standards to ensure fast loading speed, mobile-friendly design, and strong SEO performance.",
          ar: "أكيد. كل موقع بنطوره بيكون متوافق بالكامل مع أندرويد وآيفون. كشركة تصميم مواقع في القاهرة بنلتزم بأحدث معايير تطوير المواقع علشان نضمن سرعة تحميل عالية، تصميم متجاوب مع الموبايل، وأداء قوي في تحسين محركات البحث.",
        },
      },
      {
        question: {
          en: "Who owns the domain and website files after the project is completed?",
          ar: "مين بيملك الدومين وملفات الموقع بعد تنفيذ المشروع؟",
        },
        answer: {
          en: "You have full ownership of your domain, hosting, and website files after project completion. As a trusted web design company in Cairo, we ensure complete transparency and give you full control, whether you prefer us to manage the website or transfer everything to you.",
          ar: "أنت المالك الكامل للدومين والاستضافة وملفات الموقع بعد انتهاء المشروع. كشركة تصميم مواقع في القاهرة بنضمن شفافية كاملة وبنمنحك كل الصلاحيات، سواء حابب ندير الموقع ليك أو تستلم كل حاجة بنفسك.",
        },
      },
      {
        question: {
          en: "Do you provide technical support after launching the website?",
          ar: "هل بتقدموا دعم فني بعد إطلاق الموقع؟",
        },
        answer: {
          en: "Yes. After launching your website, we provide ongoing technical support and minor updates every month. As a web design company in Cairo, our goal is to keep your business website secure, updated, and continuously optimized for SEO and performance.",
          ar: "أيوه. بعد إطلاق الموقع بنوفر دعم فني مستمر وتعديلات بسيطة شهريًا. كشركة تصميم مواقع في القاهرة هدفنا إن موقع شركتك يفضل آمن، محدث، ومهيأ دايمًا لتحسين محركات البحث وتحقيق أفضل أداء.",
        },
      },
    ],
  },

  // Contact section
  contactSection: {
    heading: { en: "Get In Touch", ar: "تواصل معنا" },
    subtitle: {
      en: "Fill in the form for a free consultation. You can also contact us directly via WhatsApp.",
      ar: "اطلب استشارة مجانية عبر تعبئة النموذج. كما يمكنك التواصل معنا مباشرة عبر واتساب.",
    },
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
      en: "Describe your website project or any inquiries...",
      ar: "اكتب تفاصيل مشروع تصميم موقعك أو صف استفسارك...",
    },
    submit: { en: "Submit Form", ar: "إرسال" },
    sending: { en: "Sending...", ar: "جاري الإرسال..." },
    success: {
      en: "Message sent successfully!",
      ar: "تم إرسال الرسالة بنجاح!",
    },
    errorRateLimit: {
      en: "Please wait a few minutes before sending another message.",
      ar: "يرجى الانتظار بضع دقائق قبل إرسال رسالة أخرى.",
    },
    errorGeneric: {
      en: "Something went wrong. Please try again.",
      ar: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    },
    industry: { en: "What's your business?", ar: "ما هو مجال عملك؟" },
    industryPlaceholder: { en: "Select your industry", ar: "اختر مجالك" },
    onlinePresence: {
      en: "Do you currently have a website?",
      ar: "هل لديك موقع إلكتروني حالياً؟",
    },
    hasWebsite: { en: "Yes", ar: "نعم" },
    noWebsite: { en: "No", ar: "لا" },
  },

  // Accessibility
  a11y: {
    openMenu: { en: "Open menu", ar: "فتح القائمة" },
    closeMenu: { en: "Close menu", ar: "إغلاق القائمة" },
    mobileNav: { en: "Mobile navigation", ar: "قائمة الهاتف" },
    socialLinks: { en: "Social links", ar: "روابط التواصل" },
    skipToContent: { en: "Skip to main content", ar: "تخطى إلى المحتوى" },
    contactForm: { en: "Contact form", ar: "نموذج التواصل" },
    screenshotOf: { en: "Screenshot of", ar: "لقطة شاشة لـ" },
  },

  // Project data
  projectData: {
    skyway: {
      title: {
        en: "Sky Way Travel",
        ar: "موقع شركة سياحة – سكاي واي ترافل",
      },
      description: {
        en: "An elegant, user-friendly website for a Sky Way travel, a Cairo based travel agency. Designed to showcase their tour packages, build trust & drive more bookings.",
        ar: "تصميم موقع إلكتروني احترافي لشركة سياحة في القاهرة، مخصص لعرض عروض الرحلات وبرامج السفر بشكل منظم وجذاب. الموقع يساعد شركة سكاي واي ترافل على زيادة الحجوزات، وبناء الثقة مع العملاء، وتحسين الظهور في نتائج البحث في جوجل.",
      },
      cta: {
        en: "Live Demo",
        ar: "شاهد الموقع",
      },
    },

    weddings: {
      title: {
        en: "Weddings Website",
        ar: "تصميم موقع خدمات أفراح في القاهرة",
      },
      description: {
        en: "A website designed for wedding service providers, photographers & makeup artists. Showcases portfolios, highlight testimonials & convert visitors into clients.",
        ar: "تصميم موقع احترافي لشركات وخدمات الأفراح في القاهرة، مثل مصوري الزفاف وخبراء التجميل. يركز الموقع على عرض الأعمال السابقة، تقييمات العملاء، وزيادة طلبات الحجز من خلال تحسين الظهور في نتائج البحث وجذب عملاء جدد.",
      },
      cta: {
        en: "Live Demo",
        ar: "شاهد الموقع",
      },
    },

    gym: {
      title: {
        en: "Gym Landing Page",
        ar: "تصميم صفحة هبوط لجيم في القاهرة",
      },
      description: {
        en: "A modern landing page for a fitness center. Designed to present membership plans, highlight facilities, inspire visitors in order to increase memberships.",
        ar: "تصميم صفحة هبوط احترافية لجيم في القاهرة، مخصصة لعرض أسعار وخطط الاشتراك، وإبراز الأجهزة والخدمات داخل النادي. الصفحة مصممة لزيادة عدد المشتركين وتحسين الظهور في نتائج البحث المحلية في جوجل.",
      },
      cta: {
        en: "Live Demo",
        ar: "شاهد الموقع",
      },
    },
  },

  // Language toggle
  langToggle: {
    en: "EN",
    ar: "عربي",
  },
} as const;

export default translations;
