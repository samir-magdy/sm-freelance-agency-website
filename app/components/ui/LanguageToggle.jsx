"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LanguageToggle({ lang, label }) {
  const nextLang = lang === "ar" ? "en" : "ar";
  const pathname = usePathname();
  const segments = pathname.split('/');
  segments[1] = nextLang;
  const nextPath = segments.join('/');
  return (
    <Link
      id="language-toggler"
      href={nextPath}
      aria-label={`Switch to ${lang === "ar" ? "English" : "Arabic"}`}
      className="flex items-center px-2 md:p-0 gap-1.5 text-base md:text-[1.25rem] font-bold font-cairo text-content-muted hover:text-content-heading text-center"
    >
      <svg
        className="order-1 hidden sm:block w-5.5 h-5.5"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="transparent"
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
    </Link>
  );
}
