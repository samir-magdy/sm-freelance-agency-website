import translations from "@/app/data/translations";
import type { Lang } from "@/app/data/translations";
import HeroNav from "../ui/HeroNav";

export default function HeroSection({ lang }: { lang: Lang }) {
  const t = translations;
  const hookLines = t.hero.name[lang];

  const heroNavStrings = {
    nav: {
      services: t.nav.services[lang],
      // addOns: t.nav.addOns[lang],
      projects: t.nav.projects[lang],
      howItWorks: t.nav.howItWorks[lang],
      faq: t.nav.faq[lang],
      contact: t.nav.contact[lang],
    },
    a11y: {
      desktopNav: t.a11y.desktopNav[lang],
      mobileNav: t.a11y.mobileNav[lang],
      openMenu: t.a11y.openMenu[lang],
      closeMenu: t.a11y.closeMenu[lang],
    },
    langToggleLabel: lang === "ar" ? t.langToggle.en : t.langToggle.ar,
  };

  return (
    <div>
        <HeroNav lang={lang} strings={heroNavStrings} />

      <section
        id="home"
        className="h-screen flex items-center justify-center relative"
      >
        {/* Dot grid + radial glow background */}
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />

        <div
          id="hero-container"
          className="relative z-10 flex flex-col items-center w-full pb-12 md:pt-36"
        >
          <h1 className="font-bold text-center text-content-heading px-4">
            <span className="hero-fade hero-fade-label block text-content-muted text-[0.7rem] md:text-[1.125rem] tracking-wider font-medium uppercase mb-3 md:mb-6">
              {t.hero.seoLabel[lang]}
            </span>
            <span
              id="hero-hook"
              className="block text-[clamp(3.5rem,6vw,5.5rem)] rtl:leading-normal rtl:md:mb-0 leading-tight mb-6"
            >
              {Array.isArray(hookLines)
                ? hookLines.map((line, i) => {
                    const words = line.split(" ");
                    const fadeClass =
                      i === 0
                        ? "hero-fade-hook-1"
                        : i === 1
                          ? "hero-fade-hook-2"
                          : "hero-fade-hook-3";
                    return (
                      <span key={i} className={`hero-fade ${fadeClass} md:inline block`}>
                        {(() => {
                          const tail = words.slice(1).join(" ");
                          const hasDot = tail.endsWith(".");
                          return (
                            <>
                              {words[0]}{" "}
                              <span className="text-gold">
                                {hasDot ? tail.slice(0, -1) : tail}
                              </span>
                              {hasDot && "."}
                              {" "}
                            </>
                          );
                        })()}
                      </span>
                    );
                  })
                : (
                  <span className="hero-fade hero-fade-hook-1">
                    {hookLines}
                  </span>
                )}
            </span>
          </h1>

          <p className="hero-fade hero-fade-nav text-content-body text-[clamp(1rem,2vw,1.75rem)] text-center mb-8 px-12">
            {t.hero.subheading[lang]}
          </p>

          <div className="flex flex-col items-center gap-5">
            <a
              href="#contact"
              className="cta-primary font-bold text-center bg-gradient-to-b from-gold to-gold-dark text-gray-900 text-base md:text-2xl px-12 md:px-28 py-4 md:py-6 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
            >
              {t.hero.primaryCta[lang]}
            </a>

            <a
              href="#portfolio"
              className="hero-fade hero-fade-secondary-cta group inline-flex items-center gap-1.5 text-content-muted hover:text-content-body text-sm md:text-lg font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm"
            >
              {t.hero.secondaryCta[lang]}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className={`transition-transform duration-300 ${lang === "ar" ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
                aria-hidden="true"
              >
                <path d="M3.333 8h9.334M8.667 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

      
      </section>
    </div>
  );
}
