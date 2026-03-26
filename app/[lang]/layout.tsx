import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cairo } from "next/font/google";
import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import Footer from "../components/ui/Footer";
import HeroNav from "../components/ui/HeroNav";
import FontReadyTrigger from "../components/ui/FontReadyTrigger";
import type { Lang } from "../data/translations";
import { SITE_URL } from "../data/translations/lang";
import translations from "../data/translations";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "block",
});

// ─────────────────────────────────────────────
// SITE-WIDE CONSTANTS
// ─────────────────────────────────────────────

const SITE_NAME = "SM Web Studio";
const SITE_NAME_AR = "إس إم ويب ستوديو";
const CONTACT_EMAIL = "studio@samirmagdy.com";
const PHONE_NUMBER = "+201274613331";
const TWITTER_HANDLE = "@SMWebStudioEG";

const META_DESCRIPTION = {
  en: "High-end web design studio offering premium quality at competitive rates. We bridge the gap between agency-level professionalism & freelancer flexibility.",
  ar: "استوديو متخصص في تصميم مواقع الكترونية عالية الجودة وبسعر منافس. نموذج مختلف يجمع بين احترافية الشركات ومرونة الفريلانسرز.",
} as const;

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/smweb.studio",
  facebook: "https://www.facebook.com/SMWebStudioEG",
  x: "https://x.com/SMWebStudioEG",
} as const;

// ─────────────────────────────────────────────
// SEO METADATA
// ─────────────────────────────────────────────

const meta = {
  en: {
    title: `Expert Web Design in Egypt | ${SITE_NAME}`,
    description: META_DESCRIPTION.en,
    ogLocale: "en_US",
    altLocale: "ar_EG",
    ogAlt: `${SITE_NAME} logo`,
    siteName: SITE_NAME,
    skipToContent: "Skip to main content",
  },
  ar: {
    title: `تصميم مواقع إحترافية في مصر | ${SITE_NAME} Egypt`,
    description: META_DESCRIPTION.ar,
    ogLocale: "ar_EG",
    altLocale: "en_US",
    ogAlt: `شعار ${SITE_NAME_AR}`,
    siteName: SITE_NAME,
    skipToContent: "تخطى إلى المحتوى",
  },
} as const;

// ─────────────────────────────────────────────
// CANONICAL URL HELPER
// ─────────────────────────────────────────────
// Single source of truth so canonical, OG url, and structured data never drift apart.

