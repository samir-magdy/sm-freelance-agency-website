import hero from "@/app/data/translations/heroSection";
import type { Lang } from "@/app/types";
import styles from "./HeroSection.module.css";

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

      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-start sm:items-center px-6 sm:px-10 pt-36 pb-24 sm:pt-40 sm:pb-28">
        <h1 className="self-start sm:self-auto inline-flex items-center gap-2.5 sm:gap-[0.85rem]">
          <span aria-hidden="true" className={styles.h1EyebrowRule} />
          <span className={styles.h1Eyebrow}>{hero.h1Eyebrow[lang]}</span>
          <span
            aria-hidden="true"
            className={`${styles.h1EyebrowRule} ${styles.h1EyebrowRuleEnd}`}
          />
        </h1>

        <p
          className={`${styles.mobileHook} rtl:hidden sm:hidden`}
          dangerouslySetInnerHTML={{ __html: hero.mobileHook[lang] }}
        />

        <p
          className={`${styles.hook} hidden sm:block rtl:block`}
          dangerouslySetInnerHTML={{ __html: hero.hook[lang] }}
        />

        <p
          className={styles.valueProp}
          dangerouslySetInnerHTML={{ __html: hero.valueProp[lang] }}
        />

        <div className="flex rtl:flex-row-reverse w-full gap-3 justify-center mt-6 sm:mt-8 max-w-md">
          <a
            href="#contact"
            className={`cta-primary ${ctaBase} text-background`}
          >
            {hero.primaryCta[lang]}
          </a>
          <a href="#portfolio" className={`cta-secondary ${ctaBase}`}>
            {hero.secondaryCta[lang]}
          </a>
        </div>
      </div>
    </section>
  );
}
