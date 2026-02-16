"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import translations from "@/app/data/translations";

export default function ContactForm() {
  const { lang } = useLanguage();
  const t = translations;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", phone: "", message: "" });

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to send message";

      setStatus("error");
      setErrorMessage(errorMsg);

      // Auto-hide error message after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <form
      className="text-start pt-2 relative"
      onSubmit={handleSubmit}
      aria-label={t.a11y.contactForm[lang]}
    >
      <fieldset className="border-none p-0 m-0">
        <legend className="sr-only">{t.form.legend[lang]}</legend>
        <div>
          <label
            htmlFor="name"
            className="block text-caption font-bold text-content-muted mb-2 ms-1"
          >
            {t.form.name[lang]}{" "}
            <span className="text-warning opacity-90" aria-label="required">
              *
            </span>
          </label>
          <input
            type="text"
            id="name"
            required
            aria-required="true"
            placeholder={t.form.namePlaceholder[lang]}
            className="mb-4 text-base w-full h-14 px-4 rounded-lg border border-border-subtle bg-surface-low text-content-heading focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-colors"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-caption font-bold text-content-muted mb-2 ms-1"
          >
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
            aria-required="true"
            placeholder={t.form.phonePlaceholder[lang]}
            pattern="^01[0125]\d{8}$"
            title="Egyptian mobile number: 11 digits starting with 010, 011, 012, or 015"
            className={`mb-4 text-base w-full h-14 px-4 rounded-lg border border-border-subtle bg-surface-low text-content-heading focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-colors ${lang === "ar" ? "text-right" : "text-left"}`}
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-caption font-bold text-content-muted mb-2 ms-1"
          >
            {t.form.message[lang]}{" "}
            <span className="text-warning opacity-90" aria-label="required">
              *
            </span>
          </label>
          <textarea
            id="message"
            required
            aria-required="true"
            rows={4}
            placeholder={t.form.messagePlaceholder[lang]}
            className="mb-4 text-base w-full px-4 py-2 rounded-lg border border-border-subtle bg-surface-low text-content-heading focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition-colors"
            value={formData.message}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, message: e.target.value }))
            }
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                e.currentTarget.form?.requestSubmit();
              }
            }}
          />
        </div>
      </fieldset>
      <button
        type="submit"
        disabled={status === "loading"}
        aria-busy={status === "loading"}
        className="w-full mx-auto block bg-brand-primary font-bold text-base py-4 hover:bg-brand-primary/80 focus:outline-2 focus:outline-offset-2 focus:outline-brand-accent text-background rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
