"use client";

import { useState, useEffect, useRef } from "react";
import WhatsAppIcon from "./WhatsAppIcon";

const INDUSTRY_OPTIONS = [
  {
    value: "restaurant",
    en: "Restaurant / Caf\u00e9",
    ar: "\u0645\u0637\u0639\u0645 / \u0643\u0627\u0641\u064a\u0647",
  },
  {
    value: "retail",
    en: "Retail / E-commerce",
    ar: "\u062a\u062c\u0627\u0631\u0629 / \u0645\u062a\u062c\u0631 \u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a",
  },
  {
    value: "healthcare",
    en: "Healthcare / Clinic",
    ar: "\u0635\u062d\u0629 / \u0639\u064a\u0627\u062f\u0629",
  },
  {
    value: "real-estate",
    en: "Real Estate",
    ar: "\u0639\u0642\u0627\u0631\u0627\u062a",
  },
  {
    value: "education",
    en: "Education / Training",
    ar: "\u062a\u0639\u0644\u064a\u0645 / \u062a\u062f\u0631\u064a\u0628",
  },
  {
    value: "travel",
    en: "Travel / Tourism",
    ar: "\u0633\u064a\u0627\u062d\u0629 / \u0633\u0641\u0631",
  },
  {
    value: "fitness",
    en: "Fitness / Gym",
    ar: "\u0644\u064a\u0627\u0642\u0629 \u0628\u062f\u0646\u064a\u0629 / \u062c\u064a\u0645",
  },
  {
    value: "fashion",
    en: "Fashion / Beauty",
    ar: "\u0623\u0632\u064a\u0627\u0621 / \u062a\u062c\u0645\u064a\u0644",
  },
  {
    value: "services",
    en: "Services / Consulting",
    ar: "\u062e\u062f\u0645\u0627\u062a / \u0627\u0633\u062a\u0634\u0627\u0631\u0627\u062a",
  },
  { value: "other", en: "Other", ar: "\u0623\u062e\u0631\u0649" },
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


export default function ContactForm({ lang, strings }) {
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
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
        industry: "",
        contactMethod: "",
        phone: "",
        email: "",
        message: "",
      });

      statusTimerRef.current = setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      const code = error instanceof Error ? error.message : "server_error";
      const errorMsg =
        code === "rate_limit" ? strings.errorRateLimit : strings.errorGeneric;
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
  const chipClass = (selected) =>
    `bg-surface-low hover:bg-icon/20 flex-1 flex items-center justify-center px-4 py-[0.63rem] rounded-lg border cursor-pointer text-base ${
      selected
        ? "border-icon text-content-heading border-2"
        : "border-transparent text-content-muted"
    }`;

  return (
    <form
      className="text-start relative pb-4 lg:min-h-[555px]"
      onSubmit={handleSubmit}
      aria-label={strings.contactFormA11y}
    >
      <fieldset className="border-none p-0 m-0">
        <legend className="sr-only">{strings.legend}</legend>

        <div className="grid md:grid-cols-2 gap-4 md:gap-x-3">
          {/* Name */}
          <div>
            <label htmlFor="name" className={labelClass}>
              {strings.name}
              <span className="text-warning opacity-90" aria-label="required">
                *
              </span>
            </label>
            <input
              type="text"
              id="name"
              required
              placeholder={strings.namePlaceholder}
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
              {strings.industry}{" "}
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
                <option value="">{strings.industryPlaceholder}</option>
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
              {strings.contactMethod}{" "}
              <span className="text-warning opacity-90" aria-label="required">
                *
              </span>
            </p>
            <div
              role="radiogroup"
              aria-labelledby="contact-method-label"
              className="flex flex-row gap-3"
            >
              {[
                { value: "whatsapp", label: strings.whatsapp },
                { value: "phone-call", label: strings.phoneCall },
                { value: "email", label: strings.email },
              ].map(({ value, label }) => (
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
                          ? { phone: "" }
                          : { email: "" }),
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
              className="md:col-span-2"
            >
              <label htmlFor="phone" className={labelClass}>
                {strings.phone}{" "}
                <span className="text-warning opacity-90" aria-label="required">
                  *
                </span>
              </label>
              <input
                type="tel"
                id="phone"
                dir="ltr"
                required
                placeholder={strings.phonePlaceholder}
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

  

          {/* Email - Instant Toggle */}
          {formData.contactMethod === "email" && (
            <div className="md:col-span-2">
              <label htmlFor="email" className={labelClass}>
                {strings.emailAddress}{" "}
                <span className="text-warning opacity-90" aria-label="required">
                  *
                </span>
              </label>
              <input
                type="email"
                id="email"
                required
                placeholder={strings.emailPlaceholder}
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
              {strings.message}{" "}
              <span className="text-content-muted font-normal">
                ({strings.messageOptional})
              </span>
            </label>
            <textarea
              id="message"
              rows={2}
              placeholder={strings.messagePlaceholder}
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
        className={`z-20 mt-4 w-full mx-auto block tracking-wide font-bold text-base py-4 rounded-lg disabled:cursor-not-allowed transition-all duration-300 ${
          status === "success"
            ? "bg-success/50 text-content-heading md:text-[1.3rem]"
            : status === "error"
              ? "bg-danger/50 text-base md:text-[1.3rem] text-content-heading"
              : "bg-gold hover:bg-gold-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light text-gray-900 disabled:opacity-50"
        }`}
      >
        <span
          key={status === "loading" ? "default" : status}
          className="btn-label"
        >
          {status === "loading" ? (
            strings.sending
          ) : status === "success" ? (
            <span className="flex items-center justify-center gap-1">
              {strings.success}
            </span>
          ) : status === "error" ? (
            errorMessage
          ) : (
            strings.submit
          )}
        </span>
      </button>
      <a
        href="https://wa.me/201274613331"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 w-fit px-6 mx-auto text-md text-content-body flex items-center justify-center gap-2 py-2 rounded-lg font-bold text-base"
      >
        <WhatsAppIcon className="size-6" fill="#22c55e" />
        {strings.chatInstead}
      </a>
    </form>
  );
}
