import type { Lang } from "@/app/data/translations";
import translations from "@/app/data/translations";
import { Languages, Mail, PenLine, MapPin, FileSearch, Palette, LayoutDashboard } from "lucide-react";

const addOnIcons = [LayoutDashboard, Languages,  FileSearch, MapPin,  PenLine, Palette, Mail];

export default function AddOnsSection({ lang }: { lang: Lang }) {
  const t = translations.addOnsSection;
  const isRtl = lang === "ar";

  return (
    <section
      id="add-ons"
      className="py-24 md:py-36 px-4"
      aria-labelledby="addons-heading"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 md:mb-12 text-center">
          <h2
            id="addons-heading"
            className="font-bold text-heading text-center"
          >
            {t.heading[lang]}
          </h2>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-8 gap-4 md:gap-6">
          {t.items.map((item, i) => {
            const Icon = addOnIcons[i];
            return (
              <div
                key={item.title.en}
                className={`text-center group bg-surface-card/80 relative overflow-hidden rounded-2xl border border-border-subtle py-6 px-4 shadow-lg hover:-translate-y-1.5 hover:border-border-strong transition-all duration-300 xl:col-span-2${
                  i === 4 ? " xl:col-start-2" :
                  i === 6 ? " sm:col-span-2 sm:w-1/2 sm:mx-auto lg:col-span-1 lg:w-auto lg:mx-0 lg:col-start-2 xl:col-span-2 xl:col-start-6" : ""
                }`}
              >
                <div aria-hidden="true" />
                <div className="relative space-y-3">
                  <div className="mx-auto flex items-center justify-center transition-all duration-300">
                    <Icon className="w-12 h-12 md:w-16 md:h-16 text-icon" aria-hidden="true" />
                  </div>
                  <p className="font-semibold text-subheading text-content-heading">{item.title[lang]}</p>
                  <p className="leading-relaxed text-content-body md:text-base">{item.description[lang]}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        {/* <div className="text-center">
          <p className="text-content-body mb-5">{t.cta[lang]}</p>
          <a
            href="#contact"
            className="cta-primary text-center bg-gradient-to-b from-gold to-gold-dark text-gray-900 font-semibold text-lg md:text-xl px-10 md:px-10 py-4 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
          >
            {translations.hero.primaryCta[lang]}
          </a>
        </div> */}

      </div>
    </section>
  );
}
