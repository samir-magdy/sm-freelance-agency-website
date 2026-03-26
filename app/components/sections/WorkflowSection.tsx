import dynamic from "next/dynamic";
import translations from "@/app/data/translations";
import type { Lang } from "@/app/data/translations";

const Timeline = dynamic(() =>
  import("../ui/Timeline").then((mod) => mod.Timeline),
);

export default function WorkflowSection({ lang }: { lang: Lang }) {
  const t = translations.workflowSection;

  const STEP_KEYS = ["discovery", "design", "development", "launch", "support"] as const;
  const data = STEP_KEYS.map((key) => ({
    title: t.steps[key].title[lang],
    content: (
      <p className="text-content-body text-subheading px-2">
        {t.steps[key].description[lang]}
      </p>
    ),
  }));

  return (
    <section id="how-it-works" aria-labelledby="workflow-heading" className="py-20 md:py-36">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12 text-center">
          <h2
            id="workflow-heading"
            className="font-bold text-heading"
          >
            {t.heading[lang]}
          </h2>
        </div>
      </div>
      <Timeline data={data} />
    </section>
  );
}
