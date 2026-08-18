"use client";

import { QUOTE_OPEN_EVENT, type QuoteOpenDetail } from "@/app/components/ui/QuoteModal";
import type { ReactNode } from "react";

interface HeroPrimaryCtaProps {
  label: string;
  className: string;
  children?: ReactNode;
  goal?: string;
}

export default function HeroPrimaryCta({ label, className, children, goal }: HeroPrimaryCtaProps) {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(
          new CustomEvent<QuoteOpenDetail>(QUOTE_OPEN_EVENT, {
            detail: goal ? { goal } : undefined,
          }),
        )
      }
      className={className}
    >
      {children ?? label}
    </button>
  );
}