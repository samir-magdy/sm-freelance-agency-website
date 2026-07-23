import type { Localized } from "@/app/types";
import { SITE_NAME } from "@/app/constants";

const hero: {
  eyebrow: Localized;
  name: Localized;
  primaryCta: Localized;
  secondaryCta: Localized;
  subheading: Localized;
} = {
  eyebrow: {
    en: `${SITE_NAME} · Egypt`,
    ar: "تصميم وتطوير مواقع إلكترونية في مصر",
  },
  name: {
    en: 'Great <span class="text-gold">businesses</span> deserve great <span class="text-gold">websites</span>.',
    ar: 'لكل عمل ناجح موقع <span class="text-gold">يُثْبِتُ جَدَارَتَهُ</span>.',
  },
  primaryCta: {
    en: "Get a Quote",
    ar: "تواصل معنا",
  },
  secondaryCta: {
    en: "See Our Work",
    ar: "شاهد أعمالنا",
  },
  subheading: {
    en: "We build professional websites that <strong><em>validate</em></strong> your <strong><em>brand</em></strong><em>'s</em> true value.",
    ar: "نصمم مواقع مخصصة <strong>تعكس قيمة شركتك الحقيقية</strong> وتُثَبت مكانتك في السوق.",
  },
};

export default hero;
