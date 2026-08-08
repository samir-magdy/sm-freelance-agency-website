import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import type { Lang, Localized } from "@/app/types";
import type { Guide } from "@/app/data/guides/types";

interface GuidesGridStrings {
  minRead: Localized;
  readGuideButton: Localized;
}

interface GuidesGridProps {
  resources: Guide[];
  lang: Lang;
  translations: GuidesGridStrings;
}

export default function GuidesGrid({ resources, lang, translations }: GuidesGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {resources.map((guide) => (
        <article
          key={guide.slug}
          className="flex flex-col justify-between gap-4 p-5.5 rounded-2xl border-2 border-border-subtle bg-surface-card/50 hover:border-border-strong transition-colors duration-200"
        >
          <div>
            <h2 className="text-content-heading font-bold text-subheading leading-snug rtl:leading-loose">
              {guide.title[lang]}
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <time
                dateTime={guide.datePublished}
                className="inline-flex items-center gap-1.5 text-sm text-content-muted border border-border-subtle rounded-lg px-3 py-1"
              >
                <Calendar size={13} aria-hidden />
                {new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-US", {
                  dateStyle: "long",
                }).format(new Date(guide.datePublished))}
              </time>
              <span className="inline-flex items-center gap-1.5 text-sm text-content-muted border border-border-subtle rounded-lg px-3 py-1">
                <Clock size={13} aria-hidden />
                {guide.readingMinutes[lang]} {translations.minRead[lang]}
              </span>
            </div>
          </div>

          <div className="flex items-center sm:pb-2">
            <p className="text-content-muted text-base sm:text-[clamp(1rem,3.5vw,1.3rem)] leading-relaxed rtl:md:py-2 rtl:leading-loose">
              {guide.excerpt[lang]}
            </p>
          </div>

          <Link
            href={`/${lang}/guides/${guide.slug}`}
            className="cta-primary inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl text-background text-base sm:text-[clamp(1rem,3vw,1.3rem)] font-semibold tracking-wide"
          >
            {translations.readGuideButton[lang]}
          </Link>
        </article>
      ))}
      <div className="relative w-full flex flex-col items-center justify-center gap-4 p-5.5 rounded-2xl bg-surface-card/20 transition-colors duration-200 text-center overflow-hidden min-h-88">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="16"
            stroke="#FFD7004D"
            strokeWidth="3"
            strokeDasharray="8 6"
            style={{ animation: "dash-march 2s linear infinite" }}
          />
        </svg>

        <div className="space-y-2 relative z-10">
          <h3 className="text-content-heading font-bold text-heading tracking-tight mb-4">
            {lang === "ar" ? "ترقب المزيد" : "Stay Tuned"}
          </h3>
          <p
            className="text-content-muted text-subheading max-w-75 mx-auto leading-relaxed"
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            {lang === "ar"
              ? "نعمل على إعداد المزيد من الأدلة المميزة من أجلك."
              : "We are working on more useful guides for you."}
          </p>
        </div>

        <div className="flex gap-2 mt-2 relative z-10">
          <span className="w-3 h-3 rounded-full bg-gold-light/80 animate-pulse [animation-delay:-0.3s]"></span>
          <span className="w-3 h-3 rounded-full bg-gold-light/80 animate-pulse [animation-delay:-0.20s]"></span>
          <span className="w-3 h-3 rounded-full bg-gold-light/80 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
}
