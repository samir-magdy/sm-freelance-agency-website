import type { Metadata } from "next";
import HeroSection from "@/app/components/sections/HeroSection/HeroSection";
import PortfolioSection from "@/app/components/sections/PortfolioSection/PortfolioSection";
import ServicesSection from "@/app/components/sections/ServicesSection/ServicesSection";
import FAQSection from "@/app/components/sections/FAQSection/FAQSection";
import ContactSection from "@/app/components/sections/ContactSection/ContactSection";
import { notFound } from "next/navigation";
import { projectsStructuredData } from "@/app/data/portfolio";
import { servicesSectionTranslations } from "@/app/data/translations/servicesSection";
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

const META_DESCRIPTION: Record<Lang, string> = {
  en: `Professional, affordable websites that help you attract more customers and strengthen your online presence. Get your quote today.`,
  ar: `تصميم مواقع إلكترونية احترافية واقتصادية تساعدك على جذب المزيد من العملاء وتعزيز حضورك الرقمي. احصل على عرض سعر اليوم.`,
};

const meta: Record<Lang, { title: string; description: string }> = {
  en: {
    title: `Web Design & Development | ${SITE_NAME}`,
    description: META_DESCRIPTION.en,
  },
  ar: {
    title: `تصميم وتطوير مواقع إلكترونية | ${SITE_NAME}`,
    description: META_DESCRIPTION.ar,
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<LangParams>;
}): Promise<Metadata> {
  const { lang } = await params;
  const currentMeta =
    meta[lang] || { title: `Page Not Found | ${SITE_NAME}`, description: "" };
  return {
    title: currentMeta.title,
    description: currentMeta.description,
    alternates: homeAlternates(lang),
  };
}

function buildStructuredData(lang: Lang) {
  const pageUrl = homeUrl(lang);

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
    ...(card.price
      ? {
          offers: {
            "@type": "Offer",
            price: String(card.price),
            priceCurrency: "EGP",
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
    name: meta[lang].title,
    description: meta[lang].description,
    inLanguage: lang,
    isPartOf: { "@id": SCHEMA_IDS.website },
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

  const mainStructuredData = buildStructuredData(lang);

  return (
    <div className="relative bg-background text-content-heading flex flex-col gap-40 md:gap-72">
      <HeroSection lang={lang} />
      <PortfolioSection key={lang} lang={lang} />
      <ServicesSection lang={lang} />
      <FAQSection lang={lang} />
      <ContactSection lang={lang} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectsStructuredData),
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
