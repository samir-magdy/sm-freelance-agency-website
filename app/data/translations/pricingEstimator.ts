import type { Lang, Localized } from "@/app/types";
import type { Region } from "@/lib/region";

export type BaseId = "landing" | "business";

export type PriceByRegion = Record<Region, number>;

// NOTE: Prices below are set per region and must be maintained manually.
// EG is the anchor market; other regions use market-appropriate pricing,
// not FX conversions. Update each region individually when adjusting.
export const BASE_PRICES: Record<BaseId, PriceByRegion> = {
  landing:  { EG: 6999, SA: 1299, AE: 1299, GB: 279, EU: 329, US: 349 },
  business: { EG: 9999, SA: 1899, AE: 1899, GB: 399, EU: 469, US: 499 },
};

type CurrencySymbolPosition = "before" | "after";

interface CurrencyInfo {
  code: string;
  symbol: Localized;
  position: CurrencySymbolPosition;
}

export const CURRENCIES: Record<Region, CurrencyInfo> = {
  EG: { code: "EGP", symbol: { en: "EGP", ar: "ج.م" }, position: "after"  },
  SA: { code: "SAR", symbol: { en: "SAR", ar: "ر.س" }, position: "after"  },
  AE: { code: "AED", symbol: { en: "AED", ar: "د.إ" }, position: "after"  },
  GB: { code: "GBP", symbol: { en: "£",   ar: "£"   }, position: "before" },
  EU: { code: "EUR", symbol: { en: "€",   ar: "€"   }, position: "before" },
  US: { code: "USD", symbol: { en: "$",   ar: "$"   }, position: "before" },
};

