import translations from "@/app/data/translations";
import type { Lang } from "@/app/data/translations";
import ContactForm from "../ui/ContactForm";

export default function ContactSection({ lang }: { lang: Lang }) {
  const t = translations;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="pt-20 pb-16 md:pb-36"
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-5 md:mb-0">
          <h2
            id="contact-heading"
            className="font-bold text-heading text-center mb-2"
          >
            {t.contactSection.heading[lang]}
          </h2>
          <p className="text-content-body text-center text-base md:text-subheading">
            {t.contactSection.subtitle[lang]}
          </p>
        </div>

        <div className="md:pt-12">
          <ContactForm lang={lang} />
        </div>
      </div>
    </section>
  );
}
