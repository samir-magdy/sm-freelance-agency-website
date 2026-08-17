import { quoteQuestions } from "@/app/data/translations/quoteForm";
import type { Lang } from "@/app/types";

export function formatAnswers(
  answers: Record<string, string | string[]>,
  lang: Lang,
): string {
  const lines: string[] = [];

  for (const q of quoteQuestions) {
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
    } else {
      answerText = q.options?.find((o) => o.value === value)?.label[lang] ?? String(value);
    }

    lines.push(`${questionText}\n${answerText}`);
  }

  return lines.join("\n\n");
}