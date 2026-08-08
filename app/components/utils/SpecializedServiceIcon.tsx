import type { SpecializedServiceId } from "@/app/data/translations/servicesSection";
import type { ReactNode } from "react";

interface Props {
  id: SpecializedServiceId;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

const PATHS: Record<SpecializedServiceId, ReactNode> = {
  branding: (
    <path
      d="M12 3 L14 10 L21 12 L14 14 L12 21 L10 14 L3 12 L10 10 Z"
      strokeLinejoin="round"
    />
  ),
  copywriting: (
    <>
      <path d="M4 20 L4 16.5 L15.5 5 L19 8.5 L7.5 20 Z" strokeLinejoin="round" />
      <line x1="13" y1="7.5" x2="16.5" y2="11" strokeLinecap="round" />
      <line x1="4" y1="20" x2="8.5" y2="20" strokeLinecap="round" />
    </>
  ),
  seo: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <line x1="14.9" y1="14.9" x2="20" y2="20" strokeLinecap="round" />
      <path
        d="M8 12 L10.5 9 L13 12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  maintenance: (
    <>
      <path
        d="M12 3 L4 6 V12 C4 16.5 7.5 20 12 21 C16.5 20 20 16.5 20 12 V6 Z"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 12 L11 14.5 L15.5 10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
};

export default function SpecializedServiceIcon({
  id,
  size = 22,
  strokeWidth = 1.4,
  className,
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      aria-hidden="true"
      className={className}
    >
      {PATHS[id]}
    </svg>
  );
}
