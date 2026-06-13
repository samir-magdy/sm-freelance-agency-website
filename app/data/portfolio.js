import ecommerceImg from "../../public/project-screenshots/e-commerce.webp";
import travelImg from "../../public/project-screenshots/travel.webp";
import butterDesignImg from "../../public/project-screenshots/butter-design.webp";

import { SITE_URL } from "../constants";

export const projects = [
  {
    id: "ButterDesign",
    slug: "design-agency-portfolio-website",
    liveUrl: "https://butterdesignbureau.com",
    screenshot: butterDesignImg,
    schemaName: "Design Agency Portfolio Website – Egypt",
    schemaNameAr: "موقع بورتفوليو استوديو تصميم – مصر",
    description:
      "Butter Design Bureau is a branding agency based in Cairo, Egypt. This portfolio site was built by SM Web Design Studio, showcasing client work in brand identity, strategy, and visual design with a clean, typography-driven aesthetic.",
    genre: "Branding & Design Agency",
    genreAr: "استوديو تصميم وهوية بصرية",
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
