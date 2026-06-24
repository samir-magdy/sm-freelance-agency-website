"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/app/data/portfolio";
import translations from "@/app/data/translations";

function NavArrow({ direction, disabled, onClick, ...props }) {
  if (disabled) return <div className="hidden sm:block w-11 h-11 shrink-0" />;

  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button
      onClick={onClick}
      {...props}
      aria-label={direction === "prev" ? "Previous project" : "Next project"}
      className="hidden group sm:flex items-center justify-center w-11 h-11 rounded-full shrink-0 p-0 transition-all duration-300 ease-out border bg-white/[0.1] border-white/[0.12] text-content-heading cursor-pointer hover:border-white/20"
    >
      <Icon
        size={18}
        strokeWidth={2.5}
        className="transition-transform duration-100 ease-out"
      />
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

/* ─────────────────────────────────────
   Main Component
   ───────────────────────────────────── */
export default function PortfolioShowcase({ lang }) {
  const { projectsSection, projectData, a11y, hero } = translations;
  const t = projectsSection;
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const snapRef = useRef(null);
  const activeRef = useRef(0);

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

  /* Keep ref in sync so autoplay interval never reads stale active */
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  /* Autoplay */
  useEffect(() => {
    if (projects.length <= 1 || isPaused) return;
    const id = setInterval(() => {
      const el = snapRef.current;
      if (!el) return;
      const next = (activeRef.current + 1) % projects.length;
      el.scrollTo({
        left: next * el.clientWidth,
        behavior: next === 0 ? "instant" : "smooth",
      });
    }, 4500);
    return () => clearInterval(id);
  }, [isPaused]);

  const handleDemoClick = useCallback(
    (e) => {
      e.preventDefault();
      const proj = projects[active];
      const url = new URL(proj.liveUrl, window.location.origin);
      // Only our own demo sites get the referral params (they drive the demo
      // banner). Real client sites are opened bare.
      if (!proj.clientSite) {
        url.searchParams.set("ref", "smws");
        url.searchParams.set("lang", lang);
      }
      window.open(url.toString(), "_blank", "noopener");
    },
    [active, lang],
  );

  const scrollToProject = useCallback((idx) => {
    const el = snapRef.current;
    if (!el || idx < 0 || idx >= projects.length) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
  }, []);

  const project = projects[active];
  const pd = projectData[project.id];

  const ctaHref = project.liveUrl;
  const handleCtaClick = handleDemoClick;

  const isRtl = lang === "ar";

  return (
    <section
      id="portfolio"
      className="flex flex-col items-center justify-center min-h-[calc(100svh-var(--nav-h))] relative select-none px-5"
      aria-labelledby="portfolio-heading"
    >
      {/* ── Section heading ── */}
      <div className="text-center relative z-2 px-5 mb-1 md:mb-12">
        <h2
          id="portfolio-heading"
          className="reveal-element font-bold text-heading mb-2 rtl:mb-3"
        >
          {t.heading[lang]}
        </h2>
        <p
          id="portfolio-subheading"
          className="reveal-element hidden sm:block text-center text-content-muted text-[clamp(1.2rem,2vw,1.6rem)]"
        >
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
              className="portfolio-info-enter text-[clamp(1.8rem,1.5vw,3rem)] font-bold text-content-heading hidden lg:block"
            >
              {pd.title[lang]}
            </h3>

            <p className="portfolio-info-enter text-content-body text-[clamp(1.2rem,2.5vw,1.4rem)] rtl:text-[clamp(1.5rem,2.5vw,1.3rem)] leading-relaxed rtl:leading-loose hidden lg:block mb-4">
              {pd.description[lang]}
            </p>

            <div className="portfolio-info-enter hidden lg:flex items-center gap-3">
              <a
                href="#contact"
                className="cta-primary inline-flex items-center gap-2 py-3 px-6 rounded-xl text-gray-900 text-[clamp(0.7rem,1.5vw,1.2rem)] font-semibold tracking-wide"
              >
                {lang === "ar" && (
                  <ArrowRight className="size-4 rotate-180" aria-hidden />
                )}
                {hero.primaryCta[lang]}
                {lang !== "ar" && <ArrowRight className="size-4" aria-hidden />}
              </a>
              <Link
                id="pricing-cta"
                onClick={handleCtaClick}
                href={ctaHref}
                className="inline-flex items-center gap-2 py-3 px-6 rounded-xl border border-border-strong text-content-body hover:text-content-heading text-[clamp(0.7rem,1.5vw,1.2rem)] font-semibold tracking-wide transition-colors duration-200"
                aria-label={`${t.viewProject[lang]} – ${pd.title[lang]}`}
              >
                {lang === "ar" && (
                  <ArrowRight className="size-4 rotate-180" aria-hidden />
                )}
                {t.viewProject[lang]}
                {lang !== "ar" && <ArrowRight className="size-4" aria-hidden />}
              </Link>
            </div>
          </div>
        </div>

        {/* ── Phone column ── */}
        <div className="reveal-element flex flex-col items-center gap-2.5">
          {/* Genre badge — mobile only */}
          <h3
            id="portfolio-genre"
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
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            />

            {/* Phone outer shell */}
            <div
              id="mobile-mockup"
              className="phone-outer aspect-11/19.5 h-[min(60svh,440px)] sm:h-[min(62svh,500px)] md:h-[min(64svh,560px)] lg:h-[min(66svh,600px)] xl:h-[min(68svh,615px)] 2xl:h-[min(70svh,600px)] rounded-[46px] bg-[linear-gradient(145deg,#2a2a2e_0%,#1c1c1e_50%,#161618_100%)] p-1 relative shrink-0"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
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
                        {proj.screenshot ? (
                          <Image
                            src={proj.screenshot}
                            alt={`${a11y.screenshotOf[lang]} ${projectData[proj.id].title[lang]}`}
                            className="w-full h-auto block"
                            sizes="(max-width: 640px) 53vw, (max-width: 768px) 252px, (max-width: 1024px) 282px, 300px"
                            priority={i === 0}
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
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            />
          </div>

          {/* Pagination dots */}
          <div
            dir="ltr"
            className="flex items-center gap-1.5 mb-1"
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

          {/* "View Live Site" CTA — mobile only */}
          <Link
            id="portfolio-cta"
            onClick={handleCtaClick}
            href={ctaHref}
            className="cta-primary relative overflow-hidden inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-linear-to-b from-gold to-gold-dark text-gray-900 text-sm sm:text-[3.5vw] font-semibold tracking-wide lg:hidden"
            aria-label={`${t.viewProject[lang]} – ${pd.title[lang]}`}
          >
            {t.viewProject[lang]}
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
