import Link from "next/link";

export default function ResourcesGrid({ resources, lang, t }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {resources.map((guide) => (
        <article
          key={guide.slug}
          className="flex flex-col justify-between gap-4 p-5.5 rounded-2xl border-2 border-border-subtle bg-surface-card/50 hover:border-border-strong transition-colors duration-200"
        >
          <h2 className="text-content-heading font-bold text-subheading leading-snug rtl:leading-loose">
            {guide.title[lang]}
          </h2>

          <div className="flex items-center sm:pb-2">
            <p className="text-content-muted text-base leading-relaxed rtl:md:py-2 rtl:leading-loose">
              {guide.excerpt[lang]}
            </p>
          </div>

          <Link
            href={`/${lang}/resources/${guide.slug}`}
            className="relative overflow-hidden inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-linear-to-b from-gold to-gold-dark text-gray-900 text-base font-semibold tracking-wide transition-all duration-200"
          >
            {t.readMore[lang]}
          </Link>
        </article>
      ))}
      <div
        className="relative group flex flex-col items-center justify-center gap-4 p-8 rounded-2xl bg-surface-card/20 transition-all duration-500 hover:bg-surface-card/40 min-h-[350px] text-center overflow-hidden"
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" aria-hidden="true">
          <rect
            x="1" y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="16"
            stroke="oklch(55% 0.0847 92.2 / 0.7)"
            strokeWidth="3"
            strokeDasharray="8 6"
            style={{ animation: "dash-march 2s linear infinite" }}
          />
        </svg>

        {/* Text Content */}
        <div className="space-y-2 relative z-10">
          <h3 className="text-content-heading font-bold text-heading tracking-tight mb-4">
            {lang === "ar" ? "ترقب المزيد" : "Stay Tuned"}
          </h3>
          <p
            className={`text-content-muted text-subheading max-w-[300px] mx-auto leading-relaxed ${lang === "ar" ? "font-arabic" : ""}`}
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            {lang === "ar"
              ? "نعمل على إعداد المزيد من الموارد المميزة من أجلك."
              : "We are working on more useful resources for you."}
          </p>
        </div>

        {/* Permanent Animated Progress Indicator */}
        <div className="flex gap-2 mt-2">
          <span className="w-3 h-3 rounded-full bg-gold/80 animate-pulse [animation-delay:-0.3s]"></span>
          <span className="w-3 h-3 rounded-full bg-gold/80 animate-pulse [animation-delay:-0.15s]"></span>
          <span className="w-3 h-3 rounded-full bg-gold/80 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
}
