import type { Metadata } from "next";
import { use } from "react";
import terms from "@/app/data/translations/terms";
import { SITE_URL, SITE_NAME } from "@/app/constants";
import type { Lang, LangParams } from "@/app/types";

const metaDescription: Record<Lang, string> = {
  en: `Read the terms of service for ${SITE_NAME}. Learn about your rights and obligations when using our web design and development services.`,
  ar: `اطّلع على شروط الخدمة الخاصة بـ ${SITE_NAME} وتعرّف على حقوقك والتزاماتك عند استخدام خدمات تصميم المواقع لدينا.`,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<LangParams>;
}): Promise<Metadata> {
  const { lang } = await params;
  const title = terms.heading[lang] || terms.heading.en || "Terms of Service";
  const description = metaDescription[lang] ?? metaDescription.en;
  const canonical = `${SITE_URL}/${lang}/terms`;

  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/en/terms`,
        ar: `${SITE_URL}/ar/terms`,
        "x-default": `${SITE_URL}/en/terms`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: SITE_NAME,
      locale: lang === "en" ? "en_US" : "ar_EG",
      alternateLocale: lang === "en" ? "ar_EG" : "en_US",
      images: [
        {
          url: `${SITE_URL}/open-graph.webp`,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} – Web Design Company in Egypt`,
        },
      ],
    },
  };
}

export default function TermsPage({
  params,
}: {
  params: Promise<LangParams>;
}) {
  const { lang } = use(params);

  const t = terms;
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <div
      dir={dir}
      className="min-h-dvh pt-22 sm:pt-32 pb-16 px-6 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-neutral-800 pb-8 text-start">
          <h1 className="text-heading font-bold tracking-tight text-content-heading mb-4">
            {t.heading[lang] || t.heading.en}
          </h1>
          <p className="text-base text-gray-400 font-medium leading-relaxed">
            {t.subheading[lang] || t.subheading.en}
          </p>
        </header>

        <article className="space-y-10">
          {t.items.map((item, index) => (
            <section key={index} className="scroll-mt-24 text-start">
              <h2 className="text-subheading font-bold text-content-heading mb-3">
                {item.title[lang] || item.title.en}
              </h2>
              <p className="text-base text-gray-300 leading-relaxed whitespace-pre-line">
                {item.content[lang] || item.content.en}
              </p>
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
