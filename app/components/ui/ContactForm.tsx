"use client";

import { useState } from "react";
import translations from "@/app/data/translations";
import type { Lang } from "@/app/data/translations";

const INDUSTRY_OPTIONS = [
  { value: "restaurant", en: "Restaurant / Café", ar: "مطعم / كافيه" },
  { value: "retail", en: "Retail / E-commerce", ar: "تجارة / متجر إلكتروني" },
  { value: "healthcare", en: "Healthcare / Clinic", ar: "صحة / عيادة" },
  { value: "real-estate", en: "Real Estate", ar: "عقارات" },
  { value: "education", en: "Education / Training", ar: "تعليم / تدريب" },
  { value: "travel", en: "Travel / Tourism", ar: "سياحة / سفر" },
  { value: "fitness", en: "Fitness / Gym", ar: "لياقة بدنية / جيم" },
  { value: "fashion", en: "Fashion / Beauty", ar: "أزياء / تجميل" },
  { value: "services", en: "Services / Consulting", ar: "خدمات / استشارات" },
  { value: "other", en: "Other", ar: "أخرى" },
];

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

type ContactMethod = "whatsapp" | "phone-call" | "email" | "";

const TIME_OPTIONS = [
  { value: "10am-11am", en: "10 AM - 11 AM", ar: "١٠ ص - ١١ ص" },
  { value: "11am-12pm", en: "11 AM - 12 PM", ar: "١١ ص - ١٢ م" },
  { value: "12pm-1pm", en: "12 PM - 1 PM", ar: "١٢ م - ١ م" },
  { value: "1pm-2pm", en: "1 PM - 2 PM", ar: "١ م - ٢ م" },
  { value: "2pm-3pm", en: "2 PM - 3 PM", ar: "٢ م - ٣ م" },
  { value: "3pm-4pm", en: "3 PM - 4 PM", ar: "٣ م - ٤ م" },
  { value: "4pm-5pm", en: "4 PM - 5 PM", ar: "٤ م - ٥ م" },
  { value: "5pm-6pm", en: "5 PM - 6 PM", ar: "٥ م - ٦ م" },
  { value: "6pm-7pm", en: "6 PM - 7 PM", ar: "٦ م - ٧ م" },
  { value: "7pm-8pm", en: "7 PM - 8 PM", ar: "٧ م - ٨ م" },
];

