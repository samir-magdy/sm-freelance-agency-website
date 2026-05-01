import { use } from "react";
import translations from "@/app/data/translations";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = translations.terms;

  return {
    title: t?.heading?.[lang] || t?.heading?.en || "Terms of Service",
  };
}

export default function TermsPage({ params }) {
  const { lang } = use(params);

  const t = translations.terms;
  const dir = lang === "ar" ? "rtl" : "ltr";

  // If the translation object is missing, show a visible error on screen
  if (!t) {
    return (
      <main className="min-h-screen pt-32 flex justify-center text-red-500 font-bold">
        Error: Could not find 'terms' in the translations dictionary. Check
        index.js.
      </main>
    );
  }

  return (
    <main
      dir={dir}
      className="min-h-screen pt-32 pb-16 px-6 md:px-12 bg-white dark:bg-neutral-950"
    >
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 border-b border-gray-200 dark:border-neutral-800 pb-8 text-start">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            {/* Added fallback to .en to guarantee text renders */}
            {t.heading?.[lang] || t.heading?.en}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
            {t.subheading?.[lang] || t.subheading?.en}
          </p>
        </header>

        <article className="space-y-10">
          {t.items?.map((item, index) => (
            <section key={index} className="scroll-mt-24 text-start">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {item.title?.[lang] || item.title?.en}
              </h2>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {item.content?.[lang] || item.content?.en}
              </p>
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}
