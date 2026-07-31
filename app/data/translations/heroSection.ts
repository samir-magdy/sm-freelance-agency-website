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
    en: `Web Design & Development`,
    ar: "تصميم وتطوير مواقع إلكترونية",
  },
  name: {
    en: 'Great <span class="text-gold">businesses</span> deserve great <span class="text-gold">websites</span>',
    ar: 'لكل عمل ناجح موقع <span class="text-gold">يُثْبِتُ جَدَارَتَهُ</span>',
  },
  primaryCta: {
    en: "Get a Quote",
    ar: "تواصل معنا",
  },
  secondaryCta: {
    en: "View Our Work",
    ar: "شاهد أعمالنا",
  },
  subheading: {
    en: "Establish online <strong>credibility</strong> and turn visitors into <strong>customers</strong>",
    ar: "مواقع إلكترونية مخصصة <strong>تعكس قيمة شركتك الحقيقية</strong> وتُثَبت مكانتك في السوق",
  },
};

export default hero;
