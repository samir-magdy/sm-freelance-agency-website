"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Lang } from "@/app/types";

interface ChatPromptBubbleProps {
  lang: Lang;
  hidden: boolean;
  onOpen: () => void;
  prompt: string;
  dismissLabel: string;
}

const APPEAR_DELAY_MS = 12_000;
const VISIBLE_MS = 8_000;
const STORAGE_KEY = "chat-bubble-shown";

export default function ChatPromptBubble({
  lang,
  hidden,
  onOpen,
  prompt,
  dismissLabel,
}: ChatPromptBubbleProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // If the chat is (or becomes) open, the user has engaged — mark shown
    // so the prompt never surfaces later in this session.
    if (hidden) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      return;
    }
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const showTimer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
    }, APPEAR_DELAY_MS);

    const hideTimer = setTimeout(
      () => setVisible(false),
      APPEAR_DELAY_MS + VISIBLE_MS,
    );

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <div
      className={`fixed bottom-22 sm:bottom-24 sm:inset-e-4 inset-e-2 z-50 max-w-[16rem] transition-all duration-500 ease-out
        ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
      role="status"
      aria-live="polite"
      aria-hidden={!visible}
      lang={lang}
    >
      <div className="relative rounded-2xl border border-white/10 bg-surface-card/95 shadow-xl shadow-black/40 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => {
            setVisible(false);
            onOpen();
          }}
          className="block w-full cursor-pointer rounded-2xl px-4 py-3 pe-9 text-start text-base leading-snug text-content-body transition-colors hover:text-content-heading"
        >
          {prompt}
        </button>

        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label={dismissLabel}
          className="absolute inset-e-2 top-2 grid size-6 cursor-pointer place-items-center rounded-full text-content-muted transition-colors hover:bg-surface-low hover:text-content-heading"
        >
          <X className="size-3.5" aria-hidden />
        </button>

        {/* Tail — filled triangle covers the parent border, stroked slants match it */}
        <svg
          className="pointer-events-none absolute -bottom-2.25 inset-e-8"
          width="18"
          height="10"
          viewBox="0 0 18 10"
          aria-hidden
          style={{ overflow: "visible" }}
        >
          <path
            d="M -0.5 -1 L 9 9 L 18.5 -1 Z"
            fill="var(--color-surface-card)"
          />
          <path
            d="M 0 0 L 9 9 L 18 0"
            fill="none"
            stroke="white"
            strokeOpacity="0.1"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
