"use client";

import { useEffect, useRef, useState } from "react";

const SECTION_IDS = [
  "home",
  "goals",
  "services",
  "add-ons",
  "portfolio",
  "how-it-works",
  "faq",
  "contact",
] as const;

type SectionId = (typeof SECTION_IDS)[number];

const LINK_CONFIG: { href: `#${SectionId}`; labelKey: keyof typeof defaultNav }[] = [
  { href: "#services", labelKey: "services" },
  { href: "#add-ons", labelKey: "addOns" },
  { href: "#portfolio", labelKey: "projects" },
  { href: "#how-it-works", labelKey: "howItWorks" },
  { href: "#faq", labelKey: "faq" },
  { href: "#contact", labelKey: "contact" },
];

const defaultNav = {
  services: "",
  addOns: "",
  projects: "",
  howItWorks: "",
  faq: "",
  contact: "",
};

interface DesktopNavLinksProps {
  nav: {
    services: string;
    addOns: string;
    projects: string;
    howItWorks: string;
    faq: string;
    contact: string;
  };
}

function hrefToSectionId(href: string): SectionId | null {
  const id = href.replace(/^#/, "");
  return SECTION_IDS.includes(id as SectionId) ? (id as SectionId) : null;
}

/** Ignore observer updates for this long after a nav click (smooth scroll duration). */
const CLICK_LOCK_MS = 900;

export default function DesktopNavLinks({ nav }: DesktopNavLinksProps) {
  const [activeId, setActiveId] = useState<SectionId | null>(null);
  const lockUntilRef = useRef(0);

  const handleClick = (sectionId: SectionId | null) => {
    if (sectionId === null) return;
    setActiveId(sectionId);
    lockUntilRef.current = Date.now() + CLICK_LOCK_MS;
  };

  useEffect(() => {
    const ratios = new Map<string, number>();
    let debounceId: ReturnType<typeof setTimeout> | null = null;
    const DEBOUNCE_MS = 120;

    const updateActive = () => {
      if (Date.now() < lockUntilRef.current) return;
      let bestId: SectionId | null = null;
      let bestRatio = 0;
      ratios.forEach((ratio, id) => {
        if (ratio > bestRatio && SECTION_IDS.includes(id as SectionId)) {
          bestRatio = ratio;
          bestId = id as SectionId;
        }
      });
      // Goals section is observed for scroll position but must not trigger an active nav state
      setActiveId(bestId === "goals" ? null : bestId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (SECTION_IDS.includes(id as SectionId)) {
            ratios.set(id, entry.intersectionRatio);
          }
        }
        if (debounceId) clearTimeout(debounceId);
        debounceId = setTimeout(updateActive, DEBOUNCE_MS);
      },
      {
        root: null,
        rootMargin: "-15% 0px -15% 0px",
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      if (debounceId) clearTimeout(debounceId);
      observer.disconnect();
    };
  }, []);

  const linkClass =
    "nav-link-underline text-[1.3rem] font-medium tracking-wider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm transition-colors duration-500";

  return (
    <ul className="ms-10 flex w-[65%] justify-between">
      {LINK_CONFIG.map(({ href, labelKey }) => {
        const sectionId = hrefToSectionId(href);
        const isActive = sectionId !== null && activeId === sectionId;
        return (
          <li key={href}>
            <a
              href={href}
              onClick={() => handleClick(sectionId)}
              className={`${linkClass} ${isActive ? "nav-link-active text-content-heading" : "text-content-body hover:text-content-heading"}`}
            >
              {nav[labelKey] ?? defaultNav[labelKey]}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
