"use client";

import { useLanguage } from "@/app/contexts/LanguageContext";
import translations from "@/app/data/translations";

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();
  const label = lang === "ar" ? translations.langToggle.en : translations.langToggle.ar;

  return (
    <button
      onClick={toggleLang}
      aria-label={`Switch to ${lang === "ar" ? "English" : "Arabic"}`}
      className="min-w-[7rem] md:py-1 pt-1 pb-2 text-subheading md:text-base font-bold rounded-md border border-gray-600  text-white/60 hover:text-content-heading hover:border-brand-secondary transition-colors duration-300 text-center"
    >
      {label}
    </button>
  );
}
