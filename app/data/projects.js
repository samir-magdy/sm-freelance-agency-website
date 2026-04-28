import ecommerceImg from "../../public/project-screenshots/e-commerce.webp";
import travelImg from "../../public/project-screenshots/travel.webp";
import realestateImg from "../../public/project-screenshots/realestate.webp";
import gymImg from "../../public/project-screenshots/gym.webp";
import autopartsImg from "../../public/project-screenshots/autoparts.webp";
import clinicImg from "../../public/project-screenshots/clinic.webp";
import petcareImg from "../../public/project-screenshots/petcare.webp";
import interiorImg from "../../public/project-screenshots/interior.webp";
import tourismImg from "../../public/project-screenshots/tourism.webp";

import { SITE_URL } from "./translations/lang";

export const projects = [
  {
    id: "Ecommerce",
    liveUrl: "https://ecommerce.samirmagdy.com/",
    screenshot: ecommerceImg,
    schemaName: "Fashion E-commerce – Egypt",
    schemaNameAr: "متجر إلكتروني للأزياء – مصر",
    description:
      "A fashion e-commerce demo by SM Web Studio showcasing advanced product listings and a streamlined WhatsApp checkout system designed for retail scalability.",
    genre: "Fashion Ecommerce",
    genreAr: "التجارة الإلكترونية للأزياء",
  },

  {
    id: "Interior",
    liveUrl: "https://interior.samirmagdy.com",
    screenshot: interiorImg,
    schemaName: "Interior Design Portfolio – Egypt",
    schemaNameAr: "معرض أعمال التصميم الداخلي – مصر",
    description:
      "An elegant portfolio demo by SM Web Studio designed for creative professionals, featuring high-resolution galleries and layouts tailored for interior design expertise.",
    genre: "Interior Design & Decor",
    genreAr: "التصميم الداخلي والديكور",
  },
  {
    id: "RealEstate",
    liveUrl: "https://realestate.samirmagdy.com",
    screenshot: realestateImg,
    schemaName: "Real Estate Listing Platform – Egypt",
    schemaNameAr: "تسويق عقاري – مصر",
    description:
      "A comprehensive real estate platform demo created by SM Web Studio, featuring advanced property filtering by location and price to showcase our directory solutions.",
    genre: "Real Estate & Brokers",
    genreAr: "سويق عقاري ووسطاء",
  },
  {
    id: "Gym",
    liveUrl: "https://gym.samirmagdy.com",
    screenshot: gymImg,
    schemaName: "Fitness Center & Gym Landing Page – Egypt",
    schemaNameAr: "موقع صالة ألعاب رياضية (جيم) – مصر",
    description:
      "A high-conversion fitness landing page demo from SM Web Studio, showcasing membership management and trainer profile layouts optimized for lead generation.",
    genre: "Fitness & Wellness",
    genreAr: "اللياقة البدنية والصحة",
  },
 
  {
    id: "AutoParts",
    liveUrl: "https://autoparts.samirmagdy.com",
    screenshot: autopartsImg,
    schemaName: "Automotive Parts Marketplace – Egypt",
    schemaNameAr: "متجر قطع غيار السيارات – مصر",
    description:
      "A specialized automotive marketplace demo created by SM Web Studio to demonstrate robust search engine capabilities and categorized inventory management for spare parts.",
    genre: "Automotive & Parts",
    genreAr: "تجارة قطع غيار السيارات",
  },

  {
    id: "Tourism",
    liveUrl: "https://tourism.samirmagdy.com",
    screenshot: tourismImg,
    schemaName: "Local Tourism & Excursions – Egypt",
    schemaNameAr: "السياحة والرحلات – مصر",
    description:
      "A tourism-focused website demo by SM Web Studio, optimized for booking local excursions and providing essential travel information for domestic and international visitors.",
    genre: "Travel & Tourism",
    genreAr: "سياحة وسفر",
  },

  {
    id: "PetCare",
    liveUrl: "https://petcare.samirmagdy.com",
    screenshot: petcareImg,
    schemaName: "Pet Care & Veterinary Services – Egypt",
    schemaNameAr: "خدمات رعاية الحيوانات الأليفة – مصر",
    description:
      "A service-based website demo by SM Web Studio for pet care businesses, illustrating clean UI and easy contact methods for veterinary and grooming services.",
    genre: "Pet Care Services",
    genreAr: "خدمات الحيوانات الأليفة",
  },
  {
    id: "Clinic",
    liveUrl: "https://clinic.samirmagdy.com",
    screenshot: clinicImg,
    schemaName: "Medical Clinic Website Services – Egypt",
    schemaNameAr: "منصة إدارة العيادات الطبية – مصر",
    description:
      "A medical management demo by SM Web Studio featuring optimized appointment booking flows and doctor profiles, highlighting our custom healthcare web solutions.",
    genre: "Medical & Clinics",
    genreAr: "العيادات والرعاية الصحية",
  },
     {
    id: "Travel",
    liveUrl: "https://travel.samirmagdy.com",
    screenshot: travelImg,
    schemaName: "Travel Agency – Egypt",
    schemaNameAr: "شركة سياحة – مصر",
    description:
      "An international travel booking demo by SM Web Studio, demonstrating seamless user experiences for exploring vacation packages and curated itineraries.",
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
  name: "Web Design Portfolio – SM Web Studio Cairo",
  description:
    "Custom-coded websites built by SM Web Studio for small businesses in Cairo and Egypt. Specializing in landing pages, single-page websites, ecommerce and bilingual Arabic/English web design.",
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
