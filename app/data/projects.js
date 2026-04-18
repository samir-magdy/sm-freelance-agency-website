import skywayScreenshot from "../../public/project-screenshots/skyway.webp";
import ecommScnshot from "../../public/project-screenshots/e-commerce.webp";
import gymScreenshot from "../../public/project-screenshots/gym.webp"
import {
    SITE_URL
} from "./translations/lang";

export const projects = [
    // {
    //     id: "skyway",
    //     liveUrl: "https://www.skyway-travel.org",
    //     screenshot: skywayScreenshot,
    //     schemaName: "Sky Way Travel – Travel Agency Website Cairo",
    //     schemaNameAr: "سكاي واي ترافل – موقع وكالة سياحة في القاهرة",
    //     description: "A conversion-optimized travel agency website for Sky Way Travel, designed to attract, engage, and convert visitors into bookings by showcasing tour packages in a structured format, building trust, and guiding users effortlessly from interest to reservation.",
    //     genre: "Travel & Tourism",
    //     genreAr: "سياحة وسفر",
    // },


    {
        id: "Ecommerce",
        liveUrl: "https://ecommerce.samirmagdy.com/",
        screenshot: ecommScnshot,
        schemaName: "Fashion E-commerce – Egypt",
        schemaNameAr: "متجر إلكتروني للأزياء – مصر",
        description: "A custom-built fashion e-commerce store with advanced product listings, intelligent filtering, and a smart shopping cart. Streamlined WhatsApp checkout with no account creation required.",
        genre: "Fashion Ecommerce",
        genreAr: "التجارة الإلكترونية للأزياء",
    },
    {
        id: "gym",
        liveUrl: "https://gyms.samirmagdy.com",
        screenshot: gymScreenshot,
        schemaName: "Gym Startups",
        schemaNameAr: "مواقع مراكز اللياقة البدنية الناشئة",
        description: "A lead generating website built for the startup gyms. It is designed to attract, engage, and convert passive browsers into potential, loyal members.",
        genre: "Gym/Fitness",
        genreAr: "مراكز اللياقة البدنية",
    },
];

// Reference the canonical ProfessionalService defined in layout.tsx JSON-LD graph
const smWebStudio = {
    "@id": `${SITE_URL}/#business`
};

export const projectsStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Web Design Portfolio – SM Web Studio Cairo",
    description: "Custom-coded websites built by SM Web Studio for small businesses in Cairo and Egypt. Specializing in landing pages, single-page websites, and bilingual Arabic/English web design.",
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