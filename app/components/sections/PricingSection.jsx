import translations from "@/app/data/translations";
import PricingEstimator from "../ui/PricingEstimator"; // <-- Import the new widget

export default function PricingSection({ lang }) {
  const t = translations.pricingSection;
  const isRtl = lang === "ar";

  return (
    <section
      id="pricing"
      className="relative py-1 md:pt-4 px-4"
      aria-labelledby="pricing-heading"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="flex flex-col items-center w-full">
        {/* Heading */}
        <div className="mb-6 md:mb-8 text-center">
          <h2
            id="pricing-heading"
            className="font-bold text-heading mb-2 rtl:mb-3"
          >
            {t.heading[lang]}
          </h2>
          <p className="text-center text-content-muted text-[clamp(1.2rem,2vw,1.6rem)]">
            {t.subheading[lang]}
          </p>
        </div>

        <PricingEstimator lang={lang} />
      </div>
    </section>
  );
}
