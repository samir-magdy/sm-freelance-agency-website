import Link from 'next/link';

export default function LanguageToggle({ lang, label }) {
  const nextLang = lang === "ar" ? "en" : "ar";
  return (
    <Link
      id="language-toggler"
      href={`/${nextLang}`}
      aria-label={`Switch to ${lang === "ar" ? "English" : "Arabic"}`}
      className="flex items-center gap-1 md:gap-1.5 ps-1 md:p-0 text-subheading md:text-[1.2rem] font-bold font-cairo text-content-muted hover:text-content-heading text-center"
    >
      <svg
        className="order-1 ltr:pt-0.5"
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
