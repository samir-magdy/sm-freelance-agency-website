import Link from "next/link";

export default function ResourcesGrid({ resources, lang, t }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-6">
      {resources.map((article) => (
        <article
          key={article.slug}
          className="flex flex-col justify-between gap-4 p-7 rounded-2xl border-2 border-border-subtle bg-surface-card/50 hover:border-border-strong transition-colors duration-200"
        >
          <h2 className="text-content-heading font-bold text-xl md:text-2xl leading-snug">
            {article.title[lang]}
          </h2>

          <div className="flex items-center md:py-4">
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
    </div>
  );
}
