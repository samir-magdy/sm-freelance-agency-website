import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import Footer from "../components/ui/Footer";
import { ThemeProvider } from "../components/providers/ThemeProvider";
import type { Lang } from "../data/translations";
import translations from "../data/translations";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

// ─────────────────────────────────────────────
// SEO METADATA
// ─────────────────────────────────────────────
// Primary target keywords:
//   EN: "web design cairo", "landing page design egypt", "web developer cairo"
//   AR: "تصميم مواقع في القاهرة", "تصميم صفحات هبوط", "مطور مواقع القاهرة"

const meta = {
  en: {
    title: "SM Web Studio | Web Design & Development in Cairo",
    description:
      "Grow your business with Web Design in Cairo. Specialized in high-conversion Landing Pages and SEO for SMEs. Get a free quote today!",
    ogLocale: "en_US",
    altLocale: "ar_EG",
    ogAlt:
      "SM Web Studio — Web Design & Development Cairo | Your Partner in Success",
    siteName: "SM Web Studio",
    skipToContent: "Skip to main content",
  },
  ar: {
    title: "تصميم وتطوير مواقع في القاهرة | SM Web Studio",
    description:
      "أفضل شركة تصميم مواقع وصفحات هبوط في مصر. مواقعنا سريعة، متوافقة مع الموبايل، وبتظهر على جوجل. ابدأ مشروعك دلوقتي بأفضل سعر.",
    ogLocale: "ar_EG",
    altLocale: "en_US",
    ogAlt: "تصميم مواقع في القاهرة | SM Web Studio",
    siteName: "SM Web Studio",
    skipToContent: "تخطى إلى المحتوى",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const m = meta[lang as Lang] ?? meta.en;

  return {
    metadataBase: new URL("https://samirmagdy.com"),
    icons: {
      icon: "/favicon.svg",
    },
    title: m.title,
    description: m.description,
    authors: [{ name: "Samir Magdy", url: "https://samirmagdy.com" }],
    alternates: {
      canonical: `https://samirmagdy.com/${lang}`,
      languages: {
        en: "https://samirmagdy.com/en",
        ar: "https://samirmagdy.com/ar",
        "x-default": "https://samirmagdy.com/en",
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `https://samirmagdy.com/${lang}`,
      siteName: m.siteName,
      images: [
        {
          url: "https://samirmagdy.com/open-graph.png",
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
      images: ["https://samirmagdy.com/open-graph.png"],
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

function buildSchemas(lang: Lang) {
  const isAr = lang === "ar";

  // 1. ProfessionalService — Primary business schema
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://samirmagdy.com/#business",
    name: "SM Web Studio",
    alternateName: isAr ? "إس إم ويب ستوديو" : "SM Web Studio Egypt",
    description: isAr
      ? "تصميم صفحات هبوط، تطوير مواقع، وتصميم واجهات احترافية لأصحاب الأعمال في القاهرة."
      : "Landing page design, web development, and UI/UX branding for small businesses in Cairo.",
    url: "https://samirmagdy.com",
    telephone: "+201211221277",
    image: "https://samirmagdy.com/open-graph.png",
    logo: "https://samirmagdy.com/favicon.png",
    priceRange: "$$",
    currenciesAccepted: "EGP, USD",
    paymentAccepted: "Bank Transfer, Online Payment, Cash",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Cairo",
        containedInPlace: {
          "@type": "Country",
          name: "Egypt",
        },
      },
      {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 30.0444,
          longitude: 31.2357,
        },
        geoRadius: "50000",
      },
      {
        "@type": "AdministrativeArea",
        name: "MENA Region",
      },
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.0444,
      longitude: 31.2357,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isAr
        ? "خدمات تصميم وتطوير المواقع"
        : "Web Design & Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isAr ? "تصميم صفحات هبوط" : "Landing Page Design",
            alternateName: isAr ? "Landing Page Design" : "تصميم صفحات هبوط",
            description: isAr
              ? "صفحات هبوط عالية التحويل مصممة لتحويل الزوار إلى عملاء."
              : "High-converting landing pages designed to turn visitors into clients.",
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
    sameAs: ["https://www.linkedin.com/in/samirmagdy93"],
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
    "@context": "https://schema.org",
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
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://samirmagdy.com/${lang}#webpage`,
    url: `https://samirmagdy.com/${lang}`,
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
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `https://samirmagdy.com/${lang}#faqpage`,
    mainEntity: translations.faqSection.items.map((item) => ({
      "@type": "Question",
      name: item.question[lang],
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer[lang],
      },
    })),
  };

  return { businessSchema, websiteSchema, webPageSchema, faqSchema };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang: Lang = rawLang === "en" || rawLang === "ar" ? rawLang : "ar";
  const { businessSchema, websiteSchema, webPageSchema, faqSchema } =
    buildSchemas(lang);
  const skipLabel = meta[lang].skipToContent;

  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent flash of wrong theme — runs before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})();`,
          }}
        />
      </head>
      <body className={`${cairo.variable} font-cairo antialiased`}>
        <ThemeProvider>
          {/* ── Skip navigation ── */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-brand-accent"
          >
            {skipLabel}
          </a>

          {/* ── Structured Data (JSON-LD) ── */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(businessSchema),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(websiteSchema),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(webPageSchema),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqSchema),
            }}
          />

          {/* ── App ── */}
          <main id="main-content">{children}</main>
          <Footer lang={lang} />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}