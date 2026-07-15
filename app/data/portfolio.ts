import type { StaticImageData } from "next/image";
import ecommerceImg from "../../public/project-screenshots/e-commerce.webp";
import travelImg from "../../public/project-screenshots/travel.webp";
import butterDesignImg from "../../public/project-screenshots/butter-design.webp";
import dentalImg from "../../public/project-screenshots/dental.webp";
import interiorImg from "../../public/project-screenshots/interior.webp";
import petImg from "../../public/project-screenshots/pet.webp";
import hadeerImg from "../../public/project-screenshots/hadeer.webp";

import { SITE_URL } from "../constants";
import type { ProjectId } from "./translations/portfolioSection";

export interface Project {
  id: ProjectId;
  clientSite?: boolean;
  liveUrl: string;
  screenshot: StaticImageData;
  schemaName: string;
  schemaNameAr: string;
  description: string;
  genre: string;
  genreAr: string;
}

export const projects: Project[] = [
  {
    id: "ButterDesign",
    clientSite: true,
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
    liveUrl: "https://ecommerce.smwebdesign.studio",
    screenshot: ecommerceImg,
    schemaName: "Fashion E-commerce – Egypt",
    schemaNameAr: "متجر إلكتروني للأزياء – مصر",
    description:
      "A fashion e-commerce demo by SM Web Design Studio showcasing advanced product listings and a polished shopping experience designed for retail scalability.",
    genre: "Fashion E-commerce",
    genreAr: "التجارة الإلكترونية للأزياء",
  },
  {
    id: "HadeerEnglish",
    liveUrl: "https://hadeernabil.site",
    screenshot: hadeerImg,
    schemaName: "Private English Tutor Website – Egypt",
    schemaNameAr: "موقع مدرس لغة إنجليزية خاص – مصر",
    description:
      "A landing page built for Ms Hadeer Nabil, a private English tutor based in Cairo, Egypt. It highlights one-on-one lessons, courses available, and an interactive placement quiz designed to convert visitors into students.",
    genre: "Private English Tutoring",
    genreAr: "دروس خاصة",
  },
  {
    id: "DentalClinic",
    liveUrl: "/portfolio/dental-clinic-site-demo",
    screenshot: dentalImg,
    schemaName: "Dental Clinic Website – Egypt",
    schemaNameAr: "موقع عيادة أسنان – مصر",
    description:
      "A dental clinic demo by SM Web Design Studio built to attract new patients in Egypt with a professional, trust-building web presence that highlights treatments, expertise, and clinic facilities.",
    genre: "Dental Clinic",
    genreAr: "عيادة أسنان",
  },
  {
    id: "InteriorDesign",
    liveUrl: "/portfolio/interior-design-site-demo",
    screenshot: interiorImg,
    schemaName: "Interior Design Studio Website – Egypt",
    schemaNameAr: "موقع استوديو تصميم داخلي – مصر",
    description:
      "An interior design studio demo by SM Web Design Studio showcasing project portfolios and services to attract high-value clients in Egypt looking for premium residential and commercial design.",
    genre: "Interior Design",
    genreAr: "تصميم داخلي",
  },
  {
    id: "PetCare",
    liveUrl: "/portfolio/pet-care-site-demo",
    screenshot: petImg,
    schemaName: "Veterinary & Pet Care Clinic Website – Egypt",
    schemaNameAr: "موقع عيادة بيطرية – مصر",
    description:
      "A veterinary and pet care clinic demo by SM Web Design Studio designed to build trust with pet owners in Egypt and drive appointment bookings through a warm, professional online presence.",
    genre: "Vet & Pet Care",
    genreAr: "رعاية الحيوانات",
  },
];

const smWebStudio = {
  "@id": `${SITE_URL}#business`,
};

export const projectsStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Web Design Portfolio – SM Web Design Studio Cairo",
  description:
    "Custom-coded websites built by SM Web Design Studio for small businesses in Cairo and Egypt. Specializing in landing pages, single-page websites, ecommerce and bilingual Arabic/English web design.",
  numberOfItems: projects.length,
  itemListElement: projects.map((project, index) => {
    const liveUrl = project.liveUrl.startsWith("http")
      ? project.liveUrl
      : `${SITE_URL}${project.liveUrl}`;
    return {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.schemaName,
        alternateName: project.schemaNameAr,
        url: liveUrl,
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
        workExample: {
          "@type": "WebSite",
          url: liveUrl,
        },
      },
    };
  }),
};
