import { use } from "react";
import { SITE_URL } from "@/app/data/translations/lang";
import resources from "@/app/data/resources";
import resourcesTranslations from "@/app/data/translations/resources";
import ResourcesGrid from "./ResourcesGrid";
import { RevealSection } from "../../components/ui/RevealSection";
import Script from "next/script";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = resourcesTranslations;
  const canonical = `${SITE_URL}/${lang}/resources`;

  return {
    title: t.metaTitle[lang],
    description: t.metaDescription[lang],
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/en/resources`,
        ar: `${SITE_URL}/ar/resources`,
        "x-default": `${SITE_URL}/en/resources`,
      },
    },
    openGraph: {
      title: t.metaTitle[lang],
      description: t.metaDescription[lang],
      url: canonical,
      type: "website",
      images: [
        {
          url: `${SITE_URL}/open-graph.webp`,
          width: 1200,
          height: 630,
          alt: "SM Web Studio – Web Design Agency in Egypt",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.metaTitle[lang],
      description: t.metaDescription[lang],
      images: [`${SITE_URL}/open-graph.webp`],
    },
    robots: { index: true, follow: true },
  };
}

export default function ResourcesPage({ params }) {
  const { lang } = use(params);
  const t = resourcesTranslations;
  const dir = lang === "ar" ? "rtl" : "ltr";
  const canonical = `${SITE_URL}/${lang}/resources`;

  const homeUrl = lang === "en" ? `${SITE_URL}/` : `${SITE_URL}/ar`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${canonical}#webpage`,
      name: t.pageTitle[lang],
      description: t.metaDescription[lang],
      url: canonical,
      inLanguage: lang,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      publisher: { "@id": `${SITE_URL}/#business` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: lang === "ar" ? "الرئيسية" : "Home",
          item: homeUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: t.pageTitle[lang],
          item: canonical,
        },
      ],
    },
  ];

  return (
    <div dir={dir} className="bg-background pt-16 sm:pt-30 pb-20 px-5">
      <Script
        id="guides-grid-seo"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <RevealSection>
        <div className="max-w-6xl mx-auto flex flex-col gap-6 sm:gap-8">
          {/* Hero */}
          <header className="text-center flex flex-col">
            <h1 className="text-heading font-bold text-content-heading mb-2 rtl:mb-3">
              {t.pageTitle[lang]}
            </h1>
            <p className="text-content-muted text-[clamp(1.2rem,2vw,1.6rem)] mx-auto leading-relaxed">
              {t.pageSubtitle[lang]}
            </p>
          </header>

          {/* Grid with category filter (client component) */}
          <ResourcesGrid resources={resources} lang={lang} t={t} />
        </div>
      </RevealSection>
    </div>
  );
}
