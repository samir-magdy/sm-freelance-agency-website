import type { Localized } from "@/app/types";

const hero: {
  eyebrow: Localized;
  name: Localized;
  primaryCta: Localized;
  secondaryCta: Localized;
  subheading: Localized;
} = {
  eyebrow: {
    en: "SM Web Design Studio · Egypt",
    ar: "خدمات إنشاء و تصميم مواقع · مصر",
  },
  name: {
    en: 'Every great business has a website to <span class="text-gold">prove it</span>.',
    ar: 'وراء كل عمل ناجح موقع <span class="text-gold">يثبت جدارته</span>.',
  },
  primaryCta: {
    en: "Request a Quote",
    ar: "استشارة مجانية",
  },
  secondaryCta: {
    en: "See Our Work",
    ar: "شاهد أعمالنا",
  },
  subheading: {
    en: "We build modern websites that <strong>validate your brand's true value</strong>.",
    ar: "نصمم مواقع مخصصة <strong>تعكس قيمة شركتك الحقيقية</strong> وتثبت مكانتك في السوق.",
  },
};

export default hero;