export default function ContactForm({ lang }: { lang: Lang }) {
  const t = translations;

  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    contactMethod: "" as ContactMethod,
    phone: "",
    email: "",
    bestTime: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
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
        industry: "",
        contactMethod: "",
        phone: "",
        email: "",
        bestTime: "",
        message: "",
      });

      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      const code = error instanceof Error ? error.message : "server_error";
      const errorMsg =
        code === "rate_limit"
          ? t.form.errorRateLimit[lang]
          : t.form.errorGeneric[lang];
      setStatus("error");
      setErrorMessage(errorMsg);
      setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
      }, 5000);
    }
  };

  const selectBaseClass =
    "text-base w-full h-14 px-4 rounded-lg border border-transparent bg-surface-low focus:border-2 focus:border-border-strong outline-none appearance-none cursor-pointer";
  const selectClass = (value: string) =>
    `${selectBaseClass} ${value ? "text-content-heading" : "text-content-muted"}`;
  const labelClass =
    "block text-caption font-bold text-content-muted mb-2 ms-1";
  const chipClass = (selected: boolean) =>
    `bg-surface-low hover:bg-icon/20 flex-1 flex items-center justify-center px-4 py-[0.63rem] rounded-lg border cursor-pointer text-base ${
      selected
        ? "border-icon text-content-heading border-2"
        : "border-transparent text-content-muted"
    }`;

  return (
    <form
      className="text-start pt-2 relative"
      onSubmit={handleSubmit}
      aria-label={t.a11y.contactForm[lang]}
    >
      <fieldset className="border-none p-0 m-0">
        <legend className="sr-only">{t.form.legend[lang]}</legend>

        <div className="grid md:grid-cols-2 gap-4 md:gap-x-3">
          {/* Name */}
          <div>
            <label htmlFor="name" className={labelClass}>
              {t.form.name[lang]}{" "}
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

          {/* Industry */}
          <div>
            <label htmlFor="industry" className={labelClass}>
              {t.form.industry[lang]}{" "}
              <span className="text-warning opacity-90" aria-label="required">
                *
              </span>
            </label>
            <div className="relative">
              <select
                id="industry"
                required
                className={selectClass(formData.industry)}
                value={formData.industry}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, industry: e.target.value }))
                }
              >
                <option value="">{t.form.industryPlaceholder[lang]}</option>
                {INDUSTRY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt[lang]}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-content-muted">
                <ChevronDown />
              </div>
            </div>
          </div>

          {/* Contact method chips */}
          <div className="md:col-span-2">
            <p id="contact-method-label" className={labelClass}>
              {t.form.contactMethod[lang]}{" "}
              <span className="text-warning opacity-90" aria-label="required">
                *
              </span>
            </p>
            <div
              role="radiogroup"
              aria-labelledby="contact-method-label"
              className="flex flex-row gap-3"
            >
              {(
                [
                  { value: "whatsapp", label: t.form.whatsapp[lang] },
                  { value: "phone-call", label: t.form.phoneCall[lang] },
                  { value: "email", label: t.form.email[lang] },
                ] as const
              ).map(({ value, label }) => (
                <label
                  key={value}
                  className={chipClass(formData.contactMethod === value)}
                >
                  <input
                    type="radio"
                    name="contactMethod"
                    value={value}
                    required
                    checked={formData.contactMethod === value}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        contactMethod: value,
                        ...(value === "email"
                          ? { phone: "", bestTime: "" }
                          : { email: "" }),
                        ...(value !== "phone-call" && { bestTime: "" }),
                      }))
                    }
                    className="sr-only"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* Consolidated Phone Number Field - Instant Toggle */}
          {(formData.contactMethod === "whatsapp" ||
            formData.contactMethod === "phone-call") && (
            <div
              className={
                formData.contactMethod === "whatsapp"
                  ? "md:col-span-2"
                  : "col-span-1"
              }
            >
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
                className={`placeholder:text-content-muted text-base w-full h-14 px-4 rounded-lg border border-transparent bg-surface-low text-content-heading focus:border-2 focus:border-border-strong outline-none ${lang === "ar" ? "text-right" : "text-left"}`}
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            </div>
          )}

          {/* Best Time - Instant Toggle */}
          {formData.contactMethod === "phone-call" && (
            <div>
              <label htmlFor="bestTime" className={labelClass}>
                {t.form.bestTime[lang]}{" "}
                <span className="text-warning opacity-90" aria-label="required">
                  *
                </span>
              </label>
              <div className="relative">
                <select
                  id="bestTime"
                  required
                  className={selectClass(formData.bestTime)}
                  value={formData.bestTime}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      bestTime: e.target.value,
                    }))
                  }
                >
                  <option value="">{t.form.bestTimePlaceholder[lang]}</option>
                  {TIME_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt[lang]}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-content-muted">
                  <ChevronDown />
                </div>
              </div>
            </div>
          )}

          {/* Email - Instant Toggle */}
          {formData.contactMethod === "email" && (
            <div className="md:col-span-2">
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
          <div className="md:col-span-2">
            <label htmlFor="message" className={labelClass}>
              {t.form.message[lang]}
            </label>
            <textarea
              id="message"
              rows={3}
              placeholder={t.form.messagePlaceholder[lang]}
              className="resize-none placeholder:text-content-muted text-base w-full px-4 py-3 rounded-lg border border-transparent bg-surface-low text-content-heading focus:border-2 focus:border-border-strong outline-none"
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
            />
          </div>
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-4 w-full mx-auto block bg-gold tracking-wide font-bold text-base py-4 hover:bg-gold-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light text-gray-900 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? t.form.sending[lang] : t.form.submit[lang]}
      </button>

      {/* Success Message - Instant */}
      {status === "success" && (
        <div
          role="status"
          className="mt-5 md:absolute md:-bottom-20 md:left-0 md:right-0 md:mt-0 w-full text-base mx-auto py-4 rounded-lg border border-success/30 bg-success/20 backdrop-blur-sm px-2 md:px-8"
        >
          <p className="flex gap-1 justify-center text-success text-center font-medium md:font-bold">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 13L9 17L19 7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t.form.success[lang]}
          </p>
        </div>
      )}

      {/* Error Message - Instant */}
      {status === "error" && (
        <div
          role="alert"
          className="mt-5 md:absolute md:-bottom-20 md:left-0 md:right-0 md:mt-0 mx-auto py-4 rounded-lg border border-danger/30 bg-danger/20 backdrop-blur-sm w-full px-1"
        >
          <p className="text-danger text-center font-medium md:font-bold">
            {errorMessage}
          </p>
        </div>
      )}
    </form>
  );
}