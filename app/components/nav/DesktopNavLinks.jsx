"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { navLinks } from "@/app/data/translations/nav";

export default function DesktopNavLinks({ nav }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const lang = segments[0] || "en";
  
  // We keep isHome only to check if we should intercept the click for smooth scrolling
  const isHome = segments.length <= 1;

  const contactItem = navLinks[navLinks.length - 1];
  
  // Always use the absolute path to prevent hash stacking
  const contactDestination = `/${lang}#${contactItem}`;

  const handleHashClick = (e, targetId) => {
    // If not on the homepage, let standard Next.js routing handle the jump
    if (!isHome) return;
    
    e.preventDefault();
    
    // 1. Smooth scroll to the element
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