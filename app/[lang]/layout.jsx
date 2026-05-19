import { Cairo } from "next/font/google";
import "../globals.css";
import HeroNav from "../components/nav/HeroNav";
import translations from "../data/translations";
import Footer from "../components/nav/Footer";
import { SITE_URL } from "../data/translations/lang";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

const fonts = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  display: "swap",
});

// ─────────────────────────────────────────────
// SITE-WIDE CONSTANTS
// ─────────────────────────────────────────────

const SITE_NAME = "SM Web Design Studio";
const CONTACT_EMAIL = "studio@samirmagdy.com";
const PHONE_NUMBER = "+201274613331";
const TWITTER_HANDLE = "@SMWebDesignCo";

const META_DESCRIPTION = {
  en: "Professional website & Shopify development in Egypt. Discover how we can help your business grow.",
  ar: "تصميم مواقع احترافية ومتاجر شوبيفاي في مصر. اكتشف كيف يمكننا مساعدتك في تنمية حضورك الرقمي.",
};

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/smwebdesign.studio",
  facebook: "https://www.facebook.com/SMWebDesignStudio",
};

// ─────────────────────────────────────────────
// SEO METADATA
// ─────────────────────────────────────────────

const meta = {
  en: {
    title: `Get a Website for Your Business in Egypt | ${SITE_NAME}`,
    description: META_DESCRIPTION.en,
    ogLocale: "en_US",
    altLocale: "ar_EG",
    ogAlt: "SM Web Design Studio – Web Design Company in Egypt",
    siteName: SITE_NAME,
    skipToContent: "Skip to main content",
  },
  ar: {
    title: `خدمات تصميم وإنشاء مواقع إلكترونية في مصر | ${SITE_NAME}`,
    description: META_DESCRIPTION.ar,
    ogLocale: "ar_EG",
    altLocale: "en_US",
    ogAlt: "SM Web Design Studio – Web Design Company in Egypt",
    siteName: SITE_NAME,
    skipToContent: "تخطى إلى المحتوى",
  },
};

// ─────────────────────────────────────────────
// CANONICAL URL HELPER
// ─────────────────────────────────────────────
// Single source of truth so canonical, OG url, and structured data never drift apart.

function getCanonicalUrl(lang) {
  return lang === "en" ? `${SITE_URL}/` : `${SITE_URL}/${lang}`;
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const m = meta[lang] ?? meta.en;
  const canonicalUrl = getCanonicalUrl(lang);

  return {
    metadataBase: new URL(SITE_URL),
    icons: {
      icon: [
        {
          url: "/favicon.png",
          type: "image/png",
          sizes: "96x96",
        },
        {
          url: "/favicon.ico",
          type: "image/x-icon",
          sizes: "48x48",
        },
        {
          url: "/favicon-light.svg",
          type: "image/svg+xml",
          sizes: "any",
        },
        {
          url: "/favicon-dark.svg",
          type: "image/svg+xml",
          sizes: "any",
          media: "(prefers-color-scheme: dark)",
        },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    title: { template: `%s | ${SITE_NAME}`, default: m.title },
    description: m.description,
    authors: [{ name: "Samir Magdy", url: SITE_URL }],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/`,
        ar: `${SITE_URL}/ar`,
        "x-default": `${SITE_URL}/`,
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
      creator: TWITTER_HANDLE,
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

function buildStructuredData(lang) {
  const pageUrl = getCanonicalUrl(lang);

  // 1. ProfessionalService — Primary business schema
  // Canonical English content for stable @id resolution across locales.
  // Language-specific content belongs on the WebPage and FAQPage nodes,
  // which carry their own per-locale @id values.
  const businessSchema = {
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    inLanguage: "en",
    description:
      "SM Web Design Studio is a professional web design company in Egypt specializing in custom website design, Shopify e-commerce stores, and SEO-optimized web development for businesses in Cairo, Alexandria, and across Egypt.",
    url: SITE_URL,
    telephone: PHONE_NUMBER,
    email: CONTACT_EMAIL,
    image: `${SITE_URL}/open-graph.webp`,
    logo: `${SITE_URL}/business-logo.png`,
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
      name: "Web Design & Development Services in Egypt",
      itemListElement: translations.pricingCards.cards.map((card) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: card.name.en,
          alternateName: card.name.ar,
          description: card.tagline.en,
        },
        price: card.price.replace(/,/g, ""),
        priceCurrency: "EGP",
      })),
    },
    sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.facebook],
    founder: { "@id": `${SITE_URL}/#founder` },
    knowsLanguage: ["en", "ar"],
  };

  // 2. WebSite schema
  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
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
  };

  // 4. Person schema — ties Samir Magdy to SM Web Studio
  const founderSchema = {
    "@type": "Person",
    "@id": `${SITE_URL}/#founder`,
    name: "Samir Magdy",
    alternateName: "سمير مجدي",
    jobTitle: "Founder, Web Designer & Developer",
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
        text: item.answer[lang].replace(
          /href=(['"])\//g,
          `href=$1${SITE_URL}/`,
        ),
      },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      businessSchema,
      websiteSchema,
      webPageSchema,
      founderSchema,
      faqSchema,
    ],
  };
}

export default async function LangLayout({ children, params }) {
  const { lang: rawLang } = await params;
  if (rawLang !== "en" && rawLang !== "ar") notFound();
  const lang = rawLang;
  const structuredData = buildStructuredData(lang);
  const skipLabel = meta[lang].skipToContent;
  const t = translations;

  const heroNavStrings = {
    nav: {
      portfolio: t.nav.portfolio[lang],
      pricing: t.nav.pricing[lang],
      FAQs: t.nav.FAQs[lang],
      contact: t.nav.contact[lang],
      guides: t.nav.guides[lang],
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
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body className={`${fonts.variable} font-cairo antialiased`}>
        {/* ── Structured Data (JSON-LD) ── */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {/* ── Skip navigation ── */}
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-100 focus-visible:px-4 focus-visible:py-2 focus-visible:bg-white focus-visible:text-black focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
        >
          {skipLabel}
        </a>

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
