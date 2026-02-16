"use client";

import { useLanguage } from "@/app/contexts/LanguageContext";
import translations from "@/app/data/translations";

export default function FAQSection() {
  const { lang } = useLanguage();
  const t = translations.faqSection;
  const dir = lang === "ar" ? "rtl" : "ltr";
  const isRtl = lang === "ar";

  return (
    <section id="faq" className="py-20 md:py-32" dir={dir}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <div className="mb-4">
          <h2
            className="font-bold text-heading text-content-heading text-center mb-2"
          >
            {t.heading[lang]}
          </h2>
          <p className="text-content-body text-center text-base md:text-heading mb-6">
            {t.subtitle[lang]}
          </p>
        </div>

        <div className="w-full pt-5 ">
          {t.items.map((item, i) => (
            <details
              key={i}
              name="faq"
              className="border-b border-border-subtle first:border-t-none"
            >
              <summary
                className={`
                  flex items-center w-full py-6 md:py-7 cursor-pointer
                  list-none [&::-webkit-details-marker]:hidden
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border-strong focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-sm
                `}
              >
                <div className={`relative flex-shrink-0 w-5 h-5 ${isRtl ? "ml-5" : "mr-5"}`}>
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-px bg-content-muted [details[open]_&]:bg-content-body" />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-3 bg-content-muted [details[open]_&]:h-0 [details[open]_&]:opacity-0" />
                </div>

                <h3 className="text-content-body font-normal tracking-wide text-subheading">
                  {item.question[lang]}
                </h3>
              </summary>

              <div className={`pb-6 md:pb-7 ${isRtl ? "pr-10" : "pl-10"}`}>
                <p className="text-base text-content-muted leading-relaxed">
                  {item.answer[lang]}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
