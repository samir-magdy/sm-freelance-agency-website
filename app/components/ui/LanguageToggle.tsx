"use client";

import { useRouter } from "next/navigation";
import translations from "@/app/data/translations";
import type { Lang } from "@/app/data/translations";

export default function LanguageToggle({ lang }: { lang: Lang }) {
  const router = useRouter();
  const label = lang === "ar" ? translations.langToggle.en : translations.langToggle.ar;

  const handleToggle = () => {
    const nextLang: Lang = lang === "ar" ? "en" : "ar";
    router.push(`/${nextLang}`);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={`Switch to ${lang === "ar" ? "English" : "Arabic"}`}
      className="min-w-[7rem] md:py-1 pt-1 pb-2 text-subheading md:text-base font-bold text-content-muted hover:text-content-heading transition-colors duration-300 text-center"
    >
      {label}
    </button>
  );
}
