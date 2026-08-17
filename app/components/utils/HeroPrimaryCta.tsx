"use client";

import { QUOTE_OPEN_EVENT } from "@/app/components/ui/QuoteModal";
import type { ReactNode } from "react";

interface HeroPrimaryCtaProps {
  label: string;
  className: string;
  children?: ReactNode;
}

export default function HeroPrimaryCta({ label, className, children }: HeroPrimaryCtaProps) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(QUOTE_OPEN_EVENT))}
      className={className}
    >
      {children ?? label}
    </button>
  );
}