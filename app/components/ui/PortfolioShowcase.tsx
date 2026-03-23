"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { projects } from "@/app/data/projects";
import type { Project } from "@/app/data/projects";
import translations from "@/app/data/translations";
import type { Lang } from "@/app/data/translations";

/* ── Status Bar (iPhone chrome) ── */
function StatusBar({ opacity = 0.55, color = "white" }: { opacity?: number; color?: string }) {
  return (
    <div
      dir="ltr"
      aria-hidden
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px",
        height: 20,
        color,
        opacity,
        fontSize: 12,
        fontWeight: 600,
        fontFamily: "-apple-system, 'SF Pro Text', 'Helvetica Neue', sans-serif",
        letterSpacing: 0.3,
      }}
    >
      <span style={{ width: 54, textAlign: "left" }}>9:41</span>
      <div style={{ flex: 1 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <rect x="0" y="8" width="3" height="4" rx="0.5" fill={color} />
          <rect x="4.5" y="5" width="3" height="7" rx="0.5" fill={color} />
          <rect x="9" y="2" width="3" height="10" rx="0.5" fill={color} />
          <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" fill={color} opacity={0.35} />
        </svg>
        <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
          <path d="M7 9.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" fill={color} />
          <path d="M4.17 8.17a4 4 0 015.66 0" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
          <path d="M1.76 5.76a7.07 7.07 0 0110.48 0" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
          <path d="M.34 3.34a10.05 10.05 0 0113.32 0" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity={0.35} />
        </svg>
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
          <rect x="0.5" y="0.5" width="22" height="11" rx="2.5" stroke={color} strokeWidth="1" opacity={0.4} />
          <rect x="2" y="2" width="16" height="8" rx="1.5" fill={color} />
          <path d="M24 4.5v3a1.5 1.5 0 000-3z" fill={color} opacity={0.4} />
        </svg>
      </div>
    </div>
  );
}

/* ── Dynamic Island ── */
function DynamicIsland() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: 10,
        left: "50%",
        transform: "translateX(-50%)",
        width: 120,
        height: 32,
        background: "#000",
        borderRadius: 16,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: 18,
      }}
    >
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "radial-gradient(circle at 40% 35%, #1a1a2e 0%, #0a0a12 60%, #000 100%)",
          border: "1.5px solid #1a1a2e",
          position: "relative",
          boxShadow: "0 0 0 0.5px hsla(0 0% 100% / 0.06)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 2,
            left: 3,
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "hsla(220 60% 60% / 0.35)",
          }}
        />
      </div>
    </div>
  );
}

/* ── Home Indicator ── */
function HomeIndicator({ opacity = 0.25 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        bottom: 6,
        left: "50%",
        transform: "translateX(-50%)",
        width: 100,
        height: 4,
        borderRadius: 2,
        background: `hsla(0 0% 100% / ${opacity})`,
        zIndex: 20,
      }}
    />
  );
}

/* ── Pagination Dots ── */
function Dots({
  active,
  total,
  onSelect,
}: {
  active: number;
  total: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Project ${i + 1}`}
          style={{
            width: i === active ? 28 : 8,
            height: 8,
            borderRadius: 4,
            border: "none",
            background: i === active ? "hsl(var(--gold))" : "hsl(var(--border-strong))",
            cursor: "pointer",
            transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
            padding: 0,
          }}
        />
      ))}
    </div>
  );
}

/* ── Project Info (title + CTA) ── */
function ProjectInfo({ project, lang }: { project: Project; lang: Lang }) {
  const pd = translations.projectData[project.id as keyof typeof translations.projectData];

  return (
    <div className="portfolio-info-enter" key={`info-${project.id}`} style={{ textAlign: "center" }}>

      <h3
        style={{
          color: "hsl(var(--content-heading))",
          fontSize: "clamp(1.1rem, 1rem + 0.5vw, 1.4rem)",
          fontWeight: 700,
          margin: "0 0 16px",
          letterSpacing: "0.02em",
        }}
      >
        {pd.title[lang]}
      </h3>
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="portfolio-cta-btn"
        aria-label={`${pd.cta[lang]} – ${pd.title[lang]}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "12px 36px",
          borderRadius: 10,
          background: "linear-gradient(180deg, hsl(var(--gold)), hsl(var(--gold-dark)))",
          color: "#111",
          fontWeight: 700,
          fontSize: "clamp(0.9rem, 0.85rem + 0.15vw, 1rem)",
          textDecoration: "none",
          letterSpacing: "0.03em",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          boxShadow: "0 4px 16px hsla(46 65% 52% / 0.25)",
        }}
      >
        {pd.cta[lang]}
        <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
      </a>
    </div>
  );
}

