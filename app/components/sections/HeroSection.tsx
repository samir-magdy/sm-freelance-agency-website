import translations from "@/app/data/translations";
import type { Lang } from "@/app/data/translations";
import HeroNav from "../ui/HeroNav";

export default function HeroSection({ lang }: { lang: Lang }) {
  const t = translations;

  return (
    <div className="animate-fade-in">
      <HeroNav lang={lang} />

      <section
        id="home"
        className="h-screen flex items-center justify-center relative"
      >
        {/* Dot grid + radial glow background */}
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />

        <div id="hero-container" className="relative z-10 flex flex-col items-center">
          <h1 className="font-bold text-center text-content-heading">
            <span
              className="block text-content-muted text-sm md:text-xl font-medium uppercase mb-2"
            >
              {t.hero.seoLabel[lang]}
            </span>
            <span
              id="hero-hook"
              className="block text-6xl md:text-9xl leading-tight mb-4 md:mb-12 px-6"
            >
              {t.hero.name[lang]}
            </span>
          </h1>
    
          <div className="flex items-center gap-4 md:gap-5">
            <a
              href="https://wa.me/201211221277?text=Hello%20Samir%2C%20I%20would%20like%20to%20inquire%20about%20getting%20a%20professional%20website%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-float inline-flex items-center justify-center gap-2 md:px-6 md:py-3 bg-[#25d366] hover:bg-[#25d365b1] text-[#FFFFFF] font-semibold text-base md:text-subheading rounded-full transition-colors duration-500"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 md:w-5 md:h-5"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="hidden md:inline">{t.hero.cta[lang]}</span>
            </a>

            <a
              href="#contact"

              className="bg-brand-accent hover:opacity-90 text-white font-semibold text-xl md:text-4xl px-6 py-3 md:px-12 md:py-6 rounded-full transition-all duration-300"
            >
              {t.hero.primaryCta[lang]}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
