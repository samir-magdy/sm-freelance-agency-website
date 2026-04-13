
import ContactForm from "@/app/components/ui/ContactForm";
import translations from "@/app/data/translations";


export default function ContactSection({ lang }) {
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
    contactMethodPlaceholder: t.form.contactMethodPlaceholder[lang],
    whatsapp: t.form.whatsapp[lang],
    phoneCall: t.form.phoneCall[lang],
    email: t.form.email[lang],
    emailAddress: t.form.emailAddress[lang],
    emailPlaceholder: t.form.emailPlaceholder[lang],
    message: t.form.message[lang],
    messageOptional: t.form.messageOptional[lang],
    messagePlaceholder: t.form.messagePlaceholder[lang],
    submit: t.form.submit[lang],
    sending: t.form.sending[lang],
    success: t.form.success[lang],
    errorRateLimit: t.form.errorRateLimit[lang],
    errorGeneric: t.form.errorGeneric[lang],
    contactFormA11y: t.a11y.contactForm[lang],
    orWhatsapp: t.form.orWhatsapp[lang],
    chatInstead: t.form.chatInstead[lang],
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="pb-2 sm:pb-12 px-4"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-3xl mx-auto">
        <div className="mb-4 md:mb-12">
          <h2
            id="contact-heading"
            className="font-bold text-heading text-center mb-2"
          >
            {t.contactSection.heading[lang]}
          </h2>
          <p className="text-center text-content-muted">
            {t.contactSection.subheading[lang]}
          </p>
        </div>
        <ContactForm lang={lang} strings={formStrings} />
      </div>
    </section>
  );
}
