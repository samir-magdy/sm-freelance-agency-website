import { quoteQuestions } from "@/app/data/translations/quoteForm";
import type { Lang } from "@/app/types";
import { isValidUrl, normalizeUrl } from "@/lib/contactValidation";

// Mirrors the client's maxLength on the "text" question type (QuoteModal.tsx).
const MAX_TEXT_ANSWER_LENGTH = 500;

// Rejects anything that doesn't match a real question's expected shape
// (multi/list -> string[], single/text -> string) before it ever reaches
// formatAnswers, whose per-type formatting assumes the shape is already right.
export function isValidAnswers(
  answers: unknown,
): answers is Record<string, string | string[]> {
  if (typeof answers !== "object" || answers === null || Array.isArray(answers)) {
    return false;
  }

  for (const [id, value] of Object.entries(answers)) {
    const question = quoteQuestions.find((q) => q.id === id);
    if (!question) return false;

    if (question.type === "multi" || question.type === "list") {
      if (!Array.isArray(value) || !value.every((v) => typeof v === "string")) {
        return false;
      }
    } else if (typeof value !== "string") {
      return false;
    } else if (question.type === "text" && value.length > MAX_TEXT_ANSWER_LENGTH) {
      return false;
    }
  }

  return true;
}

// Trims/drops blanks and rejects a submission if any list-type (link)
// answer still isn't a valid URL — the client disables Next in that case,
// but the API can't trust it. Doesn't prefix https:// onto the stored
// value — that's only added when the value is displayed in the email
// (see getAnsweredEntries below), so raw answers stay exactly as typed.
export function normalizeAnswers(
  answers: Record<string, string | string[]>,
): Record<string, string | string[]> | null {
  const normalized: Record<string, string | string[]> = { ...answers };

  for (const q of quoteQuestions) {
    if (q.type !== "list") continue;
    const value = normalized[q.id];
    if (!Array.isArray(value)) continue;

    const items = value.map((v) => v.trim()).filter((v) => v.length > 0);
    if (items.some((v) => !isValidUrl(v))) return null;

    normalized[q.id] = items;
  }

  return normalized;
}

export interface AnsweredEntry {
  question: string;
  answer: string;
}

function getAnsweredEntries(
  answers: Record<string, string | string[]>,
  lang: Lang,
): AnsweredEntry[] {
  const entries: AnsweredEntry[] = [];

  for (const q of quoteQuestions) {
    if (q.showIf && !q.showIf(answers)) {
      continue;
    }

    const value = answers[q.id];
    if (value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) {
      continue;
    }

    const questionText = q.question[lang] ?? q.question.en;
    let answerText: string;

    if (q.type === "text") {
      answerText = String(value);
    } else if (q.type === "multi") {
      answerText = (value as string[])
        .map((v) => q.options?.find((o) => o.value === v)?.label[lang] ?? v)
        .join(", ");
    } else if (q.type === "list") {
      const items = (value as string[])
        .map((v) => v.trim())
        .filter((v) => v.length > 0);
      if (items.length === 0) continue;
      // The stored answer keeps whatever the user typed (e.g. "example.com"
      // with no scheme) — prefix https:// only here, for the email display.
      answerText = items.map(normalizeUrl).join(", ");
    } else {
      answerText = q.options?.find((o) => o.value === value)?.label[lang] ?? String(value);
    }

    entries.push({ question: questionText, answer: answerText });
  }

  return entries;
}

export function formatAnswers(
  answers: Record<string, string | string[]>,
  lang: Lang,
): string {
  return getAnsweredEntries(answers, lang)
    .map((e) => `${e.question}\n${e.answer}`)
    .join("\n\n");
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export function formatAnswersHtml(
  answers: Record<string, string | string[]>,
  lang: Lang,
): string {
  return getAnsweredEntries(answers, lang)
    .map(
      (e) => `
        <tr>
          <td style="padding:16px 0 4px; font:600 12px/1.4 ${FONT_STACK}; color:#B8860B; text-transform:uppercase; letter-spacing:0.06em;">
            ${escapeHtml(e.question)}
          </td>
        </tr>
        <tr>
          <td style="padding:0 0 12px; font:400 15px/1.6 ${FONT_STACK}; color:#24262B; border-bottom:1px solid #ECE9E2;">
            ${escapeHtml(e.answer)}
          </td>
        </tr>`,
    )
    .join("");
}