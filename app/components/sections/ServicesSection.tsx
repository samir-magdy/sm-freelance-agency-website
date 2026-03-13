import type { Lang } from "@/app/data/translations";
import translations from "@/app/data/translations";
import { MonitorSmartphone, Search, Zap, MessageCircle, ShieldCheck, RefreshCw } from "lucide-react";

const featureIcons = [ShieldCheck, MonitorSmartphone, Zap, Search, MessageCircle, RefreshCw];

export default function ServicesSection({ lang }: { lang: Lang }) {
  const t = translations.servicesSection;
  const isRtl = lang === "ar";

  return (
    <section
      id="services"
      className="py-24 md:py-36 px-4"
      aria-labelledby="services-heading"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 md:mb-12 text-center">
          <h2
            id="services-heading"
            className="font-bold text-heading text-center mb-2"
          >
            {t.heading[lang]}
          </h2>
          <p className="text-content-body text-center text-base md:text-subheading">
            {t.subtitle[lang]}
          </p>
        </div>

        {/* Every project includes */}
        <div className="relative mb-16 md:mb-20">


          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {t.sharedFeatures.map((feature, i) => {
              const Icon = featureIcons[i];
              return (

                <div
                  key={feature.en}
                  className={`text-center group bg-surface-card/80 relative overflow-hidden rounded-2xl border border-border-subtle py-6 px-4 shadow-lg hover:-translate-y-1.5 hover:border-border-strong transition-all duration-300`}
                >
                  <div aria-hidden="true" />

                  <div className="relative space-y-3">
                    <div className="mx-auto flex items-center justify-center transition-all duration-300">
                      <Icon className="w-12 h-12 md:w-16 md:h-16 text-icon" aria-hidden="true" />
                    </div>
                    <p className="font-semibold text-subheading text-content-heading">{feature[lang]}</p>
                    <p className="leading-relaxed text-content-body md:text-base">{feature.desc[lang]}</p>
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
