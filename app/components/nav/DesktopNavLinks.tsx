"use client";

import type { MouseEvent } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { navItems, type NavKey } from "@/app/data/translations/nav";

interface DesktopNavLinksProps {
  nav: Record<NavKey, string>;
}

export default function DesktopNavLinks({ nav }: DesktopNavLinksProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const lang = segments[0] || "en";

  const isHome = segments.length <= 1;

  const handleHashClick = (
    e: MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    if (!isHome) return;
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ul className="flex w-full justify-around xl:px-28 lg:px-16 text-subheading font-medium tracking-wider text-content-body">
      {navItems.map((item) => {
        const linkClass =
          "nav-link-underline hover:text-content-heading transition-colors duration-500";

        if (item.kind === "hash") {
          return (
            <li key={item.key}>
              <Link
                href={`/${lang}#${item.target}`}
                onClick={(e) => handleHashClick(e, item.target)}
                className={linkClass}
              >
                {nav[item.key]}
              </Link>
            </li>
          );
        }

        return (
          <li key={item.key}>
            <Link href={`/${lang}/${item.path}`} className={linkClass}>
              {nav[item.key]}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
