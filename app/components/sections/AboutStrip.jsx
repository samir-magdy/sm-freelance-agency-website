import translations from "@/app/data/translations";

function highlightWords(text, words) {
  const escaped = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`));
  return parts.map((part, i) =>
    words.includes(part) ? (
      <span key={i} className="text-gold">{part}</span>
    ) : (
      part
    )
  );
}

export default function AboutStrip({ lang }) {
  const t = translations.aboutStrip;
  const isRtl = lang === "ar";

  return (
    <section
      aria-label={lang === "en" ? "About us" : "من نحن"}
      className="relative py-16 md:py-24 px-4 ltr:px-14"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Gradient band — matches GoalSection treatment */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-card/40 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="font-bold text-heading mb-6 md:mb-8">
          {t.heading[lang]}
        </h2>
        <p className="text-subheading md:text-[clamp(1.25rem,1.1rem+0.7vw,1.6rem)] font-medium text-content-body leading-relaxed md:leading-relaxed">
          {highlightWords(t.text[lang], t.highlightWords[lang])}
        </p>
      </div>
    </section>
  );
}
