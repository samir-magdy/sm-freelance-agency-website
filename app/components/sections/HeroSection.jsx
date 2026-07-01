import hero from "@/app/data/translations/heroSection";

export default function HeroSection({ lang }) {
  return (
    <section
      id="home"
      className="hero relative min-h-svh flex items-center justify-center overflow-hidden"
    >
      {/* ── Atmosphere layers ── */}
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />

      {/* ── Content ── */}
      <div className="hero-inner safari-hero-padding relative z-10 w-full mx-auto flex flex-col items-center text-center px-8 sm:px-10 pt-24 pb-24 sm:pt-44 sm:rtl:pb-32 sm:pb-28">
        <p className="inline-flex items-center gap-2.5 sm:gap-[0.85rem]">
          <span
            aria-hidden="true"
            className="flex-none h-px w-[clamp(2rem,4vw,3rem)] rounded-full bg-linear-to-r rtl:bg-linear-to-l from-transparent to-white/70 shadow-[0_0_8px_oklch(76.7%_0.1399_91.2/0.25)]"
          />
          <span className="ps-0.5 font-semibold uppercase sm:tracking-[0.15em] tracking-widest leading-none bg-clip-text text-[clamp(0.5rem,2.2vw,0.8rem)] rtl:text-[clamp(0.6rem,3vw,1rem)] text-content-muted rtl:normal-case rtl:tracking-normal rtl:leading-normal">
            {hero.eyebrow[lang]}
          </span>
          <span
            aria-hidden="true"
            className="flex-none h-px w-[clamp(2rem,4vw,3rem)] rounded-full bg-linear-to-r rtl:bg-linear-to-l from-white/70 to-transparent shadow-[0_0_8px_oklch(76.7%_0.1399_91.2/0.25)]"
          />
        </p>

        <h1
        id="hero-title"
          className="max-w-[30ch] mt-6 sm:my-4 mb-2 rtl:my-4 sm:rtl:mb-6 text-balance font-extrabold tracking-[-0.02em] text-content-heading text-[clamp(1.8rem,12vw,5.25rem)] rtl:text-[clamp(2rem,4.5vw,45rem)] ltr:leading-14 ltr:sm:leading-28 sm:rtl:max-w-[18ch] rtl:tracking-normal rtl:leading-[1.9] sm:rtl:leading-[1.55]"
          dangerouslySetInnerHTML={{ __html: hero.name[lang] }}
        />

        <p
          className="hero-sub w-full rtl:mt-0 mt-[clamp(0.5rem,3vw,1.75rem)] sm:mt-0 text-content-body text-[clamp(1.1rem,5vw,1.6rem)] rtl:text-[clamp(0.9rem,4vw,1.5rem)] sm:leading-[1.6] rtl:leading-[2.15] sm:rtl:leading-loose rtl:max-w-150 rtl:px-4"
          dangerouslySetInnerHTML={{ __html: hero.subheading[lang] }}
        />

        <div className="px-6 sm:px-0 flex flex-col sm:flex-row items-stretch sm:items-center sm:flex-wrap w-full sm:w-auto gap-3 sm:gap-6 mt-[clamp(2rem,4vw,2rem)]">
          <a
            href="#contact"
            className="cta-primary inline-flex w-auto items-center justify-center rounded-[0.9rem] px-[1.9rem] py-[0.85rem] rtl:text-[clamp(1.1rem,1.2vw+0.6rem,1.5rem)] text-[clamp(1.2rem,1.2vw+0.6rem,1.6rem)] font-semibold bg-linear-to-b text-gray-900 rtl:pb-4"
          >
            {hero.primaryCta[lang]}
          </a>

          <a
            href="#portfolio"
            className="group inline-flex w-auto items-center justify-center gap-2 rounded-[0.9rem] border border-border-strong backdrop-blur-sm bg-white/2 px-[1.9rem] py-[0.85rem] text-[clamp(1.2rem,1.2vw+0.6rem,1.6rem)] rtl:text-[clamp(1.1rem,1.2vw+0.6rem,1.5rem)] font-semibold text-content-body transition-all hover:text-content-heading hover:border-white/30 rtl:pb-4"
          >
            <span>{hero.secondaryCta[lang]}</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="none"
              className="rotate-90 transition-transform duration-300 group-hover:translate-y-0.5"
              aria-hidden="true"
            >
              <path
                d="M3.333 8h9.334M8.667 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
