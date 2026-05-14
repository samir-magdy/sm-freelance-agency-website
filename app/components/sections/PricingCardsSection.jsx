"use client";

import translations from "@/app/data/translations";
import { RevealSection } from "../ui/RevealSection";
import useSmoothScroll from "../ui/utils/SmoothScroll";

export default function PricingCardsSection({ lang }) {
  const t = translations.pricingCards;
  const isRtl = lang === "ar";
  const handleScroll = useSmoothScroll();

  return (
    <section
      id="pricing"
      className="relative py-4 md:py-8 px-4 md:px-6"
      aria-labelledby="pricing-cards-heading"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <RevealSection>
        <div className="flex flex-col items-center w-full max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 md:mb-16 text-center">
            <h2
              id="pricing-cards-heading"
              className="font-bold text-heading mb-2 rtl:mb-3"
            >
              {t.heading[lang]}
            </h2>
            <p className="text-center text-content-muted text-[clamp(1.2rem,2vw,1.6rem)]">
              {t.subheading[lang]}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full items-stretch">
            {t.cards.map((card) => (
              <a
                key={card.id}
                onClick={handleScroll}
                href="#contact"
                className="group flex flex-col h-full p-8 md:p-10 lg:p-12 rounded-[2rem] border border-border-subtle bg-surface-card hover:border-gold/40 hover:bg-surface-low hover:shadow-2xl hover:shadow-gold/5 transition-all duration-500 ease-out hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
              >
                {/* Top Half: Title & Tagline */}
                <div className="flex-1 mb-10">
                  <h3 className="font-bold text-2xl lg:text-3xl text-content-heading leading-snug mb-4">
                    {card.name[lang]}
                  </h3>
                  <p
                    className="text-content-muted text-base md:text-xl leading-relaxed [&_em]:font-medium"
                    dangerouslySetInnerHTML={{ __html: card.tagline[lang] }}
                  />
                </div>

                {/* Bottom Half: Price & CTA */}
                <div className="mt-auto pt-6 border-t border-border-subtle/50">
                  <div className="flex flex-col gap-1.5 mb-8">
                    <span className="text-[11px] md:text-[0.75rem] font-bold uppercase tracking-[0.2em] text-content-muted/70">
                      {t.startsAt[lang]}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl md:text-5xl font-bold text-gold tracking-tighter leading-none">
                        {card.price}
                      </span>
                      <span className="text-sm font-medium text-content-muted">
                        {t.currency[lang]}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-2.5 text-sm md:text-[1.05rem] font-semibold text-content-body group-hover:text-gold transition-colors duration-300">
                    {t.cta[lang]}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className={`transition-transform duration-300 ${
                        isRtl
                          ? "rotate-180 group-hover:-translate-x-1.5"
                          : "group-hover:translate-x-1.5"
                      }`}
                    >
                      <path
                        d="M3.333 8h9.334M8.667 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </RevealSection>
    </section>
  );
}