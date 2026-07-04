import HeroSection from "../components/sections/HeroSection";
import PortfolioSection from "../components/sections/PortfolioSection";
import PricingSection from "../components/sections/PricingSection";
import FAQSection from "../components/sections/FAQSection";
import ContactSection from "../components/sections/ContactSection";
import { notFound } from "next/navigation";
import { projectsStructuredData } from "../data/portfolio";

// IMPORTS FOR METADATA AND SCHEMA
import { pricingCards } from "../data/translations/pricingSection";
import { SITE_URL, SITE_NAME, PHONE_NUMBER, SOCIAL_LINKS } from "@/app/constants";

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
    }
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
      "Web Design", "Web Development", "E-commerce Development", 
      "Responsive Web Design", "Website Creation", 
      "Internationalization and Localization", "Right-to-Left (RTL) Display",
      "Payment Gateway Integration", "Paymob", "Fawry", "Vodafone Cash", 
      "InstaPay", "API Integration", "E-commerce Platforms", 
      "Medical Practice Management Software", "Digital Transformation"
    ],
  };

  const services = [
    {
      "@type": "Service",
      "@id": `${SITE_URL}#service-ecommerce-local-payments`,
      name: "Custom E-commerce Stores with Local Payment Integration",
      alternateName: "متاجر إلكترونية بربط بوابات الدفع المحلية",
      description:
        "Custom web apps for Egyptian businesses, with native InstaPay, Vodafone Cash, Paymob, and Fawry checkout, EGP billing managed end-to-end, and no commercial register required.",
      serviceType: "E-commerce Web Development",
      provider: { "@id": `${SITE_URL}#business` },
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
      "@id": `${SITE_URL}#service-instagram-migration`,
      name: "Instagram-to-Website Storefront Migration",
      alternateName: "نقل البيع من الانستجرام لموقع إلكتروني",
      description:
        "Migration service for Egyptian Instagram and Facebook merchants moving from manual DM-based sales to an independent storefront with automated order intake, InstaPay/Vodafone Cash confirmation, and stock tracking.",
      serviceType: "Social Commerce Migration",
      provider: { "@id": `${SITE_URL}#business` },
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
      "@id": `${SITE_URL}#service-freelancer-portfolio`,
      name: "Freelancer Portfolio Websites with International Payment Receipt",
      alternateName: "مواقع بورتفوليو للفريلانسرز باستلام مدفوعات دولية",
      description:
        "Portfolio websites for Egyptian freelancers, designers, and independent consultants with integrated international payment receipt via Paymob, Stripe-supported channels, and wire-friendly payment links. Funds settle to local Egyptian bank accounts.",
      serviceType: "Portfolio Web Development",
      provider: { "@id": `${SITE_URL}#business` },
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
      "@id": `${SITE_URL}#service-bilingual-rtl`,
      name: "Bilingual Arabic/English Business Websites with RTL Support",
      alternateName: "مواقع شركات ثنائية اللغة عربي وإنجليزي بدعم RTL كامل",
      description:
        "Multi-page business websites built natively bilingual (Arabic right-to-left and English left-to-right) with correct RTL layouts, legible Arabic typography, and SEO indexed separately in both languages: one site, double Google visibility.",
      serviceType: "Bilingual Web Development",
      provider: { "@id": `${SITE_URL}#business` },
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
      "@id": `${SITE_URL}#service-clinic-booking`,
      name: "Private Clinic Booking Systems (Vezeeta Alternative)",
      alternateName: "نظام حجز خاص للعيادات (بديل فيزيتا)",
      description:
        "Private clinic booking websites on the doctor's own domain with appointment scheduling, prepaid consultation fees via InstaPay, Vodafone Cash, or cards, automated SMS/WhatsApp reminders, and full patient data ownership. No annual aggregator subscription, no per-booking commission.",
      serviceType: "Medical Booking System Development",
      provider: { "@id": `${SITE_URL}#business` },
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
    description: "Samir Magdy is a web designer & developer & the founder of SM Web Design Studio, specializing in high-performance, custom web development.",
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