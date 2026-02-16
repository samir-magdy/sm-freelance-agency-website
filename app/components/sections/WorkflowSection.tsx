"use client";

import { useLanguage } from "@/app/contexts/LanguageContext";
import translations from "@/app/data/translations";
import { Timeline } from "../ui/Timeline";

export default function WorkflowSection() {
  const { lang } = useLanguage();
  const t = translations.workflowSection;

  const data = [
    {
      title: t.steps.discovery.title[lang],
      content: (
        <p className="text-content-body text-subheading">
          {t.steps.discovery.description[lang]}
        </p>
      ),
    },
    {
      title: t.steps.design.title[lang],
      content: (
        <p className="text-content-body text-subheading">
          {t.steps.design.description[lang]}
        </p>
      ),
    },
    {
      title: t.steps.development.title[lang],
      content: (
        <p className="text-content-body text-subheading">
          {t.steps.development.description[lang]}
        </p>
      ),
    },
    {
      title: t.steps.launch.title[lang],
      content: (
        <p className="text-content-body text-subheading">
          {t.steps.launch.description[lang]}
        </p>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:pt-28">
      <div className="max-w-7xl mx-auto px-6 mb-4 md:mb-0">
        <h2
          className="font-bold text-heading text-content-heading text-center mb-2"
        >
          {t.heading[lang]}
        </h2>
        <p className="text-content-body text-center text-base md:text-heading">
          {t.subtitle[lang]}
        </p>
      </div>
      <Timeline data={data} />
    </section>
  );
}
