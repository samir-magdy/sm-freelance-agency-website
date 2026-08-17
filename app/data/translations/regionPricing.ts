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
