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
  seoLabel:   { delay: 1.8,    duration: 0.75 },
  hookLine1:  { delay: 0.2,  duration: 0.5 },
  hookLine2:  { delay: 0.6,  duration: 0.5 },
  hookLine3:  { delay: 1.2,  duration: 0.5 },
  subheading: { delay: 1.8,  duration: 0.75 },
  navbar:     { delay: 1.8,  duration: 0.75 },
  buttons:    { delay: 1.8,  duration: 0.75 },
  whatsapp:   { delay: 1.8,  duration: 0.75 },
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
        className="h-screen flex md:p-0 items-center justify-center relative"
      >
        {/* Dot grid + radial glow background */}
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />

        <motion.div
          id="hero-container"
          className="relative z-10 flex flex-col items-center md:mt-16 w-full px-6 md:px-0"
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
            className="text-content-body text-base md:text-2xl text-center mb-8 px-6"
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
            className="whatsapp-float inline-flex items-center justify-center gap-2 bg-[#25d365] hover:bg-[#198942] text-content-heading font-semibold text-base md:text-subheading rounded-full transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: timeline.whatsapp.duration, ease: "easeOut", delay: timeline.whatsapp.delay } }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </motion.a>

        {/* Scroll indicator */}
        <span
          aria-label="Scroll down"
          className="absolute bottom-20 md:bottom-16 inset-x-0 mx-auto w-fit text-content-muted/40 hover:text-content-muted transition-colors duration-500 animate-scroll-hint"
        >
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
            <path d="M1 1l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </section>
    </div>
  );
}
