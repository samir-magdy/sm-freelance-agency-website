import { Cairo } from "next/font/google";
import "../globals.css";
import HeroNav from "../components/nav/HeroNav";
import translations from "../data/translations";
import Footer from "../components/nav/Footer";
import { SITE_URL, SITE_NAME, TWITTER_HANDLE } from "@/app/constants";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";

// Per-locale font subsetting.
//
// Both instances are instantiated in this single shared [lang] layout, so
// next/font emits a preload <link> for each on *every* locale route — a
// conditionally-applied `.variable` does not gate preloading. To stop the
// English route from force-downloading the (heavy) Arabic glyph file, the
// Arabic-bearing instance opts out of preload. The @font-face it emits still
// carries the Arabic `unicode-range`, so browsers only fetch that file when an
// Arabic glyph is actually rendered — i.e. on /ar, never on /en.
//
// The Latin instance keeps preload on. Its file is shared by both routes, so
// Latin text is preloaded on /en (English content) and /ar alike (footer email,
// "©<year> SM Web Studio", phone numbers, the status-bar clock).
const cairoLatin = Cairo({
  variable: "--font-cairo",
  subsets: ["latin"],
  display: "swap",
});

const cairoFull = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  display: "swap",
  preload: false,
});

// ─────────────────────────────────────────────
// SITE-WIDE CONSTANTS
// ─────────────────────────────────────────────

const CONTACT_EMAIL = "studio@samirmagdy.com";
const PHONE_NUMBER = "+201274613331";

