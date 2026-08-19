"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/app/data/portfolio";
import {
  portfolioSectionTranslations,
  projectTranslations,
} from "@/app/data/translations/portfolioSection";
import a11y from "@/app/data/translations/a11y";
import type { Lang } from "@/app/types";
import styles from "./PortfolioSection.module.css";

interface NavArrowProps {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}

function NavArrow({ direction, disabled, onClick }: NavArrowProps) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous project" : "Next project"}
      className={`hidden group lg:flex items-center justify-center w-12 h-12 rounded-full shrink-0 p-0 transition-all duration-300 ease-out border ${
        disabled
          ? "bg-white/3 border-white/6 text-content-heading/30 cursor-not-allowed"
          : "bg-white/10 border-white/12 text-content-heading cursor-pointer hover:border-white/20"
      }`}
    >
      <Icon
        size={18}
        strokeWidth={2.5}
        className={`transition-transform duration-500 ease-out ${
          disabled
            ? ""
            : direction === "prev"
              ? "group-hover:-translate-x-px"
              : "group-hover:translate-x-px"
        }`}
      />
    </button>
  );
}

function DynamicIsland() {
  return (
    <div
      aria-hidden
      className="absolute top-1 sm:top-1.25 left-1/2 -translate-x-1/2 z-20
                 w-[34%] h-6 sm:h-6.25 rounded-full bg-black
                 flex items-center justify-end pr-1.75 sm:pr-2.25"
      style={{ boxShadow: "inset 0 0 0 0.75px rgba(255,255,255,0.07)" }}
    >
      <div
        className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full shrink-0
                   flex items-center justify-center"
        style={{
          background: "radial-gradient(circle at 38% 38%, #1c1c22, #080808)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        <div
          className="w-2 h-2 sm:w-2.25 sm:h-2.25 rounded-full"
          style={{
            background: "radial-gradient(circle at 33% 33%, #20215a, #0a0b1e)",
            boxShadow: "0 0 5px 2px rgba(50,70,210,0.22)",
          }}
        />
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div
      dir="ltr"
      aria-hidden
      className="flex justify-between items-center h-full ps-4 sm:ps-6 pe-2 sm:px-5
                 text-caption font-semibold tracking-[0.3px] text-white"
      style={{
        fontFamily:
          "-apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif",
      }}
    >
      <span className="inline-block mt-0.5">9:41</span>
      <div className="flex-1" />
      <div className="flex gap-0.5 sm:gap-1 sm:items-center">
        <svg width="15" height="10" viewBox="0 0 16 12" fill="none" aria-hidden>
          <rect x="0" y="8" width="3" height="4" rx="0.5" fill="white" />
          <rect x="4.5" y="5" width="3" height="7" rx="0.5" fill="white" />
          <rect x="9" y="2" width="3" height="10" rx="0.5" fill="white" />
          <rect
            x="13.5"
            y="0"
            width="2.5"
            height="12"
            rx="0.5"
            fill="white"
            opacity={0.35}
          />
        </svg>
        <svg width="13" height="10" viewBox="0 0 14 11" fill="none" aria-hidden>
          <path
            d="M7 9.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"
            fill="white"
          />
          <path
            d="M4.17 8.17a4 4 0 015.66 0"
            stroke="white"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="M2.05 6.05a7 7 0 019.9 0"
            stroke="white"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="M0.34 3.34a10.05 10.05 0 0113.32 0"
            stroke="white"
            strokeWidth="1.3"
            strokeLinecap="round"
            opacity={0.35}
          />
        </svg>
        <svg width="20" height="11" viewBox="0 0 26 12" fill="none" aria-hidden>
          <rect
            x="0.5"
            y="0.5"
            width="22"
            height="11"
            rx="2.5"
            stroke="white"
            strokeWidth="1"
            opacity={0.4}
          />
          <rect x="2" y="2" width="16" height="8" rx="1.5" fill="white" />
          <path d="M24 4.5v3a1.5 1.5 0 000-3z" fill="white" opacity={0.4} />
        </svg>
      </div>
    </div>
  );
}

interface PortfolioSectionProps {
  lang: Lang;
}

export default function PortfolioShowcase({ lang }: PortfolioSectionProps) {
  const translations = portfolioSectionTranslations;
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);
  const snapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = snapRef.current;
    if (el) el.scrollLeft = 0;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = snapRef.current;
    if (!el) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const idx = Math.round(el.scrollLeft / el.clientWidth);
        setActive(idx);
        ticking = false;
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToProject = useCallback((idx: number) => {
    const el = snapRef.current;
    if (!el || idx < 0 || idx >= projects.length) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
  }, []);

  const project = projects[active];
  const pd = projectTranslations[project.id];

  const ctaHref = project.liveUrl;
  const ctaLabel = translations.viewLiveSite[lang];

  const isRtl = lang === "ar";

  return (
    <section
      id="portfolio"
      className="flex flex-col items-center justify-center relative z-20 select-none px-5"
      aria-labelledby="portfolio-heading"
    >
      <div className="text-center relative z-2 px-5 md:mb-2 lg:mb-8">
        <h2
          id="portfolio-heading"
          className="reveal-element font-bold text-heading sm:rtl:mb-3"
        >
          {translations.heading[lang]}
        </h2>
        <p className="reveal-element hidden sm:block text-center text-content-muted text-[clamp(1.2rem,2vw,1.6rem)]">
          {translations.subheading[lang]}
        </p>
      </div>

      <ul className="sr-only">
        {projects.map((proj) => {
          const projCopy = projectTranslations[proj.id];
          const isExternal = !proj.liveUrl.startsWith("/portfolio/");
          return (
            <li key={proj.id}>
              <h3>{isRtl ? proj.genreAr : proj.genre}</h3>
              <h4>
                <a
                  href={proj.liveUrl}
                  {...(isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {projCopy.title[lang]}
                </a>
              </h4>
              <p>{projCopy.description[lang]}</p>
            </li>
          );
        })}
      </ul>

      <div
        className="flex flex-col lg:flex-row items-center lg:gap-16 xl:gap-20 relative z-2"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div
          id="portfolio-title"
          className="reveal-element order-first lg:order-last mb-2.5 lg:mb-0"
        >
          <div
            key={`info-${project.id}`}
            className="text-center lg:text-start lg:max-w-lg flex flex-col items-center lg:items-start gap-6"
          >
            <h3
              aria-hidden="true"
              className={`${styles.fadeIn} text-[clamp(1.8rem,2.2vw,2.2rem)] font-bold text-content-heading hidden lg:block`}
            >
              {pd.title[lang]}
            </h3>

            <p className={`${styles.fadeIn} text-content-body text-[clamp(1.2rem,2.5vw,1.25rem)] rtl:text-[clamp(1.5rem,2.5vw,1.3rem)] leading-relaxed rtl:leading-loose hidden lg:block mb-4`}>
              {pd.description[lang]}
            </p>

            <div className="hidden lg:flex items-center justify-start gap-3 pe-4">
              <a
                id="pricing-cta"
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group cta-primary w-full inline-flex justify-center items-center gap-3 py-3 px-6 ps-8.5 rounded-xl text-background text-[clamp(0.7rem,1.5vw,1.25rem)] tracking-wide transition-colors duration-200"
                aria-label={`${ctaLabel} – ${pd.title[lang]}`}
              >
                {ctaLabel}
                <ArrowRight
                  className="size-4 rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                  aria-hidden
                />
              </a>
            </div>
          </div>
        </div>

        <div className="reveal-element flex flex-col items-center gap-2.5">
          <h3
            aria-hidden="true"
            key={`genre-${project.id}`}
            className={`${styles.genre} lg:hidden inline-flex items-center px-4 py-1.5 rounded-xl text-[clamp(0.7rem,3vw,1rem)] font-semibold uppercase tracking-widest border border-border-subtle text-content-heading bg-surface-card`}
          >
            {pd.title[lang]}
          </h3>

          <div dir="ltr" className="flex items-center justify-center gap-8">
            <NavArrow
              direction="prev"
              disabled={mounted && active === 0}
              onClick={() => scrollToProject(active - 1)}
            />

            <div
              id="mobile-mockup"
              className="aspect-11/19.5 w-60 safari:w-70 safari:sm:w-100 sm:w-92 safari:lg:w-72 lg:w-72 xl:w-68 rounded-[46px] bg-[linear-gradient(145deg,#2a2a2e_0%,#1c1c1e_50%,#161618_100%)] p-1 relative shrink-0"
            >
              <div className="absolute left-[-2.5px] top-31.5 w-[2.5px] h-11 bg-[linear-gradient(180deg,#3a3a3e,#2a2a2e)] rounded-l-xs" />
              <div className="absolute left-[-2.5px] top-45 w-[2.5px] h-11 bg-[linear-gradient(180deg,#3a3a3e,#2a2a2e)] rounded-l-xs" />
              <div className="absolute -right-0.75 top-35 w-0.75 h-15 bg-[linear-gradient(180deg,#3a3a3e,#2a2a2e)] rounded-r-xs" />

              <div className="w-full h-full rounded-[43px] overflow-hidden relative bg-[#0e0e0e]">
                <div className="absolute top-0 inset-x-0 z-15 h-8 sm:h-9 px-2.5 sm:px-1">
                  <DynamicIsland />
                  <StatusBar />
                </div>

                <div
                  ref={snapRef}
                  className={`${styles.snap} flex overflow-x-auto snap-x snap-mandatory scrollbar-none mt-8 sm:mt-9 w-full h-full bg-black`}
                  dir="ltr"
                >
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="min-w-full w-full snap-start snap-always h-full"
                    >
                      <div className={`${styles.phoneScroll} overflow-y-auto h-full scrollbar-none`}>
                        {proj.screenshot ? (
                          <Image
                            src={proj.screenshot}
                            alt={`${a11y.imageAltPrefix[lang]} ${projectTranslations[proj.id].title[lang]}`}
                            className="w-full h-auto block"
                            sizes="(max-width: 639px) 64vw, (max-width: 767px) 63vw, (max-width: 1023px) 70.5vw, (max-width: 1279px) 75vw, 18.5vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-surface-card" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-0 inset-x-0 h-10 bg-[linear-gradient(transparent,rgba(0,0,0,0.5))] pointer-events-none z-10" />
              </div>
            </div>

            <NavArrow
              direction="next"
              disabled={mounted && active === projects.length - 1}
              onClick={() => scrollToProject(active + 1)}
            />
          </div>

          <div
            dir="ltr"
            className="flex items-center gap-1.5 my-0.5 sm:my-2"
            role="group"
            aria-label="Project slides"
          >
            {projects.map((proj, i) => (
              <button
                key={proj.id}
                type="button"
                aria-current={i === active ? "true" : undefined}
                aria-label={`Go to project ${i + 1}`}
                onClick={() => scrollToProject(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-5 h-2 sm:w-5.5 sm:h-2.5 bg-gold/85"
                    : "w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3 lg:hidden text-[clamp(0.8rem,4vw,1.5rem)] font-semibold tracking-wide whitespace-nowrap">
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`cta-primary w-full justify-center inline-flex items-center gap-2 py-2.5 px-5 ps-7.5 rounded-xl text-background`}
              aria-label={`${ctaLabel} – ${pd.title[lang]}`}
            >
              {ctaLabel}
              <ArrowRight
                className="size-4 rtl:rotate-180"
                aria-hidden
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
