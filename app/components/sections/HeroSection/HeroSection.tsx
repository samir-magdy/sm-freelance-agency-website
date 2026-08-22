import hero from "@/app/data/translations/heroSection";
import type { Lang } from "@/app/types";
import styles from "./HeroSection.module.css";
import HeroPrimaryCta from "@/app/components/utils/HeroPrimaryCta";

interface HeroSectionProps {
  lang: Lang;
}

const ctaBase =
  "inline-flex flex-1 items-center justify-center rounded-[0.9rem] px-4 py-3 text-[clamp(0.7rem,4.5vw,1.4rem)] font-semibold";

export default function HeroSection({ lang }: HeroSectionProps) {
  return (
    <section
      id="home"
      className={`${styles.hero} relative min-h-svh flex items-center justify-center overflow-hidden`}
    >
      <div className={styles.grid} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-start sm:items-center px-6 sm:px-10 py-36 sm:pb-24">
        <h1 className="self-start sm:self-auto inline-flex items-center gap-2.5 sm:gap-[0.85rem]">
          <span
            aria-hidden="true"
            className="hidden sm:block flex-none h-px w-[clamp(1.5rem,4vw,2.5rem)] 2xl:w-[clamp(1.5rem,4vw,2.8rem)] rounded-full bg-[linear-gradient(to_right,transparent,oklch(100%_0_0/0.7))] rtl:bg-[linear-gradient(to_left,transparent,oklch(100%_0_0/0.7))]"
          />
          <span className="ps-0.5 font-semibold uppercase tracking-[0.1em] leading-none text-[clamp(0.7rem,3vw,0.8rem)] text-content-muted/90 sm:tracking-[0.12em] sm:text-[clamp(0.7rem,3.5vw,1rem)] lg:text-[clamp(0.7rem,3.5vw,0.9rem)] 2xl:text-[clamp(0.7rem,3.5vw,1rem)] rtl:normal-case rtl:leading-normal rtl:text-[clamp(0.7rem,4vw,1.2rem)] lg:rtl:text-[clamp(0.7rem,4vw,1.08rem)] 2xl:rtl:text-[clamp(0.7rem,4vw,1.21rem)]">
            {hero.h1Eyebrow[lang]}
          </span>
          <span
            aria-hidden="true"
            className="hidden sm:block flex-none h-px w-[clamp(1.5rem,4vw,2.5rem)] 2xl:w-[clamp(1.5rem,4vw,2.8rem)] rounded-full bg-[linear-gradient(to_right,oklch(100%_0_0/0.7),transparent)] rtl:bg-[linear-gradient(to_left,oklch(100%_0_0/0.7),transparent)]"
          />
        </h1>

        <p
          className="rtl:hidden sm:hidden mt-5 text-content-heading font-medium tracking-[-2px] leading-[1.4] text-[clamp(2rem,13vw,5rem)] [&_.text-gold]:font-[650] [&_.text-gold]:tracking-[-0.03em] [&_.text-gold]:bg-[linear-gradient(180deg,var(--color-gold-light)_0%,var(--color-gold)_55%,var(--color-gold-dark)_100%)] [&_.text-gold]:bg-clip-text [&_.text-gold]:text-transparent rtl:[&_.text-gold]:leading-[1.6] 2xl"
          dangerouslySetInnerHTML={{ __html: hero.mobileHook[lang] }}
        />

        <p
          className="hidden sm:block rtl:block text-content-heading font-medium leading-tight text-[clamp(2rem,10vw,4.5rem)] max-w-[16ch] tracking-[-4px] rtl:mt-2.5 rtl:text-[clamp(2rem,10vw,4rem)] rtl:leading-loose sm:mt-6 sm:text-center sm:rtl:leading-relaxed lg:text-[clamp(2rem,11vw,3.8rem)] 2xl:text-[clamp(2rem,11vw,4.26rem)] 2xl:rtl:text-[clamp(2rem,10vw,4.48rem)] [&_.text-gold]:font-[650] [&_.text-gold]:tracking-[-0.03em] [&_.text-gold]:bg-[linear-gradient(180deg,var(--color-gold-light)_0%,var(--color-gold)_55%,var(--color-gold-dark)_100%)] [&_.text-gold]:bg-clip-text [&_.text-gold]:text-transparent rtl:[&_.text-gold]:leading-[1.6]"
          dangerouslySetInnerHTML={{ __html: hero.hook[lang] }}
        />

        <p
          className="mt-5 mb-3 text-content-muted font-normal text-balance text-[clamp(1.1rem,5vw,1.6rem)] leading-[1.55] max-w-[34rem] 2xl:max-w-[35rem] rtl:mt-2.5 rtl:text-[clamp(0.9rem,4vw,1.5rem)] rtl:leading-[2.15] sm:mt-6 sm:text-center sm:leading-[1.6] sm:rtl:mt-4 sm:rtl:leading-loose lg:text-[clamp(1.1rem,5vw,1.6rem)] lg:mb-1 lg:max-w-[30rem] lg:rtl:text-[clamp(0.9rem,4vw,1.35rem)] 2xl:text-[clamp(1.1rem,5vw,1.79rem)] 2xl:rtl:text-[clamp(0.9rem,4vw,1.51rem)]"
          dangerouslySetInnerHTML={{ __html: hero.valueProp[lang] }}
        />

        <div className="flex flex-col sm:flex-row rtl:sm:flex-row-reverse w-full gap-3 justify-center mt-6 sm:mt-8 max-w-[26rem] 2xl:max-w-[30rem]">
          <HeroPrimaryCta
            label={hero.primaryCta[lang]}
            className={`cta-primary ${ctaBase} text-background cursor-pointer`}
          />
          <a href="#portfolio" className={`cta-secondary ${ctaBase}`}>
            {hero.secondaryCta[lang]}
          </a>
        </div>
      </div>
    </section>
  );
}
