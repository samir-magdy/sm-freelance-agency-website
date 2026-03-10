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
  { value: "11am-12pm", en: "11 AM - 12 PM", ar: "١١ ص - ١٢ م" },
  { value: "12pm-1pm", en: "12 PM - 1 PM", ar: "١٢ م - ١ م" },
  { value: "1pm-2pm", en: "1 PM - 2 PM", ar: "١ م - ٢ م" },
  { value: "2pm-3pm", en: "2 PM - 3 PM", ar: "٢ م - ٣ م" },
  { value: "3pm-4pm", en: "3 PM - 4 PM", ar: "٣ م - ٤ م" },
  { value: "4pm-5pm", en: "4 PM - 5 PM", ar: "٤ م - ٥ م" },
  { value: "5pm-6pm", en: "5 PM - 6 PM", ar: "٥ م - ٦ م" },
  { value: "6pm-7pm", en: "6 PM - 7 PM", ar: "٦ م - ٧ م" },
];

export default function ContactForm({ lang }: { lang: Lang }) {
  const t = translations;

  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    contactMethod: "" as ContactMethod,
    phone: "",
    email: "",
    bestDate: new Date().toISOString().split("T")[0],
    bestTime: "",
    message: "",
  });
  const [dateTouched, setDateTouched] = useState(false);
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
        bestDate: "",
        bestTime: "",
        message: "",
      });

      setTimeout(() => setStatus("idle"), 4000);
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
      }, 3000);
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
      className="text-start relative pb-4 lg:min-h-[575px]"
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
                          ? { phone: "", bestDate: "", bestTime: "" }
                          : { email: "" }),
                        ...(value !== "phone-call" && { bestDate: "", bestTime: "" }),
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

          {/* Best Date + Time - Instant Toggle */}
          {formData.contactMethod === "phone-call" && (
            <div className="grid grid-cols-2 gap-3">
              {/* Date */}
              <div>
                <label htmlFor="bestDate" className={labelClass}>
                  {t.form.bestDate[lang]}{" "}
                  <span className="text-warning opacity-90" aria-label="required">
                    *
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="bestDate"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className={`${selectBaseClass} ${dateTouched ? "text-content-heading" : "text-content-muted"} cursor-text`}
                    value={formData.bestDate}
                    onChange={(e) => {
                      setDateTouched(true);
                      setFormData((prev) => ({ ...prev, bestDate: e.target.value }));
                    }}
                  />
                  <div
                    className="absolute inset-y-0 end-0 w-10 cursor-pointer"
                    onClick={() => (document.getElementById("bestDate") as HTMLInputElement)?.showPicker?.()}
                    aria-hidden="true"
                  />
                </div>
              </div>
              {/* Time */}
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
                      setFormData((prev) => ({ ...prev, bestTime: e.target.value }))
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
              {t.form.message[lang]}{" "}
              <span className="text-content-body font-light">({t.form.messageOptional[lang]})</span>
            </label>
            <textarea
              id="message"
              rows={2}
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
        disabled={status !== "idle"}
        aria-live="polite"
        className={`mt-4 w-full mx-auto block tracking-wide font-bold text-base py-4 rounded-lg disabled:cursor-not-allowed transition-[background-color,border-color,color,opacity] duration-300 ${
          status === "success"
            ? "btn-success-entrance bg-success/50 text-content-heading md:text-[1.3rem]"
            : status === "error"
              ? "bg-danger/50 text-base md:text-[1.3rem] text-content-heading"
              : "bg-gold hover:bg-gold-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light text-gray-900 disabled:opacity-50"
        }`}
      >
        <span key={status === "loading" ? "default" : status} className="btn-label">
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
    </form>
  );
}