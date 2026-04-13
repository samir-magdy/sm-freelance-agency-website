import translations from "@/app/data/translations";

export default function FAQSection({ lang }) {
  const t = translations.faqSection;
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <section id="FAQs" aria-labelledby="FAQs-heading" className="px-4" dir={dir}>
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="mb-6 md:mb-12 text-center">
          <h2
            id="FAQs-heading"
            className="font-bold text-heading mb-2"
          >
            {t.heading[lang]}
          </h2>
        </div>
          <article className="w-full">
          {t.items.map((item, i) => (
            <details
              key={i}
              name="faq"
              className="border-b border-border-subtle first:border-t-none px-2"
            >
              <summary
                className={`
                  flex items-center w-full py-6 md:py-7 cursor-pointer
                  list-none [&::-webkit-details-marker]:hidden
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border-strong focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-sm
                `}
              >
                <div className="relative flex-shrink-0 w-5 h-5 me-5">
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-0.5 rounded-full bg-icon [details[open]_&]:bg-icon" />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-3 rounded-full bg-icon [details[open]_&]:h-0 [details[open]_&]:opacity-0" />
                </div>

                <h3 className="text-content-body font-normal tracking-wide text-subheading">
                  {item.question[lang]}
                </h3>
              </summary>

              <div className="pb-6 md:pb-7 ps-10">
                <p className="text-base text-content-muted leading-relaxed">
                  {item.answer[lang]}
                </p>
              </div>
            </details>
            
          ))}
          </article>
      </div>
    </section>
  );
}
