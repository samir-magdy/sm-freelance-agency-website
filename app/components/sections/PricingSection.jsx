import translations from "@/app/data/translations";
import PricingEstimator from "../ui/PricingEstimator"; // <-- Import the new widget

export default function PricingSection({ lang }) {
  const t = translations.pricingSection;
  const isRtl = lang === "ar";

  return (
    <section
      id="pricing"
      className="relative py-1 md:pt-8 px-4 overflow-hidden "
      aria-labelledby="pricing-heading"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Atmospheric background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 right-1/4 rtl:right-auto rtl:left-1/4 -translate-y-1/2 w-150 h-150 rounded-full bg-[radial-gradient(circle,oklch(from_var(--color-gold)_l_c_h/0.03),transparent_70%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-6 md:mb-8 text-center">
          <h2 id="pricing-heading" className="font-bold text-heading mb-2 rtl:mb-3">
            {t.heading[lang]}
          </h2>
      <p className="text-center text-content-muted sm:text-xl">
          {t.subheading[lang]}
        </p>
        </div>
        <div className="md:py-8">
        <PricingEstimator lang={lang} />
        </div>
      </div>
    </section>
  );
}