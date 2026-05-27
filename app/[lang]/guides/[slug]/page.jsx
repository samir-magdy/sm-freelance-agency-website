import Script from "next/script";
import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Calendar } from "lucide-react";
import { SITE_URL } from "@/app/constants";
import guides from "@/app/data/guides";
import guidesTranslations from "@/app/data/translations/guides";

export function generateStaticParams() {
  return guides.flatMap((r) => [
    { lang: "en", slug: r.slug },
    { lang: "ar", slug: r.slug },
  ]);
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const guide = guides.find((r) => r.slug === slug);
  if (!guide) return {};

  const canonical = `${SITE_URL}/${lang}/guides/${slug}`;

  return {
    title: (guide.metaTitle ?? guide.title)[lang],
    description: guide.metaDescription[lang],
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/en/guides/${slug}`,
        ar: `${SITE_URL}/ar/guides/${slug}`,
        "x-default": `${SITE_URL}/en/guides/${slug}`,
      },
    },
    openGraph: {
      title: guide.title[lang],
      description: guide.metaDescription[lang],
      url: canonical,
      type: "article",
      siteName: "SM Web Design Studio",
      locale: lang === "en" ? "en_US" : "ar_EG",
      alternateLocale: lang === "en" ? "ar_EG" : "en_US",
      article: {
        publishedTime: guide.datePublished,
        modifiedTime: guide.dateModified,
        authors: [`${SITE_URL}/#founder`],
      },
      images: [
        {
          url: `${SITE_URL}/open-graph.webp`,
          width: 1200,
          height: 630,
          alt: "SM Web Design Studio – Web Design Agency in Egypt",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title[lang],
      description: guide.metaDescription[lang],
      images: [`${SITE_URL}/open-graph.webp`],
      site: "@SMWebDesignCo",
      creator: "@SMWebDesignCo",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default function GuidePage({ params }) {
  const { lang, slug } = use(params);
  const guide = guides.find((r) => r.slug === slug);
  if (!guide) notFound();

  const t = guidesTranslations;
  const dir = lang === "ar" ? "rtl" : "ltr";

  const canonical = `${SITE_URL}/${lang}/guides/${slug}`;

  const homeUrl = lang === "en" ? `${SITE_URL}/` : `${SITE_URL}/ar`;
  const guidesUrl = `${SITE_URL}/${lang}/guides`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${canonical}#article`,
      headline: guide.title[lang],
      description: guide.metaDescription[lang],
      inLanguage: lang,
      url: canonical,
      datePublished: guide.datePublished,
      dateModified: guide.dateModified,
      author: { "@id": `${SITE_URL}/#founder` },
      publisher: { "@id": `${SITE_URL}/#business` },
      isPartOf: { "@id": `${SITE_URL}/#website` },
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
          item: homeUrl,
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

  return (
    <div
      dir={dir}
      className="min-h-screen bg-background pt-22 sm:pt-28 pb-14 sm:pb-20 px-5 overflow-x-hidden"
    >
      <Script
        id="guides-seo"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="max-w-5xl mx-auto flex flex-col gap-6 sm:gap-8">
          {/* Back link */}
         <Link
            href={`/${lang}/guides`}
            className="hover:bg-white/90 hover:border-white/90 hover:text-black/90 border w-fit rounded-lg px-5 py-2 group tracking-wide flex items-center gap-2.5 text-content-muted text-[clamp(0.8rem,1.3vw,1.1rem)] font-medium transition-all duration-500"
          >
            <ArrowLeft
              className={`size-3 sm:size-5 transition-transform duration-300 ${lang === "ar" ? "rotate-180 group-hover:translate-x-1" : "group-hover:-translate-x-1"}`}
              aria-hidden
            />
            {t.backToGuides[lang]}
          </Link>
          {/* Guide header */}
          <header>
            <h1 className="text-[clamp(1.5rem,5vw,2.8rem)] font-bold text-content-heading leading-tight rtl:leading-loose">
              {(() => {
                const colonIndex = guide.title[lang].indexOf(":");
                if (colonIndex === -1) return guide.title[lang];
                return (
                  <>
                    {guide.title[lang].slice(0, colonIndex + 1)}
                    <span className="font-semibold text-content-heading/95">
                      {guide.title[lang].slice(colonIndex + 1)}
                    </span>
                  </>
                );
              })()}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <span className="inline-flex font-semibold items-center gap-1.5 text-sm text-content-muted border border-border-subtle rounded-lg px-3 py-1">
                <User size={13} aria-hidden />
                {t.by[lang]} <span className="font-normal">{lang === 'ar' ? "سمير مجدى" : "Samir Magdy"}</span>
              </span>
              <time
                dateTime={guide.datePublished}
                className="inline-flex items-center gap-1.5 text-sm text-content-muted border border-border-subtle rounded-lg px-3 py-1"
              >
                <Calendar size={13} aria-hidden />
                {new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-US", { dateStyle: "long" }).format(new Date(guide.datePublished))}
              </time>
            </div>
          </header>
          {/* Guide body */}
          <article
            dir={dir}
            className="
            html-content
            [&_h2]:text-[clamp(1.25rem,5vw,2.5rem)] [&_h2]:font-bold [&_h2]:text-content-heading/95 [&_h2]:mt-12 [&_h2]:mb-5 [&_h2]:leading-snug
            [&_h3]:text-[clamp(1.15rem,5vw,2.25rem)] [&_h3]:font-semibold [&_h3]:text-content-heading [&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:leading-snug
            [&_p]:text-content-body [&_p]:text-subheading [&_p]:leading-relaxed [&_p]:mb-6
            [&_ul]:list-disc [&_ul]:ps-7 [&_ul]:mb-6 [&_ul]:space-y-3
            [&_ol]:list-decimal [&_ol]:ps-7 [&_ol]:mb-6 [&_ol]:space-y-3
            [&_li]:text-content-body [&_li]:text-subheading [&_li]:leading-relaxed
            [&_strong]:text-content-heading [&_strong]:font-semibold [&[dir=rtl]_*]:leading-loose
            [&_table]:w-full [&_table]:my-8 [&_table]:border-separate [&_table]:border-spacing-0 [&_table]:border [&_table]:border-white/15 [&_table]:rounded-lg [&_table]:overflow-hidden [&_table]:table-fixed
            [&_thead]:bg-white/5
            [&_th]:text-content-heading [&_th]:font-semibold [&_th]:text-start [&_th]:p-3 [&_th]:text-base [&_th]:border-b [&_th]:border-e [&_th]:border-white/15 [&_th]:align-middle sm:[&_th]:p-4 sm:[&_th]:text-subheading
            [&_td]:text-content-body [&_td]:text-base [&_td]:p-3 [&_td]:border-b [&_td]:border-e [&_td]:border-white/10 [&_td]:align-middle [&_td]:leading-relaxed sm:[&_td]:p-4 sm:[&_td]:text-subheading
            [&_th:last-child]:border-e-0 [&_td:last-child]:border-e-0
            [&_tbody_tr:last-child_td]:border-b-0
          "
            dangerouslySetInnerHTML={{ __html: guide.content[lang] }}
          />
          <Script id="guide-tooltips" strategy="afterInteractive">
            {`
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
        if (!abbr) return;
        const { left, top, width } = abbr.getBoundingClientRect();
        const vw = window.innerWidth;

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

        const navH = document.querySelector('header')?.offsetHeight ?? 0;
        const tipH = measureTooltipHeight(abbr.dataset.tooltip);
        if (top - navH - TOOLTIP_GAP < tipH) {
          abbr.classList.add('tooltip-below');
        } else {
          abbr.classList.remove('tooltip-below');
        }
      };

      // Click listener (using event delegation)
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

      // Hover listener (using event delegation so it works with dynamic content)
      document.addEventListener('mouseover', (e) => {
        const abbr = e.target.closest('abbr[data-tooltip]');
        if (abbr) adjustTooltip(abbr);
      });
    })();
  `}
          </Script>
          <Link
            href={`/${lang}/guides`}
            className="hover:bg-white/90 hover:border-white/90 hover:text-black/90 border w-fit rounded-lg px-5 py-2 group tracking-wide flex items-center gap-2.5 text-content-muted text-[clamp(0.9rem,1.3vw,1.1rem)] font-medium transition-all duration-500"
          >
            <ArrowLeft
              className={`size-3 sm:size-5 transition-transform duration-300 ${lang === "ar" ? "rotate-180 group-hover:translate-x-1" : "group-hover:-translate-x-1"}`}
              aria-hidden
            />
            {t.backToGuides[lang]}
          </Link>
        </div>
    </div>
  );
}