const META_DESCRIPTION = {
  en: "Custom web design & development for small-medium businesses & individuals. Your professional online presence starts here.",
  ar: "تصميم وتطوير مواقع إلكترونية مخصصة للشركات والأفراد. ابدأ حضورك الرقمي الاحترافي معنا.",
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
    title: `Custom Website Development in Egypt | ${SITE_NAME}`,
    description: META_DESCRIPTION.en,
    ogLocale: "en_US",
    altLocale: "ar_EG",
    ogAlt: "SM Web Design Studio – Web Design Company in Egypt",
    siteName: SITE_NAME,
    skipToContent: "Skip to main content",
  },
  ar: {
    title: `تصميم وإنشاء مواقع إلكترونية في مصر | ${SITE_NAME}`,
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
  return lang === "en" ? SITE_URL : `${SITE_URL}/${lang}`;
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
      creator: TWITTER_HANDLE,
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
      "SM Web Design Studio is a professional web design company in Egypt specializing in EGP-priced custom websites, custom web apps with InstaPay, Vodafone Cash, Paymob, and Fawry integration, portfolio sites for freelancers, and private clinic booking systems. Serving solopreneurs, online sellers, freelancers, doctors, and independent professionals in Cairo, Alexandria, and across Egypt. No commercial register required.",
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
        ...(card.price
          ? { price: card.price.replace(/,/g, ""), priceCurrency: "EGP" }
          : {}),
      })),
    },
    sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.facebook],
    founder: { "@id": `${SITE_URL}/#founder` },
    knowsLanguage: ["en", "ar"],
    knowsAbout: [
      "Web design in Egypt",
      "E-commerce development in Egypt",
      "Egyptian payment gateway integration",
      "InstaPay e-commerce checkout",
      "Vodafone Cash payment integration",
      "Paymob payment integration",
      "Fawry payment integration",
      "Bilingual Arabic and English web development",
      "Right-to-left (RTL) web design",
      "Vezeeta alternative for doctors",
      "Instagram-to-website storefront migration",
    ],
  };

  // 1b. Service entries — persona/cluster-targeted capability signals.
  // Each Service is backed by visible content in FAQs, guides, and pricing copy.
  // Pricing stays in businessSchema.hasOfferCatalog (single source of truth).
  const services = [
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service-ecommerce-local-payments`,
      name: "Custom E-commerce Stores with Local Payment Integration",
      alternateName: "متاجر إلكترونية بربط بوابات الدفع المحلية",
      description:
        "Custom web apps for Egyptian businesses, with native InstaPay, Vodafone Cash, Paymob, and Fawry checkout, EGP billing managed end-to-end, and no commercial register required.",
      serviceType: "E-commerce Web Development",
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: [
        { "@type": "Country", name: "Egypt" },
        { "@type": "City", name: "Cairo" },
        { "@type": "City", name: "Alexandria" },
      ],
      audience: {
        "@type": "Audience",
        audienceType:
          "Egyptian online sellers, fashion brands, handmade artisans, and dropshippers",
      },
      inLanguage: ["en", "ar"],
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service-instagram-migration`,
      name: "Instagram-to-Website Storefront Migration",
      alternateName: "نقل البيع من الانستجرام لموقع إلكتروني",
      description:
        "Migration service for Egyptian Instagram and Facebook merchants moving from manual DM-based sales to an independent storefront with automated order intake, InstaPay/Vodafone Cash confirmation, and stock tracking.",
      serviceType: "Social Commerce Migration",
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: [
        { "@type": "Country", name: "Egypt" },
        { "@type": "City", name: "Cairo" },
        { "@type": "City", name: "Alexandria" },
      ],
      audience: {
        "@type": "Audience",
        audienceType:
          "Egyptian Instagram sellers, TikTok merchants, and social commerce solopreneurs",
      },
      inLanguage: ["en", "ar"],
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service-freelancer-portfolio`,
      name: "Freelancer Portfolio Websites with International Payment Receipt",
      alternateName: "مواقع بورتفوليو للفريلانسرز باستلام مدفوعات دولية",
      description:
        "Portfolio websites for Egyptian freelancers, designers, and independent consultants with integrated international payment receipt via Paymob, Stripe-supported channels, and wire-friendly payment links. Funds settle to local Egyptian bank accounts.",
      serviceType: "Portfolio Web Development",
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: [
        { "@type": "Country", name: "Egypt" },
        { "@type": "City", name: "Cairo" },
        { "@type": "City", name: "Alexandria" },
      ],
      audience: {
        "@type": "Audience",
        audienceType:
          "Egyptian freelancers, designers, developers, and independent consultants serving international clients",
      },
      inLanguage: ["en", "ar"],
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service-bilingual-rtl`,
      name: "Bilingual Arabic/English Business Websites with RTL Support",
      alternateName: "مواقع شركات ثنائية اللغة عربي وإنجليزي بدعم RTL كامل",
      description:
        "Multi-page business websites built natively bilingual (Arabic right-to-left and English left-to-right) with correct RTL layouts, legible Arabic typography, and SEO indexed separately in both languages: one site, double Google visibility.",
      serviceType: "Bilingual Web Development",
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: [
        { "@type": "Country", name: "Egypt" },
        { "@type": "City", name: "Cairo" },
        { "@type": "City", name: "Alexandria" },
      ],
      audience: {
        "@type": "Audience",
        audienceType:
          "Egyptian businesses targeting both Arabic and English-speaking customers, and regional brands serving GCC markets",
      },
      inLanguage: ["en", "ar"],
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service-clinic-booking`,
      name: "Private Clinic Booking Systems (Vezeeta Alternative)",
      alternateName: "نظام حجز خاص للعيادات (بديل فيزيتا)",
      description:
        "Private clinic booking websites on the doctor's own domain with appointment scheduling, prepaid consultation fees via InstaPay, Vodafone Cash, or cards, automated SMS/WhatsApp reminders, and full patient data ownership. No annual aggregator subscription, no per-booking commission.",
      serviceType: "Medical Booking System Development",
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: [
        { "@type": "Country", name: "Egypt" },
        { "@type": "City", name: "Cairo" },
        { "@type": "City", name: "Alexandria" },
      ],
      audience: {
        "@type": "Audience",
        audienceType:
          "Egyptian doctors, private clinic owners, and independent medical practitioners",
      },
      inLanguage: ["en", "ar"],
    },
  ];

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

  // 4. Person schema — ties Samir Magdy to SM Web Design Studio
  const founderSchema = {
    "@type": "Person",
    "@id": `${SITE_URL}/#founder`,
    name: "Samir Magdy",
    alternateName: "سمير مجدي",
    jobTitle: "Founder, Web Designer & Developer",
    url: SITE_URL,
    sameAs: ["https://www.linkedin.com/in/samir-magdy-/"],
    worksFor: { "@id": `${SITE_URL}/#business` },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      businessSchema,
      ...services,
      websiteSchema,
      webPageSchema,
      founderSchema,
    ],
  };
}

export default async function LangLayout({ children, params }) {
  const { lang: rawLang } = await params;
  if (rawLang !== "en" && rawLang !== "ar") notFound();
  const lang = rawLang;
  const font = lang === "ar" ? cairoFull : cairoLatin;
  const structuredData = buildStructuredData(lang);
  const skipLabel = meta[lang].skipToContent;
  const t = translations;

  const heroNavStrings = {
    nav: {
      portfolio: t.nav.portfolio[lang],
      pricing: t.nav.pricing[lang],
      FAQs: t.nav.FAQs[lang],
      contact: t.nav.contact[lang],
      // guides: t.nav.guides[lang],
      about: t.nav.about[lang],
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
      data-scroll-behavior="smooth"
    >
      <body
        className={`${font.variable} font-cairo antialiased min-h-svh flex flex-col`}
      >
        {/* ── Structured Data (JSON-LD) ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {/* ── Skip navigation ── */}
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-100 focus-visible:px-4 focus-visible:py-2 focus-visible:bg-white focus-visible:text-black focus-visible:rounded-md"
        >
          {skipLabel}
        </a>

        {/* ── Navigation ── */}
        <HeroNav lang={lang} strings={heroNavStrings} />

        {/* ── Main content ── */}
        <main id="main-content" className="md:flex-1 md:flex md:flex-col">
          {children}
        </main>
        <Footer lang={lang} />
        <Analytics />
      </body>
    </html>
  );
}
