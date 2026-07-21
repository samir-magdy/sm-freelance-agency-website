import type { Localized } from "@/app/types";

export type BaseId = "landing" | "business";

export interface EstimatorBase {
  id: BaseId;
  name: Localized;
  description: Localized;
  price: number;
}

export interface EstimatorScope {
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

export interface MultiplierAddon extends AddonBase {
  isMultiplier: true;
  multiplierByBase: Record<BaseId, number>;
  price: number;
  scalesWithScope: false;
}

export interface FlatAddon extends AddonBase {
  isMultiplier: false;
  price: number;
  scalesWithScope: boolean;
}

export type Addon = MultiplierAddon | FlatAddon;

interface PricingEstimatorData {
  baseLabel: Localized;
  scopeLabelByBase: Record<BaseId, Localized>;
  addonsLabel: Localized;
  estimateLabel: Localized;
  cta: Localized;
  disclaimer: Localized;
  bases: EstimatorBase[];
  scopesByBase: Record<BaseId, EstimatorScope[]>;
  addons: Addon[];
}

const pricingEstimator: PricingEstimatorData = {
  baseLabel: { en: "Website Type:", ar: "نوع الموقع" },
  scopeLabelByBase: {
    landing: { en: "Content Size <span class='text-content-muted font-normal'>(no. of pages)</span>", ar: "حجم المحتوى <span class='text-content-muted font-normal'>(عدد الصفحات)</span>" },
    business: { en: "Content Size <span class='text-content-muted font-normal'>(no. of pages)</span>", ar: "حجم المحتوى <span class='text-content-muted font-normal'>(عدد الصفحات)</span>" },
  },
  addonsLabel: { en: "Add-ons:", ar: "الإضافات" },
  estimateLabel: { en: "Estimate:", ar: "تقدير السعر:" },
  cta: { en: "Get an Official Quote", ar: "احصل على عرض سعر رسمي" },
  disclaimer: {
    en: "The price displayed is an estimate. Final pricing is confirmed after consultation.",
    ar: "السعر المعروض تقدير تقريبي. نعرض السعر النهائي عند التواصل.",
  },

  bases: [
    {
      id: "landing",
      name: { en: "Landing Page", ar: "صفحة هبوط" },
      description: { en: "One page, one goal", ar: " موقع صفحة واحدة" },
      price: 5999,
    },
    {
      id: "business",
      name: { en: "Business Site", ar: "موقع شركة" },
      description: { en: "Multi-page website", ar: "موقع متعدد الصفحات" },
      price: 8999,
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
        description: { en: "30+ pages", ar: "أكثر من 30 صفحة" },
        multiplier: 0.4,
      },
    ],
    business: [
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
        description: { en: "30+ pages", ar: "أكثر من 30 صفحة" },
        multiplier: 0.4,
      },
    ],
  },

  addons: [
    {
      id: "bilingual",
      name: { en: "Bilingual", ar: "ثنائي اللغة" },
      description: {
        en: "Full Bilingual support",
        ar: "دعم كامل لللغتين",
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
      id: "cms",
      name: { en: "Admin Panel", ar: "لوحة تحكم" },
      description: {
        en: "Edit content yourself",
        ar: "تعديل المحتوى بنفسك",
      },
      appliesTo: ["landing", "business"],
      isMultiplier: false,
      price: 3000,
      scalesWithScope: false,
    },
  ],
};

export default pricingEstimator;
