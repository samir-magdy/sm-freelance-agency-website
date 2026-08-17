"use client";

import WhatsAppIcon from "@/app/components/utils/WhatsAppIcon";
import contactSection from "@/app/data/translations/contactSection";
import { SOCIAL_LINKS } from "@/app/constants";
import { QUOTE_OPEN_EVENT } from "@/app/components/ui/QuoteModal";
import type { Lang } from "@/app/types";

interface ContactSectionProps {
  lang: Lang;
}

export default function ContactSection({ lang }: ContactSectionProps) {
  const isRtl = lang === "ar";

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="pt-4 pb-12 sm:pb-8 px-4"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2
            id="contact-heading"
            className="reveal-element font-bold text-heading text-center mb-2"
          >
            {contactSection.heading[lang]}
          </h2>
          <p className="reveal-element text-center text-content-muted text-[clamp(1.2rem,2vw,1.6rem)]">
            {contactSection.subheading[lang]}
          </p>
        </div>

        <div className="reveal-element flex flex-col sm:flex-row gap-3.5 justify-center">
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 border border-green-500/40 bg-green-500/60 hover:bg-green-500/65 transition-colors duration-200 py-4 px-8 text-content-heading flex items-center justify-center gap-2 rounded-lg font-bold text-base"
          >
            <WhatsAppIcon className="size-5" fill="currentColor" />
            {contactSection.whatsappCta[lang]}
          </a>

          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(QUOTE_OPEN_EVENT))}
            className="cta-primary flex-1 cursor-pointer py-4 px-8 rounded-lg text-background font-bold text-base"
          >
            {contactSection.questionnaireCta[lang]}
          </button>
        </div>
      </div>
    </section>
  );
}
