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
      className="h-dvh flex items-center justify-center relative"
    >
      {/* Dot grid + radial glow background */}
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div
        id="hero-container"
        className="relative z-10 flex flex-col items-center w-full justify-center pt-12 md:pt-20"
      >

        <h1 dir="ltr" className="hero-fade hero-fade-eyebrow mb-7 sm:mb-6 rtl:sm:mb-12 flex items-center justify-center gap-4">
          <span className="eyebrow-rule-left" aria-hidden="true"/>
          <span className="text-[0.7rem] rtl:text-sm sm:rtl:text-xl sm:text-[1rem] uppercase tracking-[0.18em] font-semibold text-content-body whitespace-nowrap">
            {hero.eyebrow[lang]}
          </span>
          <span className="eyebrow-rule-right" aria-hidden="true"/>
        </h1>

        <h2
          id="hero-hook"
          className="font-bold sm:rtl:py-6 text-center text-content-heading px-4 block text-[clamp(2.8rem,4vw,5rem)] leading-relaxed rtl:leading-18"
        >
          <span
            className="hero-fade hero-fade-hook block"
            dangerouslySetInnerHTML={{ __html: hookLines }}
          />
        </h2>

        <p className="mt-6 sm:mt-4 rtl:sm:mt-6 mb-8 hero-fade hero-fade-nav text-content-body text-[clamp(1.2rem,2vw,2rem)] rtl:text-[clamp(1.1rem,1.8vw,2rem)] rtl:leading-loose text-center px-10 sm:px-16">
          {hero.subheading[lang]}
        </p>

        <div className="flex flex-col items-center justify-center gap-4">
          <a
            href="#contact"
            className="cta-primary inline-flex items-center gap-2 md:gap-4 hero-cta-entrance font-semibold text-center bg-linear-to-b from-gold to-gold-dark text-gray-900 text-[clamp(1.2rem,1.8vw,1.6rem)] rtl:text-[clamp(1.2rem,1.8vw,1.6rem)] px-7 md:px-9 py-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
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
            href="#FAQs"
            className="ms-2.5 tracking-wide hero-fade hero-fade-secondary-cta group flex items-center gap-2 text-content-muted hover:text-content-body text-[clamp(1rem,1.3vw,1.25rem)] font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
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
