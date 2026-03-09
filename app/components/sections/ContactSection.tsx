import translations from "@/app/data/translations";
import type { Lang } from "@/app/data/translations";
import ContactForm from "../ui/ContactForm";

export default function ContactSection({ lang }: { lang: Lang }) {
  const t = translations;
  const isRtl = lang === "ar";

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-16 md:py-28 px-4"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-2 md:mb-8">
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
        <ContactForm lang={lang} />
      </div>
    </section>
  );
}
