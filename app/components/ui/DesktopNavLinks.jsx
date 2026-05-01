"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SmoothScroll from "./utils/SmoothScroll.js";

const LINK_CONFIG = [
  { href: "#portfolio", labelKey: "portfolio" },
  { href: "#pricing",   labelKey: "pricing" },
  { href: "#process",   labelKey: "process" },
  { href: "#FAQs",      labelKey: "FAQs" },
  { href: "#contact",   labelKey: "contact" },
];

export default function DesktopNavLinks({ nav }) {
  const pathname = usePathname();
  
  // 1. More reliable lang & home detection
  const segments = pathname.split("/").filter(Boolean); 
  const lang = segments[0] || "en";
  
  // isHome is true if there's only 1 segment (the lang) or 0 (root)
  const isHome = segments.length <= 1;

  const handleScroll = SmoothScroll();

  return (
    <ul className="flex w-full justify-center gap-14 xl:gap-32">
      {LINK_CONFIG.map(({ href, labelKey }) => {
        // 2. Construct URL correctly
        // If on home: #fragment
        // If not on home: /en#fragment
        const destination = isHome ? href : `/${lang}${href}`;

        return (
          <li key={href}>
            <Link
              href={destination}
              // Only intercept with smooth scroll if we are already home
              onClick={(e) => {
                if (isHome) {
                  handleScroll(e);
                }
              }}
              className="nav-link-underline text-[1.3rem] font-medium tracking-wider text-content-body hover:text-content-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm transition-colors duration-500"
            >
              {nav[labelKey]}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}