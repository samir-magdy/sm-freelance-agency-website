import type { Metadata } from "next";
import HeroSection from "@/app/components/sections/HeroSection/HeroSection";
import PortfolioSection from "@/app/components/sections/PortfolioSection/PortfolioSection";
import ServicesSection from "@/app/components/sections/ServicesSection/ServicesSection";
import FAQSection from "@/app/components/sections/FAQSection/FAQSection";
import ContactSection from "@/app/components/sections/ContactSection/ContactSection";
import { notFound } from "next/navigation";
import { projectsStructuredData } from "@/app/data/portfolio";
import { servicesSectionTranslations } from "@/app/data/translations/servicesSection";
import faqSection from "@/app/data/translations/faqSection";
import pageMeta from "@/app/data/translations/pageMeta";
import {
  SITE_URL,
  SITE_NAME,
  PHONE_NUMBER,
  CONTACT_EMAIL,
  SOCIAL_LINKS,
  SCHEMA_IDS,
} from "@/app/constants";
import { isLang, type Lang, type LangParams } from "@/app/types";
import { homeUrl, homeAlternates } from "@/lib/urls";
import { getRegion, type Region } from "@/lib/region";
import { BASE_PRICES, CURRENCIES } from "@/app/data/translations/regionPricing";

export async function generateMetadata({
  params,
}: {
  params: Promise<LangParams>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: pageMeta.home.title[lang],
    description: pageMeta.home.description[lang],
    alternates: homeAlternates(lang),
  };
}

function buildStructuredData(lang: Lang, region: Region) {
  const pageUrl = homeUrl(lang);
  const currencyCode = CURRENCIES[region].code;

  const businessSchema = {
    "@type": "ProfessionalService",
    "@id": SCHEMA_IDS.business,
    name: SITE_NAME,
    inLanguage: ["en", "ar"],
    description:
      `${SITE_NAME} is a web design company specializing in custom websites that deliver exceptional user experiences and measurable ROI. Every website is built using modern technologies like Next.js, resulting in high-performance, SEO-friendly websites that traditional or AI-powered website builders simply can't match.`,
    url: SITE_URL,
    telephone: PHONE_NUMBER,
    email: CONTACT_EMAIL,
    logo: `${SITE_URL}/business-logo.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cairo",
      addressRegion: "Cairo Governorate",
      addressCountry: "EG",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "22:00",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Cairo" },
      { "@type": "City", name: "New Cairo City" },
      { "@type": "City", name: "6th of October City" },
      { "@type": "City", name: "Sheikh Zayed City" },
      { "@type": "City", name: "Giza" },
      { "@type": "City", name: "Alexandria" },
      { "@type": "Place", name: "North Coast" },
      { "@type": "City", name: "Hurghada" },
      { "@type": "City", name: "Sharm El-Sheikh" },
      { "@type": "City", name: "Ismailia" },
      { "@type": "City", name: "Suez" },
      { "@type": "City", name: "Zagazig" },
      { "@type": "City", name: "Tanta" },
      { "@type": "City", name: "Mansoura" },
    ],
    sameAs: [
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.facebook,
      SOCIAL_LINKS.gbp,
      SOCIAL_LINKS.linkedin,
    ],
    founder: { "@id": SCHEMA_IDS.founder },
    knowsLanguage: ["en", "ar"],
  };

  const services = servicesSectionTranslations.cards.map((card) => ({
    "@type": "Service",
    "@id": `${SITE_URL}#service-${card.id}`,
    name: card.name.en,
    alternateName: card.name.ar,
    description: card.tagline.en.replace(/<\/?em>/g, ""),
    provider: { "@id": SCHEMA_IDS.business },
    inLanguage: ["en", "ar"],
    ...(card.priceBaseId
      ? {
          offers: {
            "@type": "Offer",
            price: String(BASE_PRICES[card.priceBaseId][region]),
            priceCurrency: currencyCode,
          },
        }
      : {}),
  }));

  const websiteSchema = {
    "@type": "WebSite",
    "@id": SCHEMA_IDS.website,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ["en", "ar"],
    publisher: { "@id": SCHEMA_IDS.business },
  };

  const webPageSchema = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: pageMeta.home.title[lang],
    description: pageMeta.home.description[lang],
    inLanguage: lang,
    isPartOf: { "@id": SCHEMA_IDS.website },
  };

  // Mirrors the visible FAQ section in the page's language. Answers are
  // stripped to plain text — the schema must match the on-page content, and
  // one answer carries inline links the schema text shouldn't.
  const faqSchema = {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    inLanguage: lang,
    mainEntity: faqSection.items.map((item) => ({
      "@type": "Question",
      name: item.question[lang],
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer[lang].replace(/<[^>]+>/g, ""),
      },
    })),
  };

  const founderSchema = {
    "@type": "Person",
    "@id": SCHEMA_IDS.founder,
    name: "Samir Magdy",
    alternateName: "سمير مجدي",
    jobTitle: "Founder, Web Designer & Developer",
    description:
      `Samir Magdy is a web developer & founder of ${SITE_NAME} in Cairo, Egypt. He specializes in custom web design and development using Next.js and TypeScript.`,
    nationality: { "@type": "Country", name: "Egypt" },
    url: SITE_URL,
    image: `${SITE_URL}/profilePhoto.jpg`,
    sameAs: [
      "https://www.linkedin.com/in/samir-magdy-/",
      "https://github.com/samir-magdy",
    ],
    worksFor: { "@id": SCHEMA_IDS.business },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      businessSchema,
      ...services,
      websiteSchema,
      webPageSchema,
      faqSchema,
      founderSchema,
    ],
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!isLang(rawLang)) notFound();
  const lang: Lang = rawLang;

  const region = await getRegion();
  const mainStructuredData = buildStructuredData(lang, region);

  return (
    <div className="relative bg-background text-content-heading flex flex-col gap-40 md:gap-72">
      <HeroSection lang={lang} />
      <PortfolioSection key={lang} lang={lang} />
      <ServicesSection lang={lang} region={region} />
      <FAQSection lang={lang} />
      <ContactSection lang={lang} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectsStructuredData).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(mainStructuredData).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
