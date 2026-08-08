import type { Localized } from "@/app/types";
import { BASE_PRICES } from "./pricingEstimator";

interface ServiceCard {
  id: "landing" | "business" | "customApp";
  name: Localized;
  tagline: Localized;
  price: number | null;
}

export type SpecializedServiceId = "branding" | "copywriting" | "seo" | "maintenance";

interface SpecializedService {
  id: SpecializedServiceId;
  name: Localized;
}

interface ServicesSectionTranslations {
  heading: Localized;
  subheading: Localized;
  specializedServicesLabel: Localized;
  estimatorLead: Localized;
  estimatorCta: Localized;
  startsAt: Localized;
  currency: Localized;
  contactCta: Localized;
  customPriceLabel: Localized;
  cards: ServiceCard[];
  specializedServices: SpecializedService[];
}

export const servicesSectionTranslations: ServicesSectionTranslations = {
  heading: {
    en: "Our Services",
    ar: "الخدمات",
  },
  subheading: {
    en: "Pick what best suits your needs",
    ar: "اختر الموقع الذي يناسب احتياجاتك",
  },
  specializedServicesLabel: {
    en: "Specialized services",
    ar: "خدمات متخصصة",
  },
  estimatorLead: {
    en: "Want an instant estimate?",
    ar: "ترغب في تقدير سعر فوري؟",
  },
  estimatorCta: {
    en: "Estimate your investment",
    ar: "قدِّر تكلفة موقعك",
  },
  startsAt: {
    en: "Starts at",
    ar: "يبدأ من",
  },
  currency: {
    en: "EGP",
    ar: "جنيه مصري",
  },
  contactCta: {
    en: "Get in Touch",
    ar: "طلب استشارة",
  },
  customPriceLabel: {
    en: "Custom Pricing",
    ar: "سعر حسب المشروع",
  },
  cards: [
    {
      id: "landing",
      name: {
        en: "Landing Page",
        ar: "صفحة هبوط",
      },
      tagline: {
        en: "A single-page website built to drive one action like a WhatsApp message, a booking, or filling out a form. <em>Perfect for startups, freelancers and marketing campaigns.</em>",
        ar: "صفحة واحدة مصممة لتدفع العميل لاتخاذ قرار سريع مثل التواصل عبر الواتساب أو تعبئة نموذج. <em>مثالية للشركات الناشئة، الفريلانسرز، ومقدمي الخدمات.</em>",
      },
      price: BASE_PRICES.landing,
    },
    {
      id: "business",
      name: {
        en: "Business Website",
        ar: "موقع أعمال",
      },
      tagline: {
        en: "A multi-page website that presents your company in full detail. <em>Ideal for more established businesses and entities that have a lot to show and tell.</em>",
        ar: "موقع تعريفي متعدد الصفحات يعرض شركتك بشكل كامل. <em>مثالي للشركات المستقرة، والشركات التي تحتاج وجود قوي على محركات البحث مثل جوجل.</em>",
      },
      price: BASE_PRICES.business,
    },
    {
      id: "customApp",
      name: {
        en: "Custom Web App",
        ar: "تطبيق ويب",
      },
      tagline: {
        en: "A fully custom-built web application designed around your exact requirements, from online stores and booking systems to client portals. <em>Ideal for businesses with specific needs that require custom solutions.</em>",
        ar: "تطبيق ويب مبني حسب متطلبات عملك. من المتاجر الإلكترونية وأنظمة الحجز، للوحات التحكم الداخلية. <em>مثالي للمشاريع التي تحتاج لحل مخصص.</em>",
      },
      price: null,
    },
  ],
  specializedServices: [
    {
      id: "branding",
      name: { en: "Branding", ar: "الهوية البصرية" },
    },
    {
      id: "copywriting",
      name: { en: "Copywriting", ar: "كتابة المحتوى" },
    },
    {
      id: "seo",
      name: { en: "SEO Setup", ar: "إعداد SEO" },
    },
    {
      id: "maintenance",
      name: { en: "Maintenance", ar: "الصيانة" },
    },
  ],
};
