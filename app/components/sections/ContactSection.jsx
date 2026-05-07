
import ContactForm from "@/app/components/ui/ContactForm";
import translations from "@/app/data/translations";
import { RevealSection } from "@/app/components/ui/RevealSection";

export default function ContactSection({ lang }) {
  const t = translations;
  const isRtl = lang === "ar";

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="pb-12 sm:pb-32 px-4"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <RevealSection>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 md:mb-12">
          <h2
            id="contact-heading"
            className="font-bold text-heading text-center mb-2"
          >
            {t.contactSection.heading[lang]}
          </h2>
          <p className="text-center text-content-muted text-[clamp(1.2rem,2vw,1.6rem)]">
            {t.contactSection.subheading[lang]}
          </p>
        </div>
        <ContactForm lang={lang} />
      </div>
      </RevealSection>
    </section>
  );
}
