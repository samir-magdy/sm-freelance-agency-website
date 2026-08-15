import Link from "next/link";
import { servicesSectionTranslations } from "@/app/data/translations/servicesSection";
import {
  BASE_PRICES,
  formatPrice,
  type FormattedPrice,
} from "@/app/data/translations/pricingEstimator";
import SpecializedServiceIcon from "@/app/components/utils/SpecializedServiceIcon";
import type { Lang } from "@/app/types";
import type { Region } from "@/lib/region";

interface ServicesSectionProps {
  lang: Lang;
  region: Region;
}

function StartingPrice({
  price,
  startsAtLabel,
}: {
  price: FormattedPrice;
  startsAtLabel: string;
}) {
  const amountNode = (
    <span className="text-heading font-bold text-gold tracking-tighter leading-none">
      {price.amount}
    </span>
  );
  const symbolNode = (
    <span className="text-base sm:text-[clamp(1rem,1.4vw,1.5rem)] font-medium text-content-muted leading-none -translate-y-1">
      {price.symbol}
    </span>
  );

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-content-muted/70 leading-none">
        {startsAtLabel}
      </span>
      <div className="flex items-end gap-1.5">
        {price.position === "before" ? (
          <>
            {symbolNode}
            {amountNode}
          </>
        ) : (
          <>
            {amountNode}
            {symbolNode}
          </>
        )}
      </div>
    </div>
  );
}

export default function ServicesSection({ lang, region }: ServicesSectionProps) {
  const translations = servicesSectionTranslations;
  const isRtl = lang === "ar";

  return (
    <section
      id="services"
      className="relative flex py-4 px-4 sm:px-8 min-h-dvh items-start"
      aria-labelledby="services-cards-heading"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="reveal-element flex flex-col items-center w-full max-w-7xl mx-auto">
        <div className="mb-6 md:mb-10  text-center">
          <h2
            className="font-bold text-heading mb-2 rtl:mb-3 leading-tight"
          >
            {translations.heading[lang]}
          </h2>
          <p className="text-center text-content-muted text-[clamp(1.2rem,2vw,1.6rem)] max-w-2xl mx-auto">
            {translations.subheading[lang]}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:gap-8">
          {translations.cards.map((card) => {
            const price = card.priceBaseId
              ? formatPrice(BASE_PRICES[card.priceBaseId][region], region, lang)
              : null;
            return (
            <a
              key={card.id}
              href="#contact"
              className="max-w-4xl reveal-element group flex flex-col p-6 sm:p-8 lg:p-10 rounded-4xl border border-border-subtle bg-surface-card hover:border-white/10 hover:shadow-lg hover:shadow-gold/5 transition-all duration-500 ease-out hover:-translate-y-1 hover:-translate-x-1 rtl:hover:translate-x-1"
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
                  {price ? (
                    <StartingPrice
                      price={price}
                      startsAtLabel={translations.startsAt[lang]}
                    />
                  ) : (
                    <span className="text-xl rtl:text-lg sm:text-3xl rtl:sm:text-2xl font-bold text-gold tracking-tight leading-none pb-0.5 rtl:pb-1">
                      {translations.customPriceLabel[lang]}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-2 text-base font-semibold text-content-body group-hover:text-content-heading transition-colors duration-300">
                    {translations.contactCta[lang]}
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
            );
          })}
        </div>
        <div className="reveal-element mt-12 w-full max-w-4xl flex flex-col items-center">
          <div className="flex items-center gap-4 w-full max-w-xs sm:max-w-md mb-4 sm:mb-1.5">
            <span aria-hidden className="h-px flex-1 bg-border-subtle" />
            <span className="text-caption font-bold uppercase tracking-[0.3em] text-content-muted/90 whitespace-nowrap">
              {translations.specializedServicesLabel[lang]}
            </span>
            <span aria-hidden className="h-px flex-1 bg-border-subtle" />
          </div>
          <ul className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-y-10 sm:gap-y-8 gap-x-4 sm:gap-x-12 w-full max-w-sm sm:max-w-none sm:w-fit">
            {translations.specializedServices.map((svc) => (
              <li key={svc.id} className="flex justify-center">
                <Link
                  href={`/${lang}/services#${svc.id}`}
                  className="group inline-flex flex-col items-center gap-4 text-center outline-none transition-transform duration-300"
                >
                  <span className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl border border-border-subtle bg-surface-card/50 text-gold transition-all duration-300 group-hover:border-border-strong group-hover:bg-surface-card group-focus-visible:border-gold/40">
                    <SpecializedServiceIcon id={svc.id} className="size-8 sm:size-10" />
                  </span>
                  <span className="ms-2.5 inline-flex items-center gap-2.5 text-base font-medium text-content-body leading-tight transition-colors duration-300 group-hover:text-content-heading group-focus-visible:text-content-heading">
                    {svc.name[lang]}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="shrink-0 text-content-muted/70 rtl:rotate-180 transition-all duration-300 group-hover:text-white/80 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 group-focus-visible:text-gold"
                    >
                      <path
                        d="M3.333 8h9.334M8.667 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal-element mt-10 sm:mt-14 flex flex-col items-center gap-3">
          <span className="text-content-muted text-base sm:text-lg font-medium">
            {translations.estimatorLead[lang]}
          </span>
          <Link
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
            {translations.estimatorCta[lang]}
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
          </Link>
        </div>
      </div>
    </section>
  );
}
