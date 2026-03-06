export type Lang = "en" | "ar";

const translations = {
  // Navigation
  nav: {
    services: { en: "What's Included", ar: "المميزات المضمنة" },
    projects: { en: "Our Work", ar: "سابقة الأعمال" },
    howItWorks: { en: "How It Works", ar: "خطوات العمل" },
    faq: { en: "FAQ", ar: "الأسئلة الشائعة" },
    contact: { en: "Get Started", ar: "ابدأ الآن" },
  },

  // Hero
  hero: {
    name: {
      en: ["Be Found.", "Be Trusted.", "Be Chosen."],
      ar: ["تصدّر البحث.", "اكسب الثقة.", "اجذب العملاء."],
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
      en: "Website Design Company in Cairo",
      ar: "شركة تصميم مواقع في القاهرة",
    },
    subheading: {
      en: "Custom web design and search visibility that drive real growth for businesses in Cairo, Egypt and across the region.",
      ar: "تصميم مواقع مخصصة وتحسين الظهور في محركات البحث لتحقيق نمو حقيقي لأصحاب الأعمال في القاهرة، مصر، وخارجها.",
    },
  },

  // Services section
  servicesSection: {
    heading: {
      en: "What's Included",
      ar: "المميزات المضمنة",
    },
    subtitle: {
      en: "Features included in every website at no extra cost",
      ar: "كل مواقعنا تأتي بهذه المميزات دون أي تكاليف إضافية",
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
        en: "Hosting & Deployment",
        ar: "استضافة ونشر الموقع",
        desc: {
          en: "We handle all the technical details. Your website goes live and stays live with no recurring fees.",
          ar: "نتولى جميع التفاصيل التقنية. موقعك يعمل باستمرار دون أي رسوم شهرية أو تكاليف إضافية.",
        },
      },
      {
        en: "Lifetime Guarantee",
        ar: "ضمان مدى الحياة",
        desc: {
          en: "If anything ever stops working, we fix it free of charge. No invoices, expiry dates or hidden fees.",
          ar: "في حال توقف أي شيء عن العمل، نتولى إصلاح الموقع مجاناً دون أي رسوم إضافية مدى الحياة.",
        },
      },
      {
        en: "Fast Loading",
        ar: "سرعة تحميل عالية",
        desc: {
          en: "Slow websites lose customers. That's why we optimize yours to load in under two seconds.",
          ar: "المواقع البطيئة تُفقدك عملائك. لهذا نحرص على تحميل موقعك في أقل من ثانيتين.",
        },
      },
      {
        en: "SEO Foundation",
        ar: "أسس محركات البحث",
        desc: {
          en: "Your site is built to rank on Google so customers find you before they find your competitors.",
          ar: "موقعك مهيَّأ لمحركات البحث منذ اليوم الأول، لتظهر في نتائج جوجل قبل منافسيك.",
        },
      },
      {
        en: "Fully Responsive",
        ar: "توافق مع جميع الأجهزة",
        desc: {
          en: "Your website will work perfectly and look great on all devices. Phone, tablet, or laptop.",
          ar: "موقعك يعمل بشكل مثالي ويظهر باحترافية على جميع الأجهزة. بما يشمل موبايل، تابلت، أو لابتوب.",
        },
      },
      {
        en: "Contact Integration",
        ar: "ربط جهات الاتصال",
        desc: {
          en: "WhatsApp and social media links so customers can reach and interact with you instantly.",
          ar: "نربط موقعك بالواتساب وجميع وسائل التواصل حتى يصل إليك العملاء بضغطة واحدة.",
        },
      },
      {
        en: "Content Refinement",
        ar: "صياغة وتحرير المحتوى",
        desc: {
          en: "You give us a rough draft of the content you want included. We turn it into clean, professional copy.",
          ar: "زوّدنا بالمعلومات الأساسية وسنحوّلها إلى محتوى احترافي يعكس هوية نشاطك.",
        },
      },
      {
        en: "3 Updates per Month",
        ar: "تعديلات شهرية مجانية",
        desc: {
          en: "Request up to three basic content changes a month at no charge. Text, images, prices, and more.",
          ar: "يمكنك طلب ثلاث تعديلات شهرياً على المحتوى مجاناً. نصوص أو صور أو أسعار وغير ذلك.",
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
      en: "The quality and style we bring to every project",
      ar: "إطلالة على جودة التصميم والأسلوب في كل مشروع",
    },
  },
  // Project data
  // Project data
  projectData: {
    skyway: {
      title: {
        en: "Sky Way Travel - Travel Agency",
        ar: "شركة سكاي واي ترافل للسياحة",
      },
      description: {
        en: "Sky Way Travel came to us needing a website that matched the quality of their packages. The result was a clean, professional website that gives their clients the extra boost of confidence to make the booking.",
        ar: "تواصلت شركة سكاي واي ترافل للسياحة معنا لبناء موقع إلكتروني يعكس مستوى خدماتهم. النتيجة كانت موقع احترافي يمنح عملائهم الثقة ويدفعهم للحجز المباشر.",
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
        en: "Built for wedding photographers, planners, and makeup artists who need more than an Instagram or Facebook page. A website that showcases your work in an elegant photo gallery and converts browsers into clients.",
        ar: "مصمم لمصوري الأفراح والمخططين وخبراء التجميل الذين يحتاجون أكثر من صفحة فيسبوك او إنستغرام. موقع يعرض أعمالك ويحوّل الزوار إلى عملاء.",
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
        en: "A landing page built for gyms and fitness centers that want to turn online visitors into paying members. Highlights facilities, builds trust with testimonials, and makes it effortless for visitors to take the next step.",
        ar: "صفحة هبوط للنوادي الرياضية التي تسعى لتحويل زوار الإنترنت إلى مشتركين فعليين. مصممة لعرض الخدمات، بالأضافة لزيادة وتسهيل عملية الاشتراك.",
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
    heading: { en: "How It Works", ar: "خطوات العمل" },
    subtitle: {
      en: "A clear, straightforward process from start to finish",
      ar: "عملية بسيطة ومنظمة من البداية للنهاية",
    },
    steps: {
      discovery: {
        title: {
          en: "Communication",
          ar: "التنسيق",
        },
        description: {
          en: "We connect to understand your business goals and target audience, then define the website strategy, timeline, and transparent pricing.",
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
    items: [
      {
        question: {
          en: "How much does a website cost?",
          ar: "تكلفة الموقع كام؟",
        },
        answer: {
          en: "The cost depends on your business goals. Here at SM Web Studio we use custom code for all our websites. Therefore, a simple landing page with 4–5 sections starts from around 4,000 EGP, while a full single-page website with more sections, deeper detail, and advanced features can reach 30,000 EGP. For more complex projects, additional pages are available as needed. We provide clear pricing with no hidden fees after our first consultation.",
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
          en: "My business is already on Facebook — do I still need a website?",
          ar: "عندي صفحة على فيسبوك، مازالت محتاج موقع؟",
        },
        answer: {
          en: "A Facebook page is a great starting point, but it has real limitations. You don't own it — Facebook can restrict your reach, change its algorithm, or suspend your page at any time. A website is yours completely. It also lets you show up on Google when people search for your services, which a Facebook page simply can't do. Together, they're much stronger than either one alone.",
          ar: "صفحة الفيسبوك نقطة بداية كويسة، بس ليها حدود حقيقية. إنت مش مالكها — فيسبوك يقدر يقلل وصولك، يغير الخوارزمية، أو يوقف صفحتك في أي وقت. الموقع ملكك بالكامل. كمان بيخليك تظهر في جوجل لما الناس تدور على خدماتك، وده حاجة صفحة الفيسبوك مش بتعملها. مع بعض بيكونوا أقوى بكتير من أي واحد لوحده.",
        },
      },
      {
        question: {
          en: "How will a website help my business more than a Facebook or Instagram page?",
          ar: "إيه اللي هيقدمهولي الموقع أكتر من صفحة فيسبوك أو إنستجرام؟",
        },
        answer: {
          en: "Social media is rented space — your website is your owned digital headquarters. A website builds professional credibility that social pages can't match, lets you appear on Google when people are actively searching for your services, and gives you full control over how your brand is presented. On a competitor's Facebook page, their ads can appear right next to your content. That never happens on your own website.",
          ar: "السوشيال ميديا أرض مستأجرة — الموقع هو مقرك الرقمي الرسمي المملوك ليك. الموقع بيبني مصداقية احترافية مش قادر السوشيال ميديا يحققها، وبيخليك تظهر في جوجل لما الناس بتدور فعلاً على خدماتك، وبيديك تحكم كامل في شكل علامتك التجارية. على فيسبوك، إعلانات المنافسين ممكن تظهر جنب محتواك مباشرة — ده مش بيحصل على موقعك الخاص أبدًا.",
        },
      },
      {
        question: {
          en: "Will my website work on mobile phones?",
          ar: "الموقع هيشتغل على الموبايل؟",
        },
        answer: {
          en: "Absolutely. Every website we build is fully responsive, meaning it automatically adapts to look and work perfectly on any screen — phone, tablet, or desktop. This is not optional for us, it's built into everything we do. Given that most people in Egypt browse on mobile, this is something we take very seriously.",
          ar: "أكيد. كل موقع بنبنيه بيكون responsive بالكامل، يعني بيتكيف تلقائيًا ويشتغل بشكل مثالي على أي شاشة — موبايل، تابلت، أو كمبيوتر. ده مش اختياري عندنا، ده جزء أساسي في كل حاجة بنعملها. وبما إن أغلب الناس في مصر بيتصفحوا على الموبايل، ده موضوع بناخده بجدية كاملة.",
        },
      },
      {
        question: {
          en: "Do I own my website after it's built?",
          ar: "الموقع بيبقى ملكي بعد ما يتسلم؟",
        },
        answer: {
          en: "Yes, completely. Once the project is delivered and final payment is made, the website and all its files are 100% yours. You own the code, the design, and everything in it. We don't hold anything back or lock you into any ongoing contract. You're free to host it wherever you want and work with whoever you want going forward.",
          ar: "أيوه، بالكامل. بعد ما المشروع يتسلم والدفعة الأخيرة تتأدى، الموقع وكل ملفاته بيبقوا ملكك ١٠٠٪. إنت مالك الكود، التصميم، وكل حاجة فيه. مش بنحتجز أي حاجة أو بنربطك بأي عقد مستمر. حر تستضيفه فين ما تحب وتشتغل مع أي حد تحب بعد كده.",
        },
      },
      {
        question: {
          en: "How many revisions do I get?",
          ar: "بيكون ليا كام تعديل؟",
        },
        answer: {
          en: "We include up to 3 rounds of revisions during the build. In our experience, that's always enough — especially since we align on the design direction before we start building. Revisions beyond that are handled as small paid adjustments. Our goal is to get it right well within those rounds, not to count them against you.",
          ar: "بنوفر لغاية ٣ جولات تعديل خلال مرحلة البناء. من تجربتنا، دي بتكون كافية دايمًا — خصوصًا إننا بنتفق على اتجاه التصميم قبل ما نبدأ. أي تعديلات بعد كده بتتحسب كتعديلات مدفوعة بسيطة. هدفنا إننا نوصل للنتيجة الصح قبل ما نخلص الجولات دي، مش إننا نحسبها عليك.",
        },
      },
      {
        question: {
          en: "Can I add new sections or features to my website later?",
          ar: "أقدر أضيف أقسام أو خصائص جديدة للموقع بعدين؟",
        },
        answer: {
          en: "Yes. Your website isn't frozen after launch. If your business grows and you want to add a new section, a new feature, or expand the site, we can handle that as additional paid work. Because we built it with clean custom code, making changes is straightforward — there's no plugin mess or platform limitations to work around.",
          ar: "أيوه. موقعك مش ثابت بعد الإطلاق. لو نشاطك اتوسع وعايز تضيف قسم جديد، خاصية جديدة، أو تكبّر الموقع، بنقدر نعمل ده كشغل إضافي مدفوع. ولأننا بنيناه بكود مخصص نضيف، التعديلات بتكون سهلة ومباشرة — مفيش تعقيدات إضافات أو قيود منصات لازم نتعامل معاها.",
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
          en: "How do I pay?",
          ar: "بدفع إزاي؟",
        },
        answer: {
          en: "We accept cash and InstaPay. No complicated payment systems or bank transfers. After we agree on the project scope and price, we'll share the payment details with you directly. Simple and straightforward.",
          ar: "بنقبل كاش وInstaPay. مفيش أنظمة دفع معقدة أو تحويلات بنكية. بعد ما نتفق على تفاصيل المشروع والسعر، بنبعتلك تفاصيل الدفع مباشرة. بسيطة وواضحة.",
        },
      },
      {
        question: {
          en: "Can I pay in installments?",
          ar: "أقدر أدفع على دفعات؟",
        },
        answer: {
          en: "Yes. We typically split the payment into two parts — 50% upfront to begin the project, and the remaining 50% upon delivery before the website goes live. This protects both sides and keeps things clear from day one.",
          ar: "أيوه. بنقسّم الدفع على جزأين — ٥٠٪ مقدم عشان نبدأ المشروع، و٥٠٪ الباقيين عند التسليم قبل ما الموقع يتنشر. ده بيحمي الطرفين وبيخلي كل حاجة واضحة من أول يوم.",
        },
      },
      {
        question: {
          en: "What if I don't have a logo or brand identity yet?",
          ar: "ماعنديش لوجو أو هوية بصرية لسه، ينفع؟",
        },
        answer: {
          en: "Not a problem at all. Many clients come to us at an early stage. We can work with what you have — even if it's just a name and a general idea of your business. If you need a logo or brand identity designed, we can handle that as a separate service before we start building your website.",
          ar: "مفيش مشكلة خالص. كتير من عملاءنا بييجوا في مرحلة مبكرة. بنقدر نشتغل بأي حاجة عندك — حتى لو مجرد اسم وفكرة عامة عن نشاطك. لو محتاج لوجو أو هوية بصرية، بنقدر نعملهالك كخدمة منفصلة قبل ما نبدأ في بناء الموقع.",
        },
      },
      {
        question: {
          en: "Do you work with businesses outside Cairo?",
          ar: "بتشتغلوا مع نشاطات تجارية خارج القاهرة؟",
        },
        answer: {
          en: "Yes. Everything we do is remote, so location is never a barrier. We've worked with businesses across Egypt and the entire process — consultation, design, delivery — happens online. Wherever you're based, we can build your website.",
          ar: "أيوه. شغلنا كله أونلاين، فالموقع الجغرافي مش عائق أبدًا. بنشتغل مع نشاطات تجارية من مختلف أنحاء مصر، وكل العملية — من الاستشارة للتصميم للتسليم — بتحصل إلكترونيًا. أينما كنت، بنقدر نبني موقعك.",
        },
      },
      {
        question: {
          en: "Can I update my websites content myself?",
          ar: "أقدر أعدّل محتوى الموقع بنفسي؟",
        },
        answer: {
          en: "Because we build with custom code rather than a CMS like WordPress, you won't be able to edit the website directly, editing it yourself requires a dashboard, which transforms a static page into a more complex project. This feature is available as a paid add-on. However, that's why we also include up to 3 free minor content updates every month — things like swapping images, updating text, or adjusting details, 99% of the time, that's more than you'll ever need.",
          ar: "بما إن الموقع مبني بكود مخصص مش نظام إدارة محتوى زي ووردبريس، مش هتقدر تعدّل عليه مباشرة بنفسك. عشان كده بنوفّر تحديثات بسيطة مجانية كل شهر — زي تغيير صورة، تعديل نص، أو تحديث بيانات. تعديل محتوى الموقع بنفسك بيحتاج لوحة تحكم بنوفرهالك كخاصية إضافية.",
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
          en: "Do I need to buy my own hosting and domain?",
          ar: "هل أحتاج أشتري الاستضافة والدومين بنفسي؟",
        },
        answer: {
          en: "You'll need your own domain name (like yourbusiness.com), which we'll help you set up — it's a small annual cost paid directly to the domain registrar. As for hosting, that's fully covered on our end at no extra charge. Your website is deployed on professional cloud infrastructure that we manage, so you don't need to set up any accounts or worry about server maintenance.",
          ar: "هتحتاج دومين خاص بيك (زي yourbusiness.com)، وإحنا هنساعدك تحجزه وتظبطه — دي تكلفة سنوية بسيطة بتدفعها مباشرة لمزود الدومين. أما الاستضافة، فدي علينا بالكامل من غير أي تكلفة إضافية. موقعك بيتنشر على بنية سحابية احترافية إحنا بنديرها، فمش محتاج تعمل أي حسابات أو تشيل هم أي إعدادات تقنية.",
        },
      },
      {
        question: {
          en: "Will my business show up on Google Maps?",
          ar: "هل نشاطي التجاري هيظهر على خرائط جوجل؟",
        },
        answer: {
          en: "Yes. A well-built website and a Google Business Profile work together to strengthen your local presence. We structure your website so Google can clearly recognize your business, its location, and its services — making it easier for customers in Cairo to find you whether they're searching on Google Search or Google Maps.",
          ar: "أيوه. الموقع المبني صح وملف جوجل بيزنس بيشتغلوا مع بعض عشان يقووا ظهورك المحلي. بنبني موقعك بطريقة تخلي جوجل يتعرف على نشاطك التجاري، موقعك، وخدماتك بوضوح — وده بيسهّل على عملاء القاهرة يلاقوك سواء على جوجل أو على الخريطة.",
        },
      },
      {
        question: {
          en: "What do I need to provide to get started?",
          ar: "إيه اللي محتاج أجهزه عشان نبدأ؟",
        },
        answer: {
          en: "Just the basics: your logo, a description of your services, and any photos you have. If you don't have professional photos or written content ready, that's not a problem — we offer copywriting support and can help source high-quality imagery that fits your brand. The goal is to make the process as easy as possible on your end.",
          ar: "الأساسيات بس: اللوجو بتاعك، وصف خدماتك، وأي صور عندك. لو ملقتش صور احترافية أو محتوى مكتوب جاهز، مفيش مشكلة — بنوفر خدمة كتابة محتوى وبنساعدك تلاقي صور مناسبة لهوية علامتك التجارية. هدفنا إن العملية تبقى سهلة من جهتك قدر الإمكان.",
        },
      },
      {
        question: {
          en: "Can I sell products on my website?",
          ar: "أقدر أبيع منتجاتي من خلال الموقع؟",
        },
        answer: {
          en: "Our main focus is high-performance landing pages and business websites. That said, we can integrate simple buying options such as WhatsApp purchase buttons or lightweight checkout flows for straightforward selling needs. If you're looking to build a large online store with a significant product catalog, we can discuss a custom solution built on Next.js tailored to your requirements.",
          ar: "تركيزنا الأساسي على صفحات الهبوط والمواقع التجارية عالية الأداء. بس في نفس الوقت بنقدر ندمج خيارات شراء بسيطة زي أزرار واتساب أو منظومة دفع خفيفة لاحتياجات البيع البسيطة. لو بتفكر في متجر إلكتروني كبير بكتالوج منتجات ضخم، نقدر نتكلم عن حل مخصص مبني على Next.js على حسب متطلباتك.",
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
