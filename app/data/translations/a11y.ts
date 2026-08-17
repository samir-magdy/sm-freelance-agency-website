import type { Localized } from "@/app/types";
import { SITE_NAME } from "@/app/constants";

const a11y: Record<
  | "openMenu"
  | "closeMenu"
  | "desktopNav"
  | "mobileNav"
  | "imageAltPrefix"
  | "skipToContent"
  | "switchToEnglish"
  | "switchToArabic"
  | "toggleLightRays",
  Localized
> = {
  openMenu: { en: "Open menu", ar: "فتح القائمة" },
  closeMenu: { en: "Close menu", ar: "إغلاق القائمة" },
  desktopNav: { en: "Desktop navigation", ar: "قائمة سطح المكتب" },
  mobileNav: { en: "Mobile navigation", ar: "قائمة الهاتف" },
  imageAltPrefix: {
    en: `Website design by ${SITE_NAME} –`,
    ar: `تصميم موقع من ${SITE_NAME} –`,
  },
  skipToContent: {
    en: "Skip to main content",
    ar: "تخطى إلى المحتوى",
  },
  switchToEnglish: {
    en: "Switch to English",
    ar: "التبديل إلى الإنجليزية",
  },
  switchToArabic: {
    en: "Switch to Arabic",
    ar: "التبديل إلى العربية",
  },
  toggleLightRays: {
    en: "Toggle ambient light rays",
    ar: "تبديل تأثير أشعة الضوء",
  },
};

export default a11y;
