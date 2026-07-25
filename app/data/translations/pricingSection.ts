import type { Localized } from "@/app/types";

interface PricingCard {
  id: "landing" | "business" | "custom-app";
  name: Localized;
  tagline: Localized;
  price: string | null;
}

interface PricingCards {
  heading: Localized;
  subheading: Localized;
  estimatorLead: Localized;
  estimatorCta: Localized;
  startsAt: Localized;
  currency: Localized;
  cta: Localized;
  customPriceLabel: Localized;
  cards: PricingCard[];
}

export const pricingCards: PricingCards = {
  heading: {
    en: "Services & Pricing",
    ar: "الخدمات والأسعار",
  },
  subheading: {
    en: "Pick what best suits your needs",
    ar: "اختار الموقع اللي يناسب احتياجاتك",
  },
  estimatorLead: {
    en: "Want a personalized estimate for your site?",
    ar: "حابب تقدير سعر فورى لمشروعك؟",
  },
  estimatorCta: {
    en: "Estimate your investment",
    ar: "قدر تكلفة الموقع",
  },
  startsAt: {
    en: "Starts at",
    ar: "يبدأ من",
  },
  currency: {
    en: "EGP",
    ar: "جنيه مصري",
  },
  cta: {
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
        ar: "صفحة واحدة مصممة لتدفع العميل لاتخاذ قرار سريع مثل التواصل عبر الواتساب أو حجز مَوعِد. <em>مثالية للشركات الناشئة، الفريلانسرز، ومقدمي الخدمات.</em>",
      },
      price: "5,999",
    },
    {
      id: "business",
      name: {
        en: "Business Website",
        ar: "موقع أعمال",
      },
      tagline: {
        en: "A multi-page website that presents your company in full detail. <em>Ideal for more established businesses and entities that have a lot to show and tell.</em>",
        ar: "موقع تعريفي متعدد الصفحات يعرض شركتك بشكل كامل. <em>مثالي للشركات المستقرة، والشركات التي تحتاج وجود قوي على جوجل.</em>",
      },
      price: "8,999",
    },
    {
      id: "custom-app",
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
};