/* ─────────────────────────────────────
   Main Component
   ───────────────────────────────────── */
export default function PortfolioShowcase({ lang }: { lang: Lang }) {
  const t = translations.projectsSection;
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const snapRef = useRef<HTMLDivElement>(null);

  /* Responsive breakpoint */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
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
  }, [isMobile]);

  /* Programmatic scroll */
  const scrollToProject = useCallback((idx: number) => {
    const el = snapRef.current;
    if (!el || idx < 0 || idx >= projects.length) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
  }, []);

  /* Keyboard navigation */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") scrollToProject(active - 1);
      if (e.key === "ArrowRight") scrollToProject(active + 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, scrollToProject]);

  const project = projects[active];

  /* Shared scrollable snap content (rendered once — desktop XOR mobile) */
  const scrollableContent = (
    <div
      ref={snapRef}
      className="portfolio-snap"
      dir="ltr"
      style={{
        display: "flex",
        overflowX: "auto",
        scrollSnapType: "x mandatory",
        scrollbarWidth: "none",
        marginTop: "40px",
        WebkitOverflowScrolling: "touch",
        width: "100%",
        height: "100%",
      }}
    >
      {projects.map((proj, i) => {
        const pd = translations.projectData[proj.id as keyof typeof translations.projectData];
        return (
          <div
            key={proj.id}
            style={{
              minWidth: "100%",
              width: "100%",
              scrollSnapAlign: "start",
              scrollSnapStop: "always",
              height: "100%",
            }}
          >
            <div
              className="phone-scroll"
              style={{
                overflowY: "auto",
                height: "100%",
                scrollbarWidth: "none",
              }}
            >
              <Image
                src={proj.screenshot}
                alt={`${translations.a11y.screenshotOf[lang]} ${pd.title[lang]}`}
                style={{ width: "100%", height: "auto", display: "block" }}
                sizes="(max-width: 640px) 88vw, 280px"
                placeholder="blur"
                priority={i === 0}
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "0" : "0 20px",
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: isMobile ? 300 : 450,
          height: isMobile ? 300 : 450,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${project.accentColor}12 0%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -55%)",
          transition: "background 0.6s ease",
          pointerEvents: "none",
        }}
      />

      {/* Section heading */}
      <div
        style={{
          textAlign: "center",
          marginBottom: isMobile ? 24 : 32,
          position: "relative",
          zIndex: 2,
          padding: "0 20px",
        }}
      >
        <h2 id="portfolio-heading" className="font-bold text-heading text-center mb-2">
          {t.heading[lang]}
        </h2>
        <p className="text-content-body text-center text-base md:text-subheading">
          {t.subtitle[lang]}
        </p>
      </div>

      {/* ─── DESKTOP: iPhone Frame ─── */}
      {!isMobile && (
        <div
          dir="ltr"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Left arrow */}
          <button
            onClick={() => scrollToProject(active - 1)}
            disabled={active === 0}
            aria-label={lang === "ar" ? "المشروع السابق" : "Previous project"}
            style={{
              background: active === 0 ? "transparent" : "hsla(0 0% 100% / 0.03)",
              border: `1.5px solid ${active === 0 ? "hsl(var(--border-subtle))" : "hsl(var(--border-strong))"}`,
              borderRadius: 14,
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: active === 0 ? "default" : "pointer",
              opacity: active === 0 ? 0.25 : 0.8,
              transition: "all 0.25s ease",
              color: "hsl(var(--content-heading))",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              if (active !== 0) e.currentTarget.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              if (active !== 0) e.currentTarget.style.opacity = "0.8";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* iPhone shell */}
          <div
            style={{
              width: 290,
              height: 592,
              borderRadius: 48,
              background: "linear-gradient(145deg, #2a2a2e 0%, #1c1c1e 50%, #161618 100%)",
              padding: 5,
              position: "relative",
              boxShadow: `
                0 0 0 0.5px hsla(0 0% 100% / 0.1),
                0 2px 4px rgba(0,0,0,0.3),
                0 12px 40px -8px rgba(0,0,0,0.6),
                0 0 60px -10px ${project.accentColor}08
              `,
              transition: "box-shadow 0.5s ease",
              flexShrink: 0,
            }}
          >
            {/* Volume buttons */}
            <div style={{ position: "absolute", left: -2.5, top: 90, width: 2.5, height: 24, background: "linear-gradient(180deg, #3a3a3e, #2a2a2e)", borderRadius: "2px 0 0 2px" }} />
            <div style={{ position: "absolute", left: -2.5, top: 126, width: 2.5, height: 44, background: "linear-gradient(180deg, #3a3a3e, #2a2a2e)", borderRadius: "2px 0 0 2px" }} />
            <div style={{ position: "absolute", left: -2.5, top: 180, width: 2.5, height: 44, background: "linear-gradient(180deg, #3a3a3e, #2a2a2e)", borderRadius: "2px 0 0 2px" }} />
            {/* Power button */}
            <div style={{ position: "absolute", right: -2.5, top: 140, width: 2.5, height: 60, background: "linear-gradient(180deg, #3a3a3e, #2a2a2e)", borderRadius: "0 2px 2px 0" }} />

            {/* Screen */}
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 43,
                overflow: "hidden",
                position: "relative",
                background: "#000",
              }}
            >
              <DynamicIsland />
              <div style={{ position: "absolute", top: 12, left: 0, right: 0, zIndex: 15 }}>
                <StatusBar opacity={0.5} />
              </div>

              {/* Scroll-snap screenshot carousel */}
              {scrollableContent}

              {/* Bottom fade */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 40,
                  background: "linear-gradient(transparent, rgba(0,0,0,0.5))",
                  pointerEvents: "none",
                  zIndex: 10,
                }}
              />
              <HomeIndicator />
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scrollToProject(active + 1)}
            disabled={active === projects.length - 1}
            aria-label={lang === "ar" ? "المشروع التالي" : "Next project"}
            style={{
              background: active === projects.length - 1 ? "transparent" : "hsla(0 0% 100% / 0.03)",
              border: `1.5px solid ${active === projects.length - 1 ? "hsl(var(--border-subtle))" : "hsl(var(--border-strong))"}`,
              borderRadius: 14,
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: active === projects.length - 1 ? "default" : "pointer",
              opacity: active === projects.length - 1 ? 0.25 : 0.8,
              transition: "all 0.25s ease",
              color: "hsl(var(--content-heading))",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              if (active !== projects.length - 1) e.currentTarget.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              if (active !== projects.length - 1) e.currentTarget.style.opacity = "0.8";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}

      {/* ─── MOBILE: Frameless Card ─── */}
      {isMobile && (
        <div
          style={{
            width: "88%",
            maxWidth: 380,
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "50vh",
              borderRadius: 20,
              overflow: "hidden",
              position: "relative",
              background: "#000",
              boxShadow: `
                0 0 0 1px hsla(0 0% 100% / 0.06),
                0 8px 32px -4px rgba(0,0,0,0.5),
                inset 0 0 0 0.5px hsla(0 0% 100% / 0.04)
              `,
            }}
          >
            {/* Minimal status bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 15,
                paddingTop: 10,
                background: "linear-gradient(rgba(0,0,0,0.4), transparent)",
              }}
            >
              <StatusBar opacity={0.8} />
            </div>

            {/* Scroll-snap screenshot carousel */}
            {scrollableContent}

            {/* Bottom fade */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 48,
                background: "linear-gradient(transparent, rgba(0,0,0,0.5))",
                pointerEvents: "none",
                zIndex: 10,
              }}
            />
            <HomeIndicator opacity={0.2} />
          </div>
        </div>
      )}

      {/* Dots */}
      <div style={{ marginTop: isMobile ? 20 : 24, position: "relative", zIndex: 2 }}>
        <Dots
          active={active}
          total={projects.length}
          onSelect={(i) => scrollToProject(i)}
        />
      </div>

      {/* Project Info */}
      <div key={project.id} style={{ marginTop: isMobile ? 20 : 28, position: "relative", zIndex: 2, maxWidth: 400, padding: "0 20px" }}>
        <ProjectInfo project={project} lang={lang} />
      </div>
    </div>
  );
}
