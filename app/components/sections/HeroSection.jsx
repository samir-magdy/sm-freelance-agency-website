"use client";

import { useEffect, useLayoutEffect } from "react";
import translations from "@/app/data/translations";

export default function HeroSection({ lang }) {
  const hero = translations.hero;
  const hookLines = hero.name[lang];
  useLayoutEffect(() => {
    if (sessionStorage.getItem("heroAnimationPlayed")) {
      document.documentElement.classList.add("hero-played");
    }
    return () => {
      document.documentElement.classList.remove("hero-played");
    };
  }, []);

  useEffect(() => {
    let active = true;
    document.fonts.ready.then(() => {
      if (!active) return;
      document.documentElement.classList.add("fonts-ready");
      sessionStorage.setItem("heroAnimationPlayed", "true");
    });
    return () => {
      active = false;
      document.documentElement.classList.remove("fonts-ready");
    };
  }, []);

  return (
    <section
      id="home"
      className="h-dvh flex items-center justify-center relative overflow-hidden"
    >
      {/* Dot grid + radial glow background */}
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div
        id="hero-container"
        className="relative flex flex-col items-center pt-10 sm:pt-20"
      >
        <h1
          dir="ltr"
          className="hero-fade hero-fade-eyebrow flex items-center gap-3 sm:gap-4"
        >
          <span className="eyebrow-rule-left" aria-hidden="true" />
          <span className="text-[clamp(0.5rem,2.8vw,1rem)] rtl:text-[clamp(0.75rem,3.5vw,1.25rem)] uppercase tracking-widest font-semibold text-content-muted">
            {hero.eyebrow[lang]}
          </span>
          <span className="eyebrow-rule-right" aria-hidden="true" />
        </h1>

        <h2
          id="hero-hook"
          className="py-4 sm:py-8 sm:pt-6 font-bold text-center text-content-heading text-[clamp(2.2rem,9.5vw,4.2rem)] rtl:text-[clamp(1.5rem,9vw,4.2rem)] sm:text-[clamp(2.2rem,3.5vw,5rem)] leading-relaxed rtl:leading-16 sm:rtl:leading-normal"
        >
          <span
            className="hero-fade hero-fade-hook block"
            dangerouslySetInnerHTML={{ __html: hookLines }}
          />
        </h2>

        <p
          id="subheading"
          className="mb-8 hero-fade hero-fade-nav text-content-body text-[clamp(1.3rem,4.5vw,2rem)] rtl:text-[clamp(1.1rem,4.5vw,2rem)] sm:text-[clamp(1rem,2vw,2.2rem)] sm:rtl:text-[clamp(1.1rem,1.8vw,2rem)] rtl:leading-loose text-center px-16 rtl:px-22 sm:px-16"
        >
          {hero.subheading[lang]}
        </p>

        <div className="flex flex-col items-center gap-4">
          <a
            id="cta-main"
            href="#contact"
            className="cta-primary hero-cta-entrance font-semibold bg-linear-to-b from-gold to-gold-dark text-gray-900 text-[clamp(1rem,2vw,1.7rem)] rtl:text-[clamp(16px,1.8vw,26px)] px-6 sm:px-10 py-2.5 rounded-2xl"
          >
            {hero.primaryCta[lang]}
          </a>

          <a
            id="cta-secondary"
            href="#FAQs"
            className="ms-4 tracking-wide hero-fade hero-fade-secondary-cta group flex items-center gap-2 text-content-muted hover:text-content-body text-[clamp(0.8rem,1.5vw,1.25rem)] font-medium transition-colors duration-300"
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
    </section>
  );
}
