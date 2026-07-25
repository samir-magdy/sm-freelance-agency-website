import hero from "@/app/data/translations/heroSection";
import type { Lang } from "@/app/types";

interface HeroSectionProps {
  lang: Lang;
}

export default function HeroSection({ lang }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="hero relative min-h-svh flex items-center justify-center overflow-hidden"
    >
      <div className="hero-grid" aria-hidden="true" />

      <div className="safari-hero-padding relative z-10 w-full mx-auto flex flex-col items-center text-center px-8 sm:px-10 pt-36 pb-24 sm:pt-40 sm:pb-28">
        <h1 className="inline-flex items-center gap-2.5 sm:gap-[0.85rem]">
          <span
            aria-hidden="true"
            className="flex-none h-px w-[clamp(2rem,4vw,3rem)] rounded-full bg-linear-to-r rtl:bg-linear-to-l from-transparent to-white/70"
          />
          <span className="ps-0.5 font-semibold uppercase sm:tracking-[0.12em] tracking-widest leading-none text-[clamp(0.7rem,3vw,1.1rem)] text-content-muted rtl:normal-case rtl:leading-normal">
            {hero.eyebrow[lang]}
          </span>
          <span
            aria-hidden="true"
            className="flex-none h-px w-[clamp(2rem,4vw,3rem)] rounded-full bg-linear-to-r rtl:bg-linear-to-l from-white/70 to-transparent"
          />
        </h1>

        <h2
          id="hero-title"
          className="mt-6 sm:mt-8 text-content-heading font-medium tracking-[-2px] leading-[1.12] text-[clamp(2.25rem,11.5vw,4.5rem)] rtl:text-[clamp(2.25rem,10vw,4rem)] rtl:leading-relaxed max-w-[16ch] sm:tracking-[-4px] sm:max-w-[14ch]"
          dangerouslySetInnerHTML={{ __html: hero.name[lang] }}
        />

        <p
          className="mt-6 sm:mt-8 text-content-body text-[clamp(1.1rem,5vw,1.6rem)] rtl:text-[clamp(0.9rem,4vw,1.5rem)] sm:leading-[1.6] rtl:leading-[2.15] sm:rtl:leading-loose max-w-120 ltr:sm:max-w-100 px-2"
          dangerouslySetInnerHTML={{ __html: hero.subheading[lang] }}
        />

        <div className="px-6 sm:px-0 flex flex-col sm:flex-row sm:rtl:flex-row-reverse items-stretch justify-center w-full sm:max-w-[24rem] gap-3 mt-8 sm:mt-10">
          <a
            href="#contact"
            className="cta-primary inline-flex sm:flex-1 items-center justify-center rounded-[0.9rem] px-[1vw] py-3 text-[clamp(0.7rem,4.5vw,1.4rem)] font-semibold text-gray-900"
          >
            {hero.primaryCta[lang]}
          </a>

          <a
            href="#portfolio"
            className="hover:-translate-y-0.5 duration-500 inline-flex sm:flex-1 items-center justify-center rounded-[0.9rem] border border-border-strong backdrop-blur-sm bg-white/2 px-[1vw] py-3 text-[clamp(0.7rem,4.5vw,1.4rem)] font-semibold text-content-body transition-all hover:text-content-heading hover:border-white/20"
          >
            {hero.secondaryCta[lang]}
          </a>
        </div>
      </div>
    </section>
  );
}