function getCanonicalUrl(lang: Lang): string {
  return lang === "en"
    ? SITE_URL
    : `${SITE_URL}/${lang}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const m = meta[lang as Lang] ?? meta.en;
  const canonicalUrl = getCanonicalUrl(lang as Lang);

  return {
    metadataBase: new URL(SITE_URL),
    icons: {
      icon: [
        {
          url: "/favicon.ico",
          type: "image/x-icon",
          sizes: "48x48",
        },
        {
          url: "/favicon-stable-on-light.svg",
          type: "image/svg+xml",
        },
        {
          url: "/favicon-stable-on-dark.svg",
          type: "image/svg+xml",
          media: "(prefers-color-scheme: dark)",
        },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    title: m.title,
    description: m.description,
    authors: [{ name: "Samir Magdy", url: SITE_URL }],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: SITE_URL,
        ar: `${SITE_URL}/ar`,
        "x-default": SITE_URL,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: canonicalUrl,
      siteName: m.siteName,
      images: [
        {
          url: `${SITE_URL}/open-graph.webp`,
          width: 1200,
          height: 630,
          alt: m.ogAlt,
        },
      ],
      locale: m.ogLocale,
      alternateLocale: m.altLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [`${SITE_URL}/open-graph.webp`],
      site: TWITTER_HANDLE,
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

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

// ─────────────────────────────────────────────
// STRUCTURED DATA / JSON-LD SCHEMAS
// ─────────────────────────────────────────────

function buildStructuredData(lang: Lang) {
  const isAr = lang === "ar";
  const pageUrl = getCanonicalUrl(lang);

  // 1. ProfessionalService — Primary business schema
  const businessSchema = {
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    alternateName: SITE_NAME_AR,
    description: isAr
      ? "نصمم مواقع إلكترونية عصرية تبني الثقة. امتلك حضور رقمي يليق بعلامتك التجارية. ابدأ اليوم."
      : "SM Web Studio builds websites that create lasting trust. Boost your online presence with modern web design & development.",
    url: SITE_URL,
    telephone: PHONE_NUMBER,
    email: CONTACT_EMAIL,
    image: `${SITE_URL}/open-graph.webp`,
    logo: `${SITE_URL}/logo-stable.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cairo",
      addressRegion: "Cairo Governorate",
      addressCountry: "EG",
    },
    areaServed: [
      { "@type": "Country", name: "Egypt" },
      { "@type": "City", name: "Cairo" },
      { "@type": "City", name: "Alexandria" },
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.0444,
      longitude: 31.2357,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isAr
        ? "خدمات تصميم وتطوير مواقع في مصر"
        : "Web Design & Development Services in Egypt",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isAr
              ? "تصميم وتطوير مواقع"
              : "Website Design & Development",
            alternateName: isAr
              ? "Website Design & Development"
              : "تصميم وتطوير مواقع",
            description: isAr
              ? "تصميم وتطوير مواقع إحترافية باستخدام أحدث التقنيات."
              : "Expert website design & development using modern technologies.",
          },
        },
      ],
    },
    sameAs: [SOCIAL_LINKS.facebook, SOCIAL_LINKS.instagram, SOCIAL_LINKS.x],
    founder: { "@id": `${SITE_URL}/#founder` },
    knowsLanguage: ["en", "ar"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "11:00",
        closes: "19:00",
      },
    ],
  };

  // 2. WebSite schema
  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: SITE_NAME_AR,
    url: SITE_URL,
    inLanguage: ["en", "ar"],
    publisher: {
      "@id": `${SITE_URL}/#business`,
    },
  };

  // 3. WebPage schema
  const webPageSchema = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: meta[lang].title,
    description: meta[lang].description,
    inLanguage: lang,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#business`,
    },
  };

  // 4. Person schema — ties Samir Magdy to SM Web Studio
  const founderSchema = {
    "@type": "Person",
    "@id": `${SITE_URL}/#founder`,
    name: "Samir Magdy",
    alternateName: "سمير مجدي",
    jobTitle: isAr
      ? "مؤسس ومصمم ومطور مواقع"
      : "Founder, Web Designer & Developer",
    url: SITE_URL,
    worksFor: { "@id": `${SITE_URL}/#business` },
  };

  // 5. FAQPage schema
  const faqSchema = {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faqpage`,
    mainEntity: translations.faqSection.items.map((item) => ({
      "@type": "Question",
      name: item.question[lang],
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer[lang],
      },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [businessSchema, websiteSchema, webPageSchema, founderSchema, faqSchema],
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (rawLang !== "en" && rawLang !== "ar") notFound();
  const lang: Lang = rawLang;
  const structuredData = buildStructuredData(lang);
  const skipLabel = meta[lang].skipToContent;
  const t = translations;

  const heroNavStrings = {
    nav: {
      services: t.nav.services[lang],
      addOns: t.nav.addOns[lang],
      projects: t.nav.projects[lang],
      howItWorks: t.nav.howItWorks[lang],
      faq: t.nav.faq[lang],
      contact: t.nav.contact[lang],
    },
    a11y: {
      desktopNav: t.a11y.desktopNav[lang],
      mobileNav: t.a11y.mobileNav[lang],
      openMenu: t.a11y.openMenu[lang],
      closeMenu: t.a11y.closeMenu[lang],
    },
    langToggleLabel: lang === "ar" ? t.langToggle.en : t.langToggle.ar,
  };

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <body className={`${cairo.variable} font-cairo antialiased`}>
        {/* ── Skip navigation ── */}
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100] focus-visible:px-4 focus-visible:py-2 focus-visible:bg-white focus-visible:text-black focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
        >
          {skipLabel}
        </a>

        {/* ── Structured Data (JSON-LD) ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        <FontReadyTrigger />

        {/* ── Navigation ── */}
        <HeroNav lang={lang} strings={heroNavStrings} />

        {/* ── Main content ── */}
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
