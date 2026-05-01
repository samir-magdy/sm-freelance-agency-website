"use client";
import { usePathname } from "next/navigation";
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
  const lang = pathname.split("/")[1] || "en"; // always accurate
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  const handleScroll = SmoothScroll();

  const getHref = (fragment) => isHome ? fragment : `/${lang}/${fragment}`;

  return (
    <ul className="flex w-full justify-center gap-14 xl:gap-32">
      {LINK_CONFIG.map(({ href, labelKey }) => (
        <li key={href}>
          <a
            href={getHref(href)}
            onClick={isHome ? handleScroll : undefined}
            className="nav-link-underline text-[1.3rem] font-medium tracking-wider text-content-body hover:text-content-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm transition-colors duration-500"
          >
            {nav[labelKey]}
          </a>
        </li>
      ))}
    </ul>
  );
}