import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "@/app/globals.css";
import HeroNav, { type HeroNavStrings } from "@/app/components/nav/HeroNav";
import navTranslations, { langToggle } from "@/app/data/translations/nav";
import a11y from "@/app/data/translations/a11y";
import Footer from "@/app/components/nav/Footer";
import HashUrlStripper from "@/app/components/nav/HashUrlStripper";
import LightRaysBackground from "@/app/components/ui/LightRaysBackground";
import { SITE_URL, SITE_NAME } from "@/app/constants";
import { isLang, type Lang } from "@/app/types";
import { notFound } from "next/navigation";
import ChatWidget from "@/app/components/chat/ChatWidget";
import QuoteModal from "@/app/components/ui/QuoteModal";
import { Suspense } from "react";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
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
    title: { template: `%s | ${SITE_NAME}`, default: SITE_NAME },
    authors: [{ name: "Samir Magdy", url: SITE_URL }],
    openGraph: {
      siteName: SITE_NAME,
      type: "website",
      locale: lang === "ar" ? "ar_EG" : "en_US",
      alternateLocale: lang === "ar" ? "en_US" : "ar_EG",
      images: [
        {
          url: lang === "ar" ? "/open-graph-ar.png" : "/open-graph.png",
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} - Web Design Company in Egypt`,
        },
      ],
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
  const skipLabel = a11y.skipToContent[lang];

  const heroNavStrings: HeroNavStrings = {
    nav: {
      portfolio: navTranslations.portfolio[lang],
      services: navTranslations.services[lang],
      faq: navTranslations.faq[lang],
      guides: navTranslations.guides[lang],
      contact: navTranslations.contact[lang],
    },
    a11y: {
      desktopNav: a11y.desktopNav[lang],
      mobileNav: a11y.mobileNav[lang],
      openMenu: a11y.openMenu[lang],
      closeMenu: a11y.closeMenu[lang],
    },
    langToggleLabel: lang === "ar" ? langToggle.en : langToggle.ar,
    langToggleAriaLabel:
      lang === "ar" ? a11y.switchToEnglish[lang] : a11y.switchToArabic[lang],
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

        <LightRaysBackground />
        <HashUrlStripper />

        <div className="relative flex flex-col min-h-svh">
          <HeroNav lang={lang} strings={heroNavStrings} />

          <main id="main-content" className="md:flex-1 md:flex md:flex-col">
            {children}
          </main>
          <ChatWidget lang={lang} />
          <Suspense fallback={null}>
  <QuoteModal lang={lang} />
</Suspense>

          <Footer lang={lang} />
        </div>
      </body>
    </html>
  );
}
