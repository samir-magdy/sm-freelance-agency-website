"use client";

import { useRouter } from "next/navigation";
import type { Lang } from "@/app/data/translations";

const SECTION_IDS = [
  "home",
  "goals",
  "services",
  "add-ons",
  "portfolio",
  "how-it-works",
  "faq",
  "contact",
];

function getCurrentSection(): string {
  let bestId = "home";
  let bestDistance = Infinity;
  const viewportMiddle = window.innerHeight / 2;

  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    const distance = Math.abs(rect.top - viewportMiddle);
    if (
      rect.top <= viewportMiddle &&
      rect.bottom >= 0 &&
      distance < bestDistance
    ) {
      bestDistance = distance;
      bestId = id;
    }
  }

  return bestId;
}

export default function LanguageToggle({
  lang,
  label,
}: {
  lang: Lang;
  label: string;
}) {
  const router = useRouter();
  const nextLang: Lang = lang === "ar" ? "en" : "ar";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const section = getCurrentSection();
    const hash = section === "home" ? "" : `#${section}`;
    // Temporarily kill smooth scroll so the jump is instant
    document.documentElement.style.scrollBehavior = "auto";

    router.push(`/${nextLang}${hash}`);

    // Restore smooth scroll after navigation settles
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = "";
      history.replaceState(null, "", `/${nextLang}`);
    }, 1000);
  };

  return (
    <a
      id="language-toggler"
      href={`/${nextLang}`}
      onClick={handleClick}
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
    </a>
  );
}
