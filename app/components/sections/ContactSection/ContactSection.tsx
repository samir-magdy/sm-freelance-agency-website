"use client";

import { useEffect, useState } from "react";
import { CircleCheckBig } from "lucide-react";
import WhatsAppIcon from "@/app/components/utils/WhatsAppIcon";
import contactSection from "@/app/data/translations/contactSection";
import { SOCIAL_LINKS } from "@/app/constants";
import { QUOTE_OPEN_EVENT } from "@/app/components/ui/QuoteModal";
import { isValidEmail, isValidName } from "@/lib/contactValidation";
import type { Lang } from "@/app/types";

interface ContactSectionProps {
  lang: Lang;
}

const EMPTY_FORM = { name: "", email: "", message: "" };
type FormErrors = Partial<Record<keyof typeof EMPTY_FORM, boolean>>;
type SubmitStatus = "idle" | "loading" | "success" | "error" | "rateLimit";

export default function ContactSection({ lang }: ContactSectionProps) {
  const isRtl = lang === "ar";
  const t = contactSection;

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const loading = status === "loading";
  const submitted = status === "success";

  // ── Submission — wired the same way as QuoteModal: validate client-side,
  // POST to an API route that sends the message via Resend, and drive the
  // same idle/loading/success/error/rateLimit status states. ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: FormErrors = {
      name: !isValidName(form.name.trim()),
      email: !isValidEmail(form.email.trim()),
      message: form.message.trim() === "",
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });
      if (!res.ok) {
        setStatus(res.status === 429 ? "rateLimit" : "error");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  // Auto-dismiss the success message back to a blank form after a few seconds.
  useEffect(() => {
    if (status !== "success") return;
    const id = setTimeout(() => {
      setForm(EMPTY_FORM);
      setErrors({});
      setStatus("idle");
    }, 4000);
    return () => clearTimeout(id);
  }, [status]);

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="pt-4 pb-12 sm:pb-28 xl:pb-14 px-4"
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
          <p className="reveal-element text-center max-w-lg mx-auto text-content-muted text-[clamp(1.2rem,2vw,1.6rem)]">
            {contactSection.subheading[lang]}
          </p>
        </div>

        <div className="reveal-element max-w-xl mx-auto flex flex-col xl:flex-row gap-3.5 justify-center">
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-600/85 hover:bg-green-600/95 transition-colors duration-300 py-4 px-8 text-content-white/85 hover:text-content-heading flex items-center justify-center gap-2 rounded-xl font-bold text-base"
          >
            <WhatsAppIcon className="size-5" fill="currentColor" />
            {contactSection.whatsappCta[lang]}
          </a>

          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(QUOTE_OPEN_EVENT))}
            className="cta-primary flex-1 cursor-pointer py-4 px-8 rounded-xl text-background font-bold text-base"
          >
            {contactSection.questionnaireCta[lang]}
          </button>
        </div>

        <div className="reveal-element mt-10">
          <div className="flex items-center gap-4 mb-7" aria-hidden={submitted}>
            <div className="flex-1 border-t border-border-subtle/60" />
            <span className="shrink-0 text-content-muted text-sm font-semibold uppercase tracking-widest">
              {t.formHeading[lang]}
            </span>
            <div className="flex-1 border-t border-border-subtle/60" />
          </div>

          {submitted ? (
            <div className="flex flex-col items-center gap-3 text-center py-2 min-h-52 justify-center">
              <CircleCheckBig className="size-10 text-gold" aria-hidden />
              <p className="text-content-body text-base">{t.successBody[lang]}</p>
              <p className="text-content-muted text-sm">
                {t.successWhatsapp[lang]}{" "}
                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold underline underline-offset-2 hover:text-gold-light"
                >
                  {t.whatsappCta[lang]}
                </a>
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="w-full sm:w-5/6 mx-auto flex flex-col gap-4"
            >
              <div>
                <input
                  aria-label={t.namePlaceholder[lang]}
                  placeholder={t.namePlaceholder[lang]}
                  value={form.name}
                  disabled={loading}
                  maxLength={30}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className={`h-13 w-full px-4 rounded-lg bg-surface-low/20 text-base text-content-heading placeholder:text-content-muted outline-none border transition-colors duration-200 disabled:opacity-60 ${
                    errors.name
                      ? "border-red-400/60"
                      : "border-border-subtle focus:border-border-strong"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1.5">
                    {t.nameRequired[lang]}
                  </p>
                )}
              </div>

              <div>
                <input
                  dir="ltr"
                  type="email"
                  aria-label={t.emailPlaceholder[lang]}
                  placeholder={t.emailPlaceholder[lang]}
                  value={form.email}
                  disabled={loading}
                  maxLength={50}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  className={`h-13 w-full px-4 rounded-lg bg-surface-low/20 text-base text-content-heading placeholder:text-content-muted outline-none border transition-colors duration-200 disabled:opacity-60 text-left rtl:text-right ${
                    errors.email
                      ? "border-red-400/60"
                      : "border-border-subtle focus:border-border-strong"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1.5">
                    {t.emailInvalid[lang]}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  aria-label={t.messagePlaceholder[lang]}
                  placeholder={t.messagePlaceholder[lang]}
                  value={form.message}
                  disabled={loading}
                  maxLength={500}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  className={`w-full field-sizing-content min-h-30 p-4 rounded-lg bg-surface-low/20 text-base text-content-heading placeholder:text-content-muted outline-none border transition-colors duration-200 resize-none disabled:opacity-60 ${
                    errors.message
                      ? "border-red-400/60"
                      : "border-border-subtle focus:border-border-strong"
                  }`}
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1.5">
                    {t.messageRequired[lang]}
                  </p>
                )}
              </div>

              {status === "error" && (
                <p className="text-red-400 text-sm text-center">
                  {t.error[lang]}
                </p>
              )}
              {status === "rateLimit" && (
                <p className="text-red-400 text-sm text-center">
                  {t.errorRateLimit[lang]}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="self-center w-full cursor-pointer px-8 py-2.5 rounded-xl text-[clamp(1rem,2.5vw,1.5rem)] font-semibold border border-border-subtle text-content-body transition-colors duration-200 hover:border-border-strong hover:text-content-heading disabled:cursor-not-allowed disabled:opacity-60 mt-1"
              >
                {loading ? t.sendingCta[lang] : t.submitCta[lang]}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
