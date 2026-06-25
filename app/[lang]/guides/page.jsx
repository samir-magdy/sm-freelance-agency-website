import { use } from "react";
import { SITE_URL, SITE_NAME, TWITTER_HANDLE } from "@/app/constants";
import guides from "@/app/data/guides";
import guidesTranslations from "@/app/data/translations/guides";
import GuidesGrid from "./GuidesGrid";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = guidesTranslations;
  const canonical = `${SITE_URL}/${lang}/guides`;

  return {
    title: t.metaTitle[lang],
    description: t.metaDescription[lang],
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/en/guides`,
        ar: `${SITE_URL}/ar/guides`,
        "x-default": `${SITE_URL}/en/guides`,
      },
    },
    openGraph: {
      title: t.metaTitle[lang],
      description: t.metaDescription[lang],
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
          alt: "SM Web Design Studio – Web Design Company in Egypt",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.metaTitle[lang],
      description: t.metaDescription[lang],
      images: [`${SITE_URL}/open-graph.webp`],
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
    },
  };
}

export default function GuidesPage({ params }) {
  const { lang } = use(params);
  const t = guidesTranslations;
  const dir = lang === "ar" ? "rtl" : "ltr";
  const canonical = `${SITE_URL}/${lang}/guides`;

  const homeUrl = lang === "en" ? SITE_URL : `${SITE_URL}/ar`;

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
    <div dir={dir} className="bg-background pt-18 sm:pt-26 pb-20 px-5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8">
          {/* Hero */}
          <header className="text-center flex flex-col">
            <h1 className="text-[clamp(1.4rem,1.75vw,2.3rem)] font-bold text-content-heading rtl:mb-1">
              {t.pageTitle[lang]}
            </h1>
     
          </header>

          {/* Grid with category filter (client component) */}
          <GuidesGrid resources={guides} lang={lang} t={t} />
        </div>
    </div>
  );
}
