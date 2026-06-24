"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import translations from "@/app/data/translations";

const { navLinks } = translations;

export default function DesktopNavLinks({ nav }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const lang = segments[0] || "en";
  const isHome = segments.length <= 1;

  const contactItem = navLinks[navLinks.length - 1];
  const contactDestination = isHome ? `#${contactItem}` : `/${lang}/#${contactItem}`;

  const handleHashClick = (e, targetId) => {
    if (!isHome) return;
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ul className="flex w-full justify-around xl:px-36 lg:px-16">
      {navLinks.slice(0, -1).map((item, i) => {
        const destination = isHome ? `#${item}` : `/${lang}/#${item}`;
        return (
          <li key={i}>
            <Link
              href={destination}
              onClick={(e) => handleHashClick(e, item)}
              className="nav-link-underline text-subheading font-medium tracking-wider text-content-body hover:text-content-heading transition-colors duration-500"
            >
              {nav[item]}
            </Link>
          </li>
        );
      })}
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
