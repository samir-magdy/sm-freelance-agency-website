import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Cairo } from "next/font/google";
import "../globals.css";
import HeroNav, { type HeroNavStrings } from "../components/nav/HeroNav";
import nav, { langToggle } from "../data/translations/nav";
import a11y from "../data/translations/a11y";
import Footer from "../components/nav/Footer";
import LightRaysBackground from "../components/ui/LightRaysBackground";
import { SITE_URL, SITE_NAME } from "@/app/constants";
import type { Lang } from "@/app/types";

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

// Static base metadata: Next.js will merge the dynamic title/description from page.tsx into this template
export const metadata: Metadata = {
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
    images: [
      {
        url: "/open-graph.webp",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} Logo`,
      },
    ],
  },
};

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
  const lang = rawLang as Lang; 

  const font = lang === "ar" ? cairoFull : cairoLatin;
  const skipLabel = lang === "ar" ? "تخطى إلى المحتوى" : "Skip to main content";
  const t = { nav, a11y, langToggle };

  const heroNavStrings: HeroNavStrings = {
    nav: {
      portfolio: t.nav.portfolio[lang],
      pricing: t.nav.pricing[lang],
      faq: t.nav.faq[lang],
      contact: t.nav.contact[lang],
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

        <LightRaysBackground />

        <div className="relative z-10 flex flex-col min-h-svh">
          <HeroNav lang={lang} strings={heroNavStrings} />

          <main id="main-content" className="md:flex-1 md:flex md:flex-col">
            {children}
          </main>

          <Footer lang={lang} />
        </div>
      </body>
      <GoogleTagManager gtmId="GTM-W9S847HD" />
    </html>
  );
}