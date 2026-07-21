"use client";

import type { MouseEvent } from "react";
import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/app/data/portfolio";
import {
  projectsSection,
  projectData,
} from "@/app/data/translations/portfolioSection";
import a11y from "@/app/data/translations/a11y";
import type { Lang } from "@/app/types";

interface NavArrowProps {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}

function NavArrow({ direction, disabled, onClick }: NavArrowProps) {
  if (disabled) return <div className="hidden sm:block w-11 h-11 shrink-0" />;

  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous project" : "Next project"}
      className="hidden group sm:flex items-center justify-center w-12 h-12 rounded-full shrink-0 p-0 transition-all duration-300 ease-out border bg-white/[0.1] border-white/[0.12] text-content-heading cursor-pointer hover:border-white/20"
    >
      <Icon
        size={18}
        strokeWidth={2.5}
        className={`transition-transform duration-500 ease-out ${
          direction === "prev"
            ? "group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5"
            : "group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
        }`}
      />
    </button>
  );
}

function DynamicIsland() {
  return (
    <div
      aria-hidden
      className="absolute top-[4px] sm:top-[5px] left-1/2 -translate-x-1/2 z-20
                 w-[34%] h-[24px] sm:h-[25px] rounded-full bg-black
                 flex items-center justify-end pr-[7px] sm:pr-[9px]"
      style={{ boxShadow: "inset 0 0 0 0.75px rgba(255,255,255,0.07)" }}
    >
      <div
        className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] rounded-full shrink-0
                   flex items-center justify-center"
        style={{
          background: "radial-gradient(circle at 38% 38%, #1c1c22, #080808)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        <div
          className="w-[8px] h-[8px] sm:w-[9px] sm:h-[9px] rounded-full"
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
      <div className="flex gap-[2px] sm:gap-1 sm:items-center">
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
  const t = projectsSection;
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

  const handleDemoClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const proj = projects[active];
      const url = new URL(proj.liveUrl, window.location.origin);
      if (!proj.clientSite) {
        url.searchParams.set("ref", "smws");
        url.searchParams.set("lang", lang);
      }
      window.open(url.toString(), "_blank", "noopener");
    },
    [active, lang],
  );

  const scrollToProject = useCallback((idx: number) => {
    const el = snapRef.current;
    if (!el || idx < 0 || idx >= projects.length) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
  }, []);

  const project = projects[active];
  const pd = projectData[project.id];

  const ctaHref = project.liveUrl;
  const handleCtaClick = handleDemoClick;
  const ctaLabel = project.clientSite
    ? t.viewLiveSite[lang]
    : t.viewDemo[lang];

  const isRtl = lang === "ar";

  return (
    <section
      id="portfolio"
      className="flex flex-col items-center justify-center min-h-[calc(100svh-var(--nav-h))] relative select-none px-5"
      aria-labelledby="portfolio-heading"
    >
      <div className="text-center relative z-2 px-5 md:mb-4 lg:mb-8">
        <h2
          id="portfolio-heading"
          className="reveal-element font-bold text-heading"
        >
          {t.heading[lang]}
        </h2>
        <p className="reveal-element hidden sm:block text-center text-content-muted text-[clamp(1.2rem,2vw,1.6rem)]">
          {t.subheading[lang]}
        </p>
      </div>

      <ul className="sr-only">
        {projects.map((proj) => {
          const projCopy = projectData[proj.id];
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
              className="text-[clamp(1.8rem,2.2vw,2.2rem)] font-bold text-content-heading hidden lg:block"
            >
              {pd.title[lang]}
            </h3>

            <p className="text-content-body text-[clamp(1.2rem,2.5vw,1.25rem)] rtl:text-[clamp(1.5rem,2.5vw,1.3rem)] leading-relaxed rtl:leading-loose hidden lg:block mb-4">
              {pd.description[lang]}
            </p>

            <div className="hidden lg:flex items-center justify-start gap-3 w-full pe-4">
              <Link
                id="pricing-cta"
                onClick={handleCtaClick}
                href={ctaHref}
                className="group w-full inline-flex justify-center items-center gap-4 py-3 px-6 rounded-xl border border-border-strong text-content-body hover:text-content-heading text-[clamp(0.7rem,1.5vw,1.25rem)] font-semibold tracking-wide transition-colors duration-200"
                aria-label={`${ctaLabel} – ${pd.title[lang]}`}
              >
                {ctaLabel}
                <ArrowRight
                  className="size-4 rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                  aria-hidden
                />
              </Link>
              <a
                href="#contact"
                className="cta-primary w-full inline-flex justify-center items-center gap-2 py-3 px-6 rounded-xl text-gray-900 text-[clamp(0.7rem,1.5vw,1.25rem)] font-semibold tracking-wide"
              >
                {t.primaryCta[lang]}
              </a>
            </div>
          </div>
        </div>

        <div className="reveal-element flex flex-col items-center gap-2.5">
          <h3
            id="portfolio-genre"
            aria-hidden="true"
            key={`genre-${project.id}`}
            className="lg:hidden inline-flex items-center px-4 py-1.5 rounded-xl text-[clamp(0.7rem,3vw,1rem)] font-semibold uppercase tracking-[0.1em] border border-border-subtle text-content-heading bg-surface-card"
          >
            {isRtl ? project.genreAr : project.genre}
          </h3>

          <div dir="ltr" className="flex items-center justify-center gap-8">
            <NavArrow
              direction="prev"
              disabled={mounted && active === 0}
              onClick={() => scrollToProject(active - 1)}
            />

            <div
              id="mobile-mockup"
              className="aspect-11/19.5 w-[240px] sm:w-[230px] md:w-[260px] lg:w-[280px] rounded-[46px] bg-[linear-gradient(145deg,#2a2a2e_0%,#1c1c1e_50%,#161618_100%)] p-1 relative shrink-0"
            >
              <div className="absolute -left-[2.5px] top-31.5 w-[2.5px] h-11 bg-[linear-gradient(180deg,#3a3a3e,#2a2a2e)] rounded-l-xs" />
              <div className="absolute -left-[2.5px] top-45 w-[2.5px] h-11 bg-[linear-gradient(180deg,#3a3a3e,#2a2a2e)] rounded-l-xs" />
              <div className="absolute -right-0.75 top-35 w-0.75 h-15 bg-[linear-gradient(180deg,#3a3a3e,#2a2a2e)] rounded-r-xs" />

              <div className="w-full h-full rounded-[43px] overflow-hidden relative bg-[#0e0e0e]">
                <div className="absolute top-0 inset-x-0 z-15 h-8 sm:h-9 px-2.5 sm:px-1">
                  <DynamicIsland />
                  <StatusBar />
                </div>

                <div
                  ref={snapRef}
                  className="portfolio-snap flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] mt-8 sm:mt-9 w-full h-full bg-black"
                  dir="ltr"
                >
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="min-w-full w-full snap-start snap-always h-full"
                    >
                      <div className="phone-scroll overflow-y-auto h-full [scrollbar-width:none]">
                        {proj.screenshot ? (
                          <Image
                            src={proj.screenshot}
                            alt={`${a11y.screenshotOf[lang]} ${projectData[proj.id].title[lang]}`}
                            className="w-full h-auto block"
                            sizes="(max-width: 639px) 64vw, (max-width: 767px) 63vw, (max-width: 1023px) 70.5vw, (max-width: 1279px) 75vw, 18.5vw"
                            placeholder="blur"
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
            className="flex items-center gap-1.5 mt-0.5 mb-0.5"
            role="tablist"
            aria-label="Project slides"
          >
            {projects.map((proj, i) => (
              <button
                key={proj.id}
                role="tab"
                aria-selected={i === active}
                aria-label={`Go to project ${i + 1}`}
                onClick={() => scrollToProject(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-5 h-2 bg-gold/85"
                    : "w-2 h-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3 lg:hidden w-full text-[clamp(0.6rem,4vw,1.4rem)] tracking-wide whitespace-nowrap">
            <Link
              onClick={handleCtaClick}
              href={ctaHref}
              className="mobile-portfolio-buttons w-full justify-center group inline-flex items-center gap-2 py-2.5 px-5 rounded-xl border border-border-strong text-content-body hover:text-content-heading transition-colors duration-200"
              aria-label={`${ctaLabel} – ${pd.title[lang]}`}
            >
              {ctaLabel}
              <ArrowRight
                className="size-4 rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                aria-hidden
              />
            </Link>
            <a
              href="#contact"
              className="mobile-portfolio-buttons w-full justify-center cta-primary relative overflow-hidden inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-linear-to-b from-gold to-gold-dark text-gray-900"
            >
              {t.primaryCta[lang]}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
