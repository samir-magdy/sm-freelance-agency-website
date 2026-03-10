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
      id="language-toggler"
      onClick={handleToggle}
      aria-label={`Switch to ${lang === "ar" ? "English" : "Arabic"}`}
      className="p-5 md:pt-0 md:ps-0 md:pe-2 ltr:pb-1 rtl:pb-0 text-subheading md:text-base font-bold font-cairo text-content-muted hover:text-content-heading text-center"
    >
      {label}
    </button>
  );
}
