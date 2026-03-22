import Image from "next/image";
import { ArrowRight } from "lucide-react";
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
  const ctaText = pd.cta[lang];

  return (
    <article className="rounded-xl overflow-hidden">
      <div className="relative">
        <Image
          src={project.screenshot}
          alt={`${t.a11y.screenshotOf[lang]} ${title}`}
          className="w-full h-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
          <h3 className="absolute top-0 ltr:left-0 rtl:right-0 inline-flex items-center bg-black/30 backdrop-blur-sm text-white text-xs md:text-sm font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border border-white/10" style={lang === "en" ? { borderBottomLeftRadius: "0", borderTopRightRadius: "0" } : { borderBottomRightRadius: "0", borderTopLeftRadius: "0" }}>
            {title}
          </h3>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener"
            aria-label={`${ctaText} for ${title} (opens in new tab)`}
            className="absolute bottom-4 ltr:left-4 rtl:right-4 inline-flex items-center gap-1 shrink-0 border border-white/30 bg-gold/10 backdrop-blur-sm text-white text-sm font-medium h-8 px-2.5 rounded-md hover:bg-white/20 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
          >
            {ctaText}
            <ArrowRight className="size-3.5 rtl:rotate-180" aria-hidden />
          </a>
      </div>
    </article>
  );
}
