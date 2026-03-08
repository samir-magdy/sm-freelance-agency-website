import translations from "@/app/data/translations";
import type { Lang } from "@/app/data/translations";
import HeroNav from "../ui/HeroNav";

export default function HeroSection({ lang }: { lang: Lang }) {
  const t = translations;
  const hookLines = t.hero.name[lang];

  return (
    <div>
        <HeroNav lang={lang} />

      <section
        id="home"
        className="h-screen flex md:p-0 items-start pt-36 md:items-center justify-center relative"
      >
        {/* Dot grid + radial glow background */}
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />

        <div
          id="hero-container"
          className="relative z-10 flex flex-col items-center md:mt-16 w-full"
        >
          <h1 className="font-bold text-center text-content-heading px-10">
            <span className="hero-fade hero-fade-nav block text-content-muted text-[0.7rem] md:text-[0.85rem] tracking-wide font-medium uppercase mb-4">
              {t.hero.seoLabel[lang]}
            </span>
            <span
              id="hero-hook"
              className="block text-[clamp(2.25rem,14vw,4rem)] md:text-8xl rtl:leading-normal rtl:md:mb-0 leading-tight mb-4 md:mb-8"
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

          <p className="hero-fade hero-fade-nav text-content-body text-base md:text-2xl text-center mb-8 px-16">
            {t.hero.subheading[lang]}
          </p>

          <div className="hero-fade hero-fade-nav flex flex-col items-center gap-6 px-6 sm:px-0">
            <a
              href="#contact"
              className="cta-primary text-center bg-gradient-to-b from-gold to-gold-dark text-gray-900 font-semibold text-lg md:text-xl px-10 md:px-10 py-4 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
            >
              {t.hero.primaryCta[lang]}
            </a>

            <a
              href="#portfolio"
              className="group inline-flex items-center gap-1.5 text-content-muted hover:text-content-body text-md md:text-base font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm"
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

        {/* WhatsApp floating button */}
        <a
          href="https://wa.me/201274613331"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Whatsapp chat"
          className="hero-fade hero-fade-nav whatsapp-float inline-flex transition-colors duration-300"
        >
          <img src="/utility/whatsapp.svg" alt="" className="w-10 md:w-8 h-10 md:h-8" aria-hidden="true" />
        </a>
      </section>
    </div>
  );
}