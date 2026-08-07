"use client";

import { Fragment, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import Link from "next/link";
import { ArrowUp, X } from "lucide-react";
import type { Lang } from "@/app/types";
import translations from "@/app/data/translations/chatWidget";
import guides from "@/app/data/guides";
import NollieAvatar from "./NollieAvatar";
import ChatPromptBubble from "./ChatPromptBubble";
import styles from "./Nollie.module.css";

interface ChatWidgetProps {
  lang: Lang;
}

// Whitelist of markdown link targets the model is allowed to emit. Anything
// else renders as literal `[label](target)` text so a hallucinated URL
// degrades gracefully instead of turning into a broken link.
const LINK_TARGETS = new Set<string>([
  "#contact",
  "#portfolio",
  "/guides/website-cost-in-egypt#pricing-calculator",
  ...guides.map((g) => `/guides/${g.slug}`),
]);

const MARKDOWN_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

// Dispatch this on `window` to force the chat panel closed — used by the
// mobile menu so opening it dismisses the widget behind it.
export const CHAT_CLOSE_EVENT = "chat:close";

function renderMessage(
  parts: { type: string; text?: string }[],
  lang: Lang,
  onNavigate: () => void,
): ReactNode {
  const text = parts
    .filter((part) => part.type === "text")
    .map((part) => part.text ?? "")
    .join("");

  // With two capturing groups, split() yields triples:
  // [chunk, label, target, chunk, label, target, ...]
  const segments = text.split(MARKDOWN_LINK);
  const nodes: ReactNode[] = [];

  for (let i = 0; i < segments.length; i += 3) {
    const chunk = segments[i];
    if (chunk) nodes.push(<Fragment key={i}>{chunk}</Fragment>);

    const label = segments[i + 1];
    const target = segments[i + 2];
    if (label === undefined || target === undefined) continue;

    if (LINK_TARGETS.has(target)) {
      nodes.push(
        <Link
          key={`${i}-link`}
          href={`/${lang}${target}`}
          onClick={onNavigate}
          className="text-gold-light underline underline-offset-2 hover:text-gold"
        >
          {label}
        </Link>,
      );
    } else {
      nodes.push(
        <Fragment key={`${i}-literal`}>{`[${label}](${target})`}</Fragment>,
      );
    }
  }

  return nodes;
}

export default function ChatWidget({ lang }: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  // Tell the API which locale the visitor is browsing in, so the system
  // prompt can bias replies to that language.
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: { lang },
      }),
    [lang],
  );

  const { messages, sendMessage, status, error } = useChat({ transport });
  const busy = status === "submitted" || status === "streaming";

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Autofocus the input when the panel opens — but only on devices with a
  // real pointer. On touch-primary devices, focusing raises the software
  // keyboard and hides the greeting, avatar, and suggestions.
  useEffect(() => {
    if (!open) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    inputRef.current?.focus();
  }, [open]);

  // Lock page scroll on mobile while the panel is open. On desktop the widget
  // is a small floating panel and locking the page behind it would be
  // annoying UX.
  useEffect(() => {
    if (!open) return;
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const html = document.documentElement;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = "";
    };
  }, [open]);

  // Always follow the log to the bottom on new messages, status changes, and
  // reopen. The chat is short-lived enough that snapping beats tracking
  // whether the user scrolled up.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, status, open]);

  // Close on external request (e.g. mobile menu opening).
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener(CHAT_CLOSE_EVENT, close);
    return () => window.removeEventListener(CHAT_CLOSE_EVENT, close);
  }, []);

  function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    sendMessage({ text: trimmed });
    setInput("");
  }

  const errorLabel = error
    ? /429|rate limit/i.test(error.message)
      ? translations.rateLimited[lang]
      : translations.error[lang]
    : null;

  return (
    <>
      {/* ── Prompt bubble (auto-appears above the launcher) ── */}
      <ChatPromptBubble
        lang={lang}
        hidden={open}
        onOpen={() => setOpen(true)}
        prompt={translations.bubbleNudge[lang]}
      />

      {/* ── Launcher ── */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={translations.a11y.open[lang]}
        aria-expanded={open}
        className={`${styles.launcher} fixed bottom-5 inset-e-5 z-50 grid size-12 sm:size-14 cursor-pointer
          place-items-center rounded-full transition-transform duration-300 ease-out
          hover:scale-105
          ${open ? "pointer-events-none opacity-0" : "opacity-100"}`}
      >
        <NollieAvatar
          animated={!open}
          className="size-13.5 sm:size-15.5"
        />
      </button>

      {/* ── Panel ── */}
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="chat-panel-title"
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          className="fixed bottom-5 inset-e-5 z-50 flex h-[min(32rem,calc(100dvh-2.5rem))]
            w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl
            border-2 border-border-subtle bg-surface-card shadow-2xl shadow-black/50"
        >
          {/* Header */}
          <header className="flex items-center gap-3 border-b border-border-subtle px-4 py-3">
            <NollieAvatar animated className="size-10 sm:size-11" />
            <p
              id="chat-panel-title"
              className="min-w-0 flex-1 truncate text-base font-bold text-content-heading"
            >
              {translations.title[lang]}
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={translations.a11y.close[lang]}
              className="cursor-pointer rounded-lg p-1 text-content-muted transition-colors duration-200 hover:text-content-heading"
            >
              <X className="size-5" aria-hidden />
            </button>
          </header>

          {/* Messages */}
          <div
            ref={scrollRef}
            role="log"
            aria-label={translations.a11y.log[lang]}
            aria-live="polite"
            className="flex flex-1 flex-col gap-3 overflow-y-auto scrollbar-none overscroll-contain p-4"
          >
            <p className="max-w-[92%] self-start text-base leading-relaxed text-content-body rtl:leading-loose">
              {translations.greeting[lang]}
            </p>

            {messages.map((message) => (
              <p
                key={message.id}
                className={
                  message.role === "user"
                    ? "max-w-[85%] self-end whitespace-pre-wrap rounded-2xl rounded-ee-md bg-surface-low px-3.5 py-2 text-base text-content-body"
                    : "max-w-[92%] self-start whitespace-pre-wrap text-base leading-relaxed text-content-body rtl:leading-loose"
                }
              >
                {renderMessage(message.parts, lang, () => setOpen(false))}
              </p>
            ))}

            {/* Typing indicator — same pulsing gold dots as GuidesGrid */}
            {status === "submitted" && (
              <div className="flex gap-1.5 self-start py-1" aria-hidden>
                <span className="size-2 animate-pulse rounded-full bg-gold-light/80 [animation-delay:-0.3s]" />
                <span className="size-2 animate-pulse rounded-full bg-gold-light/80 [animation-delay:-0.15s]" />
                <span className="size-2 animate-pulse rounded-full bg-gold-light/80" />
              </div>
            )}

            {errorLabel && (
              <p className="self-start text-sm text-red-400">{errorLabel}</p>
            )}
          </div>

          {/* Suggestions — only before the first message */}
          {messages.length === 0 && (
            <ul
              aria-label={translations.a11y.suggestions[lang]}
              className="flex flex-wrap gap-2 px-4 pb-3"
            >
              {translations.suggestions.map((suggestion) => (
                <li key={suggestion.en}>
                  <button
                    type="button"
                    onClick={() => submit(suggestion[lang])}
                    className="cursor-pointer rounded-xl border border-border-subtle px-3 py-1.5 text-base sm:text-[1.1rem] text-content-muted transition-colors duration-200 hover:border-border-strong hover:text-content-body"
                  >
                    {suggestion[lang]}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
            }}
            className="flex items-center gap-2 border-t border-border-subtle p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={translations.placeholder[lang]}
              aria-label={translations.a11y.messageInput[lang]}
              maxLength={1000}
              className="h-11 min-w-0 flex-1 rounded-xl bg-surface-low px-3.5 text-base
                text-content-body outline-none placeholder:text-content-muted
                focus-visible:ring-1 focus-visible:ring-gold/40"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label={translations.a11y.send[lang]}
              className="cta-primary grid size-11 shrink-0 cursor-pointer place-items-center
                rounded-xl text-background disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowUp className="size-5" aria-hidden />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
