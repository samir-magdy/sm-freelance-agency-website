import type { Localized } from "@/app/types";

interface Pillar {
  title: Localized;
  desc: Localized;
}

interface AboutSection {
  eyebrow: Localized;
  paragraphs: Localized[];
  pillarsLabel: Localized;
  pillars: Pillar[];
  founderName: Localized;
  founderRole: Localized;
  ctaContact: Localized;
  ctaLinkedIn: Localized;
  ctaWhatsApp: Localized;
  ctaEmail: Localized;
}

const aboutSection: AboutSection = {
  eyebrow: {
    en: "About the Studio",
    ar: "عن الاستوديو",
  },

  paragraphs: [
    {
      en: "We are a small, focused team made up of a developer, a UI/UX designer, and a content writer, working closely together on every project.",
      ar: "",
    },
    {
      en: "SM Web Design Studio was built on a simple belief, every business deserves honest guidance, professional work, and fair pricing.",
      ar: "إحنا فريق صغير ومتخصص، مكون من مبرمج، ومصمم، وكاتب محتوى. أسسنا الاستوديو الخاص بنا على مبدأ بسيط: ان جميع الشركات والأفراد من حقهم يحصلوا على توجيه صادق، عمل احترافي، وأسعار عادلة.",
    },
    {
      en: "After seeing people struggle with incompetent providers, we realized the problem wasn't building the website, it was trust & communication.",
      ar: "بعد ما شفنا أصحاب مشاريع كتير بيعانوا من التعامل مع جهات غير مؤهلة، أدركنا إن الأزمة الحقيقية مش في تنفيذ الموقع، الأزمة في الثقة والتواصل.",
    },
    {
      en: "We're not here to sell you a site you don't need. We're here to help you understand your options, plan your budget, and build you a website that serves both of our interests.",
      ar: "إحنا مش هنا علشان نبيعلك موقع إنت مش محتاجه، هدفنا نساعدك تفهم كل خياراتك، تخطط ميزانيتك بشكل صحيح، ونبني لك موقع يحقق أهدافك ويخدم مصلحة الطرفين.",
    },
  ],

  pillarsLabel: {
    en: "Our Values",
    ar: "قيمنا",
  },
  pillars: [
    {
      title: { en: "Transparency", ar: "الشفافية" },
      desc: {
        en: "Clear options, fair pricing and honest advice.",
        ar: "خيارات واضحة وأسعار عادلة.",
      },
    },
    {
      title: { en: "Communication", ar: "التواصل" },
      desc: {
        en: "Honest guidance every step of the way.",
        ar: "إرشاد بصدق في كل خطوة.",
      },
    },
    {
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
  ctaContact: {
    en: "Start a Project",
    ar: "ابدأ مشروعك",
  },
  ctaLinkedIn: {
    en: "LinkedIn",
    ar: "لينكد إن",
  },
  ctaWhatsApp: {
    en: "WhatsApp",
    ar: "واتساب",
  },
  ctaEmail: {
    en: "Email",
    ar: "الإيميل",
  },
};

export default aboutSection;
