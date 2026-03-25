"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { projects, projectsStructuredData } from "@/app/data/projects";
import translations from "@/app/data/translations";
import type { Lang } from "@/app/data/translations";
import { StatusBar } from "@/app/components/ui/iphone/StatusBar";
import { DynamicIsland } from "@/app/components/ui/iphone/DynamicIsland";
import { HomeIndicator } from "@/app/components/ui/iphone/HomeIndicator";
import { NavArrow } from "@/app/components/ui/navigation/NavArrow";

/* ─────────────────────────────────────
   Main Component
   ───────────────────────────────────── */
export default function PortfolioShowcase({ lang }: { lang: Lang }) {
  const t = translations.projectsSection;
  const [active, setActive] = useState(0);
  const snapRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  /* Pulse the phone frame once it enters the viewport */
  useEffect(() => {
    const el = phoneRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("phone-frame-pulse");
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
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
  const scrollToProject = useCallback((idx: number) => {
    const el = snapRef.current;
    if (!el || idx < 0 || idx >= projects.length) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
  }, []);

  const project = projects[active];
  const pd =
    translations.projectData[
      project.id as keyof typeof translations.projectData
    ];

  return (
    <section
      id="portfolio"
      className="py-24 md:py-36 md:pt-32 flex flex-col items-center justify-center relative overflow-hidden select-none px-5"
      aria-labelledby="portfolio-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsStructuredData) }}
      />

      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute size-[300px] sm:size-[450px] rounded-full bg-[radial-gradient(circle,hsla(var(--gold)/0.07)_0%,transparent_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] [transition:background_0.6s_ease] pointer-events-none"
      />

      {/* Section heading */}
      <div className="text-center relative z-[2] px-5 mb-6 sm:mb-10">
        <h2
          id="portfolio-heading"
          className="font-bold text-heading text-center"
        >
          {t.heading[lang]}
        </h2>
      </div>

      {/* Phone + controls */}
      <div className="flex flex-col items-center relative z-[2] gap-3 sm:gap-6">
        {/* Genre badge */}
        <div className="uppercase portfolio-info-enter text-center" key={`badge-${project.id}`}>
          <span className="inline-block py-1 px-3 rounded-lg bg-gold-dark/[0.1] border border-white/[0.1] text-content-heading/95 text-sm font-medium tracking-wide">
            {lang === "ar" ? project.genreAr : project.genre}
          </span>
        </div>

        {/* Phone frame + arrows */}
        <div dir="ltr" className="flex items-center justify-center gap-6">
          <NavArrow
            direction="prev"
            disabled={active === 0}
            onClick={() => scrollToProject(active - 1)}
          />

          <div
            ref={phoneRef}
            className="w-[65%] h-[55vh] md:w-[290px] md:h-[540px] rounded-[48px] bg-[linear-gradient(145deg,#2a2a2e_0%,#1c1c1e_50%,#161618_100%)] p-[4px] relative shrink-0"
          >
            <div className="absolute -left-[2.5px] top-[126px] w-[2.5px] h-11 bg-[linear-gradient(180deg,#3a3a3e,#2a2a2e)] rounded-l-[2px]" />
            <div className="absolute -left-[2.5px] top-[180px] w-[2.5px] h-11 bg-[linear-gradient(180deg,#3a3a3e,#2a2a2e)] rounded-l-[2px]" />
            <div className="absolute -right-[3px] top-[140px] w-[3px] h-[60px] bg-[linear-gradient(180deg,#3a3a3e,#2a2a2e)] rounded-r-[2px]" />

            <div className="w-full h-full rounded-[43px] overflow-hidden relative bg-black">
              <DynamicIsland />
              <div className="absolute top-2 inset-x-0 z-[15]">
                <StatusBar opacity={0.5} />
              </div>

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
                        alt={`${translations.a11y.screenshotOf[lang]} ${translations.projectData[proj.id as keyof typeof translations.projectData].title[lang]}`}
                        className="w-full h-auto block"
                        sizes="280px"
                        placeholder="blur"
                        priority={i === 0}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-0 inset-x-0 h-10 bg-[linear-gradient(transparent,rgba(0,0,0,0.5))] pointer-events-none z-10" />
              <HomeIndicator />
            </div>
          </div>

          <NavArrow
            direction="next"
            disabled={active === projects.length - 1}
            onClick={() => scrollToProject(active + 1)}
          />
        </div>

        {/* CTA */}
        <a
          id="portfolio-cta"
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative overflow-hidden inline-flex items-center gap-2 py-2.5 px-5 rounded-xl bg-gradient-to-b from-gold to-gold-dark text-gray-900 text-sm font-medium tracking-wide transition-all duration-200"
          aria-label={`${pd.cta[lang]} – ${pd.title[lang]}`}
        >
          {pd.cta[lang]}
          <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
        </a>
      </div>
    </section>
  );
}
