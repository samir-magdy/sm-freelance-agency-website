import type { StaticImageData } from "next/image";
import skywayScnshot from "../../public/project-screenshots/travel-agency.png";
import weddingsScnshot from "../../public/project-screenshots/wedding-planner.png";
import gymScnshot from "../../public/project-screenshots/gym.png";


export interface ProjectSchema {
  applicationCategory: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  liveUrl: string;
  screenshot: StaticImageData;
  ctaText: string;
  schema: ProjectSchema;
}

export const projects: readonly Project[] = [
  {
    id: "skyway",
    title: "Sky Way Travel",
    description:
      "Building this websi",
    liveUrl: "https://www.skyway-travel.org",
    screenshot: skywayScnshot,
    ctaText: "Live Demo",
    schema: {
      applicationCategory: "Travel Agency Website",
    },
  },
  {
    id: "weddings",
    title: "Weddings Landing Page",
    description:
      "If you are a wedding planner, photographer or makeup artist, this website is perfect for you. Showcase your work, build trust and convert customers now!",
    liveUrl: "https://weddings.samirmagdy.com/",
    screenshot: weddingsScnshot,
    ctaText: "Live Demo",
    schema: {
      applicationCategory: "E-commerce",
    },
  },
  {
    id: "gym",
    title: "Gym Landing Page",
    description:
      "A landing page for a fitness center. Designed to present membership plans, highlight facilities, and drive sign-ups.",
    liveUrl: "https://gyms.samirmagdy.com",
    screenshot: gymScnshot,
    ctaText: "Live Demo",
    schema: {
      applicationCategory: "Fitness Website",
    },
  }
];

export const projectsStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Web Development Projects Portfolio",
  description: "Featured full-stack web development projects",
  numberOfItems: projects.length,
  itemListElement: projects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "SoftwareApplication",
      name: project.title,
      description: project.description,
      applicationCategory: project.schema.applicationCategory,
      url: project.liveUrl,
      inLanguage: "en",
    },
  })),
};
