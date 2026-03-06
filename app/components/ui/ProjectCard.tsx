import Image from "next/image";
import translations from "@/app/data/translations";
import type { Lang } from "@/app/data/translations";
import type { Project } from "@/app/data/projects";

interface ProjectCardProps {
  project: Project;
  lang: Lang;
}

export default function ProjectCard({ project, lang }: ProjectCardProps) {
  const pd =
    translations.projectData[
      project.id as keyof typeof translations.projectData
    ];
  const t = translations;

  const title = pd.title[lang];
  const description = pd.description[lang];
  const ctaText = pd.cta[lang];

  return (
    <article className="bg-surface-card w-full rounded-xl overflow-hidden border border-border-strong shadow-lg flex flex-col">
      <figure className="relative flex flex-col h-full">
        {project.isShowcase && (
          <span style={lang === "ar" ? { borderBottomRightRadius: "0", borderTopLeftRadius: "0" } : { borderBottomLeftRadius: "0", borderTopRightRadius: "0" }} className="absolute ltr:text-xs bg-background/60 top-0 ltr:left-0 rtl:right-0 rtl:pb-2 z-10 backdrop-blur-sm text-white text-sm md:text-md font-medium px-2 py-1 rounded-xl border border-white/10">
            {lang === "ar" ? "نموذج" : "Showcase"}
          </span>
        )}
        <Image
          src={project.screenshot}
          alt={`${t.a11y.screenshotOf[lang]} ${title}`}
          className="w-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
        />
        <div className="p-4 flex flex-col flex-1">
          <figcaption>
            <h3 className="text-subheading font-bold text-content-heading tracking-wide mb-2">
              {title}
            </h3>

            <p style={lang === 'ar' ? {lineHeight: "2rem"} : {lineHeight: "1.7rem"}} className="text-content-body text-base tracking-wide mb-4 leading-normal">
              {description}
            </p>
          </figcaption>
          <div className="mt-auto">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${ctaText} for ${title} (opens in new tab)`}
              className="inline-block w-full bg-gold text-center font-bold tracking-wide text-caption py-3 px-8 hover:bg-gold-light text-gray-900 rounded-lg transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
            >
              {ctaText}
            </a>
          </div>
        </div>
      </figure>
    </article>
  );
}
