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
  const t = translations;
  const isRtl = lang === "ar";

  const goalWords = lang === "en" ? ["growth", "reputation"] : ["نموّك", "سمعتنا"];

  return (
    <section
      aria-label={lang === "en" ? "Our mission" : "مهمتنا"}
      className="relative py-24 md:py-36 px-4 ltr:px-14"
      dir={isRtl ? "rtl" : "ltr"}
      id="goals"
    >
      {/* Seamless gradient: transparent → surface-card → transparent */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-card/40 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto text-center space-y-4 md:px-4">
        <p className="text-4xl md:text-7xl font-bold text-content-heading leading-tight md:rtl:leading-snug">
          {Array.isArray(t.goal[lang])
            ? (t.goal[lang] as string[]).map((line, i) => (
                <span key={i} className="block">
                  {highlightWords(line, goalWords)}
                </span>
              ))
            : highlightWords(t.goal[lang] as string, goalWords)}
        </p>

      </div>
    </section>
  );
}
