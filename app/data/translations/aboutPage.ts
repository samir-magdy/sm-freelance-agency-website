import type { Localized } from "@/app/types";
import { SITE_NAME } from "@/app/constants";

interface ValueCard {
  id: string;
  title: Localized;
  desc: Localized;
}

interface AboutPage {
  h1PageTitle: Localized;
  paragraphs: Localized[];
  valuesEyebrow: Localized;
  valueCards: ValueCard[];
  founderName: Localized;
  founderRole: Localized;
  founderPhotoAlt: Localized;
  linkLinkedIn: Localized;
  linkWhatsApp: Localized;
  linkEmail: Localized;
}

const aboutPage: AboutPage = {
  h1PageTitle: {
    en: `About the Studio`,
    ar: "عن الاستوديو",
  },

  paragraphs: [
    {
      en: `${SITE_NAME} is a focused team made up of a developer, a designer, and a content writer, working closely together on every project. The studio was built on a simple belief: every business deserves honest guidance, professional work, and fair pricing.`,
      ar: "نحن فريق متخصص يضم مطور ومصمم وكاتب محتوى، نعمل معًا عن قرب في كل مشروع. تأسس الاستوديو على مبدأ بسيط: أن جميع العملاء تستحق توجيه صادق، عمل احترافي، وأسعار عادلة.",
    },
    {
      en: "After seeing clients struggle with unreliable providers, we realized the hard part isn't building the site — it's trust and communication. We're not here to sell you a site you don't need, but to help you understand your options, plan your budget, and build a website that serves your best interests.",
      ar: "بعد ملاحظة معاناة أصحاب المشاريع مع جهات غير مؤهلة، أدركنا أن التحدي الحقيقي مش في تنفيذ الموقع، بل في الثقة والتواصل. لسنا هنا لنبيع لك موقع لا تحتاجه، بل نساعدك تفهم خياراتك، وتخطط ميزانيتك بذكاء، ونبني لك موقع يحقق أهدافك.",
    },
     {
      en: "Based in Cairo, Egypt, we work with clients locally and remotely worldwide.",
      ar: "مقرنا في القاهرة، مصر، ونعمل مع عملاء محليين وعن بُعد حول العالم.",
    },
  ],

  valuesEyebrow: {
    en: "Our Values",
    ar: "قيمنا",
  },
  valueCards: [
    {
      id: "transparency",
      title: { en: "Transparency", ar: "الشفافية" },
      desc: {
        en: "Clear options, fair pricing, honest advice.",
        ar: "خيارات واضحة وأسعار عادلة.",
      },
    },
    {
      id: "quality",
      title: { en: "Quality", ar: "الجودة" },
      desc: {
        en: "High standards in every detail.",
        ar: "معايير عالية في التصميم والأداء.",
      },
    },
    {
      id: "partnership",
      title: { en: "Partnership", ar: "الشراكة" },
      desc: {
        en: "A professional site built around your goals.",
        ar: "موقع مبني على أهدافك.",
      },
    },
  ],

  founderName: {
    en: "Samir Magdy",
    ar: "سمير مجدي",
  },
  founderRole: {
    en: "Founder & Lead Developer",
    ar: "المؤسس والمطور الرئيسي",
  },
  founderPhotoAlt: {
    en: `Photo of Samir Magdy, Founder of ${SITE_NAME}`,
    ar: `صورة سمير مجدي، مؤسس ${SITE_NAME}`,
  },
  linkLinkedIn: {
    en: "LinkedIn",
    ar: "لينكد إن",
  },
  linkWhatsApp: {
    en: "WhatsApp",
    ar: "واتساب",
  },
  linkEmail: {
    en: "Email",
    ar: "الإيميل",
  },
};

export default aboutPage;