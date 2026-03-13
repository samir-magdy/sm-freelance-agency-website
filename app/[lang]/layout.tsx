import type { Metadata } from "next";
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
    title:
      "SM Web Studio | Expert Website Design Agency in Egypt",
    description:
      "Boost your online presence and revenue with a modern, high-performance website. Expert web design & development. Launch your own website in days.",
    ogLocale: "en_US",
    altLocale: "ar_EG",
    ogAlt: "Logo of the top web design company in Egypt | SM Web Studio",
    siteName: "SM Web Studio",
    skipToContent: "Skip to main content",
  },
  ar: {
    title: "SM Web Studio | شركة تصميم مواقع احترافية في مصر",
    description:
      "شركة تصميم وبرمجة مواقع في مصر. خدمات إنشاء موقع لعملك، تطوير متجر إلكتروني، اطلب استشارة مجانية.",
    ogLocale: "ar_EG",
    altLocale: "en_US",
    ogAlt: "تصميم مواقع محترفة في مصر | احصل على موقعك SM Web Studio Logo",
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
    alternateName: isAr ? "إس إم ويب ستوديو مصر" : "SM Web Studio Egypt",
    description: isAr
      ? "أفضل شركة تصميم مواقع في القاهرة، مصر. متخصصون في برمجة مواقع احترافية تتصدر نتائج محركات البحث وجوجل. اطلب استشارتك المجانية الآن!"
      : "Grow your business with custom web design in Cairo, Egypt. We specialize in professional, modern websites. Claim your free quote today!",
    url: "https://samirmagdy.com",
    telephone: "+201274613331",
    email: "studio@samirmagdy.com",
    image: "https://samirmagdy.com/open-graph.webp",
    logo: "https://samirmagdy.com/logo.png",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cairo",
      addressRegion: "Cairo Governorate",
      addressCountry: "EG",
    },
    areaServed: [
      { "@type": "City", name: "Cairo" },
      { "@type": "City", name: "New Cairo" },
      { "@type": "City", name: "Maadi" },
      { "@type": "City", name: "Sheikh Zayed" },
      { "@type": "City", name: "Giza" },
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.0444,
      longitude: 31.2357,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isAr
        ? "خدمات أفضل شركة تصميم مواقع في القاهرة"
        : "Web Design & Development Services in Egypt",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isAr ? "تصميم صفحات هبوط" : "Landing Page Design",
            alternateName: isAr ? "Landing Page Design" : "تصميم صفحات هبوط",
            description: isAr
              ? "صفحات هبوط عالية التحويل مصممة لتحويل الزوار إلى عملاء."
              : "High-converting websites designed to turn visitors into clients.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isAr
              ? "تصميم وتطوير المواقع"
              : "Website Design & Development",
            alternateName: isAr
              ? "Website Design & Development"
              : "تصميم وتطوير المواقع",
            description: isAr
              ? "تصميم وتطوير مواقع متكاملة للشركات الصغيرة باستخدام أحدث التقنيات."
              : "Full website design and development for small businesses using modern technologies.",
          },
        },
      ],
    },
    sameAs: [
      "https://www.facebook.com/WebDesignCairo",
      "https://www.instagram.com/webdesign.cairo",
      "https://x.com/WebDesign_EG",
    ],
    founder: {
      "@type": "Person",
      name: "Samir Magdy",
      alternateName: "سمير مجدي",
      jobTitle: isAr ? "مؤسس ومصمم مواقع" : "Founder & Web Designer",
      url: "https://samirmagdy.com",
    },
    knowsLanguage: ["en", "ar"],
  };

  // 2. WebSite schema
  const websiteSchema = {
    "@type": "WebSite",
    "@id": "https://samirmagdy.com/#website",
    name: "SM Web Studio",
    alternateName: "SM Web Studio Egypt",
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

  // 4. FAQPage schema
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
    "@graph": [businessSchema, websiteSchema, webPageSchema, faqSchema],
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
  const lang: Lang = rawLang === "en" || rawLang === "ar" ? rawLang : "en";
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
