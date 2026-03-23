import type { StaticImageData } from "next/image";
import skywayScreenshot from "../../public/project-screenshots/skyway.png";
import weddingsScreenshot from "../../public/project-screenshots/weddings.webp";

export interface Project {
  id: string;
  liveUrl: string;
  screenshot: StaticImageData;
  schemaName: string;
  schemaNameAr: string;
  description: string;
  descriptionAr: string;
  genre: string;
  keywords: string[];
  badge?: { en: string; ar: string };
  accentColor: string;
}

export const projects: readonly Project[] = [
  {
    id: "skyway",
    liveUrl: "https://www.skyway-travel.org",
    screenshot: skywayScreenshot,
    schemaName: "Sky Way Travel – Travel Agency Website Cairo",
    schemaNameAr: "سكاي واي ترافل – موقع وكالة سياحة في القاهرة",
    description:
      "Professional travel agency website for Sky Way Travel, a Cairo-based tour operator. Designed to showcase packages and convert visitors into bookings.",
    descriptionAr:
      "موقع احترافي لشركة سكاي واي ترافل، وكالة سياحة في القاهرة، مصمم لعرض برامج الرحلات وتحويل الزوار إلى حجوزات فعلية.",
    genre: "Travel & Tourism",
    keywords: [
      "travel agency website Cairo",
      "tour operator website Egypt",
      "موقع وكالة سياحة القاهرة",
      "تصميم موقع شركة سياحة مصر",
    ],
    accentColor: "#f5c469",
  },
  {
    id: "weddings",
    liveUrl: "https://weddings.samirmagdy.com/",
    screenshot: weddingsScreenshot,
    schemaName: "Wedding Services Website – Cairo",
    schemaNameAr: "موقع خدمات أفراح – القاهرة",
    description:
      "Custom-coded wedding services website for Cairo-based photographers and event planners. Showcases portfolios and drives client bookings.",
    descriptionAr:
      "موقع إلكتروني مخصص لخدمات الأفراح في القاهرة، مصمم لعرض أعمال المصورين ومنظمي الأفراح وتحويل الزوار إلى عملاء.",
    genre: "Wedding Services",
    keywords: [
      "wedding website Cairo",
      "wedding photographer website Egypt",
      "موقع أفراح القاهرة",
      "تصميم موقع خدمات أفراح",
    ],
    accentColor: "#d4a5a5",
  },
];

// SM Web Studio identity — reused across all project schema
const smWebStudio = {
  "@type": "ProfessionalService",
  name: "SM Web Studio",
  alternateName: "SM Web Studio",
  url: "https://samirmagdy.com",
  description:
    "Grow your business with custom web design in Egypt. We specialize in modern websites optimized to rank on Google. Claim your free quote today!",
  telephone: "+201274613331",
  email: "studio@samirmagdy.com",
  image: "https://samirmagdy.com/open-graph.webp",
  logo: "https://samirmagdy.com/logo.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressRegion: "Cairo Governorate",
    addressCountry: "EG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 30.0444,
    longitude: 31.2357,
  },
  areaServed: [
    { "@type": "City", name: "Cairo" },
    { "@type": "City", name: "New Cairo" },
    { "@type": "City", name: "Maadi" },
    { "@type": "City", name: "Sheikh Zayed" },
    { "@type": "City", name: "Giza" },
  ],
  knowsLanguage: ["ar", "en"],
  sameAs: [
    "https://www.facebook.com/WebDesignCairo",
    "https://www.instagram.com/webdesign.cairo/",
    "https://x.com/WebDesign_EG",
  ],
};

export const projectsStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Web Design Portfolio – SM Web Studio Cairo",
  description:
    "Custom-coded websites built by SM Web Studio for small businesses in Cairo and Egypt. Specializing in landing pages, single-page websites, and bilingual Arabic/English web design.",
  numberOfItems: projects.length,
  itemListElement: projects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "WebSite",
      name: project.schemaName,
      alternateName: project.schemaNameAr,
      url: project.liveUrl,
      description: project.description,
      inLanguage: ["en", "ar"],
      genre: project.genre,
      keywords: project.keywords.join(", "),
      creator: smWebStudio,
      locationCreated: {
        "@type": "City",
        name: "Cairo",
        containedInPlace: {
          "@type": "Country",
          name: "Egypt",
        },
      },
    },
  })),
};
