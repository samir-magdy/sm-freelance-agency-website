"use client";

import { useRef, useState, useCallback } from "react";
import type { Lang } from "@/app/data/translations";

const placeholder = { en: "Search questions...", ar: "ابحث عن سؤالك..." };
const noResultsText = {
  en: "No matching questions found.",
  ar: "لم يتم العثور على أسئلة مطابقة.",
};

/** Normalize Arabic text for fuzzy matching */
function normalizeArabic(text: string): string {
  return text
    .replace(/[إأآٱ]/g, "ا") // alef variants → bare alef
    .replace(/ى/g, "ي")      // alef maksura → ya
    .replace(/ة/g, "ه")      // taa marbuta → ha
    .replace(/ؤ/g, "و")      // waw hamza → waw
    .replace(/ئ/g, "ي")      // ya hamza → ya
    .replace(/[\u064B-\u065F\u0670]/g, ""); // strip tashkeel (diacritics)
}

export default function FAQSearch({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  const isRtl = lang === "ar";
  const listRef = useRef<HTMLDivElement>(null);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const q = normalizeArabic(e.target.value.toLowerCase().trim());
      const items = listRef.current?.querySelectorAll<HTMLElement>(
        "details[data-search]"
      );
      if (!items) return;

      let visible = 0;
      items.forEach((el) => {
        const text = normalizeArabic(el.dataset.search ?? "");
        const match = !q || text.includes(q);
        el.style.display = match ? "" : "none";
        if (match) visible++;
      });
      setNoResults(q.length > 0 && visible === 0);
    },
    []
  );

  return (
    <>
      {/* Search input */}
      <div className="w-full max-w-xl px-8 pt-8">
        <label htmlFor="faq-search" className="sr-only">
          {placeholder[lang]}
        </label>
        <div className="relative">
          <svg
            className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted pointer-events-none ${
              isRtl ? "right-0" : "left-0"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          <input
            id="faq-search"
            type="search"
            onChange={handleSearch}
            placeholder={placeholder[lang]}
            className={`w-full bg-transparent border-b border-border-subtle py-3 text-base text-content-body placeholder:text-content-muted focus-visible:border-content-muted focus-visible:outline-none transition-colors ${
              isRtl ? "pr-6 pl-0" : "pl-6 pr-0"
            }`}
          />
        </div>
      </div>

      {/* Server-rendered FAQ items */}
      <div ref={listRef} className="w-full pt-5">
        {children}
      </div>

      {/* No results message */}
      {noResults && (
        <p className="text-content-muted text-base text-center py-10">
          {noResultsText[lang]}
        </p>
      )}
    </>
  );
}
