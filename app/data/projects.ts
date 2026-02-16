import skywayScnshot from "../../public/project-screenshots/travel-agency.png";
import weddingsScnshot from "../../public/project-screenshots/wedding-planner.png";
import gymScnshot from "../../public/project-screenshots/gym.png";
import kindergartenScnshot from "../../public/project-screenshots/kindergarden.png";
import modelingScnshot from "../../public/project-screenshots/modeling-agency.png";
import supplementsScnshot from "../../public/project-screenshots/supplements.png";

export interface ProjectSchema {
  applicationCategory: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  liveUrl: string;
  screenshot: string;
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
    screenshot: skywayScnshot.src,
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
    screenshot: weddingsScnshot.src,
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
    liveUrl: "#",
    screenshot: gymScnshot.src,
    ctaText: "Live Demo",
    schema: {
      applicationCategory: "Fitness Website",
    },
  },
  {
    id: "kindergarten",
    title: "Kindergarten Landing Page",
    description:
      "A landing page for a kindergarten. Designed to showcase programs, build parent trust, and drive enrollments.",
    liveUrl: "#",
    screenshot: kindergartenScnshot.src,
    ctaText: "Live Demo",
    schema: {
      applicationCategory: "Education Website",
    },
  },
  {
    id: "modeling",
    title: "Modeling Agency Landing Page",
    description:
      "A landing page for a modeling agency. Designed to showcase talent portfolios, attract clients, and drive bookings.",
    liveUrl: "#",
    screenshot: modelingScnshot.src,
    ctaText: "Live Demo",
    schema: {
      applicationCategory: "Entertainment Website",
    },
  },
  {
    id: "supplements",
    title: "Supplements Store",
    description:
      "A landing page for a supplements store. Designed to highlight products, build credibility, and drive sales.",
    liveUrl: "#",
    screenshot: supplementsScnshot.src,
    ctaText: "Live Demo",
    schema: {
      applicationCategory: "E-commerce",
    },
  },
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