export interface FormattedPrice {
  amount: string;
  symbol: string;
  position: CurrencySymbolPosition;
  code: string;
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");

export function formatPrice(
  amountInMinorUnitFreeMajor: number,
  region: Region,
  lang: Lang,
): FormattedPrice {
  const currency = CURRENCIES[region];
  return {
    amount: NUMBER_FORMATTER.format(amountInMinorUnitFreeMajor),
    symbol: currency.symbol[lang],
    position: currency.position,
    code: currency.code,
  };
}

interface EstimatorBase {
  id: BaseId;
  name: Localized;
  description: Localized;
  price: PriceByRegion;
}

interface EstimatorScope {
  name: Localized;
  description: Localized;
  multiplier: number;
}

interface AddonBase {
  id: string;
  name: Localized;
  description: Localized;
  appliesTo: BaseId[];
}

interface MultiplierAddon extends AddonBase {
  isMultiplier: true;
  multiplierByBase: Record<BaseId, number>;
  price: number;
  scalesWithScope: false;
}

interface FlatAddon extends AddonBase {
  isMultiplier: false;
  price: number;
  scalesWithScope: boolean;
}

type Addon = MultiplierAddon | FlatAddon;

interface PricingEstimatorData {
  websiteTypeLabel: Localized;
  scopeLabelByBase: Record<BaseId, Localized>;
  addonsLabel: Localized;
  estimateLabel: Localized;
  quoteCta: Localized;
  disclaimer: Localized;
  addonSeparator: Localized;
  noAddons: Localized;
  whatsappMessageTemplate: Localized;
  baseOptions: EstimatorBase[];
  scopesByBase: Record<BaseId, EstimatorScope[]>;
  addons: Addon[];
}

const pricingEstimator: PricingEstimatorData = {
  websiteTypeLabel: { en: "Website Type:", ar: "نوع الموقع" },
  scopeLabelByBase: {
    landing: { en: "Size", ar: "الحجم" },
    business: { en: "Size <span class='text-content-muted font-normal'>(no. of pages)</span>", ar: "الحجم <span class='text-content-muted font-normal'>(عدد الصفحات)</span>" },
  },
  addonsLabel: { en: "Add-ons:", ar: "الإضافات" },
  estimateLabel: { en: "Estimate:", ar: "تقدير السعر:" },
  quoteCta: { en: "Get an Official Quote", ar: "احصل على عرض سعر رسمي" },
  disclaimer: {
    en: "Final pricing is confirmed after consultation.",
    ar: "نُحدد السعر النهائي عند الاستشارة.",
  },
  addonSeparator: { en: ", ", ar: "، " },
  noAddons: { en: "None", ar: "بدون إضافات" },
  whatsappMessageTemplate: {
    en: `Hello, I just used the price calculator on your website and would like to discuss my project.

The Calculated Data:
- Type: {type}
- Size: {size}
- Add-ons: {addons}
- Calculated Price: {price} {currency}`,
    ar: `أنا استخدمت حاسبة الأسعار من خلال موقعكم و حابب اعرف تفاصيل أكتر.

البيانات المحسوبة:
- نوع الموقع: {type}
- حجم المحتوى: {size}
- الإضافات: {addons}
- التكلفة التقديرية: {price} {currency}`,
  },

  baseOptions: [
    {
      id: "landing",
      name: { en: "Landing Page", ar: "صفحة هبوط" },
      description: { en: "One page, one goal", ar: " موقع صفحة واحدة" },
      price: BASE_PRICES.landing,
    },
    {
      id: "business",
      name: { en: "Business Site", ar: "موقع شركة" },
      description: { en: "Multi-page website", ar: "موقع متعدد الصفحات" },
      price: BASE_PRICES.business,
    },
  ],

  scopesByBase: {
    landing: [
      {
        name: { en: "Essential", ar: "أساسي" },
        description: { en: "Under 5 pages", ar: "أقل من 5 صفحات" },
        multiplier: 0,
      },
      {
        name: { en: "Standard", ar: "قياسي" },
        description: { en: "6-10 pages", ar: "من 6 إلى 10 صفحات" },
        multiplier: 0.2,
      },
      {
        name: { en: "Full", ar: "شامل" },
        description: { en: "15+ pages", ar: "أكثر من 15 صفحة" },
        multiplier: 0.4,
      },
    ],
    business: [
      {
        name: { en: "Essential", ar: "أساسي" },
        description: { en: "< 5 pages", ar: "أقل من 5 صفحات" },
        multiplier: 0,
      },
      {
        name: { en: "Standard", ar: "قياسي" },
        description: { en: "6-10 pages", ar: "من 6 إلى 10 صفحات" },
        multiplier: 0.2,
      },
      {
        name: { en: "Full", ar: "شامل" },
        description: { en: "15+ pages", ar: "أكثر من 15 صفحة" },
        multiplier: 0.4,
      },
    ],
  },

  addons: [
    {
      id: "bilingual",
      name: { en: "Bilingual", ar: "ثنائي اللغة" },
      description: {
        en: "Full bilingual support",
        ar: "دعم كامل للغتين",
      },
      appliesTo: ["landing", "business"],
      isMultiplier: true,
      multiplierByBase: { landing: 0.3, business: 0.4 },
      price: 0,
      scalesWithScope: false,
    },
    {
      id: "seo",
      name: { en: "SEO Setup", ar: "إعداد SEO" },
      description: {
        en: "Technical SEO Setup",
        ar: "تهيئة لجوجل من البداية",
      },
      appliesTo: ["landing", "business"],
      isMultiplier: false,
      price: 1500,
      scalesWithScope: true,
    },
    {
      id: "copywriting",
      name: { en: "Copywriting", ar: "كتابة المحتوى" },
      description: {
        en: "We write the content",
        ar: "كتابة محتوى تسويقي",
      },
      appliesTo: ["landing", "business"],
      isMultiplier: false,
      price: 2500,
      scalesWithScope: true,
    },
    {
      id: "branding",
      name: { en: "Branding", ar: "الهوية البصرية" },
      description: {
        en: "Logo & visual identity",
        ar: "لوجو وهوية بصرية",
      },
      appliesTo: ["landing", "business"],
      isMultiplier: false,
      price: 3000,
      scalesWithScope: false,
    },
  ],
};

export default pricingEstimator;
