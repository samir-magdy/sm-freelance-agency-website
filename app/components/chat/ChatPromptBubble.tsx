"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/app/types";

interface ChatPromptBubbleProps {
  lang: Lang;
  hidden: boolean;
  onOpen: () => void;
  prompt: string;
}

const APPEAR_DELAY_MS = 10_000;
const VISIBLE_MS = 3000;
const STORAGE_KEY = "chat-bubble-shown";

export default function ChatPromptBubble({
  lang,
  hidden,
  onOpen,
  prompt,
}: ChatPromptBubbleProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (hidden) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setVisible(false); // don't let stale `true` survive a hide/unhide cycle
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
      setVisible(false); // cleanup cancels the timers, so also cancel the state they own
    };
  }, [hidden]);

  if (hidden) return null;

  return (
  <div
    className={`fixed bottom-14 inset-e-14 sm:inset-e-16 z-30 max-w-[18rem] transition-all duration-500 ease-out
      ${visible ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-4 scale-95 opacity-0"}`}
    role="status"
    aria-live="polite"
    aria-hidden={!visible}
    lang={lang}
  >
    {/* Asymmetrical border radius: 3 large corners, 1 sharp corner to act as the "tail" */}
    <div className="relative rounded-2xl rounded-ee-sm border border-white/10 bg-surface-card/95 shadow-xl shadow-black/40 backdrop-blur-sm">
      <button
        type="button"
        onClick={() => {
          setVisible(false);
          onOpen();
        }}
        // Added flex layout, slightly adjusted padding, and an active scale effect
        className="flex w-full cursor-pointer items-center px-4 py-2 text-start text-sm leading-relaxed text-content-body transition-all hover:text-content-heading active:scale-[0.98]"
      >
        <span>{prompt}</span>
      </button>
    </div>
  </div>
);
}
