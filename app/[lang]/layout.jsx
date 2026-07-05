import { Cairo } from "next/font/google";
import "../globals.css";
import HeroNav from "../components/nav/HeroNav";
import nav, { langToggle } from "../data/translations/nav";
import a11y from "../data/translations/a11y";
import Footer from "../components/nav/Footer";
import {
  SITE_URL,
  SITE_NAME,
  TWITTER_HANDLE,
} from "@/app/constants";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
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
const META_DESCRIPTION = {
  en: "Custom web design & development for small-medium businesses & individuals. Your professional online presence starts here.",
  ar: "تصميم وتطوير مواقع إلكترونية مخصصة للشركات والأفراد. ابدأ حضورك الرقمي الاحترافي معنا.",
};

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
// GLOBAL SEO METADATA (Base Rules)
// ─────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { lang } = await params;
  const m = meta[lang] ?? meta.en;

  return {
    metadataBase: new URL(SITE_URL), // This is great! It helps child pages resolve URLs.
    icons: {
      icon: [
        { url: "/favicon.png", type: "image/png", sizes: "96x96" },
        { url: "/favicon.ico", type: "image/x-icon", sizes: "48x48" },
        { url: "/favicon-light.svg", type: "image/svg+xml", sizes: "any" },
        {
          url: "/favicon-dark.svg",
          type: "image/svg+xml",
          sizes: "any",
          media: "(prefers-color-scheme: dark)",
        },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    // The template automatically adds "| SM Web Design" to whatever child pages set as their title
    title: { template: `%s | ${SITE_NAME}`, default: m.title },
    description: m.description,
    authors: [{ name: "Samir Magdy", url: SITE_URL }],
    openGraph: {
      title: m.title,
      description: m.description,
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
// VIEWPORT METADATA
// ─────────────────────────────────────────────
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f1e" },
  ],
};

// ─────────────────────────────────────────────
// ROOT LAYOUT COMPONENT
// ─────────────────────────────────────────────
export default async function LangLayout({ children, params }) {
  const { lang: rawLang } = await params;
  if (rawLang !== "en" && rawLang !== "ar") notFound();
  
  const lang = rawLang;
  const font = lang === "ar" ? cairoFull : cairoLatin;
  const skipLabel = meta[lang].skipToContent;
  const t = { nav, a11y, langToggle };

  const heroNavStrings = {
    nav: {
      portfolio: t.nav.portfolio[lang],
      pricing: t.nav.pricing[lang],
      FAQs: t.nav.FAQs[lang],
      contact: t.nav.contact[lang],
      guides: t.nav.guides[lang],
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
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-100 focus-visible:px-4 focus-visible:py-2 focus-visible:bg-white focus-visible:text-black focus-visible:rounded-md"
        >
          {skipLabel}
        </a>

        <HeroNav lang={lang} strings={heroNavStrings} />

        <main id="main-content" className="md:flex-1 md:flex md:flex-col">
          {children}
        </main>
        
        <Footer lang={lang} />
        <Analytics />
      </body>
    </html>
  );
}