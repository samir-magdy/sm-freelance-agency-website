import translations from "@/app/data/translations";
import PricingCard from "../ui/PricingCard";

export default function PricingSection({ lang }) {
  const t = translations.pricingSection;
  const isRtl = lang === "ar";

  return (
    <section
      id="pricing"
      className="relative px-4 overflow-hidden"
      aria-labelledby="pricing-heading"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Atmospheric background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 right-1/4 rtl:right-auto rtl:left-1/4 -translate-y-1/2 w-150 h-150 rounded-full bg-[radial-gradient(circle,oklch(from_var(--color-gold)_l_c_h/0.04),transparent_70%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-8 md:mb-16 text-center">
          <h2 id="pricing-heading" className="font-bold text-heading">
            {t.heading[lang]}
            <span className="sr-only">Egypt | مصر</span>
          </h2>
        </div>

        {/* Asymmetric cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 mx-auto lg:items-stretch">
          {t.tiers.map((tier) => (
            <PricingCard
              key={tier.name.en}
              tier={tier}
              lang={lang}
              ctaLabel={t.cta[lang]}
              whatsappMessage={t.whatsappMessage[lang]}
              deliveryLabel={t.deliveryLabel[lang]}
              currency={t.currency[lang]}
              includesLabel={t.includesLabel[lang]}
            />
          ))}
        </div>

        {/* Disclaimer */}
        <p className="mt-8 sm:mt-12 text-center text-sm sm:text-lg text-content-muted px-4">
          {t.disclaimer[lang]}
        </p>
      </div>
    </section>
  );
}
