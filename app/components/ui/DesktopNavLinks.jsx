"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SmoothScroll from "./utils/SmoothScroll.js";


// does this line also import the nav translation object? and how does it work in the map below.
import { navLinks } from "@/app/data/translations/nav.js"; 


export default function DesktopNavLinks({ nav }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean); 
  const lang = segments[0] || "en";
  
  // isHome is true if there's only 1 segment (the lang) or 0 (root)
  const isHome = segments.length <= 1;

  const handleScroll = SmoothScroll();

  return (
    <ul className="flex w-full justify-center gap-14 xl:gap-32">
      {navLinks.map((item, i) => {
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
    </ul>
  );
}