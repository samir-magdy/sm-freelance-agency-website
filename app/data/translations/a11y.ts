import type { Localized } from "@/app/types";
import { SITE_NAME } from "@/app/constants";

const a11y: Record<
  | "openMenu"
  | "closeMenu"
  | "desktopNav"
  | "mobileNav"
  | "contactForm"
  | "screenshotOf",
  Localized
> = {
  openMenu: { en: "Open menu", ar: "فتح القائمة" },
  closeMenu: { en: "Close menu", ar: "إغلاق القائمة" },
  desktopNav: { en: "Desktop navigation", ar: "قائمة سطح المكتب" },
  mobileNav: { en: "Mobile navigation", ar: "قائمة الهاتف" },
  contactForm: { en: "Contact form", ar: "نموذج التواصل" },
  screenshotOf: {
    en: `Website design by ${SITE_NAME} –`,
    ar: `تصميم موقع من ${SITE_NAME} –`,
  },
};

export default a11y;
