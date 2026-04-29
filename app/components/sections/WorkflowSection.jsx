import translations from "@/app/data/translations";
import { Timeline } from "../ui/Timeline";

export default function WorkflowSection({ lang }) {
  const t = translations.workflowSection;

  const STEP_KEYS = ["discovery", "design", "development", "launch", "support"];
  const data = STEP_KEYS.map((key) => ({
    title: t.steps[key].title[lang],
    content: (
      <p className="text-content-body text-subheading px-2">
        {t.steps[key].description[lang]}
      </p>
    ),
  }));

  return (
    <section id="process" aria-labelledby="process-heading" className="">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-0 text-center">
          <h2
            id="process-heading"
            className="font-bold text-heading mb-2 rtl:mb-3"
          >
            {t.heading[lang]}<span className="sr-only">create a website - إنشاء موقع  إلكترونى مصر</span>
          </h2>
          <p className="text-center text-content-muted text-[clamp(1.2rem,2vw,1.6rem)]">
          {t.subheading[lang]}
        </p>
        </div>
      </div>
      <Timeline data={data} />
    </section>
  );
}
