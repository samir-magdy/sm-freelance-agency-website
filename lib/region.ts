import { headers } from "next/headers";

export const REGIONS = ["EG", "SA", "AE", "GB", "EU", "US"] as const;

export type Region = (typeof REGIONS)[number];

export const DEFAULT_REGION: Region = "US";

const EUROZONE_COUNTRIES = [
  "AT", "BE", "CY", "DE", "EE", "ES", "FI", "FR", "GR", "HR",
  "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PT", "SI", "SK",
] as const;

const COUNTRY_TO_REGION: Readonly<Record<string, Region>> = {
  EG: "EG",
  SA: "SA",
  AE: "AE",
  GB: "GB",
  US: "US",
  ...Object.fromEntries(EUROZONE_COUNTRIES.map((code) => [code, "EU" as Region])),
};

export function regionForCountry(countryCode: string | null | undefined): Region {
  if (!countryCode) return DEFAULT_REGION;
  return COUNTRY_TO_REGION[countryCode.toUpperCase()] ?? DEFAULT_REGION;
}

const COUNTRY_HEADERS = ["x-vercel-ip-country", "cf-ipcountry"] as const;

export async function getRegion(): Promise<Region> {
  const requestHeaders = await headers();
  for (const headerName of COUNTRY_HEADERS) {
    const value = requestHeaders.get(headerName);
    if (value) return regionForCountry(value);
  }
  return DEFAULT_REGION;
}
