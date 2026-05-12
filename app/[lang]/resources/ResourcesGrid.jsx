import Link from "next/link";

export default function ResourcesGrid({ resources, lang, t }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {resources.map((article) => (
        <article
          key={article.slug}
          className="flex flex-col justify-between gap-4 p-5.5 rounded-2xl border-2 border-border-subtle bg-surface-card/50 hover:border-border-strong transition-colors duration-200"
        >
          <h2 className="text-content-heading font-bold text-xl md:text-2xl leading-snug">
            {article.title[lang]}
          </h2>

          <div className="flex items-center sm:pb-2">
            <p className="text-content-muted text-lg leading-relaxed">
              {article.excerpt[lang]}
            </p>
          </div>

          <Link
            href={`/${lang}/resources/${article.slug}`}
            className="relative overflow-hidden inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-linear-to-b from-gold to-gold-dark text-gray-900 text-lg font-semibold tracking-wide transition-all duration-200"
          >
            {t.readMore[lang]}
          </Link>
        </article>
      ))}
      <div
        className="relative group flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border-2 border-dashed border-border-subtle bg-surface-card/20 transition-all duration-500 hover:border-gold/40 hover:bg-surface-card/40 min-h-[350px] text-center overflow-hidden"
      >
        {/* Subtle Background Glow - Made it permanently visible but faint, intensifying on hover */}
        <div className="absolute inset-0 bg-radial-gradient from-gold/5 to-transparent group-hover:opacity-100 transition-opacity duration-700" />

        {/* Decorative Icon Element */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gold/20 rounded-full blur-md opacity-25 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative p-2 w-20 h-20 rounded-full border border-border-subtle bg-surface-card flex items-center justify-center shadow-inner">
            <img className="w-full" src="/brand.svg" alt="Logo" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-2 relative z-10">
          <h3 className="text-content-heading font-bold text-2xl tracking-tight">
            {lang === "ar" ? "ترقب المزيد" : "Stay Tuned"}
          </h3>
          <p
            className={`text-content-muted text-base max-w-[250px] mx-auto leading-relaxed ${lang === "ar" ? "font-arabic" : ""}`}
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            {lang === "ar"
              ? "نعمل على إعداد المزيد من الموارد المميزة من أجلك."
              : "We are working on more useful resources for you."}
          </p>
        </div>

        {/* Permanent Animated Progress Indicator */}
        <div className="flex gap-2 mt-2">
          <span className="w-2 h-2 rounded-full bg-gold/60 animate-pulse [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 rounded-full bg-gold/60 animate-pulse [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 rounded-full bg-gold/60 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
}
