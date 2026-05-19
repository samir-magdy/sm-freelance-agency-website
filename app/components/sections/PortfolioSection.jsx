"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/app/data/projects";
import translations from "@/app/data/translations";

function NavArrow({ direction, disabled, onClick }) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous project" : "Next project"}
      className={`hidden group sm:flex items-center justify-center w-11 h-11 rounded-full shrink-0 p-0 transition-all duration-300 ease-out border ${
        disabled
          ? "bg-transparent border-white/[0.06] text-content-muted/40 cursor-default"
          : "bg-white/[0.1] border-white/[0.12] text-content-heading cursor-pointer hover:border-white/30"
      }`}
    >
      <Icon size={18} strokeWidth={2.5} className="transition-transform duration-100 ease-out" />
    </button>
  );
}

/* ─────────────────────────────────────
   Phone chrome sub-components
   ───────────────────────────────────── */

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
      style={{ fontFamily: "-apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif" }}
    >
      <span className="inline-block mt-0.5">9:41</span>
      <div className="flex-1" />
      <div className="flex gap-[2.5px] sm:gap-1.5 sm:items-center">
        <svg width="15" height="10" viewBox="0 0 16 12" fill="none" aria-hidden>
          <rect x="0"    y="8" width="3"   height="4"  rx="0.5" fill="white" />
          <rect x="4.5"  y="5" width="3"   height="7"  rx="0.5" fill="white" />
          <rect x="9"    y="2" width="3"   height="10" rx="0.5" fill="white" />
          <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" fill="white" opacity={0.35} />
        </svg>
        <svg width="13" height="10" viewBox="0 0 14 11" fill="none" aria-hidden>
          <path d="M7 9.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" fill="white" />
          <path d="M4.17 8.17a4 4 0 015.66 0"            stroke="white" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M2.05 6.05a7 7 0 019.9 0"             stroke="white" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M0.34 3.34a10.05 10.05 0 0113.32 0"   stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity={0.35} />
        </svg>
        <svg width="20" height="11" viewBox="0 0 26 12" fill="none" aria-hidden>
          <rect x="0.5" y="0.5" width="22" height="11" rx="2.5" stroke="white" strokeWidth="1" opacity={0.4} />
          <rect x="2"   y="2"   width="16" height="8"  rx="1.5" fill="white" />
          <path d="M24 4.5v3a1.5 1.5 0 000-3z" fill="white" opacity={0.4} />
        </svg>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   Main Component
   ───────────────────────────────────── */
