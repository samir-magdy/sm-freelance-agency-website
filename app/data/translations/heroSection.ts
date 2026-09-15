import type { Localized } from "@/app/types";

const hero: {
  h1Eyebrow: Localized;
  hook: Localized;
  mobileHook: Localized;
  primaryCta: Localized;
  secondaryCta: Localized;
  valueProp: Localized;
} = {
  h1Eyebrow: {
    en: `Web Design & Development`,
    ar: "تصميم وتطوير مواقع إلكترونية",
  },
  hook: {
    en: '<span class="text-content-heading/95">We build the stage.</span><br class="block" /> You take <span class="text-gold">the spotlight</span>.',
    ar: 'نحن نبني المسرح.<br class="hidden sm:block" /> وأنت تخطف <span class="text-gold">الأضواء</span>.',
  },
  mobileHook: {
    en: '<span class="text-content-heading/95">Your Brand.</span><br />In <span class="text-gold">the Spotlight</span>.',
    ar: 'علامتك التجارية.<br />في <span class="text-gold">الأضواء</span>.',
  },
  primaryCta: {
    en: "Start a Project",
    ar: "اطلب عرض سعر",
  },
  secondaryCta: {
    en: "See Our Work",
    ar: "شاهد أعمالنا",
  },
 valueProp: {
  en: 'Build instant trust, outshine competitors, and turn <span class="font-[630]">website visits</span> into <span class="font-[630]">real revenue</span>.',
  ar: 'ابنِ ثقة فورية من أول لحظة، تفوق على منافسيك، وحوّل <span class="font-[630]">زيارات موقعك</span> إلى <span class="font-[630]">أرباح حقيقية</span>.',
},
};

export default hero;
