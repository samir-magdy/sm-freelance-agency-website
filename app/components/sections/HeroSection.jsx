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
        className="relative z-10 flex flex-col items-center w-full justify-center pt-10 md:pt-18"
      >

        <h1 dir="ltr" className="hero-fade hero-fade-eyebrow flex items-center justify-center gap-3 sm:gap-4">
          <span className="eyebrow-rule-left" aria-hidden="true"/>
          <span className="text-[10px] rtl:text-[15px] sm:text-[0.9rem] rtl:sm:text-[1.2rem] uppercase tracking-[0.18em] font-semibold text-content-body whitespace-nowrap">
            {hero.eyebrow[lang]}
          </span>
          <span className="eyebrow-rule-right" aria-hidden="true"/>
        </h1>

        <h2
          id="hero-hook"
          className="py-6 rtl:py-4 sm:pb-4 rtl:sm:py-8 font-bold text-center text-content-heading px-4 block text-[clamp(2.2rem,10vw,4.2rem)] sm:text-[clamp(2.2rem,3.5vw,4.2rem)] leading-relaxed rtl:leading-16"
        >
          <span
            className="hero-fade hero-fade-hook block"
            dangerouslySetInnerHTML={{ __html: hookLines }}
          />
        </h2>

        <p id="subheading" className="mb-8 hero-fade hero-fade-nav text-content-body text-[clamp(1rem,4.5vw,1.8rem)] sm:rtl:text-[clamp(1.1rem,1.8vw,2rem)] rtl:leading-loose text-center px-12 sm:px-16">
          {hero.subheading[lang]}
        </p>

        <div className="flex flex-col items-center gap-4">
          <a
          id="cta-main"
            href="#contact"
            className="cta-primary hero-cta-entrance font-semibold bg-linear-to-b from-gold to-gold-dark text-gray-900 text-[clamp(16px,3vw,24px)] rtl:text-[clamp(16px,1.8vw,26px)] px-6 sm:px-10 py-2.5 rounded-2xl"
          >
            {hero.primaryCta[lang]}
             
          </a>

          <a
            href="#FAQs"
            className="ms-2.5 tracking-wide hero-fade hero-fade-secondary-cta group flex items-center gap-2 text-content-muted hover:text-content-body text-[clamp(0.9rem,1.2vw,1.25rem)] font-medium transition-colors duration-300"
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
