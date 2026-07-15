import Link from "next/link";
import faqSection from "@/app/data/translations/faqSection";
import type { Lang } from "@/app/types";

interface FAQSectionProps {
  lang: Lang;
}

export default function FAQSection({ lang }: FAQSectionProps) {
  const t = faqSection;
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <section
      id="FAQs"
      aria-labelledby="FAQs-heading"
      className="py-4 px-4"
      dir={dir}
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <div className="reveal-element mb-6 md:mb-12 text-center">
          <h2
            id="FAQs-heading"
            className="font-bold text-heading mb-2 rtl:mb-3"
          >
            {t.heading[lang]}
          </h2>
          <p className="text-center text-content-muted text-[clamp(1.2rem,2vw,1.6rem)]">
            {t.subheading[lang]}
          </p>
        </div>
        <div className="w-full">
          {t.items.map((item, i) => (
            <details
              key={i}
              name="faq"
              className="reveal-element border-b border-border-subtle px-2"
            >
              <summary
                className={`
                  flex items-center w-full py-6 md:py-7 cursor-pointer
                  list-none [&::-webkit-details-marker]:hidden
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border-strong focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-sm
                `}
              >
                <div className="relative shrink-0 w-5 h-5 me-5">
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-0.5 rounded-full bg-icon" />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-3 rounded-full bg-icon [details[open]_&]:rotate-90" />
                </div>

                <h3 className="text-content-heading font-normal tracking-wide text-base sm:text-subheading">
                  {item.question[lang]}
                </h3>
              </summary>

              <div className="pb-6 md:pb-7 ps-10">
                <p
                  className="html-content text-base sm:text-xl text-content-muted/95 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.answer[lang] }}
                />
              </div>
            </details>
          ))}
        </div>
        <div className="reveal-element mt-2 sm:mt-8 w-full flex flex-col items-center gap-5 py-8">
          <p className="text-[clamp(1.4rem,2vw,1.6rem)] font-medium text-content-heading tracking-wide">
            {t.ctaHeading[lang]}
          </p>
          <div className="flex flex-col items-center gap-2.5 sm:gap-4">
            <a
              href="#contact"
              className="cta-primary rtl:pb-3 mb-2 sm:mb-0 shrink-0 py-2.5 px-6 rounded-lg text-gray-900 text-[clamp(1rem,4.5vw,1.3rem)] font-semibold tracking-wide"
            >
              {t.cta[lang]}
            </a>
            <Link
              href={`/${lang}/guides`}
              className="group flex items-center gap-1.5 text-content-body hover:text-content-heading text-base transition-colors duration-200"
            >
              <span className="text-content-muted/90">
                {lang === "ar" ? "أو" : "or"}
              </span>
              {t.browseGuides[lang]}
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
