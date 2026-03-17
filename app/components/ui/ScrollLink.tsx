"use client";

import { scrollToSection } from "@/app/utils/scrollToSection";

export default function ScrollLink({
  to,
  children,
  className,
  "aria-label": ariaLabel,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <a
      href={`#${to}`}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(to);
      }}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