export default function PortfolioShowcase({ lang }) {
  const { projectsSection, projectData, a11y } = translations;
  const t = projectsSection;
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);
  const snapRef = useRef(null);
  const animFrameRef = useRef(null);
  useEffect(() => {
    const el = snapRef.current;
    if (el) el.scrollLeft = 0;
    setMounted(true);
  }, []);
  /* Sync scroll position → active state */
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

  useEffect(() => {
    return () => { if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current); };
  }, []);

  const handleDemoClick = useCallback((e) => {
    e.preventDefault();
    const url = new URL(projects[active].liveUrl, window.location.origin);
    url.searchParams.set("ref", "smws");
    url.searchParams.set("lang", lang);
    window.open(url.toString(), "_blank", "noopener");
  }, [active, lang]);

  /* Programmatic scroll with rAF easing */
  const scrollToProject = useCallback((idx) => {
    const el = snapRef.current;
    if (!el || idx < 0 || idx >= projects.length) return;

    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    const start = el.scrollLeft;
    const target = idx * el.clientWidth;
    const delta = target - start;
    if (delta === 0) return;

    const duration = 300;
    let startTime = null;

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    el.style.scrollSnapType = "none";

    const step = (now) => {
      if (startTime === null) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      el.scrollLeft = start + delta * easeInOutCubic(progress);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        el.scrollLeft = target;
        el.style.scrollSnapType = "";
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  }, []);

  const project = projects[active];
  const pd = projectData[project.id];

  const isRtl = lang === "ar";

  return (
    <section
      id="portfolio"
      className="flex flex-col items-center justify-start min-h-svh pt-6 relative overflow-clip select-none px-5"
      aria-labelledby="portfolio-heading"
    >
      <div className="reveal">
        {/* ── Section heading ── */}
        <div className="text-center relative z-2 px-5 mb-2 md:mb-12">
          <h2 id="portfolio-heading" className="font-bold text-heading mb-2 rtl:mb-3">
            {t.heading[lang]}
          </h2>
          <p className="hidden sm:block text-center text-content-muted text-[clamp(1.2rem,2vw,1.6rem)]">
            {t.subheading[lang]}
          </p>
        </div>

        {/* Static project index for crawlers and screen readers */}
        <ul className="sr-only">
          {projects.map((proj) => {
            const pd = projectData[proj.id];
            return (
              <li key={proj.id}>
                <h3>{isRtl ? proj.genreAr : proj.genre}</h3>
                <h4>{pd.title[lang]}</h4>
                <p>{pd.description[lang]}</p>
              </li>
            );
          })}
        </ul>

        {/* ── Main layout: column on mobile, row on desktop ── */}
        <div
          className="flex flex-col lg:flex-row items-center lg:gap-16 xl:gap-20 relative z-2"
          dir={isRtl ? "rtl" : "ltr"}
        >
          {/* ── Info panel ── */}
          <div className="order-first lg:order-last mb-2.5 lg:mb-0">
            <div
              key={`info-${project.id}`}
              className="text-center lg:text-start lg:max-w-lg flex flex-col items-center lg:items-start gap-6"
            >
              <h3 aria-hidden="true" className="portfolio-info-enter text-[clamp(1.8rem,1.5vw,3rem)] font-bold text-content-heading hidden lg:block">
                {pd.title[lang]}
              </h3>

              <p className="portfolio-info-enter text-content-body text-[clamp(1.2rem,2.5vw,1.5rem)] rtl:text-[clamp(1.5rem,2.5vw,1.3rem)] leading-relaxed rtl:leading-loose hidden lg:block mb-4">
                {pd.description[lang]}
              </p>

              <a
                id="pricing-cta"
                href={project.liveUrl}
                onClick={handleDemoClick}
                target="_blank"
                rel="noopener"
                className="cta-primary relative overflow-hidden items-center gap-2 py-3 px-6 rounded-xl bg-linear-to-b from-gold to-gold-dark text-gray-900 text-subheading font-normal sm:font-semibold tracking-wide transition-all duration-200 hidden lg:inline-flex"
                aria-label={`${pd.cta[lang]} – ${pd.title[lang]}`}
              >
                {pd.cta[lang]}
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
              </a>
            </div>
          </div>

          {/* ── Phone column ── */}
          <div className="flex flex-col items-center gap-3">
            {/* Genre badge — mobile only */}
            <h3
              aria-hidden="true"
              key={`genre-${project.id}`}
              className="lg:hidden inline-flex items-center px-4 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-[0.1em] border border-border-subtle text-content-heading bg-surface-card"
            >
              {isRtl ? project.genreAr : project.genre}
            </h3>

            <div dir="ltr" className="flex items-center justify-center gap-8">
              <NavArrow
                direction="prev"
                disabled={mounted && active === 0}
                onClick={() => scrollToProject(active - 1)}
              />

              {/* Phone outer shell */}
              <div className="phone-outer w-[60vw] h-[61svh] sm:w-[16.4vw] rounded-[46px] bg-[linear-gradient(145deg,#2a2a2e_0%,#1c1c1e_50%,#161618_100%)] p-1 relative shrink-0">
                {/* Left volume buttons */}
                <div className="absolute -left-[2.5px] top-31.5 w-[2.5px] h-11 bg-[linear-gradient(180deg,#3a3a3e,#2a2a2e)] rounded-l-xs" />
                <div className="absolute -left-[2.5px] top-45 w-[2.5px] h-11 bg-[linear-gradient(180deg,#3a3a3e,#2a2a2e)] rounded-l-xs" />
                {/* Right power button */}
                <div className="absolute -right-0.75 top-35 w-0.75 h-15 bg-[linear-gradient(180deg,#3a3a3e,#2a2a2e)] rounded-r-xs" />

                {/* Phone screen area */}
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
                    {projects.map((proj, i) => (
                      <div
                        key={proj.id}
                        className="min-w-full w-full snap-start snap-always h-full"
                      >
                        <div className="phone-scroll overflow-y-auto h-full [scrollbar-width:none]">
                          <Image
                            src={proj.screenshot}
                            alt={`${a11y.screenshotOf[lang]} ${projectData[proj.id].title[lang]}`}
                            className="w-full h-auto block"
                            sizes="(max-width: 640px) 53vw, (max-width: 768px) 252px, (max-width: 1024px) 282px, 300px"
                            priority={i === 0}
                          />
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

            {/* Pagination dots */}
            <div
              dir="ltr"
              className="flex items-center gap-1.5 mb-0.5"
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
                      ? "w-5 h-2 bg-gold"
                      : "w-2 h-2 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>

            {/* "View Live Site" CTA — mobile only */}
            <a
              href={project.liveUrl}
              onClick={handleDemoClick}
              target="_blank"
              rel="noopener"
              className="cta-primary relative overflow-hidden inline-flex items-center gap-2 py-3 px-5 rounded-xl bg-linear-to-b from-gold to-gold-dark text-gray-900 text-caption font-semibold tracking-wide lg:hidden"
              aria-label={`${pd.cta[lang]} – ${pd.title[lang]}`}
            >
              {pd.cta[lang]}
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
