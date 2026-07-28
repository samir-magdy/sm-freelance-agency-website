import type { Metadata } from "next";
import { use } from "react";
import { SCHEMA_IDS } from "@/app/constants";
import guides from "@/app/data/guides";
import guidesTranslations from "@/app/data/translations/guides";
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
  const t = guidesTranslations;
  return {
    title: t.metaTitle[lang],
    description: t.metaDescription[lang],
    alternates: pageAlternates(lang, "/guides"),
  };
}

export default function GuidesPage({
  params,
}: {
  params: Promise<LangParams>;
}) {
  const { lang } = use(params);
  const t = guidesTranslations;
  const dir = lang === "ar" ? "rtl" : "ltr";
  const canonical = pageUrl(lang, "/guides");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${canonical}#webpage`,
      name: t.pageTitle[lang],
      description: t.metaDescription[lang],
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
          name: lang === "ar" ? "الرئيسية" : "Home",
          item: homeUrl(lang),
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
    <div dir={dir} className="bg-background pt-18 sm:pt-26 pb-14 px-5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="max-w-7xl mx-auto flex flex-col gap-2 sm:gap-8">
        <header className="text-center flex flex-col">
          <h1 className="text-heading font-bold text-content-heading rtl:mb-1">
            {t.pageTitle[lang]}
          </h1>
        </header>

        <GuidesGrid resources={guides} lang={lang} t={t} />
      </div>
    </div>
  );
}
