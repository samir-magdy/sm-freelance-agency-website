import translations from "@/app/data/translations";
import type { Lang } from "@/app/data/translations";
import { Timeline } from "../ui/Timeline";

export default function WorkflowSection({ lang }: { lang: Lang }) {
  const t = translations.workflowSection;

  const data = [
    {
      title: t.steps.discovery.title[lang],
      content: (
        <p className="text-content-body text-subheading px-2">
          {t.steps.discovery.description[lang]}
        </p>
      ),
    },
    {
      title: t.steps.design.title[lang],
      content: (
        <p className="text-content-body text-subheading px-2">
          {t.steps.design.description[lang]}
        </p>
      ),
    },
    {
      title: t.steps.development.title[lang],
      content: (
        <p className="text-content-body text-subheading px-2">
          {t.steps.development.description[lang]}
        </p>
      ),
    },
    {
      title: t.steps.launch.title[lang],
      content: (
        <p className="text-content-body text-subheading px-2">
          {t.steps.launch.description[lang]}
        </p>
      ),
    },
    {
      title: t.steps.support.title[lang],
      content: (
        <p className="text-content-body text-subheading px-2">
          {t.steps.support.description[lang]}
        </p>
      ),
    },
  ];

  return (
    <section id="how-it-works" aria-labelledby="workflow-heading" className="py-16 md:py-28">
      <div className="max-w-7xl mx-auto">
        <h2
          id="workflow-heading"
          className="font-bold text-heading text-center mb-2"
        >
          {t.heading[lang]}
        </h2>
        <p className="text-content-body text-center text-base md:text-subheading">
          {t.subtitle[lang]}
        </p>
      </div>
      <Timeline data={data} />
    </section>
  );
}
