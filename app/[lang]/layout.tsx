import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Cairo } from "next/font/google";
import "../globals.css";
import HeroNav, { type HeroNavStrings } from "../components/nav/HeroNav";
import nav, { langToggle } from "../data/translations/nav";
import a11y from "../data/translations/a11y";
import Footer from "../components/nav/Footer";
import { SITE_URL, SITE_NAME } from "@/app/constants";
import { notFound } from "next/navigation";
import { isLang, type Lang, type LangParams } from "@/app/types";

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

const META_DESCRIPTION: Record<Lang, string> = {
  en: "Custom web design & development for small-medium businesses & individuals. Your professional online presence starts here.",
  ar: "تصميم وتطوير مواقع إلكترونية مخصصة للشركات والأفراد. ابدأ حضورك الرقمي الاحترافي معنا.",
};

interface LangMeta {
  title: string;
  description: string;
  ogLocale: string;
  altLocale: string;
  ogAlt: string;
  siteName: string;
  skipToContent: string;
}

const meta: Record<Lang, LangMeta> = {
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

export async function generateMetadata({
  params,
}: {
  params: Promise<LangParams>;
}): Promise<Metadata> {
  const { lang } = await params;
  const m = meta[lang] ?? meta.en;

  return {
    metadataBase: new URL(SITE_URL),
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
  };
}

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LangLayout({
  children,
  params,
}: LangLayoutProps) {
  const { lang: rawLang } = await params;
  if (!isLang(rawLang)) notFound();

  const lang: Lang = rawLang;
  const font = lang === "ar" ? cairoFull : cairoLatin;
  const skipLabel = meta[lang].skipToContent;
  const t = { nav, a11y, langToggle };

  const heroNavStrings: HeroNavStrings = {
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
      </body>
      <GoogleTagManager gtmId="GTM-W9S847HD" />
    </html>
  );
}
