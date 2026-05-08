import { use } from "react";
import { SITE_URL } from "@/app/data/translations/lang";
import resources from "@/app/data/resources";
import resourcesTranslations from "@/app/data/translations/resources";
import ResourcesGrid from "./ResourcesGrid";
import { RevealSection } from "../../components/ui/RevealSection";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = resourcesTranslations;
  const canonical =
    lang === "en" ? `${SITE_URL}/resources` : `${SITE_URL}/${lang}/resources`;

  return {
    title: t.metaTitle[lang],
    description: t.metaDescription[lang],
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/resources`,
        ar: `${SITE_URL}/ar/resources`,
        "x-default": `${SITE_URL}/resources`,
      },
    },
    openGraph: {
      title: t.metaTitle[lang],
      description: t.metaDescription[lang],
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.metaTitle[lang],
      description: t.metaDescription[lang],
    },
    robots: { index: true, follow: true },
  };
}

export default function ResourcesPage({ params }) {
  const { lang } = use(params);
  const t = resourcesTranslations;
  const dir = lang === "ar" ? "rtl" : "ltr";
  const canonical =
    lang === "en" ? `${SITE_URL}/resources` : `${SITE_URL}/${lang}/resources`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/resources#webpage`,
    name: t.pageTitle.en,
    description: t.metaDescription.en,
    url: `${SITE_URL}/resources`,
    inLanguage: lang,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#business` },
  };

  return (
    <main
      dir={dir}
      className="bg-background pt-16 sm:pt-32 pb-20 px-5"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <RevealSection>
        <div className="max-w-6xl mx-auto flex flex-col gap-8 sm:gap-12">
          {/* Hero */}
          <header className="text-center flex flex-col gap-3">
            <h1 className="text-heading font-bold text-content-heading">
              {t.pageTitle[lang]}
            </h1>
            <p className="text-content-muted text-[clamp(1.1rem,2vw,1.5rem)]  mx-auto leading-relaxed">
              {t.pageSubtitle[lang]}
            </p>
          </header>

          {/* Grid with category filter (client component) */}
          <ResourcesGrid resources={resources} lang={lang} t={t} />
        </div>
      </RevealSection>
    </main>
  );
}
