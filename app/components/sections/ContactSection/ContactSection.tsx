"use client";

import { useState, useEffect, useRef } from "react";
import WhatsAppIcon from "@/app/components/utils/WhatsAppIcon";
import contactSection from "@/app/data/translations/contactSection";
import a11y from "@/app/data/translations/a11y";
import { SOCIAL_LINKS } from "@/app/constants";
import type { Lang } from "@/app/types";
import type { ContactMethod, ContactPayload } from "@/app/api/contact/route";

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  contactMethod: ContactMethod | "";
  phone: string;
  email: string;
  message: string;
}

const EMPTY_FORM: FormData = {
  name: "",
  contactMethod: "",
  phone: "",
  email: "",
  message: "",
};

function ChevronDown() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

interface ContactSectionProps {
  lang: Lang;
}

export default function ContactSection({ lang }: ContactSectionProps) {
  const translations = { contactSection, a11y };
  const isRtl = lang === "ar";

  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const payload: ContactPayload = formData;
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(
          response.status === 429 ? "rate_limit" : "server_error",
        );
      }

      setStatus("success");
      setFormData(EMPTY_FORM);

      statusTimerRef.current = setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      const code = error instanceof Error ? error.message : "server_error";
      const errorMsg =
        code === "rate_limit"
          ? translations.contactSection.form.errorRateLimit[lang]
          : translations.contactSection.form.errorGeneric[lang];
      setStatus("error");
      setErrorMessage(errorMsg);
      statusTimerRef.current = setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
      }, 3000);
    }
  };

  const selectBaseClass =
    "text-base w-full h-14 px-4 rounded-lg border border-transparent bg-surface-low focus:border-2 focus:border-border-strong outline-none appearance-none cursor-pointer";
  const selectClass = (value: string) =>
    `${selectBaseClass} ${value ? "text-content-heading" : "text-content-muted"}`;
  const labelClass =
    "block text-base font-bold text-content-muted mb-2 ms-1";

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
            {translations.contactSection.heading[lang]}
          </h2>
          <p className="reveal-element text-center text-content-muted text-[clamp(1.2rem,2vw,1.6rem)]">
            {translations.contactSection.subheading[lang]}
          </p>
        </div>

        <form
          className="text-start relative sm:min-h-140"
          onSubmit={handleSubmit}
          aria-label={translations.a11y.contactForm[lang]}
        >
          <fieldset className="border-none p-0 m-0">
            <legend className="sr-only">{translations.contactSection.form.legend[lang]}</legend>

            <div className="reveal-element grid grid-cols-2 gap-4 md:gap-x-3">
              <div className="col-span-1">
                <label htmlFor="name" className={labelClass}>
                  {translations.contactSection.form.name[lang]}
                  <span aria-hidden="true">&nbsp;*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder={translations.contactSection.form.namePlaceholder[lang]}
                  className="placeholder:text-content-muted text-base w-full h-14 px-4 rounded-lg border border-transparent bg-surface-low text-content-heading focus:border-2 focus:border-border-strong outline-none"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              <div>
                <label htmlFor="contactMethod" className={labelClass}>
                  {translations.contactSection.form.contactMethod[lang]}{" "}
                  <span aria-hidden="true">*</span>
                </label>
                <div className="relative">
                  <select
                    id="contactMethod"
                    required
                    className={selectClass(formData.contactMethod)}
                    value={formData.contactMethod}
                    onChange={(e) => {
                      const value = e.target.value as ContactMethod | "";
                      setFormData((prev) => ({
                        ...prev,
                        contactMethod: value,
                        ...(value === "email"
                          ? { phone: "" }
                          : { email: "" }),
                      }));
                    }}
                  >
                    <option value="">
                      {translations.contactSection.form.contactMethodPlaceholder[lang]}
                    </option>
                    <option value="whatsapp">{translations.contactSection.form.whatsapp[lang]}</option>
                    <option value="phone-call">
                      {translations.contactSection.form.phoneCall[lang]}
                    </option>
                    <option value="email">{translations.contactSection.form.contactMethodEmail[lang]}</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 inset-e-4 flex items-center text-content-muted">
                    <ChevronDown />
                  </div>
                </div>
              </div>

              {(formData.contactMethod === "whatsapp" ||
                formData.contactMethod === "phone-call") && (
                <div className="col-span-2">
                  <label htmlFor="phone" className={labelClass}>
                    {translations.contactSection.form.phone[lang]}{" "}
                    <span aria-hidden="true">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    dir="ltr"
                    required
                    placeholder={translations.contactSection.form.phonePlaceholder[lang]}
                    pattern="^01[0125]\d{8}$"
                    title="Egyptian mobile number"
                    className={`placeholder:text-content-muted text-base w-full h-14 px-4 rounded-lg border border-transparent bg-surface-low text-content-heading focus:border-2 focus:border-border-strong outline-none ${
                      lang === "ar" ? "text-right" : "text-left"
                    }`}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                </div>
              )}

              {formData.contactMethod === "email" && (
                <div className="col-span-2">
                  <label htmlFor="email" className={labelClass}>
                    {translations.contactSection.form.emailAddress[lang]}{" "}
                    <span aria-hidden="true">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder={translations.contactSection.form.emailPlaceholder[lang]}
                    className="placeholder:text-content-muted text-base w-full h-14 px-4 rounded-lg border border-transparent bg-surface-low text-content-heading focus:border-2 focus:border-border-strong outline-none"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
              )}

              <div className="col-span-2">
                <label htmlFor="message" className={labelClass}>
                  {translations.contactSection.form.message[lang]}{" "}
                  <span className="text-content-muted font-normal">
                    ({translations.contactSection.form.messageOptional[lang]})
                  </span>
                </label>
                <textarea
                  id="message"
                  rows={2}
                  placeholder={translations.contactSection.form.messagePlaceholder[lang]}
                  className="resize-none leading-relaxed placeholder:text-content-muted text-base w-full px-4 py-3 rounded-lg border-2 border-transparent bg-surface-low text-content-heading focus:border-border-strong outline-none"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </fieldset>

          <span role="status" aria-live="polite" className="sr-only">
            {status === "loading"
              ? translations.contactSection.form.sending[lang]
              : status === "success"
                ? translations.contactSection.form.success[lang]
                : status === "error"
                  ? errorMessage
                  : ""}
          </span>

          <button
            type="submit"
            disabled={status !== "idle"}
            className={`reveal-element z-20 mt-4 w-full mx-auto block tracking-wide font-bold text-base py-4 rounded-lg disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden ${
              status === "success"
                ? "mt-3.5 border border-green-500/75 bg-green-500/50 transition-colors duration-200 py-3 px-6 text-content-body flex items-center justify-center gap-2"
                : status === "error"
                  ? "mt-3.5 border border-red-500/75 bg-red-500/50 transition-colors duration-200 py-3 px-6 text-content-body flex items-center justify-center gap-2"
                  : "cta-primary cursor-pointer bg-linear-to-b from-gold to-gold-dark text-background disabled:opacity-50"
            }`}
          >
            <span key={status === "loading" ? "default" : status}>
              {status === "loading" ? (
                translations.contactSection.form.sending[lang]
              ) : status === "success" ? (
                <span className="flex items-center justify-center gap-1 text-base">
                  {translations.contactSection.form.success[lang]}
                </span>
              ) : status === "error" ? (
                errorMessage
              ) : (
                translations.contactSection.form.submit[lang]
              )}
            </span>
          </button>

          <div className="reveal-element">
            <div className="flex items-center gap-3 mt-4">
              <div aria-hidden="true" className="flex-1 h-px bg-border-subtle" />
              <span className="text-content-muted text-base font-bold">
                {translations.contactSection.form.orDivider[lang]}
              </span>
              <div aria-hidden="true" className="flex-1 h-px bg-border-subtle" />
            </div>

            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3.5 border w-full border-green-500/40 bg-green-500/60 hover:bg-green-500/65 transition-colors duration-200 py-4 px-10 text-content-heading flex items-center justify-center mx-auto gap-2 rounded-lg font-bold text-base"
            >
              <WhatsAppIcon className="size-5" fill="currentColor" />
              {translations.contactSection.form.whatsappCta[lang]}
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
