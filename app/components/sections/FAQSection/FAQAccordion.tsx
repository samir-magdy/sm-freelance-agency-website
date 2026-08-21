import type { Lang, Localized } from "@/app/types";
import styles from "./FAQSection.module.css";

interface FAQAccordionItem {
  question: Localized;
  answer: Localized;
}

interface FAQAccordionProps {
  items: FAQAccordionItem[];
  lang: Lang;
  name?: string;
}

export default function FAQAccordion({ items, lang, name = "faq" }: FAQAccordionProps) {
  return (
    <div className={`${styles.accordion} w-full`}>
      {items.map((item, i) => (
        <details
          key={i}
          name={name}
          className="reveal-element border-b border-border-subtle px-2"
        >
          <summary
            className={`
              flex items-center w-full py-6 md:py-7 cursor-pointer
              list-none [&::-webkit-details-marker]:hidden
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border-strong focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-sm
            `}
          >
            <span className="relative inline-block shrink-0 w-5 h-5 me-5" aria-hidden="true">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-0.5 rounded-full bg-icon" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-3 rounded-full bg-icon transition-transform duration-[700ms] sm:duration-[420ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] [details[open]_&]:rotate-90" />
            </span>

            <h3 className="text-content-heading font-normal tracking-wide text-base sm:text-subheading">
              {item.question[lang]}
            </h3>
          </summary>

          <div className={styles.collapsible}>
            <div className={styles.collapsibleInner}>
              <div className="pb-6 md:pb-7 ps-10">
                <p
                  className="html-content text-base sm:text-xl text-content-muted/95 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.answer[lang] }}
                />
              </div>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
