export type Lang = "en" | "ar";

export const LANGS: readonly Lang[] = ["en", "ar"] as const;

export function isLang(value: unknown): value is Lang {
  return value === "en" || value === "ar";
}

export type Localized<T = string> = Record<Lang, T>;

export type LangParams = { lang: Lang };
export type LangSlugParams = { lang: Lang; slug: string };
