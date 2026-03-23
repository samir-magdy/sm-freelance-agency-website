import dynamic from "next/dynamic";
import { projectsStructuredData } from "@/app/data/projects";
import type { Lang } from "@/app/data/translations";

const PortfolioShowcase = dynamic(() => import("../ui/PortfolioShowcase"));

export default function ProjectsSection({ lang }: { lang: Lang }) {
  const isRtl = lang === "ar";

  return (
    <section
      id="portfolio"
      className="py-24 md:py-36"
      aria-labelledby="portfolio-heading"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsStructuredData) }}
      />
      <PortfolioShowcase lang={lang} />
    </section>
  );
}
