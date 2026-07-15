import type { Localized } from "@/app/types";

interface FAQItem {
  question: Localized;
  answer: Localized;
}

interface FAQSection {
  heading: Localized;
  subheading: Localized;
  browseGuides: Localized;
  ctaHeading: Localized;
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
    en: "Browse all web guides",
    ar: "تصفح أدلة تصميم المواقع",
  },

  ctaHeading: {
    en: "Still have questions?",
    ar: "لسا عندك أسئلة؟",
  },

  cta: {
    en: "Request a Consultation",
    ar: "اطلب استشارة مجانية",
  },
  items: [
    {
      question: {
        en: "Is having a website really that important?",
        ar: "هو الموقع الإلكتروني مهم فعلاً؟",
      },
      answer: {
        en: "<strong>Absolutely!</strong> Without a website, you're losing customers to competitors who have built a stronger online presence. Read our guide on the <a href='/en/guides/why-your-business-needs-a-website'>benefits of a professional website for your business</a> if you're still not sure.",
        ar: "لو عايز تنافس وتكبر في السوق، <strong>الموقع خطوة أساسية</strong>! اقرأ دليلنا عن <a href='/ar/guides/why-your-business-needs-a-website'>أهمية الموقع الإلكتروني لعملك</a>.",
      },
    },
    {
      question: {
        en: "Should I use a website builder or hire a professional?",
        ar: "أعمل الموقع بنفسي على منصات جاهزة ولا أستعين بمحترف؟",
      },
      answer: {
        en: "DIY builders aren't recommended if you want a real return on investment. Check out our guide on <a href='/en/guides/diy-vs-professional-web-design'>building your own website vs hiring a professional</a> to make the right choice.",
        ar: "في منصات بتخليك تعمل موقعك بنفسك، لكن للمشاريع اللي محتاجة ظهور احترافي، مش بننصح بالطريقة دي. اقرأ دليلنا اللي بيوضح الفرق بين <a href='/ar/guides/diy-vs-professional-web-design'>بناء الموقع بنفسك وبين الاستعانة بمحترف</a>، علشان تاخد القرار الأنسب لمشروعك.",
      },
    },
    {
      question: {
        en: "How much does a website cost in Egypt? (2026)",
        ar: "تكلفة الموقع الإلكتروني كام في مصر؟ (2026)",
      },
      answer: {
        en: "Prices for website development in Egypt typically start at around EGP 5,000 and can exceed EGP 100,000, depending on the project's size, features, and complexity. Read our <a href='/en/guides/website-cost-in-egypt'>website pricing guide</a> for a breakdown on how prices are determined, or <a href='#contact'>request an official quote</a>.",
        ar: "أسعار المواقع الإلكترونية في مصر بتتراوح من 5,000 لـفوق الـ 100,000 جنيه حسب حجم المشروع والميزات المطلوبة ومستوى التخصيص. اقرأ دليلنا عن <a href='/ar/guides/website-cost-in-egypt'>أسعار المواقع في مصر</a> للتفاصيل الكاملة، أو <a href='#contact'>اطلب استشارة</a> لمشروعك.",
      },
    },
    {
      question: {
        en: "How do I choose the right web design company?",
        ar: "إزاي أختار أفضل شركة تصميم مواقع في مصر؟",
      },
      answer: {
        en: "Initially, inspect their own website and their portfolio. For crucial red flags to avoid, read our guide on <a href='/en/guides/choose-web-design-company-egypt'>how to choose the best web design company in Egypt</a>.",
        ar: "اختار شركة عندها سابقة أعمال حقيقية تقدر تدخل عليها بنفسك، أسعار بالجنيه المصرى، وتواصل واضح من البداية. اقرأ دليلنا: <a href='/ar/guides/choose-web-design-company-egypt'>إزاي تختار أفضل شركة تصميم مواقع</a> للتفاصيل الكاملة والعلامات التحذيرية اللي لازم تتجنبها.",
      },
    },
    {
      question: {
        en: "What is the process for getting my website?",
        ar: "إيه هي خطوات تنفيذ الموقع؟",
      },
      answer: {
        en: "First, we start the discovery, where we learn about your business and understand your vision. Next, we design a visual mockup for your review. Once approved, we build, then launch your fully functional website.",
        ar: "بنبدأ بالتواصل علشان نفهم شغلك ومتطلباتك من الموقع. بعدين بنعمل تصور لتصميم الموقع للمراجعه، واخيراً بنطور التصميم لموقع إلكتروني فعلي.",
      },
    },
    {
      question: {
        en: "How long does it take to create a website?",
        ar: "الموقع بياخد وقت قد إيه علشان يجهز؟",
      },
      answer: {
        en: "Landing pages take ~1 week, business websites 1–3 weeks, and e-commerce sites around 3 weeks. Timelines depend heavily on how quickly you provide content and feedback.",
        ar: "المواقع البسيطة (صفحة واحدة) عادةً بنخلصها في أسبوع، مواقع الشركات بتاخد من أسبوع لـ 3 أسابيع، والمتاجر الإلكترونية بتاخد حوالي 3 أسابيع. وطبعاً الالتزام بالوقت ده بيعتمد على سرعة تسليمك للمحتوى والصور والموافقة على التصميمات.",
      },
    },
    {
      question: {
        en: "What do I need to provide to get started?",
        ar: "إيه اللي محتاج أجهزه علشان نبدأ؟",
      },
      answer: {
        en: "Just your basic brand assets: your logo, the text content for each page, and any high-quality photos or videos you want to showcase.",
        ar: "كل اللي بنحتاجه منك هو أساسيات الهوية الخاصة بيك، زي اللوجو، والنصوص اللي عايزها تظهر في كل قسم، وأي صور أو فيديوهات بجودة كويسة تحب تعرضها على الموقع.",
      },
    },
    {
      question: {
        en: "Will I be able to edit my website myself?",
        ar: "هعرف أعدل في محتوى الموقع بنفسي؟",
      },
      answer: {
        en: "Yes, if your site includes a CMS (Admin Panel). We'll explain how it works before handover, it's user-friendly and requires zero technical knowledge.",
        ar: "لو موقعك فيه لوحة تحكم (نظام إدارة المحتوى CMS)، طبعاً هتعرف. قبل ما نسلمك الموقع، بنشرحلك إزاي تستخدم اللوحة دي ببساطة، ومش هتحتاج أي خبرة تقنية علشان تدير المحتوى بتاعك.",
      },
    },
    {
      question: {
        en: "Can I add more to my website later on?",
        ar: "ممكن أضيف مميزات تانية للموقع بعدين؟",
      },
      answer: {
        en: "Absolutely! We can expand your site with new pages, features, or an admin page at any time without having to rebuild it from scratch.",
        ar: "أكيد طبعاً، سواء عايز تضيف صفحات جديدة، أو أقسام تانية، أو حتى لوحة تحكم لإدارة المحتوى، نقدر نوسع ونطور الموقع في أي وقت ومن غير ما نضطر نبدأ من الصفر.",
      },
    },
  ],
};

export default faqSection;
