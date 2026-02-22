export type Lang = "en" | "ar";

const translations = {
  // Navigation
  nav: {
    home: { en: "Home", ar: "الرئيسية" },
    howItWorks: { en: "Our Process", ar: "آلية العمل" },
    projects: { en: "Our Work", ar: "سابقة الأعمال" },
    faq: { en: "FAQ", ar: "الأسئلة الشائعة" },
    contact: { en: "Contact Us", ar: "تواصل معنا" },
  },

  // Hero
  hero: {
    name: {
      en: "Your Partner In Success",
      ar: "شريكك في النجاح",
    },
    cta: {
      en: "Chat",
      ar: "تواصل",
    },
    primaryCta: {
      en: "Free Consultation",
      ar: "استشارة مجانية",
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
      // TO DO. STUDY AND PLAN BEFORE IMPLEMENTING! ==========================================================================================
      discovery: {
        title: { en: "1. Discovery", ar: "1. التنسيق" },
        description: {
          en: "We connect to understand your business and goals. Then we define the plan, timeline, and pricing.",
          ar: "نتواصل لفهم نشاطك وأهدافك، ثم نحدد الخطة، والجدول الزمني، والتكلفة.",
        },
      },
      design: {
        title: { en: "2. Design", ar: "2. التصميم" },
        description: {
          en: "We create a visual direction and present it to you. Once approved, a 50% deposit begins development.",
          ar: "نضع تصورًا بصريًا للموقع ونعرضه عليك. بعد الموافقة، يتم دفع 50٪ لبدء التطوير.",
        },
      },
      development: {
        title: { en: "3. Development", ar: "3. التطوير" },
        description: {
          en: "We build a fast, clean, and user-friendly website optimized for search.",
          ar: "نبني موقعًا سريعًا، أنيقًا، وسهل الاستخدام، ومهيأ لمحركات البحث.",
        },
      },
      launch: {
        title: { en: "4. Handover", ar: "4. التسليم" },
        description: {
          en: "After final approval and remaining payment, your website goes live.",
          ar: "بعد الموافقة النهائية وسداد المبلغ المتبقي، يتم إطلاق موقعك.",
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
          en: "How much does it cost to make a website in Egypt now?",
          ar: "بكام عمل موقع في مصر دلوقتي؟",
        },
        answer: {
          en: "It depends on what you need. A landing page starts from around 4,000 EGP, while a full website with custom features, a contact form, and SEO optimization can go up to 30,000 EGP. We'll give you an exact quote after our first call.",
          ar: "بيعتمد على اللي محتاجه. صفحة الهبوط بتبدأ من حوالي 4,000 جنيه، والموقع الكامل بمميزات مخصصة وفورم تواصل وSEO ممكن يوصل لـ 30,000 جنيه. بنديك سعر محدد بعد أول مكالمة — من غير أي رسوم مخفية.",
        },
      },
      {
        question: {
          en: "What is the difference between a landing page and a full website for my company?",
          ar: "إيه الفرق بين صفحة الهبوط والموقع الكامل لشركتي؟",
        },
        answer: {
          en: "A landing page is a single page that introduces your business, shows what you offer, and gets customers to contact you — perfect if you're just starting out. A full website has multiple pages (like About, Services, Blog) and is better if your business has more to say or sell.",
          ar: "صفحة الهبوط هي صفحة واحدة بتعرف بيزنسك، بتوضح خدماتك، وبتخلي العميل يتواصل معاك — مثالية لو بتبدأ. الموقع الكامل فيه صفحات متعددة زي (من أنا، الخدمات، المدونة) وبيكون أنسب لو بيزنسك عنده أكتر ما يقوله أو يبيعه.",
        },
      },
      {
        question: {
          en: "How long will the website take to appear on Google?",
          ar: "الموقع هياخد وقت قد إيه عشان يظهر على جوجل؟",
        },
        answer: {
          en: "Google usually discovers a new website within a few days to a few weeks. Showing up in search results for specific keywords takes longer — typically 1 to 3 months. We optimize your site from day one to make that happen as fast as possible.",
          ar: "جوجل عادةً بيلاقي الموقع الجديد في خلال أيام لأسابيع. الظهور في نتائج البحث لكلمات معينة بياخد وقت أطول — من شهر لـ 3 شهور في الغالب. بنعمل تحسين الموقع من أول يوم عشان ده يحصل بأسرع ما يمكن.",
        },
      },
      {
        question: {
          en: "Will the site work well on Android mobiles?",
          ar: "هل الموقع هيكون شغال كويس على الموبايلات الاندرويد؟",
        },
        answer: {
          en: "Absolutely. Every website we build is tested across Android and iOS devices to make sure it looks great and loads fast on any screen size.",
          ar: "أكيد. كل موقع بنبنيه بنجربه على أجهزة أندرويد وiOS عشان نتأكد إنه شكله كويس وبيفتح بسرعة على أي شاشة.",
        },
      },
      {
        question: {
          en: "Who will have the domain and files after the project is finished?",
          ar: "مين اللي هيكون معاه الدومين والملفات بعد ما المشروع يخلص؟",
        },
        answer: {
          en: "As you wish. You have full control over where your domain, hosting, and files are kept—whether you want us to manage them or prefer to hold them yourself.",
          ar: "زي ما تحب. ليك حرية الاختيار الكاملة في مكان الدومين والاستضافة والملفات—سواء حابب إننا نديرهم أو تفضل إنهم يكونوا معاك.",
        },
      },
      {
        question: {
          en: "Is there technical support if a problem occurs on the site?",
          ar: "هل فيه دعم فني لو حصلت مشكلة في الموقع؟",
        },
        answer: {
          en: "Yes. After handover we're still available if a problem occurs. We also offer 2 minor modifications a month for free.",
          ar: "أيوه. بعد التسليم لو حصلت أي مشكلة بنكون موجودين، وبنقدم كمان تعديلين بسيطين كل شهر مجاناً.",
        },
      },
    ],
  },

  // Contact section
  contactSection: {
    heading: { en: "Get In Touch", ar: "تواصل معنا" },
    subtitle: {
      en: "Fill in the form below for a free consultation. You can also contact us directly via WhatsApp.",
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
      en: "Describe your project or inquiry...",
      ar: "صف مشروعك أو استفسارك...",
    },
    submit: { en: "Submit Form", ar: "إرسال" },
    sending: { en: "Sending...", ar: "جاري الإرسال..." },
    success: {
      en: "Message sent successfully!",
      ar: "تم إرسال الرسالة بنجاح!",
    },
    industry: { en: "What's your business?", ar: "ما هو مجال عملك؟" },
    industryPlaceholder: { en: "Select your industry", ar: "اختر مجالك" },
    onlinePresence: {
      en: "Do you currently have a website?",
      ar: "هل لديك موقع إلكتروني حالياً؟",
    },
    hasWebsite: { en: "Yes", ar: "نعم" },
    noWebsite: { en: "No", ar: "لا" },
    budget: {
      en: "What's your approximate budget?",
      ar: "ما هي ميزانيتك التقريبية؟",
    },
    budgetPlaceholder: { en: "Select a range", ar: "اختر النطاق" },
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
        ar: "شركه سكاى واى ترافل",
      },
      description: {
        en: "A landing page for a Sky Way travel, a Cairo based travel agency. Designed to showcase tour packages, build trust, and drive direct bookings.",
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
  },

  // Language toggle
  langToggle: {
    en: "EN",
    ar: "عربي",
  },
} as const;

export default translations;
