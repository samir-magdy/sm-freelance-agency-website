import type { Metadata } from "next";
import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { SITE_NAME, SCHEMA_IDS } from "@/app/constants";
import guides from "@/app/data/guides";
import guidesTranslations from "@/app/data/translations/guides";
import PricingEstimator from "@/app/components/utils/PricingEstimator";
import type { Lang, LangSlugParams } from "@/app/types";
import {
  homeUrl,
  pageUrl,
  pageAlternates,
  ogImage,
} from "@/lib/urls";

function BackToGuidesLink({ lang, label }: { lang: Lang; label: string }) {
  return (
    <Link
      href={`/${lang}/guides`}
      className="hover:border-white/30 hover:text-white/80 border-border-strong border w-fit rounded-lg px-5 py-2 group tracking-wide flex items-center gap-2.5 text-content-muted text-[clamp(0.9rem,1.3vw,1.2rem)] font-medium transition-all duration-500"
    >
      <ArrowLeft
        className={`size-3 sm:size-5 transition-transform duration-300 ${lang === "ar" ? "rotate-180 group-hover:translate-x-1" : "group-hover:-translate-x-1"}`}
        aria-hidden
      />
      {label}
    </Link>
  );
}

export function generateStaticParams() {
  return guides.flatMap((r) => [
    { lang: "en", slug: r.slug },
    { lang: "ar", slug: r.slug },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LangSlugParams>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const guide = guides.find((r) => r.slug === slug);
  if (!guide) return {};

  const path = `/guides/${slug}`;
  const canonical = pageUrl(lang, path);

  return {
    title: (guide.metaTitle ?? guide.title)[lang],
    description: guide.metaDescription[lang],
    alternates: pageAlternates(lang, path),
    openGraph: {
      title: guide.title[lang],
      description: guide.metaDescription[lang],
      url: canonical,
      type: "article",
      siteName: SITE_NAME,
      locale: lang === "en" ? "en_US" : "ar_EG",
      alternateLocale: lang === "en" ? "ar_EG" : "en_US",
      images: [
        {
          url: ogImage(lang),
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} – Web Design Company in Egypt`,
        },
      ],
    },
  };
}

export default function GuidePage({
  params,
}: {
  params: Promise<LangSlugParams>;
}) {
  const { lang, slug } = use(params);
  const guide = guides.find((r) => r.slug === slug);
  if (!guide) notFound();

  const t = guidesTranslations;
  const dir = lang === "ar" ? "rtl" : "ltr";
  const relatedGuides = guides.filter((g) => g.slug !== slug);

  const canonical = pageUrl(lang, `/guides/${slug}`);
  const guidesUrl = pageUrl(lang, "/guides");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${canonical}#article`,
      headline: guide.title[lang],
      description: guide.metaDescription[lang],
      image: ogImage(lang),
      inLanguage: lang,
      url: canonical,
      datePublished: guide.datePublished,
      dateModified: guide.dateModified,
      author: { "@id": SCHEMA_IDS.founder, name: "Samir Magdy" },
      publisher: { "@id": SCHEMA_IDS.business },
      isPartOf: { "@id": SCHEMA_IDS.website },
      mainEntityOfPage: { "@id": `${canonical}#webpage` },
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
          name: lang === "ar" ? "الأدلة" : "Guides",
          item: guidesUrl,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: guide.title[lang],
          item: canonical,
        },
      ],
    },
  ];

  const SLOT = "<!-- PRICING_ESTIMATOR_SLOT -->";
  const articleClassName = `
    html-content
    [&_h2]:text-[clamp(1.25rem,5vw,2.5rem)] [&_h2]:font-bold [&_h2]:text-content-heading/95 [&_h2]:mt-12 [&_h2]:mb-5 [&_h2]:leading-snug
    [&_h3]:text-[clamp(1.15rem,5vw,2.25rem)] [&_h3]:font-semibold [&_h3]:text-content-heading [&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:leading-snug
    [&_p]:text-content-body [&_p]:text-subheading [&_p]:leading-relaxed [&_p]:mb-6
    [&_ul]:list-disc [&_ul]:ps-7 [&_ul]:mb-6 [&_ul]:space-y-3
    [&_ol]:list-decimal [&_ol]:ps-7 [&_ol]:mb-6 [&_ol]:space-y-3
    [&_li]:text-content-body [&_li]:text-subheading [&_li]:leading-relaxed
    [&_strong]:text-content-heading [&_strong]:font-semibold [&[dir=rtl]_*]:leading-loose
    [&_table]:w-full [&_table]:min-w-[600px] [&_table]:table-fixed [&_table]:border-separate [&_table]:border-spacing-0
    [&_thead]:bg-white/5 [&_tbody_tr]:transition-colors [&_tbody_tr]:hover:bg-white/4
    [&_th]:text-content-heading [&_th]:font-semibold [&_th]:text-center [&_th]:p-3 [&_th]:text-base [&_th]:border-b [&_th]:border-e [&_th]:border-white/15 [&_th]:align-middle sm:[&_th]:p-4 sm:[&_th]:text-subheading
    [&_td]:text-content-body [&_td]:text-base [&_td]:text-center [&_td]:p-3 [&_td]:border-b [&_td]:border-e [&_td]:border-white/10 [&_td]:align-middle [&_td]:leading-relaxed sm:[&_td]:p-4 sm:[&_td]:text-subheading
    [&_th:last-child]:border-e-0 [&_td:last-child]:border-e-0
[&_tbody_tr:last-child_td]:border-b-0
  `;
  const wrapTables = (html: string): string =>
    html
      .replaceAll("<table", '<div class="table-wrap"><table')
      .replaceAll("</table>", "</table></div>");
  const parts = guide.content[lang].split(SLOT);

  return (
    <div
      dir={dir}
      className="min-h-dvh bg-background pt-22 sm:pt-28 pb-14 sm:pb-20 px-5 overflow-x-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="max-w-7xl mx-auto flex flex-col gap-4 sm:gap-8">
        <BackToGuidesLink lang={lang} label={t.backToGuides[lang]} />
        <header>
          <h1 className="text-[clamp(1.5rem,5vw,2.8rem)] font-bold text-content-heading leading-tight rtl:leading-loose">
            {guide.title[lang]}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <time
              dateTime={guide.datePublished}
              className="inline-flex items-center gap-1.5 text-sm sm:text-base text-content-muted border border-border-subtle rounded-lg px-3 py-1"
            >
              <Calendar size={13} aria-hidden />
              {new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-US", {
                dateStyle: "long",
              }).format(new Date(guide.datePublished))}
            </time>
            <span className="inline-flex items-center gap-1.5 text-sm sm:text-base text-content-muted border border-border-subtle rounded-lg px-3 py-1">
              <Clock size={13} aria-hidden />
              {guide.readingMinutes[lang]} {t.minRead[lang]}
            </span>
          </div>
        </header>
        {parts.length === 1 ? (
          <article
            dir={dir}
            className={articleClassName}
            dangerouslySetInnerHTML={{ __html: wrapTables(parts[0]) }}
          />
        ) : (
          <>
            <article
              dir={dir}
              className={articleClassName}
              dangerouslySetInnerHTML={{ __html: wrapTables(parts[0]) }}
            />
            <PricingEstimator lang={lang} />
            <article
              dir={dir}
              className={articleClassName}
              dangerouslySetInnerHTML={{ __html: wrapTables(parts[1]) }}
            />
          </>
        )}
        <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-surface-low mb-6">
          <div className="relative text-center sm:text-start flex flex-col sm:flex-row sm:items-center gap-7 sm:gap-12 px-7 py-9 sm:px-11 sm:py-11">
            <p className="flex-1 text-[clamp(1.2rem,4vw,2.2rem)] font-semibold text-content-heading leading-tight rtl:leading-loose">
              {t.articleCta[lang]}
            </p>
            <Link
              href={`/${lang}#contact`}
              className="cta-primary justify-center shrink-0 py-3 px-8 rounded-lg text-gray-900 text-base sm:text-xl font-medium tracking-wide whitespace-nowrap"
            >
              {t.articleCtaButton[lang]}
         
            </Link>
          </div>
        </div>
        {relatedGuides.length > 0 && (
          <section
            aria-labelledby="related-heading"
            className="mt-2 sm:mt-4"
          >
            <h2
              id="related-heading"
              className="text-content-heading font-bold text-[clamp(1.25rem,3vw,1.75rem)] leading-snug rtl:leading-loose mb-6 sm:mb-8"
            >
              {t.relatedHeading[lang]}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 list-none p-0">
              {relatedGuides.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/${lang}/guides/${g.slug}`}
                    className="group flex flex-col gap-3 h-full p-5 rounded-2xl border-2 border-border-strong bg-surface-card/50 hover:border-white/20 transition-colors duration-200"
                  >
                    <h3 className="text-content-heading font-semibold text-subheading leading-snug rtl:leading-loose">
                      {g.title[lang]}
                    </h3>
                    <p className="text-content-muted text-base leading-relaxed rtl:leading-loose line-clamp-3">
                      {g.excerpt[lang]}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-content-body transition-colors duration-200">
                      {t.readMore[lang]}
                      <ArrowRight
                        className="size-4 rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        <div className="sm:mt-2">
          <BackToGuidesLink lang={lang} label={t.backToGuides[lang]} />
        </div>
      </div>
    </div>
  );
}
