export type Lang = "en" | "ar";

const translations = {
  // Navigation
  nav: {
    home: { en: "Home", ar: "الرئيسية" },
    howItWorks: { en: "Process", ar: "خطوات العمل" },
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
      ar: "ابدأ محادثة",
    },
    primaryCta: {
      en: "Book a Free Consultation",
      ar: "احصل على استشارة مجانية",
    },
    secondaryCta: {
      en: "See Our Work",
      ar: "سابقة الأعمال",
    },
    seoLabel: {
      en: "Web Design & Development in Cairo",
      ar: "شركة تصميم مواقع في القاهرة",
    },
  },

  // Services section
  servicesSection: {
    heading: { en: "The All-In-One Website", ar: "موقعك الإلكتروني المتكامل" },
    subtitle: {
      en: "A complete professional presence engineered into a single, high-performance page.",
      ar: "واجهة احترافية كاملة لعملك، مصممة بدقة لزيادة أرباحك",
    },

    goal: {
      lines: [
        {
          en: "Your growth isn't a project. It’s our reputation.",
          ar: "نموّك مش مجرد مشروع.. هو سمعتنا.",
        },
        {
          en: "We treat your brand like it's our own.",
          ar: "بنعامل علامتك التجارية كأنها ملكنا.",
        },
      ],
    },
    sharedFeatures: [
      {
        en: "Fully Responsive",
        ar: "متوافق مع الموبايل والتابلت",
        desc: {
          en: "Your site will look great whether a customer finds you on their phone, tablet, or laptop.",
          ar: "موقعك هيظهر بأفضل شكل، سواء فتحه العميل من الموبايل أو التابلت أو اللابتوب.",
        },
      },
      {
        en: "SEO Foundation",
        ar: "أسس محركات البحث",
        desc: {
          en: "Your site is optimized to show up on Google when customers look for your services.",
          ar: "بنجهز موقعك برمجياً عشان يظهر في نتائج بحث جوجل لما العملاء تبحث على خدماتك.",
        },
      },
      {
        en: "Fast Loading",
        ar: "سرعة تحميل عالية",
        desc: {
          en: "Slow sites lose customers. We optimize yours to load in under 2 seconds.",
          ar: "المواقع البطيئة بتضيع عملائك، عشان كدة بنضمن إن موقعك يفتح في أقل من ثانيتين.",
        },
      },
      {
        en: "Contact Integration",
        ar: "ربط الواتساب ونماذج الاتصال",
        desc: {
          en: "We integrate one-click WhatsApp & contact forms so customers can reach you instantly.",
          ar: "بنربط موقعك بالواتساب ونماذج الاتصال، عشان العميل يوصلك بضغطة واحدة.",
        },
      },
      {
        en: "Free Lifetime Support",
        ar: "دعم مجاني دائم",
        desc: {
          en: "Your site is covered for life. If anything ever stops working, we fix it — free of charge.",
          ar: "موقعك مضمون للأبد. لو أي حاجة عطلت أو وقفت، بنصلحها مجانًا من غير قيود زمنية.",
        },
      },
      {
        en: "Copywriting Available",
        ar: "كتابة المحتوى متاحة",
        desc: {
          en: "We write the content in English, Arabic, or both—tailored to your brand's identity.",
          ar: "بنكتب محتوى موقعك بالعربي أو الإنجليزي (أو الاتنين) بأسلوب يناسب هوية البراند بتاعتك.",
        },
      },
    ],
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
  // Project data
  // Project data
  projectData: {
    skyway: {
      title: {
        en: "Sky Way Travel",
        ar: "موقع شركة سياحة – سكاي واي ترافل",
      },
      description: {
        en: "An elegant, user-friendly website for a Sky Way travel, a Cairo based travel agency. Designed to showcase their tour packages, build trust & drive more bookings.",
        ar: "موقع إلكتروني عصري لشركة سكاى واى ترافل. صممناه لعرض عروض الرحلات وبرامج السفر بشكل احترافي يساعد على بناء الثقة مع العملاء وزيادة الحجوزات.",
      },
      cta: {
        en: "Live Demo",
        ar: "مشاهدة الموقع",
      },
    },

    weddings: {
      title: {
        en: "Wedding Services Website",
        ar: "موقع لخدمات الأفراح والمناسبات",
      },
      description: {
        en: "A website designed for wedding service providers, photographers & makeup artists. Showcase portfolios, highlight testimonials & convert visitors into clients.",
        ar: "موقع مخصص لمزودي خدمات الأفراح، المصورين، وخبراء التجميل. يركز على عرض سابقة الأعمال وتقييمات العملاء، ويهدف لتحويل الزوار إلى عملاء دائمين.",
      },
      cta: {
        en: "Live Demo",
        ar: "مشاهدة الموقع",
      },
    },

    gym: {
      title: {
        en: "Gym Landing Page",
        ar: "صفحة هبوط لنادي رياضي",
      },
      description: {
        en: "A modern landing page for fitness centers. Strategically designed to highlight facilities & testimonials, showcase activities and inspire visitors to become loyal members.",
        ar: "صفحة هبوط عصرية للمراكز الرياضية. تم تصميمها استراتيجياً لإبراز الخدمات وآراء المشتركين، مما يحفز الزوار على الاشتراك وبدء رحلتهم الرياضية.",
      },
      cta: {
        en: "Live Demo",
        ar: "مشاهدة الموقع",
      },
    },
  },

  // Our Process section
  workflowSection: {
    heading: { en: "Our Process", ar: "خطوات العمل" },
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
          ar: "نتواصل لفهم نشاطك التجاري وأهدافك والجمهور المستهدف، ثم نحدد استراتيجية تصميم الموقع، الجدول الزمني، والتكلفة بشكل واضح.",
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
          en: "How much does a website cost?",
          ar: "تكلفة الموقع كام؟",
        },
        answer: {
          en: "The cost depends on your business goals. Here at SM Web Studio we use custom code for all our websites. Therefore, a simple landing page with 4–5 sections starts from around 3,000 EGP, while a full single-page website with more sections, deeper detail, and advanced features can reach 30,000 EGP — with additional pages available if needed. We provide clear pricing with no hidden fees after our first consultation.",
          ar: "التكلفة بتعتمد على الخصائص والمميزات اللي محتاجها موقعك. صفحة هبوط من ٤–٥ أقسام بتبدأ تقريبًا من ٣٬٠٠٠ جنيه، ومع إضافة أقسام أو مميزات إضافية زي دعم لغتين، نموذج تواصل مخصص بربط مباشر على الإيميل، أو تحسين متقدم لمحركات البحث (SEO)، السعر بيزيد حسب المطلوب. بنوضح السعر من أول استشارة من غير أي رسوم مخفية.",
        },
      },
      {
        question: {
          en: "What technologies do you use to build websites?",
          ar: "إيه نوع التقنية اللي بتستخدموها في بناء المواقع؟",
        },
        answer: {
          en: "We build all our websites using custom code. For landing pages and lightweight sites, we use Vanilla JS — pure, minimal code with no unnecessary dependencies, which means extremely fast load times. For more advanced, multi-page business websites, we use Next.js — a modern framework that handles dynamic content, routing, and performance optimization at scale. Neither uses WordPress or any page builders.",
          ar: "إحنا بنبني كل مواقعنا بكود مخصص. لصفحات الهبوط والمواقع الخفيفة بنستخدم Vanilla JS — كود نضيف ومباشر من غير أي تبعيات ملهاش لازمة، وده بيدّي سرعة تحميل عالية جدًا. للمواقع الأكبر متعددة الصفحات بنستخدم Next.js — فريمورك حديث بيساعدنا ندير المحتوى الديناميكي، التنقل بين الصفحات، وتحسين الأداء باحترافية.",
        },
      },
      {
        question: {
          en: "Why not just use WordPress or a website builder?",
          ar: "ليه ما نستخدمش ووردبريس أو منصة جاهزة؟",
        },
        answer: {
          en: "WordPress and website builders are faster to launch, but they are general-purpose tools built for everyone — which means they carry a lot of extra weight. Plugins, themes, and layers of code you don't actually need slow your site down, make it more vulnerable to hacking, and hurt your Google rankings since page speed is a direct ranking factor. Custom code is built specifically for your needs, so it loads faster, stays more secure, and performs better in search results.",
          ar: "ووردبريس والمنصات الجاهزة هي أداة لصنع موقع إلكتروني بطريقة سهلة وسريعة لكنها بتفتقد لدور المبرمج والبرمجة المخصصة اللي دورها تبني من الصفر حسب احتياجات موقعك، ووردبريس يُستخدَم فيه إضافات وقوالب وطبقات كود زيادة بتبطّأ موقعك، تزود احتمالية الاختراق، وتأثر على ترتيبك في جوجل لأن السرعة عامل ترتيب أساسي. البرمجة المخصصة بتبني موقعك على مقاس احتياجك، فبيكون أسرع، أأمن، وأقوى في نتائج البحث.",
        },
      },
      {
        question: {
          en: "Can my website get hacked?",
          ar: "ممكن موقعي يُخترق؟",
        },
        answer: {
          en: "Extremely difficult. Because your website is built as a static site — meaning pure code with no database, no login panel, and no plugins — there is almost nothing for a hacker to target. Most website hacks exploit WordPress vulnerabilities like outdated plugins or weak passwords. None of those entry points exist in a static custom-coded website, making it one of the most secure options available.",
          ar: "صعب جدًا. لأن موقعك بيكون Static — يعني كود صافي من غير قاعدة بيانات، من غير لوحة تحكم، ومن غير إضافات. مفيش تقريبًا حاجة يقدر المخترق يدخل منها. أغلب الاختراقات بتحصل بسبب إضافات قديمة أو كلمات سر ضعيفة في ووردبريس — الحاجات دي مش موجودة عندنا أصلًا، وده بيخلي الموقع من أكتر الخيارات أمانًا.",
        },
      },
      {
        question: {
          en: "Can you redesign my existing website?",
          ar: "تقدروا تعيدوا تصميم موقعي الحالي؟",
        },
        answer: {
          en: "It depends on how your current website was built. If it was built with custom code, then yes — we can redesign and improve it. We'll just need access to the existing files and hosting settings, either from you or your previous developer. If your website is built on WordPress, we unfortunately can't work with it directly, but we can build you a brand new custom-coded website that will outperform it in speed, security, and SEO.",
          ar: "بيعتمد على طريقة بناء موقعك الحالي. لو معمول بكود مخصص نقدر نعيد تصميمه ونطوره — هنحتاج الملفات وإعدادات الاستضافة منك أو من المطور السابق. لو موقعك معمول بووردبريس مش بنشتغل عليه مباشرة، لكن نقدر نبني لك موقع جديد بكود مخصص يتفوق عليه في السرعة، الأمان، والـ SEO.",
        },
      },
      {
        question: {
          en: "Does the website support Arabic and English?",
          ar: "الموقع بيدعم عربي وإنجليزي؟",
        },
        answer: {
          en: "Yes. We build fully bilingual websites that support both Arabic and English, including proper right-to-left (RTL) layout for Arabic. Switching between languages is seamless for your visitors, and both versions are optimized for SEO so your business gets found in both languages on Google. Keep in mind that bilingual websites require additional development work and are priced accordingly — we'll include this clearly in your quote.",
          ar: "بنبني مواقع ثنائية اللغة تدعم العربي والإنجليزي بالكامل، مع تنسيق RTL مظبوط للعربي. التحويل بين اللغتين بيكون سهل وسلس للزوار، وكل نسخة متهيأة للـ SEO عشان يظهر نشاطك في البحث باللغتين. دعم اللغتين يُصنَّف كخاصية إضافية.",
        },
      },
      {
        question: {
          en: "How long does it take to build a website?",
          ar: "استلام الموقع بياخد وقت قد إيه؟",
        },
        answer: {
          en: "It depends on the scope of the project. A simple landing page with 4–5 sections is typically ready within 5 to 7 business days once we have all your content, images, and branding. A more advanced single-page website with deeper sections and custom features can take 1 to 2 weeks. The biggest factor that affects timeline is how quickly content is provided on your end.",
          ar: "بيعتمد على حجم المشروع. صفحة هبوط بسيطة من ٤–٥ أقسام بتكون جاهزة غالبًا خلال ٥ لـ ٧ أيام عمل بعد ما نستلم المحتوى والصور والهوية البصرية. موقع أكبر بخصائص وتفاصيل أكتر ممكن ياخد من أسبوع لأسبوعين. أكتر عامل بيأثر على المدة هو سرعة استلام المحتوى من الطرف الآخر.",
        },
      },
      {
        question: {
          en: "Can I update my website content myself?",
          ar: "أقدر أعدّل محتوى الموقع بنفسي؟",
        },
        answer: {
          en: "Because we build with custom code rather than a CMS like WordPress, you won't be able to edit the website directly. That's why we include free minor content updates every month — things like swapping images, updating text, or adjusting details. If you ever need bigger changes or new features, we're always available as paid work.",
          ar: "بما إن الموقع مبني بكود مخصص مش نظام إدارة محتوى زي ووردبريس، مش هتقدر تعدّل عليه مباشرة بنفسك. عشان كده بنوفّر تحديثات بسيطة مجانية كل شهر — زي تغيير صورة، تعديل نص، أو تحديث بيانات. لو احتجت تطويرات أكبر أو إضافة مميزات جديدة، بتكون متوفرة كخدمات إضافية. تعديل محتوى الموقع بنفسك بيحتاج لوحة تحكم بنوفرهالك كخاصية إضافية.",
        },
      },
      {
        question: {
          en: "How long does it take for a new website to rank on Google?",
          ar: "الظهور في جوجل بياخد وقت قد إيه؟",
        },
        answer: {
          en: "Google may index your website within days, but ranking for competitive keywords in Cairo usually takes 3 to 6 months. We optimize your website speed, structure, and content from day one to improve your visibility in local search results as efficiently as possible.",
          ar: "جوجل ممكن تُفهرس موقعك خلال أيام، لكن المنافسة على كلمات قوية في القاهرة عادةً بتاخد من ٣ لـ ٦ شهور. إحنا بنظبط سرعة الموقع، هيكله، ومحتواه من أول يوم عشان نزود فرص ظهوره في نتائج البحث المحلية بأكبر كفاءة ممكنة.",
        },
      },
      {
        question: {
          en: "Do you provide technical support after launching the website?",
          ar: "فيه دعم فني بعد إطلاق الموقع؟",
        },
        answer: {
          en: "Yes. If anything ever breaks or stops working on your website, we'll fix it — free of charge, forever. Any additional changes or new features beyond that are handled as paid work. Our goal is to make sure your website stays up, running, and problem-free long after launch.",
          ar: "لو أي حاجة عطلت أو وقفت في موقعك، بنصلحها مجانًا. هدفنا إن موقعك يفضل شغال بثبات ومن غير مشاكل بعد الإطلاق.",
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
      en: "Describe your website project or inquiries...",
      ar: "اكتب تفاصيل مشروع تصميم موقعك أو استفسارك...",
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

  // Language toggle
  langToggle: {
    en: "EN",
    ar: "عربي",
  },
} as const;

export default translations;
