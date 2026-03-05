import type { Lang } from "@/app/data/translations";
import translations from "@/app/data/translations";

function highlightWords(text: string, words: string[]) {
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

export default function GoalSection({ lang }: { lang: Lang }) {
  const lines = translations.servicesSection.goal.lines;
  const isRtl = lang === "ar";

  const line0Words = lang === "en" ? ["growth", "reputation"] : ["نموّك", "سمعتنا"];

  return (
    <section
      aria-label={lang === "en" ? "Our mission" : "مهمتنا"}
      className="relative py-12 md:py-40 px-4"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Seamless gradient: transparent → surface-card → transparent */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-card/40 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
        <p className="text-4xl md:text-7xl font-bold text-content-heading leading-tight md:rtl:leading-snug">
          {highlightWords(lines[0][lang], line0Words)}
        </p>
        <p className="text-lg md:text-2xl italic text-content-body leading-snug">
          {lines[1][lang]}
        </p>
      </div>
    </section>
  );
}
