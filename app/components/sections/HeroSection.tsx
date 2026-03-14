import translations from "@/app/data/translations";
import type { Lang } from "@/app/data/translations";

export default function HeroSection({ lang }: { lang: Lang }) {
  const t = translations;
  const hookLines = t.hero.name[lang];

  return (
    <>
      <section
        id="home"
        className="h-[100dvh] flex items-center justify-center relative"
      >
        {/* Dot grid + radial glow background */}
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />

        <div
          id="hero-container"
          className="relative z-10 flex flex-col items-center w-full justify-center pt-16 md:pt-24"
        >
          <h1 className="hero-fade hero-fade-label font-medium text-center text-content-muted text-[clamp(0.75rem,2vw,1rem)] rtl:text-[clamp(0.85rem,2vw,1rem)] me-2 tracking-wider uppercase mb-6">
            {lang !== "ar" && (
              <>
                <span>{t.hero.seoLabelBrand[lang]}</span>
                <span className="inline-block w-[1px] md:w-[1.5px] h-3 md:h-4 mb-[2px] md:mb-[4px] mx-1.5 md:mx-2 bg-content-muted align-middle" aria-hidden="true"></span>
              </>
            )}
            {t.hero.seoLabelTagline[lang]}
          </h1>
          <p
            id="hero-hook"
            className="font-bold text-center text-content-heading px-4 block text-[clamp(3.8rem,11vw,7rem)] rtl:text-[clamp(3rem,5vw,5.5rem)] rtl:leading-normal leading-tight mb-6"
          >
            {Array.isArray(hookLines) ? (
              hookLines.map((line, i) => {
                const words = line.split(" ");
                const fadeClass =
                  i === 0
                    ? "hero-fade-hook-1"
                    : i === 1
                      ? "hero-fade-hook-2"
                      : "hero-fade-hook-3";
                return (
                  <span
                    key={i}
                    className={`hero-fade ${fadeClass} md:inline block`}
                  >
                    {(() => {
                      const tail = words.slice(1).join(" ");
                      const hasDot = tail.endsWith(".");
                      return (
                        <>
                          {words[0]}{" "}
                          <span className="text-gold">
                            {hasDot ? tail.slice(0, -1) : tail}
                          </span>
                          {hasDot && "."}{" "}
                        </>
                      );
                    })()}
                  </span>
                );
              })
            ) : (
              <span className="hero-fade hero-fade-hook-1">{hookLines}</span>
            )}
          </p>

          <p className="hero-fade hero-fade-nav text-content-body text-[clamp(1.2rem,5vw,2.2rem)] rtl:text-[clamp(1.1rem,4vw,1.8rem)] rtl:leading-relaxed text-center mb-6 md:mb-8 px-8 sm:px-16">
            {t.hero.subheading[lang]}
          </p>

          <div className="flex flex-col items-center justify-center gap-4">
            <a
              href="#contact"
              className="cta-primary font-semibold md:font-normal text-center bg-gradient-to-b from-gold to-gold-dark text-gray-900 text-[clamp(1.2rem,5vw,2.2rem)] px-12 md:px-16 py-4 md:py-4.5 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
            >
              {t.hero.primaryCta[lang]}
            </a>

            <a
              href="#faq"
              className="tracking-wide hero-fade hero-fade-secondary-cta group ms-2.5 flex items-center gap-1 text-content-muted hover:text-content-body text-md md:text-xl font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
            >
              {t.hero.secondaryCta[lang]}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className={`md:mt-1 transition-transform duration-300 ${lang === "ar" ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
                aria-hidden="true"
              >
                <path
                  d="M3.333 8h9.334M8.667 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
