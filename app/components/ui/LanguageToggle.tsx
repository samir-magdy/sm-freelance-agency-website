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
      className="flex items-center gap-2 text-subheading md:text-[1.2rem] font-bold font-cairo text-content-muted hover:text-content-heading text-center"
    >
      <svg
        className="hidden md:block order-1 ltr:pt-0.5"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="black"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
      {label}
    </button>
  );
}
