import { pricingCards } from "@/app/data/translations/pricingSection";
import type { Lang } from "@/app/types";

interface PricingSectionProps {
  lang: Lang;
}

export default function PricingSection({ lang }: PricingSectionProps) {
  const t = pricingCards;
  const isRtl = lang === "ar";

  return (
    <section
      id="pricing"
      className="relative flex py-4 px-4 sm:px-12 md:px-24 min-h-dvh items-start"
      aria-labelledby="pricing-cards-heading"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="reveal-element flex flex-col items-center w-full max-w-7xl mx-auto">
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

        <div className="grid grid-cols-1 gap-6 lg:gap-8">
          {t.cards.map((card) => (
            <a
              key={card.id}
              href="#contact"
              className="max-w-4xl reveal-element group flex flex-col p-6 sm:p-8 lg:p-10 rounded-4xl border border-border-subtle bg-surface-card hover:border-gold/20 hover:shadow-lg hover:shadow-white/10 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:-translate-x-1 rtl:hover:translate-x-1"
            >
              <div className="flex-1 mb-6">
                <h3 className="font-bold text-subheading lg:text-heading text-content-heading leading-snug mb-2">
                  {card.name[lang]}
                </h3>
                <p
                  className="text-content-muted text-base md:text-xl leading-relaxed [&_em]:font-medium"
                  dangerouslySetInnerHTML={{ __html: card.tagline[lang] }}
                />
              </div>

              <div className="mt-auto pt-4 border-t border-border-subtle/50">
                <div className="flex items-end justify-between gap-4">
                  {card.price ? (
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-content-muted/70 leading-none">
                        {t.startsAt[lang]}
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-heading font-bold text-gold tracking-tighter leading-none">
                          {card.price.toLocaleString()}
                        </span>
                        <span className="text-caption font-medium text-content-muted">
                          {t.currency[lang]}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-subheading md:text-heading font-bold text-gold tracking-tight leading-none">
                      {t.customPriceLabel[lang]}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-2 text-base font-semibold text-content-body group-hover:text-content-heading transition-colors duration-300">
                    {t.cta[lang]}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="rotate-90"
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
              </div>
            </a>
          ))}
        </div>
        <div className="reveal-element mt-8 sm:mt-12 flex flex-col items-center gap-3">
          <span className="text-content-muted text-base sm:text-lg font-medium">
            {t.estimatorLead[lang]}
          </span>
          <a
            href={`/${lang}/guides/website-cost-in-egypt#pricing-calculator`}
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-gold/15 bg-surface-card hover:border-gold/40 text-content-heading font-semibold text-base sm:text-lg transition-all duration-300"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="text-gold shrink-0"
            >
              <rect
                x="4"
                y="2.5"
                width="16"
                height="19"
                rx="2.5"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <line
                x1="7.5"
                y1="6.5"
                x2="16.5"
                y2="6.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <line x1="8" y1="11" x2="8" y2="11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="12" y1="11" x2="12" y2="11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="16" y1="11" x2="16" y2="11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="8" y1="15" x2="8" y2="15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="12" y1="15" x2="12" y2="15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="16" y1="15" x2="16" y2="18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
            {t.estimatorCta[lang]}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="shrink-0 rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
            >
              <path
                d="M3.333 8h9.334M8.667 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
