"use client";

import { useRef, useState, useCallback } from "react";

const placeholder = { en: "Search questions...", ar: "ابحث في الأسئلة..." };
const noResultsText = {
  en: "No matching questions found.",
  ar: "لم يتم العثور على أسئلة مطابقة.",
};

/** Normalize Arabic text for fuzzy matching */
function normalizeArabic(text) {
  return text
    // Alef variants → bare alef (includes wavy hamza forms U+0672/0673/0675 and alef wasla U+0671)
    .replace(/[إأآٱٲٳٵ\u0622-\u0623\u0625]/g, "ا")
    // Ya and alef maksura variants → ya (includes Farsi ya U+06CC, and ya hamza U+0626)
    .replace(/[ىئی\u06CC]/g, "ي")
    // Taa marbuta → ha
    .replace(/ة/g, "ه")
    // Waw hamza → waw
    .replace(/ؤ/g, "و")
    // Farsi/Urdu kaf → Arabic kaf
    .replace(/[ک\u06A9\u06AA]/g, "ك")
    // Remove tatweel (kashida elongation mark)
    .replace(/ـ/g, "")
    // Strip tashkeel: standard diacritics, superscript alef, and Quranic annotation marks
    .replace(/[\u064B-\u065F\u0610-\u061A\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g, "")
    // Remove zero-width non-joiner and zero-width joiner
    .replace(/[\u200C\u200D]/g, "");
}

export default function FAQSearch({ lang, children }) {
  const isRtl = lang === "ar";
  const listRef = useRef(null);
  const [query, setQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const applyFilter = useCallback((value) => {
    const q = normalizeArabic(value.toLowerCase().trim());
    const items = listRef.current?.querySelectorAll(
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
  }, []);

  const handleSearch = useCallback(
    (e) => {
      setQuery(e.target.value);
      applyFilter(e.target.value);
    },
    [applyFilter]
  );

  const handleClear = useCallback(() => {
    setQuery("");
    applyFilter("");
  }, [applyFilter]);

  return (
    <>
      {/* Search input */}
      <div className="w-full max-w-xl px-8 md:pt-8">
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
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder={placeholder[lang]}
            className={`w-full bg-transparent border-b border-border-subtle py-3 text-base text-content-body placeholder:text-content-muted focus-visible:border-content-muted focus-visible:outline-none transition-colors ${
              isRtl ? "pr-6 pl-6" : "pl-6 pr-6"
            }`}
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className={`absolute top-1/2 -translate-y-1/2 text-content-muted hover:text-content-body transition-colors ${
                isRtl ? "left-0" : "right-0"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
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
