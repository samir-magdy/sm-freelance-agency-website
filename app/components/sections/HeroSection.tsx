"use client";

import translations from "@/app/data/translations";
import type { Lang } from "@/app/data/translations";
import HeroNav from "../ui/HeroNav";
import { motion } from "motion/react";

/*─── HERO ANIMATION TIMELINE ───────────────────────────────
  Each entry: [delay, duration]  (in seconds)
  Adjust any value independently.
────────────────────────────────────────────────────────────*/
const timeline = {
  seoLabel:   { delay: 1.6,    duration: 0.6 },
  hookLine1:  { delay: 0.2,  duration: 0.5 },
  hookLine2:  { delay: 0.6,  duration: 0.5 },
  hookLine3:  { delay: 1.2,  duration: 0.5 },
  subheading: { delay: 1.6,  duration: 0.6 },
  navbar:     { delay: 1.6,  duration: 0.6 },
  buttons:    { delay: 1.6,  duration: 0.6 },
  whatsapp:   { delay: 1.6,  duration: 0.6 },
};

const hookTimeline = [timeline.hookLine1, timeline.hookLine2, timeline.hookLine3];

const fadeIn = ({ delay, duration }: { delay: number; duration: number }) => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration, ease: "easeOut" as const, delay } },
});

export default function HeroSection({ lang }: { lang: Lang }) {
  const t = translations;
  const hookLines = t.hero.name[lang];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: timeline.navbar.duration, ease: "easeOut", delay: timeline.navbar.delay } }}
      >
        <HeroNav lang={lang} />
      </motion.div>

      <section
        id="home"
        className="h-screen flex md:p-0 items-start pt-36 md:items-center justify-center relative"
      >
        {/* Dot grid + radial glow background */}
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />

        <motion.div
          id="hero-container"
          className="relative z-10 flex flex-col items-center md:mt-16 w-full"
          initial="hidden"
          animate="show"
        >
          <h1 className="font-bold text-center text-content-heading">
            <motion.span
              className="block text-content-muted text-[0.75rem] md:text-[0.85rem] tracking-wide font-medium uppercase mb-4"
              variants={fadeIn(timeline.seoLabel)}
            >
              {t.hero.seoLabel[lang]}
            </motion.span>
            <span
              id="hero-hook"
              className="block text-[clamp(2.25rem,14vw,4rem)] md:text-8xl rtl:leading-normal rtl:md:mb-0 leading-tight mb-4 md:mb-8"
            >
              {Array.isArray(hookLines)
                ? hookLines.map((line, i) => {
                    const words = line.split(" ");
                    return (
                      <motion.span
                        key={i}
                        className="md:inline block"
                        variants={fadeIn(hookTimeline[i] ?? hookTimeline[hookTimeline.length - 1])}
                      >
                        {words[0]}{" "}<span className="text-gold">{words.slice(1).join(" ")}</span>{" "}
                      </motion.span>
                    );
                  })
                : (
                  <motion.span variants={fadeIn(hookTimeline[0])}>
                    {hookLines}
                  </motion.span>
                )}
            </span>
          </h1>

          <motion.p
            className="text-content-body text-base md:text-2xl text-center mb-8 px-12"
            variants={fadeIn(timeline.subheading)}
          >
            {t.hero.subheading[lang]}
          </motion.p>

          <motion.div
            className="flex flex-col items-center gap-6 px-6 sm:px-0"
            variants={fadeIn(timeline.buttons)}
          >
            <a
              href="#contact"
              className="cta-primary text-center bg-gradient-to-b from-gold to-gold-dark text-gray-900 font-semibold text-lg md:text-xl px-10 md:px-10 py-4 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
            >
              {t.hero.primaryCta[lang]}
            </a>

            <a
              href="#portfolio"
              className="group inline-flex items-center gap-1.5 text-content-muted hover:text-content-body text-md md:text-base font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm"
            >
              {t.hero.secondaryCta[lang]}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className={`transition-transform duration-300 ${lang === "ar" ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
                aria-hidden="true"
              >
                <path d="M3.333 8h9.334M8.667 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>

        </motion.div>
          {/* WhatsApp floating button — fixed position via .whatsapp-float CSS */}
          <motion.a
            href="https://wa.me/201274613331"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float inline-flex transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: timeline.whatsapp.duration, ease: "easeOut", delay: timeline.whatsapp.delay } }}
          >
            <img src="/utility/whatsapp.svg" alt="Open Whatsapp chat" className="w-8 h-8" aria-hidden="true" />
          </motion.a>

        {/* Scroll indicator
        <span
          aria-label="Scroll down"
          className="absolute bottom-28 md:bottom-16 inset-x-0 mx-auto w-fit text-content-muted/40 hover:text-content-muted transition-colors duration-500 animate-scroll-hint"
        >
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
            <path d="M1 1l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span> */}
      </section>
    </div>
  );
}
