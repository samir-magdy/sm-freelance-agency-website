"use client";

import translations from "@/app/data/translations";
import FontReadyWrapper from "../ui/FontReadyWrapper";
import SmoothScroll from "../ui/utils/SmoothScroll.js";

export default function HeroSection({ lang }) {
  const hero = translations.hero;
  const hookLines = hero.name[lang];
  const handleScroll = SmoothScroll();

  return (
    <FontReadyWrapper
      id="home"
      className="h-dvh flex items-center justify-center relative"
    >
      {/* Dot grid + radial glow background */}
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div
        id="hero-container"
        className="relative z-10 flex flex-col items-center w-full justify-center pt-16 md:pt-32"
      >
        <h1
          id="hero-hook"
          className="font-bold text-center text-content-heading px-4 block text-[clamp(2.5rem,4vw,4rem)] leading-relaxed"
        >
          <span className="sr-only">
            SM Web Studio - Best Web Design Company Egypt
          </span>
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
                  <>
                    {words[0]}{" "}
                    <span className="text-gold">
                      {words[1]?.replace(".", "")}
                    </span>
                    {words[1]?.endsWith(".") ? "." : ""}{" "}
                    {words.slice(2).join(" ")}
                  </>
                </span>
              );
            })
          ) : (
            <span className="hero-fade hero-fade-hook-1">{hookLines}</span>
          )}
        </h1>

        <h2 className="mt-6 mb-10 hero-fade hero-fade-nav text-content-body text-[clamp(1.2rem,2vw,2rem)] rtl:text-[clamp(1.2rem,1.8vw,3rem)] rtl:leading-loose text-center px-10 sm:px-16">
          {hero.subheading[lang]}
        </h2>

        <div className="flex flex-col items-center justify-center gap-4">
          <a
            href="#portfolio"
            onClick={handleScroll}
            className="cta-primary inline-flex items-center gap-2 md:gap-4 hero-cta-entrance font-semibold md:font-normal text-center bg-linear-to-b from-gold to-gold-dark text-gray-900 text-[clamp(1.1rem,1.8vw,1.6rem)] px-6 md:px-9 py-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
          >
            {hero.primaryCta[lang]}
              {/* <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className={`mt-0.5 transition-transform duration-300 ${lang === "ar" ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
              aria-hidden="true"
            >
              <path
                d="M3.333 8h9.334M8.667 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg> */}
          </a>

          <a
            href="#contact"
            onClick={handleScroll}
            className="ms-2 tracking-wide hero-fade hero-fade-secondary-cta group flex items-center gap-1 text-content-muted hover:text-content-body text-[clamp(1rem,1.3vw,1.25rem)] font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
          >
            {hero.secondaryCta[lang]}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className={`md:mt-0.5 transition-transform duration-300 ${lang === "ar" ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
              aria-hidden="true"
            >
              <path
                d="M3.333 8h9.334M8.667 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </FontReadyWrapper>
  );
}
