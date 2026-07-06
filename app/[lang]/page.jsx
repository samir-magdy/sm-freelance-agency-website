import HeroSection from "../components/sections/HeroSection";
import PortfolioSection from "../components/sections/PortfolioSection";
import PricingSection from "../components/sections/PricingSection";
import FAQSection from "../components/sections/FAQSection";
import ContactSection from "../components/sections/ContactSection";
import { notFound } from "next/navigation";
import { projectsStructuredData } from "../data/portfolio";

// IMPORTS FOR METADATA AND SCHEMA
import { pricingCards } from "../data/translations/pricingSection";
import {
  SITE_URL,
  SITE_NAME,
  PHONE_NUMBER,
  SOCIAL_LINKS,
} from "@/app/constants";

// ─────────────────────────────────────────────
// METADATA CONTENT (For Schema & SEO)
// ─────────────────────────────────────────────
const META_DESCRIPTION = {
  en: "Custom web design & development for small-medium businesses & individuals. Your professional online presence starts here.",
  ar: "تصميم وتطوير مواقع إلكترونية مخصصة للشركات والأفراد. ابدأ حضورك الرقمي الاحترافي معنا.",
};

const meta = {
  en: {
    title: `Custom Website Development in Egypt | ${SITE_NAME}`,
    description: META_DESCRIPTION.en,
  },
  ar: {
    title: `تصميم وإنشاء مواقع إلكترونية في مصر | ${SITE_NAME}`,
    description: META_DESCRIPTION.ar,
  },
};

// ─────────────────────────────────────────────
// PAGE-SPECIFIC CANONICAL URL
// ─────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { lang } = await params;
  const canonicalUrl = lang === "en" ? SITE_URL : `${SITE_URL}/${lang}`;

  return {
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: SITE_URL,
        ar: `${SITE_URL}/ar`,
        "x-default": SITE_URL,
      },
    },
    openGraph: {
      url: canonicalUrl,
    },
  };
}

// ─────────────────────────────────────────────
// HOMEPAGE SCHEMA (WITH CLEANED IDs)
// ─────────────────────────────────────────────
const CONTACT_EMAIL = "studio@samirmagdy.com";

function buildStructuredData(lang) {
  const pageUrl = lang === "en" ? SITE_URL : `${SITE_URL}/${lang}`;

  const businessSchema = {
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}#business`,
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
      SOCIAL_LINKS.x,
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
      "Clinic Booking Systenm",
      "نظام حخز عيادات",
      "Business Email Setup",
      "إنشاء إيميل رسمي للشركة",
      "Company Profile Website",
      "تصميم موقع تعريفي للشركة",
      "Search Engine Optimization (SEO)",
      "ظهور الموقع في جوجل",
      "Custom Website Design & Development",
      "تصميم وبرمجة مواقع إلكترونية مخصصة"
    ],
  };

const services = [
    {
      "@type": "Service",
      "@id": `${SITE_URL}#service-landing-page`,
      name: "Landing Page",
      alternateName: "صفحة هبوط",
      description:
        "A single-page website built to drive one action like a WhatsApp message, a booking, or filling out a form. Perfect for startups, freelancers and marketing campaigns.",
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
    alternateName: ["SM Web Design", "SM Web Studio"],
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
      "Samir Magdy is a web designer & developer & the founder of SM Web Design Studio, specializing in high-performance, custom web development.",
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

// ─────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────
export default async function Page({ params }) {
  const { lang: rawLang } = await params;
  if (rawLang !== "en" && rawLang !== "ar") notFound();
  const lang = rawLang;

  const mainStructuredData = buildStructuredData(lang);

  return (
    <div className="relative min-h-screen bg-background text-content-heading flex flex-col gap-40 md:gap-72">
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
