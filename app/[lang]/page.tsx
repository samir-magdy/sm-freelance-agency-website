import type { Metadata } from "next";
import HeroSection from "../components/sections/HeroSection";
import PortfolioSection from "../components/sections/PortfolioSection";
import PricingSection from "../components/sections/PricingSection";
import FAQSection from "../components/sections/FAQSection";
import ContactSection from "../components/sections/ContactSection";
import { notFound } from "next/navigation";
import { projectsStructuredData } from "../data/portfolio";
import { pricingCards } from "../data/translations/pricingSection";
import {
  SITE_URL,
  SITE_NAME,
  PHONE_NUMBER,
  CONTACT_EMAIL,
  SOCIAL_LINKS,
} from "@/app/constants";
import { isLang, type Lang, type LangParams } from "@/app/types";

const META_DESCRIPTION: Record<Lang, string> = {
  en: `${SITE_NAME} builds professional, affordable websites that help businesses reach more customers and strengthen their online presence. Get your quote today.`,
  ar: `${SITE_NAME} تصمم مواقع إلكترونية احترافية واقتصادية تساعد الشركات على جذب المزيد من العملاء وتعزيز حضورها الرقمي. احصل على عرض سعر اليوم.`,
};

const meta: Record<Lang, { title: string; description: string }> = {
  en: {
    title: `Web Design & Development in Egypt | ${SITE_NAME}`,
    description: META_DESCRIPTION.en,
  },
  ar: {
    title: `تصميم وتطوير مواقع إلكترونية في مصر | ${SITE_NAME}`,
    description: META_DESCRIPTION.ar,
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<LangParams>;
}): Promise<Metadata> {
  const { lang } = await params;
  const canonicalUrl = lang === "en" ? SITE_URL : `${SITE_URL}/${lang}`;
  const currentMeta =
    meta[lang] || { title: `Page Not Found | ${SITE_NAME}`, description: "" };
  return {
    title: currentMeta.title,
    description: currentMeta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: SITE_URL,
        ar: `${SITE_URL}/ar`,
        "x-default": SITE_URL,
      },
    },
  };
}

function buildStructuredData(lang: Lang) {
  const pageUrl = lang === "en" ? SITE_URL : `${SITE_URL}/${lang}`;

  const businessSchema = {
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}#business`,
    name: SITE_NAME,
    inLanguage: "en",
    description:
      `${SITE_NAME} is a web design company in Egypt specializing in custom websites that deliver exceptional user experiences and measurable ROI. Every website is built using modern technologies like Next.js, resulting in high-performance, SEO-friendly websites that traditional or AI-powered website builders simply can't match.`,
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
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Design & Development Services in Egypt",
      itemListElement: pricingCards.cards.map((card) => ({
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
    sameAs: [
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.facebook,
      SOCIAL_LINKS.gbp,
      SOCIAL_LINKS.linkedin,
    ],
    founder: { "@id": `${SITE_URL}#founder` },
    knowsLanguage: ["en", "ar"],
    knowsAbout: [
      "Create a Website",
      "إنشاء موقع إلكتروني",
      "Web Design",
      "تصميم مواقع إلكترونية",
      "Web Development",
      "تطوير وبرمجة المواقع",
      "E-commerce Development",
      "تصميم متجر إلكتروني",
      "Clinic Booking System",
      "نظام حجز عيادات",
      "Business Email Setup",
      "إنشاء إيميل رسمي للشركة",
      "Company Profile Website",
      "تصميم موقع تعريفي للشركة",
      "Search Engine Optimization (SEO)",
      "ظهور الموقع في جوجل",
      "Custom Website Design & Development",
      "تصميم وبرمجة مواقع إلكترونية مخصصة",
    ],
  };

  const services = [
    {
      "@type": "Service",
      "@id": `${SITE_URL}#service-landing-page`,
      name: "Landing Page",
      alternateName: "صفحة هبوط",
      description:
        "A single-page website built to drive a specific action like a booking, or filling out a form. Perfect for startups, freelancers and marketing campaigns.",
      serviceType: "Landing Page Design",
      provider: { "@id": `${SITE_URL}#business` },
      offers: {
        "@type": "Offer",
        price: "5999",
        priceCurrency: "EGP",
        description: "Starting price for a single-page landing page.",
      },
      inLanguage: ["en", "ar"],
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}#service-business-website`,
      name: "Business Website",
      alternateName: "موقع أعمال",
      description:
        "A multi-page website that presents your company in full detail. Ideal for more established businesses and entities that have a lot to show and tell.",
      serviceType: "Corporate Web Development",
      provider: { "@id": `${SITE_URL}#business` },
      offers: {
        "@type": "Offer",
        price: "8999",
        priceCurrency: "EGP",
        description: "Starting price for a multi-page business website.",
      },
      inLanguage: ["en", "ar"],
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}#service-custom-web-app`,
      name: "Custom Web App",
      alternateName: "تطبيق ويب",
      description:
        "A fully custom-built web application designed around your exact requirements, from online stores and booking systems to client portals. Ideal for businesses with specific needs that require custom solutions.",
      serviceType: "Custom Web Application Development",
      provider: { "@id": `${SITE_URL}#business` },
      inLanguage: ["en", "ar"],
    },
  ];

  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ["en", "ar"],
    publisher: {
      "@id": `${SITE_URL}#business`,
    },
  };

  const webPageSchema = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: meta[lang].title,
    description: meta[lang].description,
    inLanguage: lang,
    isPartOf: {
      "@id": `${SITE_URL}#website`,
    },
  };

  const founderSchema = {
    "@type": "Person",
    "@id": `${SITE_URL}#founder`,
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
    worksFor: { "@id": `${SITE_URL}#business` },
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
      <PricingSection lang={lang} />
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
