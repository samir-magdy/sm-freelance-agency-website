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
      className="lg:pt-6 px-4"
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
  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface-card/40 p-px transition-all duration-300 backdrop-blur-xl hover:-translate-y-1.5 hover:border-white/30 hover:shadow-2xl hover:shadow-primary/20"
>
  {/* Glassmorphic Spotlight Effect */}
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
  
  <div className="relative space-y-3 rounded-[15px] bg-surface-card/80 px-4 py-6 text-center">
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl  transition-all duration-500 group-hover:scale-110  md:h-20 md:w-20">
      <Icon
        className="h-10 w-10 text-icon transition-colors duration-300 group-hover:text-primary md:h-12 md:w-12"
        aria-hidden="true"
      />
      {/* Subtle Icon Glow */}
      <div className="absolute inset-0 z-[-1] scale-50 bg-primary/20 blur-2xl transition-transform duration-500 group-hover:scale-100" />
    </div>

    <h3 className="text-subheading font-semibold text-content-heading transition-colors group-hover:text-primary">
      {feature[lang]}
    </h3>

    <p className="text-content-body leading-relaxed md:text-base">
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