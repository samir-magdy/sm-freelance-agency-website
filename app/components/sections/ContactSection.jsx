import dynamic from "next/dynamic";
import translations from "@/app/data/translations";
import type { Lang } from "@/app/data/translations";

const ContactForm = dynamic(() => import("../ui/ContactForm"));

export default function ContactSection({ lang }: { lang: Lang }) {
  const t = translations;
  const isRtl = lang === "ar";

  const formStrings = {
    legend: t.form.legend[lang],
    name: t.form.name[lang],
    namePlaceholder: t.form.namePlaceholder[lang],
    phone: t.form.phone[lang],
    phonePlaceholder: t.form.phonePlaceholder[lang],
    industry: t.form.industry[lang],
    industryPlaceholder: t.form.industryPlaceholder[lang],
    contactMethod: t.form.contactMethod[lang],
    whatsapp: t.form.whatsapp[lang],
    phoneCall: t.form.phoneCall[lang],
    email: t.form.email[lang],
    emailAddress: t.form.emailAddress[lang],
    emailPlaceholder: t.form.emailPlaceholder[lang],
    bestDate: t.form.bestDate[lang],
    bestTime: t.form.bestTime[lang],
    bestTimePlaceholder: t.form.bestTimePlaceholder[lang],
    message: t.form.message[lang],
    messageOptional: t.form.messageOptional[lang],
    messagePlaceholder: t.form.messagePlaceholder[lang],
    submit: t.form.submit[lang],
    sending: t.form.sending[lang],
    success: t.form.success[lang],
    errorRateLimit: t.form.errorRateLimit[lang],
    errorGeneric: t.form.errorGeneric[lang],
    contactFormA11y: t.a11y.contactForm[lang],
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="pt-20 pb-4 md:pt-32 md:pb-0 px-4"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-4 md:mb-8">
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
        <ContactForm lang={lang} strings={formStrings} />
      </div>
    </section>
  );
}
