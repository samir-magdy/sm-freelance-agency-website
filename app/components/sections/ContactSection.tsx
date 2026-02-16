"use client";

import ContactForm from "../ui/ContactForm";
import { useLanguage } from "@/app/contexts/LanguageContext";
import translations from "@/app/data/translations";

export default function ContactSection() {
  const { lang } = useLanguage();
  const t = translations;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="pt-20 pb-16 md:pb-24"
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-5 md:mb-0 px-6">
          <h2
            id="contact-heading"
            className="font-bold text-heading text-content-heading text-center mb-2"
          >
            {t.contactSection.heading[lang]}
          </h2>
          <p className="text-content-body text-center text-base md:text-heading">
            {t.contactSection.subtitle[lang]}
          </p>
        </div>

        <div className="pt-4 md:pt-16">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
