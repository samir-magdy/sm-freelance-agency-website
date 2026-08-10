import type { Metadata } from "next";
import { use } from "react";
import { SCHEMA_IDS } from "@/app/constants";
import guides from "@/app/data/guides";
import guidesTranslations from "@/app/data/translations/guidesShared";
import pageMeta from "@/app/data/translations/pageMeta";
import { breadcrumbHome } from "@/app/data/translations/nav";
import GuidesGrid from "./GuidesGrid";
import type { LangParams } from "@/app/types";
import { homeUrl, pageUrl, pageAlternates } from "@/lib/urls";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LangParams>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: pageMeta.guides.title[lang],
    description: pageMeta.guides.description[lang],
    alternates: pageAlternates(lang, "/guides"),
  };
}

export default function GuidesPage({
  params,
}: {
  params: Promise<LangParams>;
}) {
  const { lang } = use(params);
  const translations = guidesTranslations;
  const canonical = pageUrl(lang, "/guides");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${canonical}#webpage`,
      name: translations.pageTitle[lang],
      description: pageMeta.guides.description[lang],
      url: canonical,
      inLanguage: lang,
      isPartOf: { "@id": SCHEMA_IDS.website },
      publisher: { "@id": SCHEMA_IDS.business },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: breadcrumbHome[lang],
          item: homeUrl(lang),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: translations.pageTitle[lang],
          item: canonical,
        },
      ],
    },
  ];

  return (
    <div className="bg-background pt-16 sm:pt-26 pb-14 px-4 max-w-348 mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
 
        <div className="mb-6 md:mb-10 text-center">
          <h1 className="font-bold text-heading text-content-heading mb-2 rtl:mb-3 leading-tight">
            {translations.pageTitle[lang]}
          </h1>
          <p className="text-center text-content-muted text-[clamp(1.2rem,2vw,1.6rem)] max-w-2xl mx-auto">
            {translations.pageSubtitle[lang]}
          </p>
        </div>

        <GuidesGrid resources={guides} lang={lang} translations={translations} />
      </div>
  );
}
