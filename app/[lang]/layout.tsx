import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cairo } from "next/font/google";
import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import Footer from "../components/ui/Footer";
import HeroNav from "../components/ui/HeroNav";
import type { Lang } from "../data/translations";
import translations from "../data/translations";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

// ─────────────────────────────────────────────
// SEO METADATA
// ─────────────────────────────────────────────

const meta = {
  en: {
    title: "Website Design & Development in Egypt | SM Web Studio",
    description:
      "SM Web Studio builds websites that create lasting trust. Boost your online presence with modern web design & development.",
    ogLocale: "en_US",
    altLocale: "ar_EG",
    ogAlt: "SM Web Studio logo",
    siteName: "SM Web Studio",
    skipToContent: "Skip to main content",
  },
  ar: {
    title: "تصميم وتطوير مواقع إلكترونية في مصر | SM Web Studio",
    description:
      "نصمم مواقع إلكترونية عصرية تبني الثقة. امتلك حضور رقمي يليق بعلامتك التجارية. ابدأ اليوم.",
    ogLocale: "ar_EG",
    altLocale: "en_US",
    ogAlt: "شعار إس إم ويب ستوديو",
    siteName: "SM Web Studio",
    skipToContent: "تخطى إلى المحتوى",
  },
} as const;

// ─────────────────────────────────────────────
// CANONICAL URL HELPER
// ─────────────────────────────────────────────
// Single source of truth so canonical, OG url, and structured data never drift apart.

function getCanonicalUrl(lang: Lang): string {
  return lang === "en"
    ? "https://samirmagdy.com"
    : `https://samirmagdy.com/${lang}`;
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
    metadataBase: new URL("https://samirmagdy.com"),
    icons: {
      icon: [
        {
          url: "/favicon.png",
          type: "image/png",
          sizes: "96x96",
        },
        {
          url: "/favicon-v3-on-dark.svg",
          type: "image/svg+xml",
        },
        {
          url: "/favicon-v3-on-light.svg",
          type: "image/svg+xml",
          media: "(prefers-color-scheme: dark)",
        },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    title: m.title,
    description: m.description,
    authors: [{ name: "Samir Magdy", url: "https://samirmagdy.com" }],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: "https://samirmagdy.com",
        ar: "https://samirmagdy.com/ar",
        "x-default": "https://samirmagdy.com",
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: canonicalUrl,
      siteName: m.siteName,
      images: [
        {
          url: "https://samirmagdy.com/open-graph.webp",
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
      images: ["https://samirmagdy.com/open-graph.webp"],
      site: "@WebDesign_EG",
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
    "@id": "https://samirmagdy.com/#business",
    name: "SM Web Studio",
    alternateName: isAr ? "إس إم ويب ستوديو" : "SM Web Studio",
    description: isAr
      ? "نصمم مواقع إلكترونية عصرية تبني الثقة. امتلك حضور رقمي يليق بعلامتك التجارية. ابدأ اليوم."
      : "SM Web Studio builds websites that create lasting trust. Boost your online presence with modern web design & development.",
    url: "https://samirmagdy.com",
    telephone: "+201274613331",
    email: "studio@samirmagdy.com",
    image: "https://samirmagdy.com/open-graph.webp",
    logo: "https://samirmagdy.com/logo.png",
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
    sameAs: [
      "https://www.facebook.com/WebDesignCairo",
      "https://www.instagram.com/webdesign.cairo",
      "https://x.com/WebDesign_EG",
    ],
    founder: { "@id": "https://samirmagdy.com/#founder" },
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
    "@id": "https://samirmagdy.com/#website",
    name: "SM Web Studio",
    alternateName: "إس إم ويب ستوديو",
    url: "https://samirmagdy.com",
    inLanguage: ["en", "ar"],
    publisher: {
      "@id": "https://samirmagdy.com/#business",
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
      "@id": "https://samirmagdy.com/#website",
    },
    about: {
      "@id": "https://samirmagdy.com/#business",
    },
  };

  // 4. Person schema — ties Samir Magdy to SM Web Studio
  const founderSchema = {
    "@type": "Person",
    "@id": "https://samirmagdy.com/#founder",
    name: "Samir Magdy",
    alternateName: "سمير مجدي",
    jobTitle: isAr
      ? "مؤسس ومصمم ومطور مواقع"
      : "Founder, Web Designer & Developer",
    url: "https://samirmagdy.com",
    worksFor: { "@id": "https://samirmagdy.com/#business" },
    sameAs: [
      "https://www.facebook.com/WebDesignCairo",
      "https://www.instagram.com/webdesign.cairo",
      "https://x.com/WebDesign_EG",
    ],
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
