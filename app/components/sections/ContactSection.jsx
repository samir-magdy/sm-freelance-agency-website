"use client";

import { useState, useEffect, useRef } from "react";
import { WhatsAppIcon } from "@/app/components/ui/SocialIcons";
import translations from "@/app/data/translations";

const ChevronDown = () => (
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

export default function ContactSection({ lang }) {
  const t = translations;
  const isRtl = lang === "ar";

  const [formData, setFormData] = useState({
    name: "",
    contactMethod: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const statusTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(
          response.status === 429 ? "rate_limit" : "server_error",
        );
      }

      setStatus("success");
      setFormData({
        name: "",
        contactMethod: "",
        phone: "",
        email: "",
        message: "",
      });

      statusTimerRef.current = setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      const code = error instanceof Error ? error.message : "server_error";
      const errorMsg =
        code === "rate_limit"
          ? t.form.errorRateLimit[lang]
          : t.form.errorGeneric[lang];
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
  const selectClass = (value) =>
    `${selectBaseClass} ${value ? "text-content-heading" : "text-content-muted"}`;
  const labelClass =
    "block text-caption font-bold text-content-muted mb-2 ms-1";

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="pb-12 sm:pb-32 px-4"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="reveal">
        <div className="max-w-4xl mx-auto">
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

          <form
            className="text-start relative"
            onSubmit={handleSubmit}
            aria-label={t.a11y.contactForm[lang]}
          >
            <fieldset className="border-none p-0 m-0">
              <legend className="sr-only">{t.form.legend[lang]}</legend>

              <div className="grid grid-cols-2 gap-4 md:gap-x-3">
                {/* Name */}
                <div className="col-span-1">
                  <label htmlFor="name" className={labelClass}>
                    {t.form.name[lang]}
                    <span className="text-warning opacity-90" aria-label="required">
                      *
                    </span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder={t.form.namePlaceholder[lang]}
                    className="placeholder:text-content-muted text-base w-full h-14 px-4 rounded-lg border border-transparent bg-surface-low text-content-heading focus:border-2 focus:border-border-strong outline-none"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>

                {/* Contact method dropdown */}
                <div>
                  <label htmlFor="contactMethod" className={labelClass}>
                    {t.form.contactMethod[lang]}{" "}
                    <span className="text-warning opacity-90" aria-label="required">
                      *
                    </span>
                  </label>
                  <div className="relative">
                    <select
                      id="contactMethod"
                      required
                      className={selectClass(formData.contactMethod)}
                      value={formData.contactMethod}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          contactMethod: value,
                          ...(value === "email" ? { phone: "" } : { email: "" }),
                        }));
                      }}
                    >
                      <option value="">{t.form.contactMethodPlaceholder[lang]}</option>
                      <option value="whatsapp">{t.form.whatsapp[lang]}</option>
                      <option value="phone-call">{t.form.phoneCall[lang]}</option>
                      <option value="email">{t.form.email[lang]}</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-content-muted">
                      <ChevronDown />
                    </div>
                  </div>
                </div>

                {/* Phone — shown for whatsapp / phone-call */}
                {(formData.contactMethod === "whatsapp" ||
                  formData.contactMethod === "phone-call") && (
                  <div className="col-span-2">
                    <label htmlFor="phone" className={labelClass}>
                      {t.form.phone[lang]}{" "}
                      <span className="text-warning opacity-90" aria-label="required">
                        *
                      </span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      dir="ltr"
                      required
                      placeholder={t.form.phonePlaceholder[lang]}
                      pattern="^01[0125]\d{8}$"
                      title="Egyptian mobile number"
                      className={`placeholder:text-content-muted text-base w-full h-14 px-4 rounded-lg border border-transparent bg-surface-low text-content-heading focus:border-2 focus:border-border-strong outline-none ${
                        lang === "ar" ? "text-right" : "text-left"
                      }`}
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, phone: e.target.value }))
                      }
                    />
                  </div>
                )}

                {/* Email — shown for email method */}
                {formData.contactMethod === "email" && (
                  <div className="col-span-2">
                    <label htmlFor="email" className={labelClass}>
                      {t.form.emailAddress[lang]}{" "}
                      <span className="text-warning opacity-90" aria-label="required">
                        *
                      </span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder={t.form.emailPlaceholder[lang]}
                      className="placeholder:text-content-muted text-base w-full h-14 px-4 rounded-lg border border-transparent bg-surface-low text-content-heading focus:border-2 focus:border-border-strong outline-none"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                      }
                    />
                  </div>
                )}

                {/* Optional message */}
                <div className="col-span-2">
                  <label htmlFor="message" className={labelClass}>
                    {t.form.message[lang]}{" "}
                    <span className="text-content-muted font-normal">
                      ({t.form.messageOptional[lang]})
                    </span>
                  </label>
                  <textarea
                    id="message"
                    rows={2}
                    placeholder={t.form.messagePlaceholder[lang]}
                    className="resize-none placeholder:text-content-muted text-base w-full px-4 py-3 rounded-lg border-2 border-transparent bg-surface-low text-content-heading focus:border-2 focus:border-border-strong outline-none"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, message: e.target.value }))
                    }
                  />
                </div>
              </div>
            </fieldset>

            <span role="status" aria-live="polite" className="sr-only">
              {status === "loading" ? t.form.sending[lang] : status === "success" ? t.form.success[lang] : status === "error" ? errorMessage : ""}
            </span>

            <button
              type="submit"
              disabled={status !== "idle"}
              className={`z-20 mt-4 w-full mx-auto block tracking-wide font-bold text-base py-4 rounded-lg disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden ${
                status === "success"
                  ? "mt-3.5 w-full border border-green-500/40 bg-green-500/20 transition-colors duration-200 py-3 px-6 text-content-body flex items-center justify-center gap-2 rounded-lg font-bold text-base"
                  : status === "error"
                    ? "mt-3.5 w-full border border-danger/40 bg-danger/20 transition-colors duration-200 py-3 px-6 text-content-body flex items-center justify-center gap-2 rounded-lg font-bold text-base"
                    : "cta-primary cursor-pointer bg-linear-to-b from-gold to-gold-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light text-gray-900 disabled:opacity-50"
              }`}
            >
              <span
                key={status === "loading" ? "default" : status}
                className="btn-label"
              >
                {status === "loading" ? (
                  t.form.sending[lang]
                ) : status === "success" ? (
                  <span className="flex items-center justify-center gap-1">
                    {t.form.success[lang]}
                  </span>
                ) : status === "error" ? (
                  errorMessage
                ) : (
                  t.form.submit[lang]
                )}
              </span>
            </button>

            <div className="flex items-center gap-3 mt-4">
              <span className="flex-1 h-px bg-border-subtle" />
              <span className="text-content-muted text-caption font-medium">
                {t.form.orWhatsapp[lang]}
              </span>
              <span className="flex-1 h-px bg-border-subtle" />
            </div>

            <a
              href="https://wa.me/201274613331"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3.5 w-full border border-green-500/40 bg-green-500/20 hover:bg-green-500/40 transition-colors duration-200 py-4 px-6 text-content-body flex items-center justify-center gap-2 rounded-lg font-bold text-base"
            >
              <WhatsAppIcon className="size-5" fill="currentColor" />
              {t.form.chatInstead[lang]}
            </a>
          </form>
        </div>
      </div>
    </section>
  );
}
