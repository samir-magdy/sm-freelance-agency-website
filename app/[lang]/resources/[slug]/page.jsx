import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarDays, User } from "lucide-react";
import { SITE_URL } from "@/app/data/translations/lang";
import resources from "@/app/data/resources";
import resourcesTranslations from "@/app/data/translations/resources";
import { RevealSection } from "../../../components/ui/RevealSection";

export function generateStaticParams() {
  return resources.flatMap((r) => [
    { lang: "en", slug: r.slug },
    { lang: "ar", slug: r.slug },
  ]);
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const article = resources.find((r) => r.slug === slug);
  if (!article) return {};

  const canonical =
    lang === "en"
      ? `${SITE_URL}/resources/${slug}`
      : `${SITE_URL}/${lang}/resources/${slug}`;

  return {
    title: article.title[lang],
    description: article.metaDescription[lang],
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/resources/${slug}`,
        ar: `${SITE_URL}/ar/resources/${slug}`,
        "x-default": `${SITE_URL}/resources/${slug}`,
      },
    },
    openGraph: {
      title: article.title[lang],
      description: article.metaDescription[lang],
      url: canonical,
      type: "article",
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
      title: article.title[lang],
      description: article.metaDescription[lang],
      images: [`${SITE_URL}/open-graph.webp`],
    },
    robots: { index: true, follow: true },
  };
}

export default function ArticlePage({ params }) {
  const { lang, slug } = use(params);
  const article = resources.find((r) => r.slug === slug);
  if (!article) notFound();

  const t = resourcesTranslations;
  const dir = lang === "ar" ? "rtl" : "ltr";

  const canonical =
    lang === "en"
      ? `${SITE_URL}/resources/${slug}`
      : `${SITE_URL}/${lang}/resources/${slug}`;

  const formattedDate = new Intl.DateTimeFormat(
    lang === "ar" ? "ar-EG" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  ).format(new Date(article.publishedAt));

  const homeUrl = lang === "en" ? `${SITE_URL}/` : `${SITE_URL}/ar`;
  const resourcesUrl =
    lang === "en" ? `${SITE_URL}/resources` : `${SITE_URL}/ar/resources`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title[lang],
      description: article.metaDescription[lang],
      datePublished: article.publishedAt,
      inLanguage: lang,
      url: canonical,
      author: { "@id": `${SITE_URL}/#founder` },
      publisher: { "@id": `${SITE_URL}/#business` },
      isPartOf: { "@id": `${SITE_URL}/#website` },
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
          name: lang === "ar" ? "الموارد" : "Resources",
          item: resourcesUrl,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: article.title[lang],
          item: canonical,
        },
      ],
    },
  ];

  return (
    <main
      dir={dir}
      className="min-h-screen bg-background pt-22 sm:pt-36 pb-14 sm:pb-20 px-5"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <RevealSection>
        <div className="max-w-6xl mx-auto flex flex-col gap-6 sm:gap-8">
          {/* Back link */}
          {/* <Link
            href={`/${lang}/resources`}
            className="border w-fit rounded-lg px-5 py-2 group tracking-wide flex items-center gap-2 text-content-muted hover:text-black hover:bg-icon text-[clamp(0.8rem,1.3vw,1.1rem)] font-medium transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
          >
            <ArrowLeft
              className={`size-3 sm:size-5 transition-transform duration-300 ${lang === "ar" ? "rotate-180 group-hover:translate-x-1" : "group-hover:-translate-x-1"}`}
              aria-hidden
            />
            {t.backToResources[lang]}
          </Link> */}

          {/* Article header */}
          <header className="flex flex-col gap-4 rtl:gap-6">
            <h1 className="text-[clamp(2rem,5vw,2.8rem)] font-bold text-content-heading leading-tight">
              {article.title[lang]}
            </h1>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="flex items-center gap-1.5 border border-border-subtle rounded-2xl px-4 py-2 text-sm text-content-muted">
                <CalendarDays className="size-3.5 shrink-0" aria-hidden />
                <span className="text-content-heading font-medium">{lang === "ar" ? "نُشر:" : "Published on:"}</span>
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5 border border-border-subtle rounded-2xl px-4 py-2 text-sm text-content-muted">
                <User className="size-3.5 shrink-0" aria-hidden />
                <span className="text-content-heading font-medium">{lang === "ar" ? "الكاتب:" : "Author:"}</span>
                {lang === "ar" ? "سمير مجدي" : "Samir Magdy"}
              </span>
            </div>
          </header>

          {/* Article body */}
          <article
            dir={dir}
            className="
            html-content
            [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-content-heading/95 [&_h2]:mt-12 [&_h2]:mb-5 [&_h2]:leading-snug
            [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-content-heading [&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:leading-snug
            [&_p]:text-content-body [&_p]:text-xl [&_p]:leading-relaxed [&_p]:mb-6
            [&_ul]:list-disc [&_ul]:ps-7 [&_ul]:mb-6 [&_ul]:space-y-3
            [&_li]:text-content-body [&_li]:text-xl [&_li]:leading-relaxed
            [&_strong]:text-content-heading [&_strong]:font-semibold
          "
            dangerouslySetInnerHTML={{ __html: article.content[lang] }}
          />
          <script dangerouslySetInnerHTML={{ __html: `
            (() => {
              const TOOLTIP_MAX_W = 280;
              const EDGE_GAP = 12;
              const TOOLTIP_GAP = 12;
              const heightCache = new Map();

              const measureTooltipHeight = (text) => {
                if (heightCache.has(text)) return heightCache.get(text);
                const el = document.createElement('div');
                el.style.cssText = 'position:fixed;visibility:hidden;pointer-events:none;top:-9999px;width:min(280px,calc(100vw - 24px));padding:0.55rem 0.85rem;font-size:1.1rem;line-height:1.5;white-space:normal;';
                el.textContent = text;
                document.body.appendChild(el);
                const h = el.offsetHeight;
                document.body.removeChild(el);
                heightCache.set(text, h);
                return h;
              };

              const adjustTooltip = (abbr) => {
                const { left, top, width } = abbr.getBoundingClientRect();
                const vw = window.innerWidth;

                // X-axis: clamp so tooltip doesn't overflow left or right
                const tipW = Math.min(TOOLTIP_MAX_W, vw - 24);
                const tipLeft = left + width / 2 - tipW / 2;
                const tipRight = tipLeft + tipW;
                let offset = 0;
                if (tipLeft < EDGE_GAP) {
                  offset = EDGE_GAP - tipLeft;
                } else if (tipRight > vw - EDGE_GAP) {
                  offset = vw - EDGE_GAP - tipRight;
                }
                abbr.style.setProperty('--tooltip-offset', offset + 'px');

                // Y-axis: flip below if tooltip would clip the fixed header
                const navH = document.querySelector('header')?.offsetHeight ?? 0;
                const tipH = measureTooltipHeight(abbr.dataset.tooltip);
                if (top - navH - TOOLTIP_GAP < tipH) {
                  abbr.classList.add('tooltip-below');
                } else {
                  abbr.classList.remove('tooltip-below');
                }
              };

              document.addEventListener('click', (e) => {
                const abbr = e.target.closest('abbr[data-tooltip]');
                document.querySelectorAll('abbr[data-tooltip].is-active').forEach((el) => {
                  if (el !== abbr) el.classList.remove('is-active');
                });
                if (abbr) {
                  if (!abbr.classList.contains('is-active')) adjustTooltip(abbr);
                  abbr.classList.toggle('is-active');
                }
              });

              document.querySelectorAll('abbr[data-tooltip]').forEach((abbr) => {
                abbr.addEventListener('mouseenter', () => adjustTooltip(abbr));
              });
            })();
          ` }} />
        <Link
            href={`/${lang}/resources`}
            className="border w-fit rounded-lg px-5 py-2 group tracking-wide flex items-center gap-2.5 text-content-muted text-[clamp(0.8rem,1.3vw,1.1rem)] font-medium transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
          >
            <ArrowLeft
              className={`size-3 sm:size-5 transition-transform duration-300 ${lang === "ar" ? "rotate-180 group-hover:translate-x-1" : "group-hover:-translate-x-1"}`}
              aria-hidden
            />
            {t.backToResources[lang]}
          </Link>
        </div>
      </RevealSection>
    </main>
  );
}
