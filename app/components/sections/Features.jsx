import translations from "@/app/data/translations";
import {
  MonitorSmartphone,
  Globe,
  Search,
  Zap,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

// Keyed by feature.iconKey so order/length drift between data and icons
// can no longer crash the component. A missing key throws explicitly.
const FEATURE_ICONS = {
  guarantee: ShieldCheck,
  responsive: MonitorSmartphone,
  performance: Zap,
  hosting: Globe,
  seo: Search,
  maintenance: RefreshCw,
};

export default function FeaturesSection({ lang }) {
  const t = translations.featuresSection;
  const isRtl = lang === "ar";

  return (
    <section
      id="features"
      className="px-4"
      aria-labelledby="features-heading"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12 text-center">
          <h2
            id="features-heading"
            className="font-bold text-heading"
          >
            {t.heading[lang]}
          </h2>
        </div>

        {/* Every project includes */}
        <div className="relative mb-16 md:mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {t.sharedFeatures.map((feature) => {
              const Icon = FEATURE_ICONS[feature.iconKey];
              if (!Icon) {
                throw new Error(
                  `FeaturesSection: no icon mapped for iconKey "${feature.iconKey}"`,
                );
              }
              return (
                <div
                  key={feature.iconKey}
                  className="text-center group bg-surface-card/80 relative overflow-hidden rounded-2xl border border-border-subtle py-6 px-4 shadow-lg hover:-translate-y-1.5 hover:border-border-strong transition-all duration-300"
                >
                  <div className="relative space-y-3">
                    <div className="mx-auto flex items-center justify-center transition-all duration-300">
                      <Icon
                        className="w-12 h-12 md:w-16 md:h-16 text-icon"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="font-semibold text-subheading text-content-heading">
                      {feature[lang]}
                    </h3>
                    <p className="leading-relaxed text-content-body md:text-base">
                      {feature.desc[lang]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}