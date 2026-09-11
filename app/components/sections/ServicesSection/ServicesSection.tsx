import Link from "next/link";
import {
  servicesSectionTranslations,
  BASE_PRICES,
  EGP_SYMBOL,
} from "@/app/data/translations/servicesSection";
import SpecializedServiceIcon from "@/app/components/utils/SpecializedServiceIcon";
import type { Lang } from "@/app/types";
import HeroPrimaryCta from "../../utils/HeroPrimaryCta";

interface ServicesSectionProps {
  lang: Lang;
  isEgypt: boolean;
}

const PRICE_FORMATTER = new Intl.NumberFormat("en-US");

// Maps a service card to the matching `goal` answer in the quote form, so
// clicking a card's CTA can pre-answer that question instead of asking again.
const CARD_GOAL: Record<string, string> = {
  landing: "landing",
  business: "business",
  customApp: "custom",
};

function StartingPrice({
  amount,
  symbol,
  startsAtLabel,
}: {
  amount: string;
  symbol: string;
  startsAtLabel: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-content-muted/70 leading-none">
        {startsAtLabel}
      </span>
      <div className="flex items-end gap-1.5">
        <span className="text-[clamp(1.6rem,2vw,2rem)] font-bold text-gold tracking-tighter leading-none">
          {amount}
        </span>
        <span className="text-base sm:text-[clamp(1rem,1.25vw,1.4rem)] font-medium text-content-muted leading-none -translate-y-0.5">
          {symbol}
        </span>
      </div>
    </div>
  );
}

export default function ServicesSection({
  lang,
  isEgypt,
}: ServicesSectionProps) {
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
          <h2 className="font-bold text-heading mb-2 rtl:mb-3 leading-tight">
            {translations.heading[lang]}
          </h2>
          <p className="text-center text-content-muted text-[clamp(1.2rem,2vw,1.6rem)] max-w-2xl mx-auto">
            {translations.subheading[lang]}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:gap-8">
          {translations.cards.map((card) => {
            // Pricing is shown only to visitors detected as being in Egypt.
            const priceAmount =
              isEgypt && card.priceBaseId
                ? PRICE_FORMATTER.format(BASE_PRICES[card.priceBaseId])
                : null;
            const showCustomLabel = isEgypt && !card.priceBaseId;
            return (
              <div
                key={card.id}
                className="max-w-4xl reveal-element flex flex-col p-6 sm:p-8 sm:pb-6  rounded-4xl border border-border-subtle bg-surface-card hover:border-white/10 hover:shadow-lg hover:shadow-gold/5 transition-all duration-500 ease-out hover:-translate-y-1 hover:-translate-x-1 rtl:hover:translate-x-1"
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
                  <div
                    className={`flex items-center gap-4 ${
                      priceAmount || showCustomLabel
                        ? "justify-between"
                        : "justify-end"
                    }`}
                  >
                    {priceAmount ? (
                      <StartingPrice
                        amount={priceAmount}
                        symbol={EGP_SYMBOL[lang]}
                        startsAtLabel={translations.startsAt[lang]}
                      />
                    ) : showCustomLabel ? (
                      <span className="text-xl rtl:text-lg sm:text-3xl rtl:sm:text-2xl font-bold text-gold tracking-tight leading-none">
                        {translations.customPriceLabel[lang]}
                      </span>
                    ) : null}
                    <HeroPrimaryCta
                      label={translations.contactCta[lang]}
                      goal={CARD_GOAL[card.id]}
                      className={`cta-primary text-background items-center gap-1.5 sm:gap-3 px-4 sm:px-6 py-3 rounded-2xl border font-semibold text-base sm:text-lg transition-all duration-300 cursor-pointer shrink-0 ${!isEgypt ? "w-full justify-center" : ""}`}
                    >
                      {translations.contactCta[lang]}
                    </HeroPrimaryCta>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="reveal-element mt-12 w-full max-w-4xl flex flex-col items-center">
          <div className="flex items-center gap-4 w-full max-w-xs sm:max-w-md mb-4 sm:mb-1.5">
            <span aria-hidden className="h-px flex-1 bg-border-subtle" />
            <span className="text-caption safari:text-base font-bold uppercase tracking-[0.3em] text-content-muted/90 whitespace-nowrap">
              {translations.specializedServicesLabel[lang]}
            </span>
            <span aria-hidden className="h-px flex-1 bg-border-subtle" />
          </div>
          <ul className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 xl:w-full gap-y-10 sm:gap-y-8 gap-x-2 w-full sm:w-3/4">
            {translations.specializedServices.map((svc) => (
              <li key={svc.id} className="flex justify-center">
                <Link
                  href={`/${lang}/services#${svc.id}`}
                  className="group inline-flex flex-col items-center gap-4 text-center outline-none transition-transform duration-300"
                >
                  <span className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl border border-border-subtle bg-surface-card/50 text-gold transition-all duration-300 group-hover:border-border-strong group-hover:bg-surface-card group-focus-visible:border-gold/40">
                    <SpecializedServiceIcon
                      id={svc.id}
                      className="size-8 sm:size-10"
                    />
                  </span>
                  <span className="ms-2.5 inline-flex items-center gap-1.5 sm:gap-2.5 text-base font-medium text-content-body leading-tight transition-colors duration-300 group-hover:text-content-heading group-focus-visible:text-content-heading">
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
      </div>
    </section>
  );
}
