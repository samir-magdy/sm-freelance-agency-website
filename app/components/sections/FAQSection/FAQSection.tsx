import Link from "next/link";
import faqSection from "@/app/data/translations/faqSection";
import type { Lang } from "@/app/types";
import FAQAccordion from "./FAQAccordion";

interface FAQSectionProps {
  lang: Lang;
}

export default function FAQSection({ lang }: FAQSectionProps) {
  const translations = faqSection;

  return (
    <section
      id="FAQs"
      aria-labelledby="FAQs-heading"
      className="py-4 px-4 sm:px-8"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <div className="reveal-element mb-6 md:mb-12 text-center">
          <h2
            id="FAQs-heading"
            className="font-bold text-heading mb-2 rtl:mb-3"
          >
            {translations.heading[lang]}
          </h2>
          <p className="text-center text-content-muted text-[clamp(1.2rem,2vw,1.6rem)]">
            {translations.subheading[lang]}
          </p>
        </div>
        <FAQAccordion items={translations.items} lang={lang} />
        <div className="reveal-element mt-2 sm:mt-8 w-full flex flex-col items-center gap-5 py-8">
          <p className="text-[clamp(1.4rem,2vw,1.6rem)] font-medium text-content-heading tracking-wide">
            {translations.ctaLabel[lang]}
          </p>
          <div className="flex flex-col items-center gap-2.5 sm:gap-4">
            <a
              href="#contact"
              className="cta-primary rtl:pb-3 mb-2 sm:mb-0 shrink-0 py-2.5 px-6 rounded-lg text-background text-[clamp(1rem,4.5vw,1.3rem)] font-semibold tracking-wide"
            >
              {translations.cta[lang]}
            </a>
            <Link
              href={`/${lang}/guides`}
              className="ps-3 group flex items-center gap-1.5 text-content-body hover:text-content-heading text-base transition-colors duration-200"
            >
              <span className="text-content-muted/90">
                {translations.orDivider[lang]}
              </span>
              {translations.browseGuides[lang]}
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className={`w-5 h-5 rtl:sm:w-6 rtl:sm:h-6 shrink-0 transition-transform duration-300 sm:pt-1 ${lang === "ar" ? "sm:pb-1.5 rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1 "}`}
                aria-hidden="true"
              >
                <path
                  d="M3.333 8h9.334M8.667 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
