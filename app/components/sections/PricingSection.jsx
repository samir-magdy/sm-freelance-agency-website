"use client";

import translations from "@/app/data/translations";
import useSmoothScroll from "../utils/SmoothScroll";

export default function PricingCardsSection({ lang }) {
  const t = translations.pricingCards;
  const isRtl = lang === "ar";
  const handleScroll = useSmoothScroll();

  return (
  <section
  id="pricing"
  className="relative py-4 px-4 md:px-6"
  aria-labelledby="pricing-cards-heading"
  dir={isRtl ? "rtl" : "ltr"}
>
        <div className="reveal-element flex flex-col items-center w-full max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-6 md:mb-10  text-center">
            <h2
              id="pricing-cards-heading"
              className="font-bold text-heading mb-2 rtl:mb-3 leading-tight"
            >
              {t.heading[lang]}
            </h2>
            <p className="text-center text-content-muted text-[clamp(1.2rem,2vw,1.6rem)] max-w-2xl mx-auto">
              {t.subheading[lang]}
            </p>
          </div>

          {/* Cards Grid - Added md:grid-cols-2 to handle scaled screens gracefully */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 lg:gap-8 w-full items-stretch">
            {t.cards.map((card) => (
              <a
                key={card.id}
                onClick={handleScroll}
                href="#contact"
                /* Trimmed internal padding slightly for mobile/scaled views */
                className="reveal-element group flex flex-col p-6 sm:p-8 lg:p-10 rounded-[2rem] border border-border-subtle bg-surface-card hover:border-gold/40 hover:bg-surface-low hover:shadow-2xl hover:shadow-gold/5 transition-all duration-500 ease-out hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
              >
                {/* Top Half: Title & Tagline */}
                {/* Reduced mb-10 to mb-6 to stop vertical bloating */}
                <div className="flex-1 mb-6">
                  <h3 className="font-bold text-subheading lg:text-heading text-content-heading leading-snug mb-2">
                    {card.name[lang]}
                  </h3>
                  <p
                    className="text-content-muted text-caption md:text-xl leading-relaxed [&_em]:font-medium"
                    dangerouslySetInnerHTML={{ __html: card.tagline[lang] }}
                  />
                </div>

                {/* Bottom Half: Price & CTA */}
                <div className="mt-auto pt-4 border-t border-border-subtle/50">
                  {/* Reduced mb-8 to mb-6 */}
                  <div className="flex flex-col gap-1 mb-6">
                    <span className="text-caption font-bold uppercase tracking-[0.2em] text-content-muted/70 leading-none">
                      {t.startsAt[lang]}
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-heading font-bold text-gold tracking-tighter leading-none">
                        {card.price}
                      </span>
                      <span className="text-caption font-medium text-content-muted">
                        {t.currency[lang]}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-2 text-caption md:text-base font-semibold text-content-body group-hover:text-gold transition-colors duration-300">
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
    </section>
  );
}