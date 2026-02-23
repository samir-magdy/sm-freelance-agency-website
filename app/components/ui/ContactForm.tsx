"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import translations from "@/app/data/translations";
import type { Lang } from "@/app/data/translations";

const INDUSTRY_OPTIONS = [
  { value: "restaurant",  en: "Restaurant / Café",         ar: "مطعم / كافيه" },
  { value: "retail",      en: "Retail / E-commerce",       ar: "تجارة / متجر إلكتروني" },
  { value: "healthcare",  en: "Healthcare / Clinic",       ar: "صحة / عيادة" },
  { value: "real-estate", en: "Real Estate",               ar: "عقارات" },
  { value: "education",   en: "Education / Training",      ar: "تعليم / تدريب" },
  { value: "travel",      en: "Travel / Tourism",          ar: "سياحة / سفر" },
  { value: "fitness",     en: "Fitness / Gym",             ar: "لياقة بدنية / جيم" },
  { value: "fashion",     en: "Fashion / Beauty",          ar: "أزياء / تجميل" },
  { value: "services",    en: "Services / Consulting",     ar: "خدمات / استشارات" },
  { value: "other",       en: "Other",                     ar: "أخرى" },
];

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export default function ContactForm({ lang }: { lang: Lang }) {
  const t = translations;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    industry: "",
    onlinePresence: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", phone: "", industry: "", onlinePresence: "", budget: "", message: "" });

      setTimeout(() => { setStatus("idle"); }, 5000);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to send message";
      setStatus("error");
      setErrorMessage(errorMsg);
      setTimeout(() => { setStatus("idle"); setErrorMessage(""); }, 5000);
    }
  };

  const selectBaseClass = "text-base w-full h-14 px-4 rounded-lg border border-gray-600/50 bg-surface-low focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-colors appearance-none cursor-pointer";
  const selectClass = (value: string) => `${selectBaseClass} ${value ? "text-content-heading" : "text-content-muted"}`;
  const labelClass = "block text-caption font-bold text-content-muted mb-2 ms-1";

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
              <span className="text-warning opacity-90" aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              required
              aria-required="true"
              placeholder={t.form.namePlaceholder[lang]}
              className="dark:placeholder:text-content-muted placeholder:text-gray-600 text-base w-full h-14 px-4 rounded-lg border border-gray-600/50 bg-surface-low text-content-heading focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-colors"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className={labelClass}>
              {t.form.phone[lang]}{" "}
              <span className="text-warning opacity-90" aria-label="required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              dir="ltr"
              required
              aria-required="true"
              placeholder={t.form.phonePlaceholder[lang]}
              pattern="^01[0125]\d{8}$"
              title="Egyptian mobile number: 11 digits starting with 010, 011, 012, or 015"
              className={`dark:placeholder:text-content-muted placeholder:text-gray-600 text-base w-full h-14 px-4 rounded-lg border border-gray-600/50 bg-surface-low text-content-heading focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-colors ${lang === "ar" ? "text-right" : "text-left"}`}
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
            />
          </div>

          {/* Industry */}
          <div>
            <label htmlFor="industry" className={labelClass}>
              {t.form.industry[lang]}{" "}
              <span className="text-warning opacity-90" aria-label="required">*</span>
            </label>
            <div className="relative">
              <select
                id="industry"
                required
                aria-required="true"
                className={selectClass(formData.industry)}
                value={formData.industry}
                onChange={(e) => setFormData((prev) => ({ ...prev, industry: e.target.value }))}
              >
                <option value="">{t.form.industryPlaceholder[lang]}</option>
                {INDUSTRY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt[lang]}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-content-muted">
                <ChevronDown />
              </div>
            </div>
          </div>

         

          {/* Online Presence — full width, radio options side-by-side on desktop */}
          <div className="md:grid-cols-2">
            <p id="online-presence-label" className={labelClass}>
              {t.form.onlinePresence[lang]}{" "}
              <span className="text-warning opacity-90" aria-label="required">*</span>
            </p>
            <div role="radiogroup" aria-labelledby="online-presence-label" className="flex flex-row gap-3">
              {([
                { value: "yes", label: t.form.hasWebsite[lang] },
                { value: "no",  label: t.form.noWebsite[lang] },
              ] as const).map(({ value, label }) => (
                <label
                  key={value}
                  className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors text-base focus-within:ring-2 focus-within:ring-brand-accent focus-within:ring-offset-1 ${
                    formData.onlinePresence === value
                      ? "border-brand-accent bg-brand-accent/10 text-content-heading"
                      : "border-gray-600/50 bg-surface-low text-content-muted"
                  }`}
                >
                  <input
                    type="radio"
                    name="onlinePresence"
                    value={value}
                    required
                    aria-required="true"
                    checked={formData.onlinePresence === value}
                    onChange={() => setFormData((prev) => ({ ...prev, onlinePresence: value }))}
                    className="sr-only"
                  />
                  <span className={`flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                    formData.onlinePresence === value ? "border-brand-accent" : "border-gray-600/50"
                  }`}>
                    {formData.onlinePresence === value && (
                      <span className="w-2 h-2 rounded-full bg-brand-accent" />
                    )}
                  </span>
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* Message — full width */}
          <div className="md:col-span-2">
            <label htmlFor="message" className={labelClass}>
              {t.form.message[lang]}{" "}
              <span className="text-warning opacity-90" aria-label="required">*</span>
            </label>
            <textarea
            style={{resize: "none"}}
              id="message"
              required
              aria-required="true"
              rows={3}
              placeholder={t.form.messagePlaceholder[lang]}
              className="dark:placeholder:text-content-muted placeholder:text-gray-600 text-base w-full px-4 py-2 rounded-lg border border-gray-600/50 bg-surface-low text-content-heading focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-colors"
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  e.currentTarget.form?.requestSubmit();
                }
              }}
            />
          </div>

        </div>
      </fieldset>

      <button
        type="submit"
        disabled={status === "loading"}
        aria-busy={status === "loading"}
        className="mt-4 w-full mx-auto block bg-brand-primary font-bold text-base py-4 hover:bg-brand-primary/80 focus:outline-2 focus:outline-offset-2 focus:outline-brand-accent text-background rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? t.form.sending[lang] : t.form.submit[lang]}
      </button>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-5 md:absolute md:-bottom-20 md:left-0 md:right-0 md:mt-0 w-full text-base mx-auto py-4 rounded-lg border border-success/30 bg-success/20 backdrop-blur-sm px-2 md:px-8"
          >
            <p className="flex gap-1 justify-center text-success text-center font-medium md:font-bold">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t.form.success[lang]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {status === "error" && (
        <motion.div
          role="alert"
          aria-live="assertive"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="mt-5 md:absolute md:-bottom-20 md:left-0 md:right-0 md:mt-0 mx-auto py-4 rounded-lg border border-danger/30 bg-danger/20 backdrop-blur-sm w-full px-1"
        >
          <p className="text-danger text-center font-medium md:font-bold">
            {errorMessage}
          </p>
        </motion.div>
      )}
    </form>
  );
}
