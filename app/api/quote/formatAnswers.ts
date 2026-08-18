import { quoteQuestions } from "@/app/data/translations/quoteForm";
import type { Lang } from "@/app/types";

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
    }
  }

  return true;
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
      answerText = items.join(", ");
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