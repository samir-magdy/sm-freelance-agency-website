const faqSection = {
  heading: { en: "Frequently Asked Questions", ar: "الأسئلة الشائعة" },
  searchBar: {
    placeholder: { en: "Search questions...", ar: "ابحث في الأسئلة..." },
    noResultsText: {
      en: "No matching keywords found.",
      ar: "لم يتم العثور على أسئلة مطابقة.",
    },
  },
 items: [
    // ===== TOP OF FUNNEL (Awareness) =====
    {
      question: {
        en: "Do I need a website for my business?",
        ar: "هل يحتاج نشاطي التجاري فعلاً لموقع إلكتروني؟",
      },
      answer: {
        en: "A professional website serves as the primary infrastructure for your digital identity. It establishes credibility, centralizes brand authority, and captures organic search traffic. In a digital-first economy, the absence of a dedicated website results in a loss of market share to competitors who maintain an accessible online presence.",
        ar: "يعد الموقع الإلكتروني الاحترافي البنية التحتية الأساسية لهويتك الرقمية، حيث يعمل على ترسيخ المصداقية ومركزية سلطة العلامة التجارية واستقطاب الزيارات من محركات البحث. في ظل الاقتصاد الرقمي الحالي، يؤدي غياب الموقع الإلكتروني إلى فقدان حصة سوقية لصالح المنافسين الذين يمتلكون حضوراً متاحاً عبر الإنترنت.",
      },
    },
    {
      question: {
        en: "What is SEO and is it important for my business?",
        ar: "يعني إيه SEO وليه هو مهم لنشاطي التجاري؟",
      },
      answer: {
        en: "SEO (Search Engine Optimization) is the technical and strategic process of improving a website's visibility within search engine results pages. By optimizing technical structure and content relevance, SEO ensures your business is discoverable by users actively searching for your specific services, thereby reducing long-term customer acquisition costs.",
        ar: "تحسين محركات البحث (SEO) هو عملية تقنية واستراتيجية تهدف لزيادة ظهور الموقع الإلكتروني في صفحات نتائج البحث. من خلال تحسين الهيكل التقني وملاءمة المحتوى، يضمن الـ SEO إمكانية وصول المستخدمين الذين يبحثون بنشاط عن خدماتك إليك، مما يقلل تكاليف جذب العملاء على المدى الطويل.",
      },
    },
    {
      question: {
        en: "What is the difference between SEO and paid advertising?",
        ar: "إيه الفرق بين الـ SEO والإعلانات الممولة؟",
      },
      answer: {
        en: "SEO focuses on building organic equity and sustainable traffic through long-term optimization. Paid advertising, such as Google Ads (PPC), provides immediate visibility through financial bidding on keywords. While paid ads generate instant results that cease once the budget is exhausted, SEO builds a lasting digital asset that continues to drive traffic without per-click costs.",
        ar: "يركز الـ SEO على بناء قيمة طبيعية وزيارات مستدامة من خلال التحسين طويل الأمد. أما الإعلانات الممولة (مثل إعلانات جوجل)، فتوفر ظهوراً فورياً عبر المزايدة المالية على الكلمات المفتاحية. وبينما تحقق الإعلانات نتائج لحظية تتوقف بانتهاء الميزانية، يبني الـ SEO أصلاً رقمياً دائماً يستمر في جلب الزيارات دون تكاليف مقابل كل نقرة.",
      },
    },
    {
      question: {
        en: "Can I build my own website instead of hiring someone?",
        ar: "هل ينفع أعمل موقعي بنفسي بدل ما أجيب متخصص؟",
      },
      answer: {
        en: "While automated tools allow for basic web construction, they often result in technical debt, limited scalability, and suboptimal SEO performance. Professional development ensures your site is built to modern engineering standards, providing superior performance, security, and a customized user experience that DIY platforms typically cannot match.",
        ar: "بينما تسمح الأدوات المؤتمتة ببناء مواقع أساسية، إلا أنها غالباً ما تؤدي إلى مشاكل تقنية، محدودية في التوسع، وأداء ضعيف في محركات البحث. يضمن التطوير الاحترافي بناء موقعك وفقاً للمعايير الهندسية الحديثة، مما يوفر أداءً وتأميناً وتجربة مستخدم مخصصة لا تستطيع المنصات الجاهزة توفيرها عادةً.",
      },
    },

    // ===== MID-FUNNEL (Research) =====
    {
      question: {
        en: "how much does a website cost for a small business?",
        ar: "اسعار تصميم المواقع للشركات الصغيرة كام؟",
      },
      answer: {
        en: "Pricing is determined by project scope and technical complexity, similar to how real estate valuation depends on specifications and location. See our pricing section for our ready packages.",
        ar: "يتم تحديد السعر بناءً على نطاق المشروع والتعقيد التقني، تتراوح تكاليف التطوير من 5,000 جنيه للمواقع البسيطة إلى مبالغ ضخمة للحلول المؤسسية الضخمة التي تتطلب تكاملات مخصصة وفرق هندسية متخصصة.",
      },
    },
    {
  question: {
    en: "What is responsive web design?",
    ar: "يعني إيه تصميم متجاوب (Responsive)؟",
  },
  answer: {
    en: "Responsive web design is an engineering approach that ensures a website adapts its layout, typography, and interactive elements to function optimally across all screen sizes — from desktop monitors to mobile devices. With mobile traffic now accounting for over 60% of global web usage, responsive design is not a feature but a structural requirement for search engine visibility and user retention.",
    ar: "التصميم المتجاوب هو منهج هندسي يضمن تكيّف تخطيط الموقع وخطوطه وعناصره التفاعلية للعمل بشكل مثالي على جميع أحجام الشاشات — من شاشات الكمبيوتر إلى الهواتف المحمولة. مع تجاوز حركة المرور عبر الهاتف المحمول لأكثر من 60% من الاستخدام العالمي للإنترنت، لم يعد التصميم المتجاوب ميزة إضافية بل متطلب هيكلي لظهور الموقع في محركات البحث والحفاظ على الزوار.",
  },
},
{
  question: {
    en: "What is the difference between a website and an online store?",
    ar: "إيه الفرق بين الموقع الإلكتروني والمتجر الإلكتروني؟",
  },
  answer: {
    en: "A standard website presents information about your business — services, portfolio, contact details — and is designed to generate enquiries or build brand awareness. An online store (e-commerce website) adds transactional functionality: product catalogues, inventory management, shopping carts, and payment processing. Both require professional design and SEO, but an online store involves additional infrastructure for order management and checkout workflows.",
    ar: "الموقع الإلكتروني القياسي يعرض معلومات عن نشاطك — الخدمات، الأعمال السابقة، بيانات التواصل — وهو مصمم لجذب الاستفسارات أو بناء الوعي بالعلامة التجارية. أما المتجر الإلكتروني فيضيف وظائف تجارية: كتالوج المنتجات، إدارة المخزون، سلة المشتريات، ومعالجة الدفع. كلاهما يحتاج تصميم احترافي وتحسين محركات بحث، لكن المتجر يتطلب بنية إضافية لإدارة الطلبات وعمليات الشراء.",
  },
},
    {
      question: {
        en: "What technologies do you use to build websites?",
        ar: "إيه التقنيات اللي بتستخدموها في بناء المواقع؟",
      },
      answer: {
        en: "We utilize the Next.js framework, a leading industry standard for high-performance web applications. This technology is employed by global enterprises such as Netflix, Nike, and Apple to ensure speed, SEO efficiency, and robust security architecture.",
        ar: "نحن نستخدم إطار عمل Next.js، وهو معيار رائد في الصناعة لتطبيقات الويب عالية الأداء. تُستخدم هذه التقنية من قبل شركات عالمية مثل Netflix وNike وApple لضمان السرعة، وكفاءة الـ SEO، وبنية أمنية قوية.",
      },
    },
    {
      question: {
        en: "How long does it take for a new website to rank on Google?",
        ar: "الموقع بيحتاج وقت قد إيه عشان يظهر في نتائج بحث جوجل؟",
      },
      answer: {
        en: "Search engines typically index new URLs within several days; however, achieving competitive rankings generally requires a consistent optimization period of 3 to 6 months. We implement structural SEO and performance optimization from the initial development phase to accelerate this timeline.",
        ar: "تقوم محركات البحث عادةً بأرشفة الروابط الجديدة خلال أيام؛ ومع ذلك، فإن تحقيق ترتيب تنافسي يتطلب عادةً فترة تحسين مستمرة تتراوح من 3 إلى 6 أشهر. نحن نطبق قواعد الـ SEO الهيكلية وتحسين الأداء منذ مرحلة التطوير الأولى لتسريع هذه الدورة الزمنية.",
      },
    },

    // ===== DECISION STAGE (Ready to act) =====
    {
      question: {
        en: "What do I need to provide to get started?",
        ar: "إيه المطلوب مني عشان نبدأ شغل؟",
      },
      answer: {
        en: "Following the initial consultation and requirements gathering, we require the provision of core brand assets. This includes your corporate identity (logo), finalized copywriting for each section, and any high-resolution visual assets or photography intended for the site.",
        ar: "بعد الاستشارة الأولية وجمع المتطلبات، نحتاج إلى توفير أصول العلامة التجارية الأساسية. يشمل ذلك الهوية البصرية (اللوجو)، المحتوى المكتوب النهائي لكل قسم، وأي أصول بصرية أو صور فوتوغرافية عالية الجودة مخصصة للموقع.",
      },
    },
    {
      question: {
        en: "Will my business show up on Google Maps?",
        ar: "هل شغلي هيظهر على خرائط جوجل؟",
      },
      answer: {
        en: "Visibility on Google Maps requires a verified Google Business Profile and a physical operating location. While a website is not a prerequisite for a map listing, a high-quality site significantly enhances your Local SEO signals, improving your rank in localized search queries.",
        ar: "تطلب الظهور على خرائط جوجل وجود ملف تجاري مفعل وموقع جغرافي فعلي. وبينما لا يعد الموقع الإلكتروني شرطاً مسبقاً للإدراج في الخرائط، إلا أن الموقع عالي الجودة يعزز إشارات الـ SEO المحلية، مما يحسن ترتيبك في نتائج البحث الجغرافية.",
      },
    },
    // {
    //   question: {
    //     en: "Can I sell products on my website?",
    //     ar: "هل ينفع أبيع منتجاتي من خلال الموقع؟",
    //   },
    //   answer: {
    //     en: "We implement a streamlined e-commerce model optimized for conversion, utilizing a 'direct-to-WhatsApp' checkout system that bypasses mandatory account registration. While this approach means that you have to manage stock and orders manually, it also means you get a website that looks and performs better at half the price of a standard ecommerce sites.",
    //     ar: "نحن نطبق نموذجاً للتجارة الإلكترونية مصمماً لزيادة معدل التحويل، باستخدام نظام طلب عبر واتساب يتجاوز إلزامية تسجيل الحساب. يقلل هذا النهج من تعقيد الاستخدام وتكاليف التطوير، مع توفير واجهة إدارية مخصصة لإدارة المخزون والمنتجات.",
    //   },
    // },
    {
      question: {
        en: "What is hosting and deployment?",
        ar: "يعني إيه استضافة (Hosting) ونشر (Deployment)؟",
      },
      answer: {
        en: "Hosting refers to the server infrastructure where your website's data is stored for global accessibility. Deployment is the technical procedure of transferring the developed source code to these live servers, making the application accessible via the public internet.",
        ar: "تشير الاستضافة إلى بنية الخادم التحتية حيث يتم تخزين بيانات موقعك لضمان إمكانية الوصول العالمي. أما النشر فهو الإجراء التقني لنقل الكود المصدري المطور إلى هذه الخوادم الحية، مما يجعل التطبيق متاحاً عبر شبكة الإنترنت العامة.",
      },
    },
    {
      question: {
        en: "What is a domain?",
        ar: "يعني إيه دومين (Domain)؟",
      },
      answer: {
        en: "A domain is the unique alphanumeric identifier (URL) used to access your website, such as 'company.com'. Functionally, it acts as a digital address that points users toward your hosted content. We facilitate the registration and configuration process based on availability.",
        ar: "الدومين هو المعرف الفريد (URL) المستخدم للوصول إلى موقعك، مثل 'company.com'. من الناحية الوظيفية، يعمل كعنوان رقمي يوجه المستخدمين نحو محتواك المستضاف. نحن نقوم بتسهيل عملية التسجيل والإعداد بناءً على توفر الاسم.",
      },
    },
    {
      question: {
        en: "Do you work with businesses outside Cairo?",
        ar: "هل بتشتغلوا مع شركات بره القاهرة؟",
      },
      answer: {
        en: "Yes. Our operational model is remote-first, allowing us to collaborate effectively regardless of geographic location. We maintain rigorous communication standards to ensure project alignment with clients both domestically and internationally.",
        ar: "نعم. نموذج عملنا يعتمد على العمل عن بُعد، مما يسمح لنا بالتعاون الفعال بغض النظر عن الموقع الجغرافي. نحن نلتزم بمعايير اتصال صارمة لضمان توافق المشروع مع تطلعات عملائنا محلياً ودولياً.",
      },
    },
  ],
};

export default faqSection;
