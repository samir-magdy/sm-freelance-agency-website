import translations from "@/app/data/translations";
import {
  MonitorSmartphone,
  Globe,
  Search,
  Zap,
  MessageCircle,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

const featureIcons = [
  ShieldCheck,
  MonitorSmartphone,
  Zap,
  Globe,
  Search,
  MessageCircle,
  RefreshCw,
];

export default function ServicesSection({ lang }) {
  const t = translations.servicesSection;
  const isRtl = lang === "ar";

  return (
    <section
      id="features"
      className="py-20 md:py-36 px-4"
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
          <div className="relative flex flex-wrap justify-center gap-4 md:gap-6">
            {t.sharedFeatures.map((feature, i) => {
              const Icon = featureIcons[i];
              return (
                <div
                  key={feature.en}
                  className={`w-full sm:w-[calc(50%-8px)] md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] text-center group bg-surface-card/80 relative overflow-hidden rounded-2xl border border-border-subtle py-6 px-4 shadow-lg hover:-translate-y-1.5 hover:border-border-strong transition-all duration-300`}
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
