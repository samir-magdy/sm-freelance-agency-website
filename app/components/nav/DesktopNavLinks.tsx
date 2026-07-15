"use client";

import type { MouseEvent } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { navLinks, type NavKey } from "@/app/data/translations/nav";

interface DesktopNavLinksProps {
  nav: Record<NavKey, string>;
}

export default function DesktopNavLinks({ nav }: DesktopNavLinksProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const lang = segments[0] || "en";

  const isHome = segments.length <= 1;

  const contactItem = navLinks[navLinks.length - 1];
  const contactDestination = `/${lang}#${contactItem}`;

  const handleHashClick = (
    e: MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    if (!isHome) return;
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ul className="flex w-full justify-around xl:px-36 lg:px-16">
      {navLinks.slice(0, -1).map((item, i) => (
        <li key={i}>
          <Link
            href={`/${lang}#${item}`}
            onClick={(e) => handleHashClick(e, item)}
            className="nav-link-underline text-subheading font-medium tracking-wider text-content-body hover:text-content-heading transition-colors duration-500"
          >
            {nav[item]}
          </Link>
        </li>
      ))}
      <li>
        <Link
          href={`/${lang}/guides`}
          className="nav-link-underline text-subheading font-medium tracking-wider text-content-body hover:text-content-heading transition-colors duration-500"
        >
          {nav.guides}
        </Link>
      </li>
      <li>
        <Link
          href={`/${lang}/about`}
          className="nav-link-underline text-subheading font-medium tracking-wider text-content-body hover:text-content-heading transition-colors duration-500"
        >
          {nav.about}
        </Link>
      </li>
      <li>
        <Link
          href={`/${lang}#FAQs`}
          onClick={(e) => handleHashClick(e, "FAQs")}
          className="nav-link-underline text-subheading font-medium tracking-wider text-content-body hover:text-content-heading transition-colors duration-500"
        >
          {nav.FAQs}
        </Link>
      </li>
      <li>
        <Link
          href={contactDestination}
          onClick={(e) => handleHashClick(e, contactItem)}
          className="nav-link-underline text-subheading font-medium tracking-wider text-content-body hover:text-content-heading transition-colors duration-500"
        >
          {nav[contactItem]}
        </Link>
      </li>
    </ul>
  );
}
