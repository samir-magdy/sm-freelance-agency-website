import type { StaticImageData } from "next/image";
import skywayScreenshot from "../../public/project-screenshots/skyway.webp";
import ecommScnshot from "../../public/project-screenshots/e-commerce.webp";
import { SITE_URL } from "./translations/lang";

export interface Project {
  id: string;
  liveUrl: string;
  screenshot: StaticImageData;
  schemaName: string;
  schemaNameAr: string;
  description: string;
  descriptionAr: string;
  genre: string;
  genreAr: string;
  keywords: string[];
}

export const projects: readonly Project[] = [
  {
    id: "fashion-ecommerce",
    liveUrl: "https://ecommerce.samirmagdy.com/",
    screenshot: ecommScnshot,
    schemaName: "Fashion E-commerce – Egypt",
    schemaNameAr: "متجر إلكتروني للأزياء – مصر",
    description:
      "A custom-built fashion e-commerce store with advanced product listings, intelligent filtering, and a smart shopping cart. Streamlined WhatsApp checkout with no account creation required.",
    descriptionAr:
      "متجر إلكتروني للأزياء مصمم بالكامل، يضم قوائم منتجات متطورة، فلترة ذكية، وسلة تسوق سهلة. طلب مباشر على واتساب وبدون الحاجة لإنشاء حساب.",
    genre: "Fashion e-commerce",
    genreAr: "التجارة الإلكترونية للأزياء",
    keywords: [
      "fashion ecommerce Egypt",
      "online fashion store Cairo",
      "متجر أزياء إلكتروني مصر",
      "تصميم متجر إلكتروني القاهرة",
    ],
  },
  {
    id: "skyway",
    liveUrl: "https://www.skyway-travel.org",
    screenshot: skywayScreenshot,
    schemaName: "Sky Way Travel – Travel Agency Website Cairo",
    schemaNameAr: "سكاي واي ترافل – موقع وكالة سياحة في القاهرة",
    description:
      "A conversion-optimized travel agency website for Sky Way Travel, designed to attract, engage, and convert visitors into bookings by showcasing tour packages in a structured format, building trust, and guiding users effortlessly from interest to reservation.",
    descriptionAr:
      "موقع إلكتروني لوكالة 'سكاي واي ترافيل' للسياحة، مُصمم لزيادة معدلات الحجز عن طريق جذب الزوار والتفاعل معاهم، وتحويلهم لعملاء. وده من خلال عرض برامج سياحية مميزة، وبناء الثقة، وتوجيه المستخدم بكل سلاسة من مرحلة الاهتمام لحد تنفيذ الحجز.",
    genre: "Travel & Tourism",
    genreAr: "سياحة وسفر",
    keywords: [
      "travel agency website Cairo",
      "tour operator website Egypt",
      "موقع وكالة سياحة القاهرة",
      "تصميم موقع شركة سياحة مصر",
    ],
  },
];

// Reference the canonical ProfessionalService defined in layout.tsx JSON-LD graph
const smWebStudio = { "@id": `${SITE_URL}/#business` };

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
