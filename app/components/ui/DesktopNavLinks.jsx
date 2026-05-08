"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SmoothScroll from "./utils/SmoothScroll.js";


import translations from "@/app/data/translations";

const { navLinks } = translations;


export default function DesktopNavLinks({ nav }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean); 
  const lang = segments[0] || "en";
  
  // isHome is true if there's only 1 segment (the lang) or 0 (root)
  const isHome = segments.length <= 1;

  const handleScroll = SmoothScroll();
  const contactItem = navLinks[navLinks.length - 1];
  const contactDestination = isHome ? `#${contactItem}` : `/${lang}/#${contactItem}`;

  return (
    <ul className="flex w-full justify-center gap-14 xl:gap-32">
      {navLinks.slice(0, -1).map((item, i) => {
        const destination = isHome ? `#${item}` : `/${lang}/#${item}`;

        return (
          <li key={i}>
            <Link
              href={destination}
              onClick={(e) => {
                if (isHome) {
                  handleScroll(e);
                }
              }}
              className="nav-link-underline text-[1.3rem] font-medium tracking-wider text-content-body hover:text-content-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm transition-colors duration-500"
            >
              {nav[item]}
            </Link>
          </li>
        );
      })}
      <li>
        <Link
          href={`/${lang}/resources`}
          className="nav-link-underline text-[1.3rem] font-medium tracking-wider text-content-body hover:text-content-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm transition-colors duration-500"
        >
          {nav.resources}
        </Link>
      </li>
      <li>
        <Link
          href={contactDestination}
          onClick={(e) => {
            if (isHome) {
              handleScroll(e);
            }
          }}
          className="nav-link-underline text-[1.3rem] font-medium tracking-wider text-content-body hover:text-content-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm transition-colors duration-500"
        >
          {nav[contactItem]}
        </Link>
      </li>
    </ul>
  );
}