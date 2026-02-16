"use client";

import { projects, projectsStructuredData } from "@/app/data/projects";
import ProjectCard from "../ui/ProjectCard";
import { useLanguage } from "@/app/contexts/LanguageContext";
import translations from "@/app/data/translations";

export default function ProjectsSection() {
  const { lang } = useLanguage();
  const t = translations;

  return (
    <section
      id="portfolio"
      className="py-20 md:pt-24 px-4 mx-auto"
      aria-labelledby="portfolio-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsStructuredData) }}
      />

      <div className="mx-auto md:px-40">
        <div className="mb-5 md:mb-0 px-4">
          <h2
            id="portfolio-heading"
            className="font-bold text-heading text-content-heading text-center mb-2"
          >
            {t.projectsSection.heading[lang]}
          </h2>
          <p className="text-content-body text-center text-base md:text-heading">
            {t.projectsSection.subtitle[lang]}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto pt-4 md:pt-20">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
