import type { StaticImageData } from "next/image";
import skywayScreenshot from "../../public/project-screenshots/skyway.webp";
import weddingsScreenshot from "../../public/project-screenshots/weddings.webp";
import gymScreenshot from "../../public/project-screenshots/gym.webp";

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
  isShowcase: boolean;
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
    isShowcase: false,
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
    isShowcase: true,
  },
  {
    id: "gym",
    liveUrl: "https://gyms.samirmagdy.com",
    screenshot: gymScreenshot,
    schemaName: "Gym & Fitness Center Landing Page – Cairo",
    schemaNameAr: "صفحة هبوط نادي رياضي – القاهرة",
    description:
      "High-conversion landing page for a Cairo fitness center. Built to highlight facilities, drive memberships, and rank on Google Egypt.",
    descriptionAr:
      "صفحة هبوط عالية التحويل لنادٍ رياضي في القاهرة، مصممة لعرض الخدمات وزيادة الاشتراكات والظهور في نتائج جوجل مصر.",
    genre: "Health & Fitness",
    keywords: [
      "gym website Cairo",
      "fitness center landing page Egypt",
      "موقع نادي رياضي القاهرة",
      "تصميم موقع جيم مصر",
    ],
    isShowcase: true,
  },

];

// SM Web Studio identity — reused across all project schema
const smWebStudio = {
  "@type": "LocalBusiness",
  name: "SM Web Studio",
  alternateName: "إس إم ويب ستوديو",
  url: "https://samirmagdy.com",
  description:
    "Web design and development agency in Cairo specializing in custom-coded, conversion-focused websites for small businesses in Egypt and the MENA region.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 30.0444,
    longitude: 31.2357,
  },
  areaServed: [
    { "@type": "City", name: "Cairo" },
    { "@type": "Country", name: "Egypt" },
    { "@type": "AdministrativeArea", name: "MENA" },
  ],
  knowsLanguage: ["ar", "en"],
  sameAs: ["https://www.linkedin.com/in/samir-magdy-sm/"],
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