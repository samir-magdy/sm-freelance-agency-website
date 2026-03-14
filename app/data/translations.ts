export type Lang = "en" | "ar";

const translations = {
  // Navigation
  nav: {
    services: { en: "Features", ar: "المميزات" },
    addOns: { en: "Services", ar: "الخدمات" },
    projects: { en: "Portfolio", ar: "سابقة الأعمال" },
    howItWorks: { en: "Process", ar: "خطوات العمل" },
    faq: { en: "FAQs", ar: "الأسئلة الشائعة" },
    contact: { en: "Get Started", ar: "ابدأ الآن" },
  },

  // Hero
  hero: {
    name: {
      en: ["Be Found.", "Be Trusted.", "Be Chosen."],
      ar: ["صمّم موقعك.", "أنشئ متجرك.", "تصدّر البحث."],
    },
    primaryCta: {
      en: "Get Started",
      ar: "ابدأ الآن",
    },
    secondaryCta: {
      en: "Learn more",
      ar: "اعرف المزيد",
    },
    subheading: {
      en: "Boost your online presence with the website your brand deserves.",
      ar: "امتلك حضورك الرقمي من خلال تصميم موقع إلكترونى إحترافي يليق بعلامتك التجارية.",
    },
  },

  goal: {
    en: "Your growth isn’t another project. It’s our reputation.",
    ar: ["نموّك مش بس مشروع..", "هو سمعتنا."],
  },
  // Features section
  servicesSection: {
    heading: {
      en: "Features Included in Every Website",
      ar: "مميزات تصميم كل موقع",
    },
    subtitle: {
      en: "A solid foundation from the start",
      ar: "كل موقع إلكترونى نصممه يأتي بهذه المميزات",
    },

    sharedFeatures: [
      {
        en: "Lifetime Guarantee",
        ar: "ضمان مدى الحياة",
        desc: {
          en: "If anything ever stops working as intended, just reach out to us and we'll fix it free of charge.",
          ar: "في حال توقف أي شيء عن العمل، نتولى إصلاح الموقع مجاناً دون أي رسوم إضافية مدى الحياة.",
        },
      },
      {
        en: "Fully Responsive",
        ar: "توافق مع جميع الأجهزة",
        desc: {
          en: "Your website will work perfectly and look great on all devices. Phone, tablet, laptop, or Desktop.",
          ar: "موقعك يعمل بشكل مثالي ويظهر باحترافية على جميع الأجهزة. بما يشمل موبايل، تابلت، أو لابتوب.",
        },
      },
      {
        en: "Fast Loading",
        ar: "سرعة تحميل عالية",
        desc: {
          en: "Slow websites lose customers. That's why we optimize yours for maximum performance.",
          ar: "المواقع البطيئة تُفقدك عملائك. لهذا نحرص على تحميل موقعك في أقل وقت ممكن.",
        },
      },
      {
        en: "Hosting & Deployment",
        ar: "استضافة ونشر الموقع",
        desc: {
          en: "We don't just build the website. We also handle all the steps needed to keep your site live.",
          ar: "نتولى جميع التفاصيل التقنية لأطلاق موقعك وللتأكيد انه يعمل بشكل مثالي باستمرار.",
        },
      },
      {
        en: "SEO Foundation",
        ar: "أسس محركات البحث",
        desc: {
          en: "Your website is properly setup so customers find your website when searching for you on Google.",
          ar: "موقعك مهيأ لمحركات البحث منذ اليوم الأول، لتظهر في نتائج جوجل عند البحث.",
        },
      },
      {
        en: "Contact Integration",
        ar: "ربط جهات الاتصال",
        desc: {
          en: "Integration of WhatsApp, social media links and more, allowing customers to reach you instantly.",
          ar: "نربط موقعك بالواتساب وجميع وسائل التواصل حتى يصل إليك العملاء بضغطة واحدة.",
        },
      },
      {
        en: "Content Updates",
        ar: "تعديلات شهرية مجانية",
        desc: {
          en: "Request up to three basic content changes a month at no charge. Text, images, and more.",
          ar: "يمكنك طلب ثلاث تعديلات شهرياً على المحتوى مجاناً. نصوص أو صور أو أسعار وغير ذلك.",
        },
      },
    ],
  },

  // Services section
  addOnsSection: {
    heading: {
      en: "Our Services",
      ar: "الخدمات الإضافية",
    },
    subtitle: {
      en: "Extras that enhance your website's capabilities",
      ar: "خصائص وخدمات اختيارية لتوسيع نطاق موقعك وقدراته",
    },
    items: [
      {
        title: {
          en: "Built-in Dashboard",
          ar: "لوحة تحكم للمحتوى",
        },
        description: {
          en: "A private control panel to update your website's content. No third party needed.",
          ar: "واجهة إدارة محتوى تتيح لك تعديل النصوص، الصور، والتفاصيل في موقعك دون الحاجة إلى مبرمج.",
        },
      },
      {
        title: {
          en: "Bilingual (AR/EN)",
          ar: "دعم اللغتين (عربي/إنجليزي)",
        },
        description: {
          en: "Your website is written in both Arabic and English. Users can toggle languages easily.",
          ar: "موقعك مبني بالعربي والإنجليزي بالكامل بإضافة خاصية تبديل سلس بين اللغتين للزوار.",
        },
      },
      {
        title: {
          en: "SEO Strategy Package",
          ar: "تطوير SEO للمحتوى",
        },
        description: {
          en: "Targeted research and content optimization designed to maximize search engine visibility.",
          ar: "محتوى مبني على كلمات بحث مستهدفة لتحسين ترتيب موقعك في جوجل للمصطلحات المهمة لنشاطك.",
        },
      },
      {
        title: {
          en: "Google Business Profile",
          ar: "Google Business Profile",
        },
        description: {
          en: "Full setup of your GBP so that your business appears on Google Maps and local search results.",
          ar: "إعداد وتحسين كامل لملفك على جوجل ليظهر نشاطك على خرائط جوجل ونتائج البحث المحلية.",
        },
      },

      {
        title: {
          en: "Full Copywriting",
          ar: "كتابة محتوى كامل",
        },
        description: {
          en: "We write all your website content from scratch, tailored to your brand voice and audience.",
          ar: "نكتب كل محتوى موقعك من الصفر، مصمّم لهوية علامتك التجارية وجمهورك المستهدف.",
        },
      },
      {
        title: {
          en: "Logo & Brand Identity",
          ar: "لوجو وهوية بصرية",
        },
        description: {
          en: "Custom logo and visual identity designed to give your brand an attractive, consistent look.",
          ar: "لوجو وهوية بصرية مخصصة تمنح علامتك التجارية مظهر احترافي، معروف ومتناسق.",
        },
      },
      {
        title: {
          en: "Custom Contact Form",
          ar: "نموذج تواصل",
        },
        description: {
          en: "A custom-built form that delivers enquiries directly to your preferred channel and gathers leads.",
          ar: "نموذج مخصص يوصل استفسارات العملاء مباشرة إلى بريدك الإلكتروني، واتساب، أو كلاهما.",
        },
      },
    ],
  },

  // Projects section
  projectsSection: {
    heading: {
      en: "Web Design Portfolio",
      ar: "معرض أعمال تصميم المواقع",
    },
    subtitle: {
      en: "The quality and style we bring to every project",
      ar: "إطلالة على جودة التصميم والأسلوب في كل مشروع",
    },
  },
  projectData: {
    skyway: {
      title: {
        en: "Sky Way Travel - Travel Agency",
        ar: "شركة سكاي واي ترافل للسياحة",
      },
      description: {
        en: "Sky Way Travel came to us needing a website that showcases their package's details in an efficient manner. After learning exactly what they need from the consultation, the result was a high-performance, professional website that gives website visitors the extra boost of confidence to contact them and make the booking, converting site visitors into booked clients.",
        ar: "لجأت إلينا شركة سكاي واي ترافل بحثاً عن موقع إلكتروني يعرض تفاصيل باقاتهم السياحية بأسلوب فعّال. وبعد فهم احتياجاتهم بدقة من خلال جلسة الاستشارة، كانت النتيجة موقعاً احترافياً عالي الأداء يمنح الزوار الثقة اللازمة للتواصل وإتمام الحجز، مما يساهم في تحويل زوار الموقع إلى عملاء فعليين.",
      },
      cta: {
        en: "View Live Site",
        ar: "مشاهدة الموقع",
      },
    },

    weddings: {
      title: {
        en: "Wedding Services Website",
        ar: "موقع لخدمات الأفراح والمناسبات",
      },
      description: {
        en: "A website designed for wedding photographers, planners, and make-up artists who need more than an Instagram page. The website gives your brand instant authority, showcases your work in elegant photo galleries, and builds the trust needed to convert browsing couples into satisfied clients. The site features bilingual (English/Arabic) support and more.",
        ar: "موقع مصمم خصيصاً لمصوري ومنظمي الأفراح الذين يحتاجون إلى أكثر من صفحة على إنستغرام. يمنح الموقع علامتك التجارية موثوقية فورية، ويعرض أعمالك في معارض صور أنيقة، ويبني الثقة اللازمة لتحويل العرسان المتصفحين للموقع إلى عملاء. يتميز الموقع بدعم اللغتين (الإنجليزية والعربية) والمزيد.",
      },
      cta: {
        en: "Live Demo",
        ar: "مشاهدة الموقع",
      },
    },

    gym: {
      title: {
        en: "Gym Landing Page",
        ar: "صفحة هبوط لنادٍ رياضي",
      },
      description: {
        en: "A modern, minimal landing page designed specifically for startup gyms and fitness centers that want to generate more leads and aquire more members. The website highlights facilities and inspires browsers to get started on their fitness journey. The website makes it effortless for visitors to take the next step through it's strategically structured flow.",
        ar: "صفحة هبوط مصممة خصيصاً للنوادي الرياضية ومراكز اللياقة البدنية الناشئة التي تطمح لجذب المزيد من المهتمين واكتساب أعضاء جدد عبر حضورهم القوى في العالم الرقمي. يُلهم الزوار المتصفحين للبدء في رحلتهم نحو اللياقة البدنية. كما يجعل الموقع اتخاذ الخطوة التالية أمراً في غاية السهولة.",
      },
      cta: {
        en: "Live Demo",
        ar: "مشاهدة الموقع",
      },
    },
  },

  // YOU ARE HERE
  // Our Process section
  workflowSection: {
    heading: { en: "Website Development Process", ar: "خطوات تصميم موقعك" },
    subtitle: {
      en: "A clear process from start to finish",
      ar: "عملية واضحة من البداية للنهاية",
    },
    steps: {
      discovery: {
        title: { en: "Consultation", ar: "الاستشارة" },
        description: {
          en: "We connect to understand everything you need from your website, then send a full proposal including timeline and pricing. Once approved, the design phase begins.",
          ar: "نتواصل معك لفهم كل ما تحتاجه من موقعك، ثم نرسل لك عرض سعر بتفاصيل بالمشروع. بعد موافقتك، تبدأ مرحلة التصميم.",
        },
      },
      design: {
        title: { en: "Design", ar: "التصميم" },
        description: {
          en: "We design the initial look and feel of your website and present it to you for feedback. Once you approve, the build phase begins.",
          ar: "نصمم الشكل والأسلوب العام لموقعك ونعرضه عليك للمراجعة. بعد اعتمادك للتصميم، تبدأ مرحلة التطوير.",
        },
      },
      development: {
        title: { en: "Build", ar: "التطوير" },
        description: {
          en: "We add functionality to your website based on the approved design, adding essentials like setting up proper SEO, optimising performance and much more.",
          ar: "نبدأ مرحلة التطوير لتحويل التصميم إلى موقع فعلي يعمل بكفائة، بينما تركز أنت على إدارة نشاطك.",
        },
      },
      launch: {
        title: { en: "Launch", ar: "الإطلاق" },
        description: {
          en: "We review the finished website together before going live. Once you are satisfied with the final result, your website launches.",
          ar: "نستعرض معك الموقع بعد اكتماله قبل نشره. بعد موافقتك وسداد المبلغ المتبقي، يتم إطلاق موقعك رسميًا.",
        },
      },
      support: {
        title: { en: "Support", ar: "الدعم" },
        description: {
          en: "After launch, we stay available for updates, fixes, and any questions or requests that may come up.",
          ar: "بعد الإطلاق، نبقى متاحين للتحديثات والإصلاحات وأي استفسارات قد تظهر.",
        },
      },
    },
  },

  faqSection: {
    heading: { en: "Frequently Asked Questions", ar: "الأسئلة الشائعة" },
    subtitle: {
      en: "Have a question? It's likely answered here",
      ar: "هل لديك استفسار؟ ستجد الإجابة هنا على الأرجح",
    },
    items: [
      // ===== TOP OF FUNNEL (Awareness) =====
      {
        question: {
          en: "Do I need a website for my business?",
          ar: "هو شغلي محتاج موقع إلكتروني؟",
        },
        answer: {
          en: "A professional website establishes a credible online presence, builds brand authority, captures search-driven consumer demand, and works for you 24/7. Whether you're a service provider, retailer, or freelancer, not having a website guarantees that you are losing potential customers.",
          ar: "الموقع الإلكتروني يجعل نشاطك التجاري قابلاً للاكتشاف على جوجل ومحركات البحث الأخرى، كما يمنحك حضوراً احترافياً تسيطر عليه بالكامل ويعمل لصالحك على مدار الساعة. سواء كنت مقدم خدمات، أو مستقلاً، فإن عدم امتلاك موقع يضمن لك خسارة عملاء محتملين.",
        },
      },
      {
        question: {
          en: "What is SEO and is it important for my business?",
          ar: "إيه هو الـ SEO وليه شغلي محتاجه؟",
        },
        answer: {
          en: "SEO stands for Search Engine Optimization. It's the process of making your website easier for Google to find, understand, and rank when people search for your services. Without SEO, your website may exist but remain invisible in search results. With proper SEO, your business can appear when potential customers in your area are actively looking for what you offer. Every website we build includes a technical SEO foundation as standard, and we offer an advanced SEO Content Package as an add-on for businesses that want to compete for specific search terms.",
          ar: "SEO هو اختصار لـ 'تحسين محركات البحث'. وهي عملية تهدف لجعل موقعك أسهل في الاكتشاف والفهم والظهور في المراتب الأولى على جوجل عندما يبحث الناس عن خدماتك. بدون SEO، قد يتواجد موقعك تقنياً لكنه سيظل غير مرئي في نتائج البحث. مع التهيئة الصحيحة، يظهر نشاطك للعملاء الذين يبحثون فعلياً عما تقدمه. كل موقع نبنيه يتضمن أساساً تقنياً للـ SEO كمعيار قياسي، ونوفر تطوير محتوى SEO متقدمة كإضافة للشركات التي ترغب في المنافسة على كلمات بحث محددة.",
        },
      },
      {
        question: {
          en: "What is the difference between SEO and paid advertising?",
          ar: "إيه الفرق بين تحسين محركات البحث (SEO) والإعلانات المدفوعة؟",
        },
        answer: {
          en: "SEO (Search Engine Optimization) focuses on improving your website to rank organically in search engine results over time, driving sustainable, free traffic. Paid advertising, such as Google Ads, involves paying for ad placements to appear immediately at the top of search results. In short, SEO is a long-term strategy for organic growth, while paid ads offer instant visibility that stops as soon as your budget runs out.",
          ar: "يركز تحسين محركات البحث (SEO) على تهيئة الموقع للظهور بشكل طبيعي ومجاني في نتائج البحث بمرور الوقت، مما يجلب زيارات مستدامة. أما الإعلانات المدفوعة، مثل إعلانات جوجل، فتتضمن الدفع مقابل ظهور إعلاناتك فوراً في أعلى نتائج البحث. باختصار، الـ SEO هو استراتيجية طويلة المدى للنمو الطبيعي، بينما توفر الإعلانات المدفوعة ظهوراً فورياً يتوقف بمجرد انتهاء الميزانية.",
        },
      },
      {
        question: {
          en: "Can I build my own website instead of hiring someone?",
          ar: "ينفع أعمل موقعي بنفسي بدل ما أجيب حد متخصص؟",
        },
        answer: {
          en: "You definitely can. Tools like WordPress, Wix and Squarespace let you build a basic website yourself. However, these platforms come with trade-offs like limited control over performance and customization, slower load times, and weaker SEO, plus the fact that it's very time consuming for a beginner to get the hang of these tools. A custom-coded website is custom-built by a professional with 'real' code and advanced technical knowledge. This results in faster load times, better ranking on Google and more. Working with a professional typically pays for itself through the customers it brings in.",
          ar: "يمكنك ذلك بالفعل عبر أدوات مثل Wix. ومع ذلك، تأتي هذه المنصات مع تنازلات مثل التحكم المحدود في الأداء، وبطء سرعة التحميل، وضعف الـ SEO، بالإضافة إلى تصاميم تتشابه مع آلاف المواقع الأخرى. أما الموقع المبرمج خصيصاً فيُبنى ليلبي احتياجات عملك بدقة، ويتميز بسرعة أكبر وظهور أفضل على جوجل. إذا كان حضورك الرقمي محورياً لنموك، فإن الاستعانة بمتخصص ستعوض تكلفتها سريعاً من خلال العملاء الجدد الذين سيجذبهم الموقع.",
        },
      },

      // ===== MID-FUNNEL (Research) =====
      {
        question: {
          en: "What is the difference between a landing page and a website?",
          ar: "إيه الفرق بين صفحة الهبوط والموقع الإلكتروني الكامل؟",
        },
        answer: {
          en: "These terms are used interchangeably, they are essentially the same thing, however, from a technical standpoint, a landing page is a single page website designed to present your business and drive one clear action like a booking, call or WhatsApp message. A business website includes additional pages and goes deeper with more detailed content. The right choice depends on where your business is and what you need right now. Landing pages are usually best suited for startups and smaller businesses, while standard websites are usually best suited for more established businesses who have a lot to show and tell.",
          ar: "صفحة الهبوط هي صفحة واحدة بهيكل مركز (عادة من 4-6 أقسام)، مصممة لعرض نشاطك ودفع الزائر لاتخاذ إجراء واحد واضح مثل الاتصال أو المراسلة عبر واتساب. أما الموقع الكامل فيتوسع ليشمل أقساماً وصفحات أكثر تفصيلاً. كلاهما مبرمج خصيصاً، ويعتمد الاختيار الأنسب على مرحلة عملك واحتياجاتك الحالية، وهو ما نساعدك في تحديده خلال استشارتنا.",
        },
      },
      {
        question: {
          en: "What's the difference between WordPress and custom code?",
          ar: "إيه الفرق بين ووردبريس (WordPress) والكود المخصص؟",
        },
        answer: {
          en: "WordPress and similar online builders are faster to build and launch a website, but they're general-purpose tools built for everyone, which means they carry a lot of extra weight. Outdated Plugins and bloated themes are just some of the factors that can slow a Wordpress website down, make it more vulnerable to hacking, and hurt your Google rankings since page speed is a direct ranking factor. Custom code is built specifically for your needs by a professional so it does not suffer from these issues.",
          ar: "ووردبريس والمنصات الجاهزة أسرع في الإطلاق، لكنها أدوات عامة مصممة للجميع، مما يعني أنها تحمل الكثير من الأكواد الزائدة. الإضافات والقوالب قد تبطئ الموقع وتجعله أكثر عرضة للاختراق وتضر بترتيبك على جوجل، حيث أن سرعة الصفحة عامل تصنيف أساسي. أما الكود المخصص فيُبنى خصيصاً لاحتياجاتك، مما يجعله أسرع، وأكثر أماناً، وأفضل أداءً في نتائج البحث.",
        },
      },
      {
        question: {
          en: "How much does a website cost in Egypt?",
          ar: "ايه أسعار تصميم المواقع في مصر؟",
        },
        answer: {
          en: "The reality of the tech industry is that there is no single average cost for a website, a website can start anywhere from 6000 EGP and reach much, much higher costs. Every website is priced according to its scope and complexity. Price also varies greatly based on what technology was used to build the website. A simple custom-coded landing page with just the basic features starts from anywhere around 6,000 EGP, the price increases as more content, sections and features are added. Multi-page websites and e-commerce websites can reach much higher costs, with e-commerce being the most expensive by far as it is the most complex to build. We can assure you our prices are affordable compared to the local market and we provide a clear, detailed price quote after our first consultation.",
          ar: "الحقيقة في مجال التكنولوجيا هي أنه لا يوجد تكلفة متوسطة ثابتة للموقع الإلكتروني؛ فتكلفة الموقع قد تبدأ من 6,000 جنيه مصري وتصل إلى مبالغ أعلى بكثير. يتم تسعير كل موقع بناءً على حجمه ومدى تعقيده، كما تختلف التكلفة بشكل كبير حسب التقنية المستخدمة في بنائه. تبدأ تكلفة صفحة الهبوط البسيطة والمبرمجة من الصفر (بالميزات الأساسية فقط) من حوالي 6,000 جنيه، وتزداد التكلفة مع إضافة المزيد من المحتوى والأقسام والخصائص. أما المواقع متعددة الصفحات والمتاجر الإلكترونية فتصل تكلفتها إلى مبالغ أعلى بكثير، وتُعد المتاجر الإلكترونية هي الأغلى على الإطلاق نظراً لتعقيد برمجتها. ومع ذلك، نضمن لك أن أسعارنا تنافسية ومناسبة مقارنة بالسوق المحلي، ونقدم لك عرض سعر واضحاً ومفصلاً بعد جلستنا الاستشارية الأولى.",
        },
      },
      {
        question: {
          en: "What technologies do you use to build websites?",
          ar: "بتستخدموا تقنيات إيه في بناء المواقع؟",
        },
        answer: {
          en: "We build every website from scratch using custom code. For most projects we use clean, lightweight code that loads extremely fast. For larger or more complex websites, we use a modern framework called Next.js that handles advanced functionality and performance at scale. The result is the same either way: a faster, more secure, and better-performing website.",
          ar: "نحن نبني كل موقع من الصفر باستخدام الكود المخصص. في أغلب المشاريع، نستخدم أكواداً تضمن سرعة تحميل فائقة. أما للمواقع الأكبر أو الأكثر تعقيداً، فنستخدم إطار عمل حديث يسمى Next.js للتعامل مع الوظائف المتقدمة والأداء العالي. النتيجة في كلتا الحالتين واحدة: موقع أسرع، وأكثر أماناً، وأفضل أداءً.",
        },
      },

      {
        question: {
          en: "Will my website work on mobile phones?",
          ar: "هل الموقع هيشتغل كويس على الموبايل؟",
        },
        answer: {
          en: "Absolutely. Every website we build is fully responsive, meaning it automatically adapts to look and work perfectly on any screen — phone, tablet, or desktop. This is not optional for us, it's built into everything we do. Given that most people in Egypt browse on mobile, this is something we take very seriously.",
          ar: "بكل تأكيد. كل موقع نبنيه يكون متجاوباً بالكامل، مما يعني أنه يتكيف تلقائياً ليعمل بمثالية على أي شاشة، سواء كانت هاتفاً أو تابلت أو حاسوباً. هذا ليس خياراً إضافياً بل هو جزء أساسي من عملنا، خاصة وأن أغلب المستخدمين في مصر يتصفحون عبر الهواتف.",
        },
      },
      {
        question: {
          en: "How long does it take for a new website to rank on Google?",
          ar: "الموقع الجديد بياخد وقت قد إيه عشان يظهر في بحث جوجل؟",
        },
        answer: {
          en: "Google may index your website within days, but ranking for competitive keywords in Cairo usually takes 3 to 6 months. We optimize your website speed, structure, and content from day one to improve your visibility in local search results as efficiently as possible.",
          ar: "قد يقوم جوجل بفهرسة موقعك خلال أيام، ولكن الظهور في المراتب الأولى للكلمات التنافسية يستغرق عادة من 3 إلى 6 أشهر. نحن نعمل على تحسين سرعة الموقع وهيكليته ومحتواه من اليوم الأول لتعزيز ظهورك في نتائج البحث المحلية بأقصى كفاءة ممكنة.",
        },
      },

      // ===== DECISION STAGE (Ready to act) =====
      {
        question: {
          en: "How long does it take to build a website?",
          ar: "بناء الموقع بياخد وقت قد إيه؟",
        },
        answer: {
          en: "The timeline depends on the scope of the project and the technology used. With custom-code, a simple landing page is typically ready within 1 to 2 weeks. A more advanced website with more content and custom features can take 2 to 4 weeks. More complex e-commerce sites can take slightly longer.",
          ar: "يعتمد ذلك على حجم المشروع. صفحة الهبوط البسيطة (4-5 أقسام) تستغرق عادة من 5 إلى 7 أيام عمل بمجرد استلام المحتوى والصور والهوية البصرية. أما المواقع الأكثر تقدماً فقد تستغرق من أسبوع إلى أسبوعين. العامل الأكبر المؤثر على الجدول الزمني هو سرعة توفير المحتوى من جانبكم.",
        },
      },
      {
        question: {
          en: "What do I need to provide to get started?",
          ar: "إيه اللي محتاج أوفره عشان نبدأ؟",
        },
        answer: {
          en: "Your logo, a description of your services, and any photos you have. If your content needs shaping or organizing, that's included in every build. If you don't have any written content at all, we offer full copywriting as a paid add-on. We can also help source high-quality imagery if needed. The goal is to make the process as easy as possible on your end.",
          ar: "كل ما نحتاجه هو شعارك، ووصف لخدماتك، وأي صور متوفرة لديك. إذا كان المحتوى يحتاج إلى تنظيم، فهذا مشمول في الخدمة. أما إذا لم يتوفر لديك محتوى مكتوب، فنحن نقدم خدمة كتابة المحتوى كإضافة مدفوعة. كما يمكننا المساعدة في توفير صور عالية الجودة. هدفنا هو جعل العملية سهلة وسلسة قدر الإمكان بالنسبة لك.",
        },
      },
      {
        question: {
          en: "Do your websites support both English and Arabic?",
          ar: "هل الموقع بيدعم عربي وإنجليزي؟",
        },
        answer: {
          en: "We build fully bilingual websites that support both Arabic and English, including proper right-to-left (RTL) layout for Arabic. Having a bilingual site ensures your business gets found on Google when users search relevant terms in both languages which is essential if you are targeting both Arabic and English speakers.",
          ar: "نعم، نحن نبني مواقع ثنائية اللغة تدعم العربية والإنجليزية بالكامل، مع تنسيق صحيح من اليمين إلى اليسار (RTL) للنسخة العربية. التنقل بين اللغتين سلس للزوار، وكلا النسختين مهيأتان للـ SEO لضمان ظهور نشاطك باللغتين على جوجل. دعم اللغتين متاح كإضافة مدفوعة.",
        },
      },
      {
        question: {
          en: "Will my website be optimized for mobile and SEO natively?",
          ar: "هل سيكون موقعي مهيأً للهواتف المحمولة ومحركات البحث (SEO) بشكل أساسي؟",
        },
        answer: {
          en: "Yes, absolutely. Every website we build is fully responsive, ensuring it performs flawlessly on all mobile devices and screen sizes. Additionally, we integrate fundamental on-page SEO best practices natively into the development process—such as fast loading speeds, clean code, optimized site architecture to give your site a strong foundation for search engine visibility right from launch.",
          ar: "نعم، بالتأكيد. كل موقع نقوم بتطويره يكون متجاوباً بالكامل لضمان عمله ومظهره بشكل مثالي على جميع الهواتف المحمولة ومقاسات الشاشات. بالإضافة إلى ذلك، ندمج أفضل ممارسات تحسين محركات البحث (SEO) الأساسية أثناء عملية التطوير — مثل سرعة التحميل، والكود النظيف، وبنية الموقع المحسنة، والعلامات الوصفية الصحيحة — لنمنح موقعك أساساً قوياً للظهور في نتائج البحث منذ لحظة الإطلاق.",
        },
      },
      {
        question: {
          en: "What if I don't have a logo or brand identity yet?",
          ar: "أعمل إيه لو لسه معنديش لوجو أو هوية بصرية؟",
        },
        answer: {
          en: "Not a problem at all. We can work with what you have, even if it's just a name and a general idea of your business. If you need a logo or brand identity designed, our designer can handle that as a separate service before we start building your website.",
          ar: "لا توجد مشكلة على الإطلاق. يمكننا العمل بما هو متاح لديك، حتى لو كان مجرد اسم وفكرة عامة. إذا كنت بحاجة لتصميم شعار أو هوية بصرية، يمكن لمصممنا تولي ذلك كخدمة منفصلة قبل البدء في بناء الموقع.",
        },
      },
      {
        question: {
          en: "How many revisions do I get?",
          ar: "متاح ليا كام تعديل؟",
        },
        answer: {
          en: "We include one revision round during the build. Because we align on the design direction before development begins, one round is typically all that's needed. Any revisions beyond that are handled as small paid adjustments.",
          ar: "نحن نوفر جولة واحدة من التعديلات خلال مرحلة البناء. وبما أننا نتفق على توجه التصميم قبل بدء البرمجة، فإن جولة واحدة عادة ما تكون كافية. أي تعديلات إضافية بعد ذلك يتم التعامل معها كتحسينات بسيطة مدفوعة الأجر.",
        },
      },
      {
        question: {
          en: "How does the payment process go?",
          ar: "نظام الدفع بيمشي إزاي؟",
        },
        answer: {
          en: "Our payment system is installment-based, we split the payment into three parts, 25% upfront to begin the project, 50% upon design approval before development begins, and the remaining 25% upon launch. This keeps things clear and safe for both sides at every stage.",
          ar: "نظام الدفع لدينا يعتمد على الأقساط؛ حيث نقسم المبلغ إلى ثلاث مراحل: 25% مقدم لتبدأ العملية، 50% عند الموافقة على التصميم وقبل البدء في البرمجة، والـ 25% المتبقية عند الإطلاق. هذا يضمن الوضوح والأمان للطرفين في كل مرحلة.",
        },
      },
      {
        question: {
          en: "Will I receive a written agreement before we start?",
          ar: "هاخد اتفاق مكتوب قبل ما نبدأ؟",
        },
        answer: {
          en: "Yes. Before any payment is made, you receive a detailed proposal that outlines the full project scope, timeline, pricing, and payment schedule.",
          ar: "قبل أي دفعة، تحصل على عرض تفصيلي يوضح نطاق المشروع بالكامل، الجدول الزمني، التكلفة، وجدول الدفعات.",
        },
      },
      {
        question: {
          en: "What happens if I want to cancel the project?",
          ar: "إيه اللي يحصل لو حبيت ألغي المشروع؟",
        },
        answer: {
          en: "The 25% upfront payment is non-refundable, as it covers the time and resources committed to starting your project. If you cancel before the design phase is complete, no further payments are due. If you've already approved the design and paid the 50% development deposit, that payment is also non-refundable since development will have already begun. We keep things fair and clearly outlined in your proposal before any money changes hands.",
          ar: "الدفعة المقدمة بنسبة ٢٥٪ غير قابلة للاسترداد، لأنها تغطي الوقت والموارد المخصصة لبدء مشروعك. إذا ألغيت قبل اكتمال مرحلة التصميم، لا تُستحق أي دفعات إضافية. أما إذا كنت قد وافقت على التصميم ودفعت ٥٠٪ لبدء التطوير، فهذه الدفعة أيضًا غير قابلة للاسترداد لأن العمل على التطوير يكون قد بدأ فعلاً. كل هذا يكون موضحًا بالتفصيل في العرض المقدم قبل أي دفعة.",
        },
      },

      // ===== POST-LAUNCH (Retention) =====
      {
        question: {
          en: "Can I update my website's content myself?",
          ar: "ينفع أحدث محتوى الموقع بنفسي؟",
        },
        answer: {
          en: "Editing it yourself requires a content management dashboard, which is available as a paid add-on. That said, we include 3 free minor content updates every month. Things like swapping an image, updating text, or adjusting details, so with us, a dashboard system is not necessary unless you plan to change content on the website very frequently.",
          ar: "التعديل الذاتي يتطلب لوحة تحكم لإدارة المحتوى، وهي متاحة كإضافة مدفوعة. ومع ذلك، نحن نوفر 3 تحديثات بسيطة مجانية شهرياً (مثل تغيير صورة أو تعديل نص)، لذا لن تحتاج لنظام لوحة التحكم إلا إذا كنت تخطط لتغيير المحتوى بشكل متكرر جداً.",
        },
      },
      {
        question: {
          en: "Can I add new sections or features to my website later?",
          ar: "ينفع أزود أقسام أو ميزات جديدة للموقع بعدين؟",
        },
        answer: {
          en: "Yes. If your business grows and you want to add a new section, a new feature, or expand the site, we can handle that as additional paid work. Because we are the ones that built it and it is our code, making changes is straightforward.",
          ar: "موقعك قابل للتوسع دائماً. إذا نما نشاطك وأردت إضافة أقسام أو ميزات جديدة، يمكننا القيام بذلك كعمل إضافي مدفوع. ولأننا نحن من قمنا ببرمجة الموقع، فإن إجراء التعديلات يكون عملية مباشرة وسهلة.",
        },
      },
      {
        question: {
          en: "Can you redesign my existing website?",
          ar: "ينفع تعيدوا تصميم موقعي الحالي؟",
        },
        answer: {
          en: "It depends on how your current website was built. If it was built with custom code, we can redesign and improve it. We'll need access to the existing files and hosting settings, either from you or your previous developer. If your website is built on WordPress, we can't work with it directly, but we can build you a brand new custom-coded website designed to be faster, more secure, and better optimized for search engines.",
          ar: "يعتمد ذلك على كيفية بناء موقعك الحالي؛ فإذا كان مبرمجاً بكود مخصص، يمكننا إعادة تصميمه وتحسينه. أما إذا كان مبنياً على ووردبريس، فلا يمكننا العمل عليه مباشرة، ولكن يمكننا بناء موقع جديد تماماً بكود مخصص ليكون أسرع وأكثر أماناً وأفضل في نتائج البحث.",
        },
      },
      {
        question: {
          en: "Will my business show up on Google Maps?",
          ar: "هل شغلي هيظهر على خرايط جوجل؟",
        },
        answer: {
          en: "A well-built website and a Google Business Profile work together to strengthen your local presence. We structure every website so Google can clearly recognize your business, its location, and its services. If you don't have a Google Business Profile yet, we offer full setup as an add-on to help you appear on Google Maps and local search results.",
          ar: "الموقع الإلكتروني المتقن وحساب 'جوجل لنشاطي التجاري' يعملان معاً لتعزيز حضورك المحلي. نحن نهيئ الموقع ليتعرف جوجل بوضوح على موقعك وخدماتك. وإذا لم تكن تملك حساباً على خرائط جوجل بعد، فنحن نقدم خدمة إعداده بالكامل كإضافة لمساعدتك في الظهور المحلي.",
        },
      },
      {
        question: {
          en: "How much does it cost to build an e-commerce store in Egypt?",
          ar: "بكام تكلفة انشاء متجر الكتروني في مصر؟",
        },
        answer: {
          en: "A professional e-commerce store starts from around 12,000 EGP. This includes setting up your product catalog, integrating payment methods like InstaPay and Cash on Delivery (COD), and ensuring a seamless checkout experience. Since e-commerce requires more complex logic, database management, and security than standard websites, it carries a higher starting price to ensure your store is reliable and ready for sales.",
          ar: "تبدأ تكلفة إنشاء متجر إلكتروني احترافي من تقريباً 12,000 جنيه مصري لأبسط متجر ممكن. يشمل ذلك إعداد قائمة المنتجات، ودمج طرق دفع سهلة مثل إنستاباي (InstaPay) والدفع عند الاستلام (COD)، مع ضمان تجربة شراء سلسة لعملائك. ولأن المتاجر الإلكترونية تتطلب برمجة أكثر تعقيداً وإدارة لقواعد البيانات وتأميناً مكثفاً مقارنة بالمواقع العادية، فإنها تبدأ بتكلفة أعلى لضمان استقرار المتجر وجاهزيته للبيع.",
        },
      },
      {
        question: {
          en: "Can I sell products on my website?",
          ar: "ينفع أبيع منتجات من خلال موقعي؟",
        },
        answer: {
          en: "Yes, we currently offer simple e-commerce stores. To keep things simple and efficient, we remove the sign up process so customers don't have to waste time creating an account. We integrate straightforward payment methods such as InstaPay and Cash on Delivery (COD), ensuring a seamless buying experience for your customers.",
          ar: "نحن نقدم خدمات بناء متاجر إلكترونية صغيرة. نبني منصات لا تتطلب إنشاء حسابات للمستخدمين أو بوابات دفع بنكية معقدة، إلا أننا نصمم متاجر إلكترونية مبسطة وفعالة لعرض وبيع منتجاتك عبر دمج طرق الدفع المباشرة مثل إنستاباي (InstaPay) والدفع عند الاستلام (COD)، مما يوفر تجربة شراء سلسة ومريحة لعملائك.",
        },
      },

      {
        question: {
          en: "What is hosting and deployment?",
          ar: "ما هي الاستضافة (Hosting) والنشر (Deployment)؟",
        },
        answer: {
          en: "Think of hosting as renting a space on the internet where your website's files live. Without it, your website has no place to exist. Deployment is simply the final step of moving your finished website code into that rented space and opening the doors so anyone in the world can visit it.",
          ar: "فكر في الاستضافة كأنك تستأجر متجراً على الإنترنت لتعيش فيه ملفات موقعك. بدونها، لن يكون لموقعك مكان. أما النشر (Deployment)، فهو ببساطة الخطوة الأخيرة لنقل موقعك الجاهز إلى هذه المساحة المستأجرة وفتح الأبواب ليتمكن أي شخص في العالم من زيارته.",
        },
      },
      {
        question: {
          en: "What is a domain?",
          ar: "يعنى إيه دومين (Domain)؟",
        },
        answer: {
          en: "A domain is your website's address on the internet, like 'yourcompany.com'. If hosting is the physical store where your website lives, the domain is the street address you give to your customers so they can easily find you. You choose the domain based on availability of the name you want.",
          ar: "النطاق (Domain) هو عنوان موقعك على الإنترنت، مثل 'yourcompany.com'. إذا كانت الاستضافة هي المتجر الفعلي الذي يعيش فيه موقعك، فإن النطاق هو عنوان الشارع الذي تعطيه لعملائك ليتمكنوا من العثور عليك بسهولة بدلاً من حفظ سلسلة طويلة من الأرقام.",
        },
      },
      {
        question: {
          en: "What is the monthly website development cost with maintenance?",
          ar: "كام التكلفة الشهرية لتطوير الموقع وصيانته؟",
        },
        answer: {
          en: "In Egypt, standard annual maintenance packages for small to mid-sized websites start from around 6000 EGP (500 EGP/month) and increases based on server needs. This covers essential services like hosting, security patches, backups, and performance optimization.",
          ar: "في مصر، تبدأ باقات الصيانة السنوية للمواقع الصغيرة والمتوسطة من حوالي 6,000 جنيه مصري (500 جنيه شهرياً) وتزداد بحسب احتياجات الخادم. وتشمل خدمات أساسية مثل الاستضافة، التحديثات الأمنية، النسخ الاحتياطي، وتحسين الأداء.",
        },
      },
      {
        question: {
          en: "Do you provide technical support after launching the website?",
          ar: "بتقدموا دعم فني بعد إطلاق الموقع؟",
        },
        answer: {
          en: "Yes. If anything ever breaks or stops working on your website, we fix it free of charge, for life. We also include 3 free minor content updates every month, things like swapping an image, updating text, or adjusting details. Any changes beyond that, or new features, are handled as paid work.",
          ar: "إذا حدث أي خلل فني في موقعك، فنحن نلتزم بإصلاحه مجاناً مدى الحياة. كما نوفر 3 تحديثات بسيطة للمحتوى شهرياً مجاناً. أي تغييرات جذرية أو ميزات جديدة تضاف لاحقاً يتم التعامل معها كعمل مدفوع.",
        },
      },
      {
        question: {
          en: "Do you work with businesses outside Cairo?",
          ar: "بتشتغلوا مع شركات بره القاهرة؟",
        },
        answer: {
          en: "Yes. Everything we do is remote, so location is never a barrier. Wherever you're based, we can build your website.",
          ar: "نحن نعمل عن بُعد بالكامل، لذا لا يشكل الموقع الجغرافي أي عائق. أينما كان مقر عملك، يمكننا بناء موقعك الإلكتروني باحترافية.",
        },
      },
      // ===== POST-LAUNCH =====
      {
        question: {
          en: "Do you help with content for social media too?",
          ar: "بتساعدوا في محتوى السوشيال ميديا كمان؟",
        },
        answer: {
          en: "Our focus is on building and optimizing your website. We don't offer social media management or content creation for social platforms. That said, a strong website gives you a professional link to share across all your social channels, which makes every post more credible and more likely to convert.",
          ar: "تركيزنا على بناء وتحسين موقعك الإلكتروني. لا نقدم إدارة حسابات السوشيال ميديا أو إنشاء محتوى لها. مع ذلك، الموقع الاحترافي يمنحك رابطًا قويًا تشاركه عبر جميع قنواتك، مما يجعل كل منشور أكثر مصداقية وأكثر قدرة على تحويل المتابعين إلى عملاء.",
        },
      },
    ],
  },

  // Contact section
  contactSection: {
    heading: {
      en: "Start With a Free Consultation",
      ar: "ابدأ خطوات إنشاء موقعك",
    },
    subtitle: {
      en: "Share a few details and we'll reach out to give you a free consultation. No commitments, no expenses.",
      ar: "شاركنا بعض التفاصيل وسنتواصل معك لتقديم استشارة مجانية، بدون أي التزامات أو تكاليف.",
    },
  },

  // Contact form
  form: {
    legend: { en: "Contact information", ar: "معلومات التواصل" },
    name: { en: "Name", ar: "الاسم" },
    namePlaceholder: { en: "Your name", ar: "اسمك" },
    phone: { en: "Number", ar: "الهاتف" },
    phonePlaceholder: { en: "01XXXXXXXXX", ar: "01XXXXXXXXX" },
    industry: { en: "Your business", ar: "ما هو مجال عملك؟" },
    industryPlaceholder: { en: "Select your industry", ar: "اختر مجالك" },
    contactMethod: {
      en: "Preferred contact method",
      ar: "طريقة التواصل المفضلة",
    },
    whatsapp: { en: "WhatsApp", ar: "واتساب" },
    phoneCall: { en: "Phone Call", ar: "مكالمة" },
    email: { en: "Email", ar: "الإيميل" },
    emailAddress: { en: "Email", ar: "البريد الإلكتروني" },
    emailPlaceholder: { en: "your@email.com", ar: "your@email.com" },
    bestDate: { en: "Preferred date", ar: "التاريخ المفضل" },
    bestTime: { en: "Best time to call", ar: "أفضل وقت للاتصال" },
    bestTimePlaceholder: { en: "Select a time", ar: "اختر الوقت" },
    message: { en: "Message", ar: "رسالة" },
    messageOptional: { en: "optional", ar: "اختياري" },
    messagePlaceholder: {
      en: "Describe what you need from your website..",
      ar: "أخبرنا باستفسارك...",
    },
    submit: { en: "Send My Request", ar: "أرسل طلبي" },
    sending: { en: "Sending...", ar: "جاري الإرسال..." },
    success: {
      en: "Thank you. We have received your request.",
      ar: "شكراً. لقد إستلمنا طلبك!",
    },
    errorRateLimit: {
      en: "Wait a few minutes to send another request.",
      ar: "يرجى الانتظار بضع دقائق قبل إرسال رسالة أخرى.",
    },
    errorGeneric: {
      en: "Something went wrong. Please try again.",
      ar: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    },
  },

  // Accessibility
  a11y: {
    openMenu: { en: "Open menu", ar: "فتح القائمة" },
    closeMenu: { en: "Close menu", ar: "إغلاق القائمة" },
    desktopNav: { en: "Desktop navigation", ar: "قائمة سطح المكتب" },
    mobileNav: { en: "Mobile navigation", ar: "قائمة الهاتف" },
    socialLinks: { en: "Social links", ar: "روابط التواصل" },
    skipToContent: { en: "Skip to main content", ar: "تخطى إلى المحتوى" },
    contactForm: { en: "Contact form", ar: "نموذج التواصل" },
    screenshotOf: {
      en: "Website design by SM Web Studio –",
      ar: "تصميم موقع من SM Web Studio –",
    },
  },

  // Language toggle
  langToggle: {
    en: "EN",
    ar: "عربي",
  },
} as const;

export default translations;
