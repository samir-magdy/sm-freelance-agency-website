"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, CircleCheckBig, ClipboardCheck, Plus, X } from "lucide-react";
import type { Lang } from "@/app/types";
import {
  quoteQuestions,
  quoteCategories,
  quoteFormStrings as t,
  type QuoteQuestion,
} from "@/app/data/translations/quoteForm";
import { CHAT_CLOSE_EVENT } from "@/app/components/chat/ChatWidget";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { isValidEmail, isValidPhone } from "@/lib/contactValidation";

export const QUOTE_OPEN_EVENT = "quote:open";

export interface QuoteOpenDetail {
  goal?: string;
}

type Answers = Record<string, string | string[]>;
type ContactMethod = "whatsapp" | "phone-call" | "email";

interface QuoteModalProps {
  lang: Lang;
}

const EMPTY_CONTACT = {
  name: "",
  method: "" as ContactMethod | "",
  phone: "",
  email: "",
};

export default function QuoteModal({ lang }: QuoteModalProps) {
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Answers>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [contact, setContact] = useState(EMPTY_CONTACT);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "rateLimit"
  >("idle");

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Open on the global event; dispatched from the hero CTA (and anywhere else later).
  // Callers can optionally pass a `goal` in the event detail (e.g. from a
  // service card) to pre-answer the first question and skip straight past it.
  useEffect(() => {
    const handleOpen = (e: Event) => {
      window.dispatchEvent(new Event(CHAT_CLOSE_EVENT)); // close chat if open, avoid overlap
      const goal = (e as CustomEvent<QuoteOpenDetail>).detail?.goal;
      if (goal) {
        setAnswers({ goal });
        setStepIndex(1);
      }
      setOpen(true);
    };
    window.addEventListener(QUOTE_OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(QUOTE_OPEN_EVENT, handleOpen);
  }, []);

  // Open directly via a shareable link, e.g. /en?quote=open — no dedicated
  // route needed. Strips the param immediately so refresh/close doesn't
  // reopen it and the URL doesn't linger looking like a permanent page.
  useEffect(() => {
    if (searchParams.get("quote") === "open") {
      setOpen(true);
      router.replace(pathname, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lock page scroll while open (matches MobileMenu's approach).
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Auto-close the success screen after a few seconds so users aren't left
  // staring at it once the quote has gone through.
  useEffect(() => {
    if (status !== "success") return;
    const timer = setTimeout(close, 3000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  function reset() {
    setStarted(false);
    setAnswers({});
    setStepIndex(0);
    setContact(EMPTY_CONTACT);
    setStatus("idle");
  }

  function close() {
    setOpen(false);
    // Delay reset past the close transition so content doesn't visibly jump.
    setTimeout(reset, 300);
  }

  const visibleQuestions = useMemo(
    () => quoteQuestions.filter((q) => !q.showIf || q.showIf(answers)),
    [answers],
  );
  const totalSteps = visibleQuestions.length + 1;
  const isContactStep = stepIndex === visibleQuestions.length;
  const current: QuoteQuestion | undefined = visibleQuestions[stepIndex];

  // Grouped progress: which of the big categories (e.g. "Design & Content")
  // the current question belongs to, shown as a segmented bar.
  const activeCategoryId = isContactStep ? "contact" : current?.category;
  const activeCategory =
    quoteCategories.find((c) => c.id === activeCategoryId) ??
    quoteCategories[0];
  const macroIndex = quoteCategories.findIndex((c) => c.id === activeCategoryId) + 1;
  const macroTotal = quoteCategories.length;
  // Drives how far the active segment fills in — not shown as text, just
  // makes the bar move continuously as questions within the category pass.
  // Counts only questions already passed (not the one currently shown), so
  // landing on a category's first question starts its segment empty rather
  // than instantly full.
  const categoryQuestions = visibleQuestions.filter(
    (q) => q.category === activeCategoryId,
  );
  const activeSegmentFill = isContactStep
    ? 1
    : Math.max(categoryQuestions.findIndex((q) => q.id === current?.id), 0) /
      Math.max(categoryQuestions.length, 1);

  function setAnswer(id: string, value: string | string[]) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }
  function listValue(id: string): string[] {
    const v = answers[id] as string[] | undefined;
    return v && v.length > 0 ? v : [""];
  }
  function setListItem(id: string, index: number, value: string) {
    const list = [...listValue(id)];
    list[index] = value;
    setAnswer(id, list);
  }
  function addListItem(id: string) {
    setAnswer(id, [...listValue(id), ""]);
  }
  function removeListItem(id: string, index: number) {
    const list = listValue(id).filter((_, i) => i !== index);
    setAnswer(id, list.length > 0 ? list : [""]);
  }
  function goNext() {
    setStepIndex((i) => Math.min(i + 1, totalSteps - 1));
  }
  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  const phoneInvalid =
    contact.phone.trim().length > 0 && !isValidPhone(contact.phone.trim());
  const emailInvalid =
    contact.email.trim().length > 0 && !isValidEmail(contact.email.trim());

  async function handleSubmit() {
    setStatus("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, contact, lang }),
      });
      if (!res.ok) {
        setStatus(res.status === 429 ? "rateLimit" : "error");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (!open) return null;

  const optionBtnClass = (selected: boolean) =>
    `cursor-pointer text-start px-4 py-3.5 sm:py-3 rounded-xl border-2 transition-all w-full text-[clamp(1rem,0.85rem+0.9vw,1.5rem)] ${
      selected
        ? "border-white/60 bg-black/40 text-content-heading"
        : "border-border-subtle hover:border-border-strong bg-black/15 text-content-body"
    }`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onKeyDown={(e) => e.key === "Escape" && close()}
      className="fixed inset-0 z-50 grid place-items-center p-3 sm:p-4"
    >
      {/* Backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
      />

      {/* Panel — full-screen sheet on mobile, centered card from sm: up */}
      <div
        className="relative z-10 flex h-[82dvh] w-full sm:w-[80%]
          flex-col overflow-hidden rounded-2xl border-2 border-border-subtle
          bg-surface-card shadow-2xl shadow-black/50"
      >
        <div className="flex justify-end px-3 pt-3 shrink-0 mb-1 xl:mb-4">
          <button
            type="button"
            onClick={close}
            aria-label={t.close[lang]}
            className="cursor-pointer rounded-lg p-1.5 text-content-muted hover:text-content-heading transition-colors"
          >
            <X className="size-5 xl:size-10" aria-hidden />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-none px-5 pb-5 sm:px-6">
          {status === "success" ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 sm:gap-8 text-center">
              <CircleCheckBig className="size-20 sm:size-22 text-gold" aria-hidden />
              <p className="text-content-body text-balance text-[clamp(1rem,0.7rem+2vw,1.875rem)] leading-relaxed sm:max-w-80 md:max-w-120 safari:px-6 px-2 sm:px-0">
                {t.success[lang]}
              </p>
            </div>
          ) : !started ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 sm:gap-8 text-center">
              <ClipboardCheck className="size-20 sm:size-22 text-gold" aria-hidden />
              <p className="text-content-body text-balance text-[clamp(1rem,0.7rem+2vw,1.875rem)] leading-relaxed sm:max-w-80 md:max-w-120 safari:px-6 px-2 sm:px-0">
                {t.introBody[lang]}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <div className="flex items-center justify-between gap-3 mb-2 sm:mb-3">
                  <p className="text-[clamp(1.1rem,1vw,2rem)] xl:text-subheading font-bold text-gold uppercase tracking-wide">
                    {activeCategory.name[lang]}
                  </p>
                  <p className="text-[clamp(1.25rem,1vw,2rem)] text-content-muted shrink-0">
                    {t.stepLabel[lang]} {macroIndex} {t.ofLabel[lang]}{" "}
                    {macroTotal}
                  </p>
                </div>
                <div className="flex gap-1.5">
                  {quoteCategories.map((cat, i) => {
                    const position = i + 1;
                    const fillPercent =
                      position < macroIndex
                        ? 100
                        : position === macroIndex
                          ? activeSegmentFill * 100
                          : 0;
                    return (
                      <div
                        key={cat.id}
                        className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden"
                      >
                        <div
                          className="h-full bg-linear-to-r from-gold to-gold-dark transition-all duration-300"
                          style={{ width: `${fillPercent}%` }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {!isContactStep && current && (
                <div>
                  <p className="text-heading font-bold my-1 sm:my-2 text-content-heading leading-snug">
                    {current.question[lang]}
                  </p>
                  {current.helper && (
                    <p className="text-content-muted text-[clamp(1rem,1.5vw,2rem)] mb-4">
                      {current.helper[lang]}
                    </p>
                  )}

                  {current.type === "single" && (
                    <div className="flex flex-col safari:gap-3 gap-2 md:gap-3 mt-4">
                      {current.options!.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setAnswer(current.id, opt.value);
                            goNext();
                          }}
                          className={optionBtnClass(
                            answers[current.id] === opt.value,
                          )}
                        >
                          {opt.label[lang]}
                        </button>
                      ))}
                    </div>
                  )}

                  {current.type === "multi" && (
                    <div className="flex flex-col gap-2.5 mt-4">
                      {current.options!.map((opt) => {
                        const list = (answers[current.id] as string[]) ?? [];
                        const selected = list.includes(opt.value);
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              const next = selected
                                ? list.filter((v) => v !== opt.value)
                                : [...list, opt.value];
                              setAnswer(current.id, next);
                            }}
                            className={optionBtnClass(selected)}
                          >
                            {opt.label[lang]}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {current.type === "text" && (
                    <textarea
                      rows={3}
                      placeholder={current.placeholder?.[lang]}
                      value={(answers[current.id] as string) ?? ""}
                      onChange={(e) => setAnswer(current.id, e.target.value)}
                      className="mt-4 w-full resize-none rounded-lg border-2 border-transparent bg-surface-low px-4 py-3 text-base text-content-heading placeholder:text-content-muted outline-none focus:border-border-strong"
                    />
                  )}

                  {current.type === "list" && (
                    <div className="mt-4 flex flex-col gap-2.5">
                      {listValue(current.id).map((val, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <input
                            dir="ltr"
                            value={val}
                            placeholder={current.placeholder?.[lang]}
                            onChange={(e) =>
                              setListItem(current.id, i, e.target.value)
                            }
                            className="h-13 flex-1 px-4 rounded-lg bg-surface-low text-base text-content-heading placeholder:text-content-muted outline-none border-2 border-transparent focus:border-border-strong"
                          />
                          {listValue(current.id).length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeListItem(current.id, i)}
                              aria-label={t.close[lang]}
                              className="shrink-0 cursor-pointer rounded-lg p-2.5 text-content-muted hover:text-content-heading transition-colors"
                            >
                              <X className="size-4" aria-hidden />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addListItem(current.id)}
                        className="mt-1 flex items-center gap-1.5 self-start text-gold hover:text-gold-dark transition-colors text-[clamp(0.875rem,0.8rem+0.3vw,1rem)] font-medium cursor-pointer"
                      >
                        <Plus className="size-4" aria-hidden />
                        {t.addAnother[lang]}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {isContactStep && (
                <div>
                  <h2 className="text-[clamp(1.125rem,1rem+1vw,1.6rem)] font-bold text-content-heading mb-5 leading-snug">
                    {t.contactHeading[lang]}
                  </h2>
                  <div className="flex flex-col gap-3.5">
                    <input
                      placeholder={t.namePlaceholder[lang]}
                      value={contact.name}
                      onChange={(e) =>
                        setContact((p) => ({ ...p, name: e.target.value }))
                      }
                      className="h-13 px-4 rounded-lg bg-surface-low text-base text-content-heading placeholder:text-content-muted outline-none border-2 border-transparent focus:border-border-strong"
                    />
                    <div className="relative">
                      <select
                        value={contact.method}
                        onChange={(e) =>
                          setContact((p) => ({
                            ...p,
                            method: e.target.value as ContactMethod,
                          }))
                        }
                        className="h-13 w-full ps-4 pe-10 rounded-lg bg-surface-low text-base text-content-heading outline-none border-2 border-transparent focus:border-border-strong appearance-none"
                      >
                        <option value="">{t.contactMethod[lang]}</option>
                        <option value="whatsapp">{t.whatsapp[lang]}</option>
                        <option value="phone-call">{t.phoneCall[lang]}</option>
                        <option value="email">{t.email[lang]}</option>
                      </select>
                      <ChevronDown
                        className="pointer-events-none absolute inset-e-4 top-1/2 size-4 -translate-y-1/2 text-content-muted"
                        aria-hidden
                      />
                    </div>
                    {(contact.method === "whatsapp" ||
                      contact.method === "phone-call") && (
                      <div>
                        <input
                          dir="ltr"
                          placeholder={t.phonePlaceholder[lang]}
                          value={contact.phone}
                          onChange={(e) =>
                            setContact((p) => ({
                              ...p,
                              phone: e.target.value,
                            }))
                          }
                          className="h-13 w-full px-4 rounded-lg bg-surface-low text-base text-content-heading placeholder:text-content-muted outline-none border-2 border-transparent focus:border-border-strong"
                        />
                        {phoneInvalid && (
                          <p className="text-red-400 text-[clamp(0.875rem,0.8rem+0.3vw,1rem)] mt-1.5">
                            {t.phoneInvalid[lang]}
                          </p>
                        )}
                      </div>
                    )}
                    {contact.method === "email" && (
                      <div>
                        <input
                          placeholder={t.emailPlaceholder[lang]}
                          value={contact.email}
                          onChange={(e) =>
                            setContact((p) => ({
                              ...p,
                              email: e.target.value,
                            }))
                          }
                          className="h-13 w-full px-4 rounded-lg bg-surface-low text-base text-content-heading placeholder:text-content-muted outline-none border-2 border-transparent focus:border-border-strong"
                        />
                        {emailInvalid && (
                          <p className="text-red-400 text-[clamp(0.875rem,0.8rem+0.3vw,1rem)] mt-1.5">
                            {t.emailInvalid[lang]}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  {status === "error" && (
                    <p className="text-red-400 text-[clamp(0.875rem,0.8rem+0.3vw,1rem)] mt-3">
                      {t.error[lang]}
                    </p>
                  )}
                  {status === "rateLimit" && (
                    <p className="text-red-400 text-[clamp(0.875rem,0.8rem+0.3vw,1rem)] mt-3">
                      {t.errorRateLimit[lang]}
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {status !== "success" && !started && (
          <div className="border-t border-border-subtle px-5 py-6 sm:py-4 shrink-0">
            <button
              type="button"
              onClick={() => setStarted(true)}
              className="cta-primary w-full px-6 py-2.5 rounded-lg text-background font-semibold text-base cursor-pointer"
            >
              {t.start[lang]}
            </button>
          </div>
        )}

        {status !== "success" && started && (
          <div className="flex items-center justify-between gap-3 border-t border-border-subtle px-5 py-6 sm:py-4 shrink-0">
            <button
              type="button"
              onClick={goBack}
              disabled={stepIndex === 0}
              className="text-content-muted hover:text-content-heading disabled:opacity-0 transition-colors text-base cursor-pointer"
            >
              {t.back[lang]}
            </button>

            <div className="flex items-center gap-3">
              {!isContactStep &&
                (current?.type === "multi" ||
                  current?.type === "text" ||
                  current?.type === "list") && (
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={
                      !current.optional &&
                      (current.type === "multi" || current.type === "list"
                        ? !(answers[current.id] as string[])?.some(
                            (v) => v.trim().length > 0,
                          )
                        : !answers[current.id])
                    }
                    className="cta-primary px-6 py-2.5 rounded-lg text-background font-semibold text-base disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {t.next[lang]}
                  </button>
                )}

              {isContactStep && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={
                    status === "loading" ||
                    !contact.name.trim() ||
                    !contact.method ||
                    ((contact.method === "whatsapp" ||
                      contact.method === "phone-call") &&
                      (!contact.phone.trim() || phoneInvalid)) ||
                    (contact.method === "email" &&
                      (!contact.email.trim() || emailInvalid))
                  }
                  className="cta-primary px-6 py-2.5 rounded-lg text-background font-semibold text-base disabled:opacity-40 cursor-pointer"
                >
                  {status === "loading" ? t.submitting[lang] : t.submit[lang]}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
