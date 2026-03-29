"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { projects, projectsStructuredData } from "@/app/data/projects";
import translations from "@/app/data/translations";
import { StatusBar } from "@/app/components/ui/iphone/StatusBar";
import { DynamicIsland } from "@/app/components/ui/iphone/DynamicIsland";
import { HomeIndicator } from "@/app/components/ui/iphone/HomeIndicator";
import { NavArrow } from "@/app/components/ui/navigation/NavArrow";

/* ─────────────────────────────────────
   Main Component
   ───────────────────────────────────── */
export default function PortfolioShowcase({ lang }) {
  const t = translations.projectsSection;
  const [active, setActive] = useState(0);
  const snapRef = useRef(null);
  const phoneRef = useRef(null);
  const sectionRef = useRef(null);

  /* Tag section for Safari-specific styling */
  useEffect(() => {
    const ua = navigator.userAgent;
    if (/Safari/.test(ua) && !/Chrome|CriOS|Chromium/.test(ua)) {
      sectionRef.current?.classList.add("is-safari");
    }
  }, []);

  /* Pulse the phone frame once it enters the viewport */
  useEffect(() => {
    const el = phoneRef.current;
    if (!el) return;
    const onScroll = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.75) {
        el.classList.add("phone-frame-pulse");
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
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

  /* Programmatic scroll */
  const scrollToProject = useCallback((idx) => {
    const el = snapRef.current;
    if (!el || idx < 0 || idx >= projects.length) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
  }, []);

  const project = projects[active];
  const pd =
    translations.projectData[project.id];

  const isRtl = lang === "ar";

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="py-20 md:pb-36 md:pt-32 flex flex-col items-center justify-center relative overflow-hidden select-none px-5"
      aria-labelledby="portfolio-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsStructuredData) }}
      />

      {/* ── Section heading ── */}
      <div className="text-center relative z-[2] px-5 mb-4 sm:mb-10 lg:mb-12">
        <h2
          id="portfolio-heading"
          className="font-bold text-heading"
        >
          {t.heading[lang]}
        </h2>
      </div>

      {/* ── Main layout: column on mobile, row on desktop ──
          dir flips the row direction so info panel sits right (EN) or left (AR) */}
      <div
        className="pt-2 flex flex-col lg:flex-row items-center lg:gap-16 xl:gap-20 relative z-[2]"
        dir={isRtl ? "rtl" : "ltr"}
      >

        {/* ── Info panel (badge + title + description + CTA) ──
            Mobile: above phone, centered text, only badge visible
            Desktop: beside phone, start-aligned, all elements visible
            order-last puts it after the phone in DOM → right side (EN) / left side (AR)
            gap-8 controls uniform vertical spacing between all children */}
        <div
          key={`info-${project.id}`}
          className="portfolio-info-enter text-center lg:text-start lg:max-w-lg order-first lg:order-last mb-4 lg:mb-0 flex flex-col items-center lg:items-start gap-8"
        >
          {/* Genre badge — visible on both mobile + desktop */}
          <span className="uppercase inline-block py-1 px-3 rounded-lg bg-gold-dark/[0.1] border border-white/[0.1] text-content-heading/95 text-sm font-medium tracking-wide">
            {isRtl ? project.genreAr : project.genre}
          </span>

          {/* Project title — desktop only */}
          <h3 className="text-heading font-bold text-content-heading hidden lg:block">
            {pd.title[lang]}
          </h3>

          {/* Project description — desktop only */}
          <p className="text-content-body text-subheading leading-relaxed hidden lg:block mb-2">
            {pd.description[lang]}
          </p>

          {/* "View Live Site" CTA — desktop only (mobile CTA is below the phone) */}
          <a
            id="portfolio-cta"
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden items-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-b from-gold to-gold-dark text-gray-900 text-xl font-normal tracking-wide transition-all duration-200 hidden lg:inline-flex"
            aria-label={`${pd.cta[lang]} – ${pd.title[lang]}`}
          >
            {pd.cta[lang]}
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
          </a>
        </div>

        {/* ── Phone column (phone frame + dot indicators + mobile CTA) ── */}
        <div className="flex flex-col items-center gap-4">

          {/* Arrow ← | Phone | Arrow → row (always LTR so swipe direction is consistent) */}
          <div dir="ltr" className="flex items-center justify-center gap-6">

            {/* Previous arrow */}
            <NavArrow
              direction="prev"
              disabled={active === 0}
              onClick={() => scrollToProject(active - 1)}
            />

            {/* Phone outer shell — gradient bezel + hardware buttons */}
            <div
              ref={phoneRef}
              className="phone-outer w-[60%] h-[54vh] sm:w-[260px] sm:h-[520px] md:w-[290px] md:h-[550px] lg:w-[320px] lg:h-[610px] rounded-[48px] bg-[linear-gradient(145deg,#2a2a2e_0%,#1c1c1e_50%,#161618_100%)] p-[4px] relative shrink-0"
            >
              {/* Left volume buttons */}
              <div className="absolute -left-[2.5px] top-[126px] w-[2.5px] h-11 bg-[linear-gradient(180deg,#3a3a3e,#2a2a2e)] rounded-l-[2px]" />
              <div className="absolute -left-[2.5px] top-[180px] w-[2.5px] h-11 bg-[linear-gradient(180deg,#3a3a3e,#2a2a2e)] rounded-l-[2px]" />
              {/* Right power button */}
              <div className="absolute -right-[3px] top-[140px] w-[3px] h-[60px] bg-[linear-gradient(180deg,#3a3a3e,#2a2a2e)] rounded-r-[2px]" />

              {/* Phone screen area */}
              <div className="w-full h-full rounded-[43px] overflow-hidden relative bg-black">
                <DynamicIsland />
                <div className="absolute top-2 inset-x-0 z-[15]">
                  <StatusBar />
                </div>

                {/* Horizontal snap-scroll carousel of project screenshots */}
                <div
                  ref={snapRef}
                  className="portfolio-snap flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] mt-5 w-full h-full bg-black"
                  dir="ltr"
                >
                  {projects.map((proj, i) => (
                    <div key={proj.id} className="min-w-full w-full snap-start snap-always h-full">
                      <div className="phone-scroll overflow-y-auto h-full [scrollbar-width:none]">
                        <Image
                          src={proj.screenshot}
                          alt={`${translations.a11y.screenshotOf[lang]} ${translations.projectData[proj.id].title[lang]}`}
                          className="w-full h-auto block"
                          sizes="(min-width:1024px) 320px, 280px"
                          placeholder="blur"
                          priority
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom fade-out gradient over screenshot */}
                <div className="absolute bottom-0 inset-x-0 h-10 bg-[linear-gradient(transparent,rgba(0,0,0,0.5))] pointer-events-none z-10" />
                <HomeIndicator />
              </div>
            </div>

            {/* Next arrow */}
            <NavArrow
              direction="next"
              disabled={active === projects.length - 1}
              onClick={() => scrollToProject(active + 1)}
            />
          </div>

          {/* "View Live Site" CTA — mobile only (desktop version is in the info panel) */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden inline-flex items-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-b from-gold to-gold-dark text-gray-900 text-sm font-semibold tracking-wide transition-all duration-200 lg:hidden"
            aria-label={`${pd.cta[lang]} – ${pd.title[lang]}`}
          >
            {pd.cta[lang]}
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
