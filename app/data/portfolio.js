import ecommerceImg from "../../public/project-screenshots/e-commerce.webp";
import travelImg from "../../public/project-screenshots/travel.webp";

import { SITE_URL } from "../constants";

export const projects = [
  {
    id: "Ecommerce",
    slug: "fashion-ecommerce-website",
    liveUrl: "https://ecommerce.smwebdesign.studio",
    screenshot: ecommerceImg,
    schemaName: "Fashion E-commerce – Egypt",
    schemaNameAr: "متجر إلكتروني للأزياء – مصر",
    description:
      "A fashion e-commerce demo by SM Web Design Studio showcasing advanced product listings and a streamlined WhatsApp checkout system designed for retail scalability.",
    genre: "Fashion E-commerce",
    genreAr: "التجارة الإلكترونية للأزياء",
  },

  {
    id: "Travel",
    slug: "travel-agency-website",
    liveUrl: "/portfolio/travel-agency-website",
    screenshot: travelImg,
    schemaName: "Travel Agency Website – Egypt",
    schemaNameAr: "موقع شركة سياحة – مصر",
    description:
      "A travel agency demo by SM Web Design Studio showcasing destination-focused hotel listings, trip packages, and a polished browsing experience built to turn visitors into confirmed travelers.",
    genre: "Travel & Tourism",
    genreAr: "سياحة وسفر",
  },

];

// Reference the canonical ProfessionalService defined in layout.tsx JSON-LD graph
const smWebStudio = {
  "@id": `${SITE_URL}/#business`,
};

export const projectsStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Web Design Portfolio – SM Web Design Studio Cairo",
  description:
    "Custom-coded websites built by SM Web Design Studio for small businesses in Cairo and Egypt. Specializing in landing pages, single-page websites, ecommerce and bilingual Arabic/English web design.",
  numberOfItems: projects.length,
  itemListElement: projects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "WebSite",
      name: project.schemaName,
      alternateName: project.schemaNameAr,
      url: project.liveUrl.startsWith("http")
        ? project.liveUrl
        : `${SITE_URL}${project.liveUrl}`,
      description: project.description,
      inLanguage: ["en", "ar"],
      genre: project.genre,
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
