export type Lang = "en" | "ar";

const translations = {
  // Navigation
  nav: {
    home: { en: "Home", ar: "الرئيسية" },
    howItWorks: { en: "Our Proccess", ar: "آلية العمل" },
    projects: { en: "Our Work", ar: "سابقة الأعمال" },
    faq: { en: "FAQ", ar: " أسئلة شائعه" },
    contact: { en: "Contact Us", ar: "تواصل معنا" },
  },

  // Hero
  hero: {
    name: {
      en: "Your Partner In Success.",
      ar: "شريكك في النجاح",
    },
    cta: {
      en: "Chat",
      ar: "تواصل",
    },
    primaryCta: {
      en: "Free Consultation",
      ar: "استشاره مجانيه",
    },
    seoLabel: {
      en: "Web Design & Development in Cairo",
      ar: "تصميم وتطوير مواقع في القاهرة",
    },
  },

  // Projects section
  projectsSection: {
    heading: { en: "Our Work", ar: "سابقة الأعمال" },
    subtitle: {
      en: "A selection of our latest projects.",
      ar: "مجموعة من أحدث مشاريعنا.",
    },
  },

  // Our Procces section
  workflowSection: {
    heading: { en: "Our Proccess", ar: "آلية العمل" },
    subtitle: {
      en: "A structured process from start to finish.",
      ar: "عملية واضحة ومنظمة من البداية للنهاية.",
    },
    steps: {
      // TO DO. STUDY AND PLAN BEFORE IMPLEMENTING! ==========================================================================================
      discovery: {
        title: { en: "1. Communication", ar: "1. التنسيق" },
        description: {
          en: "he goal is to have a clear agreed upon plan that covers how I will handle your branding, what features to include, and price quote.",
          ar: "بنتواصل من خلال مكالمة أو اجتماع لتحديد أهدافك. هدفنا هو وضع خطة واضحة وجدول زمني محدد لموقعك.",
        },
      },
      design: {
        title: { en: "2. Design", ar: "التصميم" },
        description: {
          en: "however, from experience, we understand that some of our clients want to see the design themselves before the full implementaion. Therefore we do offer this step as an extra step for your convenience.",
          ar: "بصمم واجهة مخصصة تعبر عن علامتك التجارية. بمجرد رضاك واعتمادك للتصميم، بنبدأ مرحلة التنفيذ بدفعة مقدمة 50%.",
        },
      },
      development: {
        title: { en: "3. Development", ar: "التنفيذ" },
        description: {
          en: "A 50% deposit of the full price initializes the development phase. Your vision is then brought to life.",
          ar: "بنحول التصميم لموقع حقيقي، سريع، متوافق مع الموبايل، ومجهز لمحركات البحث (SEO).",
        },
      },
      launch: {
        title: { en: "4. Handover", ar: "التسليم" },
        description: {
          en: "After final approval and settling the remaining 50%, your site goes live! I handover the product and provide ongoing support when needed.",
          ar: "بعد الموافقة النهائية وتسوية الـ 50% المتبقية، موقعك بينطلق! بسلمك المنتج النهائي وبوفرلك دعم مستمر عند الحاجة.",
        },
      },
    },
  },

  // FAQ section
  faqSection: {
    heading: { en: "FAQ", ar: "أسئلة شائعة" },
    subtitle: {
      en: "Answers to commonly asked questions.",
      ar: "إجابات على الأسئلة الأكثر شيوعًا.",
    },
    // TO DO. STUDY AND PLAN BEFORE IMPLEMENTING! ==========================================================================================
    items: [
      {
        question: {
          en: "How much does a website cost?",
          ar: "كم يستغرق بناء الموقع؟",
        },
        answer: {
          en: "The short answer is, it depends. The full cost website can cost anywhere from 4000 EGP for a 4 section landing page to 30,000 EGP for a landing page with custom forms (lead collection), admin control panel and highly-optimized SEO.",
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
          en: "Do you handle hosting and domain setup",
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
          en: "Yes. Infact, we don't even expect you to know what those terms mean. We take care of all the technical details for you and explain only what you need to know for your site to stay up and running at all times.",
          ar: "أيوه. أقدر أساعدك تختار خطة الاستضافة المناسبة وأجهزلك الدومين الخاص بيك. هتكفل بكل الإعدادات التقنية عشان موقعك يكون شغال ومتاح من غير ما تشيل هم التفاصيل.",
        },
      },
      {
        question: {
          en: "Will my website be optimized for search engines?",
          ar: "الموقع هيكون مجهز لمحركات البحث (SEO)؟",
        },
        answer: {
          en: "Yes. Every site I build follows SEO best practices, however if you want aggressive SEO optimization this is considered an addon to the standard package.",
          ar: "أيوه. كل موقع ببنيه بيتبع أفضل ممارسات الـ SEO زي سرعة التحميل وكود نظيف وعلامات meta صحيحة والتوافق مع الموبايل — وكل ده بيساعد موقعك يظهر أعلى في نتائج جوجل.",
        },
      },
    ],
  },

  // Contact section
  contactSection: {
    heading: { en: "Get In Touch", ar: "تواصل معنا" },
    subtitle: {
      en: "Request a free consultation by filling out the form below, and our team will get back to you shortly. You can also contact us instantly via WhatsApp.",
      ar: "اطلب استشارة مجانية عبر تعبئة النموذج أدناه، وسيتواصل معك فريقنا في أقرب وقت. كما يمكنك التواصل معنا مباشرة عبر واتساب.",
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
    onlinePresence: { en: "Do you currently have a website?", ar: "هل لديك موقع إلكتروني حالياً؟" },
    hasWebsite: { en: "Yes", ar: "نعم" },
    noWebsite: { en: "No", ar: "لا" },
    budget: { en: "What's your approximate budget?", ar: "ما هي ميزانيتك التقريبية؟" },
    budgetPlaceholder: { en: "Select a range", ar: "اختر النطاق" },
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
  },

  // Language toggle
  langToggle: {
    en: "English",
    ar: "عربي",
  },
} as const;

export default translations;
