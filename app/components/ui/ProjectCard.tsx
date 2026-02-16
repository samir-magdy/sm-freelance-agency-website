"use client";

import { useLanguage } from "@/app/contexts/LanguageContext";
import translations from "@/app/data/translations";
import type { Project } from "@/app/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { lang } = useLanguage();
  const pd = translations.projectData[project.id as keyof typeof translations.projectData];
  const t = translations;

  const title = pd?.title[lang] ?? project.title;
  const description = pd?.description[lang] ?? project.description;
  const ctaText = pd?.cta[lang] ?? project.ctaText;

  return (
    <article className="bg-surface-card w-full rounded-xl overflow-hidden border border-border-subtle shadow-lg flex flex-col">
      <figure className="flex flex-col h-full">
        <div className="overflow-hidden">
          <img
            src={project.screenshot}
            alt={`${t.a11y.screenshotOf[lang]} ${title}`}
            className="w-full"
          />
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-subheading font-bold text-content-heading tracking-wide mb-4">
            {title}
          </h3>

          <figcaption className="text-content-body text-base tracking-wide mb-4">
            {description}
          </figcaption>

          <div className="mt-auto">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${ctaText} for ${title} (opens in new tab)`}
              className="inline-block w-full bg-brand-primary text-center font-bold text-caption py-3 px-8 hover:bg-brand-primary/80 text-background rounded-lg transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-brand-accent"
            >
              {ctaText}
            </a>
          </div>
        </div>
      </figure>
    </article>
  );
}
