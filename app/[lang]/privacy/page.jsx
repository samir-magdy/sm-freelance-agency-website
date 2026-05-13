import { use } from "react";
import translations from "@/app/data/translations";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = translations.privacy;

  return {
    title: t?.heading?.[lang] || t?.heading?.en || "Privacy Policy",
    robots: { index: false, follow: true },
  };
}

export default function PrivacyPage({ params }) {
  const { lang } = use(params); // use() unwraps the Promise synchronously in a Client Component
  const t = translations.privacy;
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <main
      dir={dir}
      className="min-h-screen pt-22 sm:pt-32 pb-16 px-6 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-neutral-800 pb-8 text-start">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-content-heading mb-4">
            {/* Added fallback to .en to guarantee text renders */}
            {t.heading?.[lang] || t.heading?.en}
          </h1>
          <p className="text-lg text-content-muted  font-medium leading-relaxed">
            {t.subheading?.[lang] || t.subheading?.en}
          </p>
        </header>

        <article className="space-y-10">
          {t.items?.map((item, index) => (
            <section key={index} className="scroll-mt-24 text-start">
              <h2 className="text-2xl font-bold text-content-heading mb-3">
                {item.title?.[lang] || item.title?.en}
              </h2>
              <p className="text-base text-content-body  leading-relaxed whitespace-pre-line">
                {item.content?.[lang] || item.content?.en}
              </p>
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}
