"use client"

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import LanguageToggle from "../ui/LanguageToggle";
import MobileMenu from "./MobileMenu";
import smoothScroll from "../utils/SmoothScroll";
import translations from "@/app/data/translations";

const { navLinks } = translations;

function DesktopNavLinks({ nav }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const lang = segments[0] || "en";
  const isHome = segments.length <= 1;

  const contactItem = navLinks[navLinks.length - 1];
  const contactDestination = isHome ? `#${contactItem}` : `/${lang}/#${contactItem}`;

  return (
    <ul className="flex w-full justify-around xl:px-36 lg:px-16">
      {navLinks.slice(0, -1).map((item, i) => {
        const destination = isHome ? `#${item}` : `/${lang}/#${item}`;

        return (
          <li key={i}>
            <Link
              href={destination}
              onClick={(e) => {
                if (isHome) {
                  smoothScroll(e);
                }
              }}
              className="nav-link-underline text-subheading font-medium tracking-wider text-content-body hover:text-content-heading transition-colors duration-500"
            >
              {nav[item]}
            </Link>
          </li>
        );
      })}
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
          href={contactDestination}
          onClick={(e) => {
            if (isHome) {
              smoothScroll(e);
            }
          }}
          className="nav-link-underline text-subheading font-medium tracking-wider text-content-body hover:text-content-heading transition-colors duration-500"
        >
          {nav[contactItem]}
        </Link>
      </li>
    </ul>
  );
}

export default function HeroNav({ lang, strings }) {
  const { nav, a11y } = strings;
  return (
    <header>
      {/* Fixed Top Navbar for Desktop — fully static, server-rendered */}
      <nav
        aria-label={a11y.desktopNav}
        className="hidden lg:flex fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl px-8 pe-10 py-4"
      >
        <div className="relative flex items-center w-full">
          <a href={`/${lang}/#home`} onClick={smoothScroll} aria-label="Samir Magdy Web Studio - Home">
            <Image
              src="/brand.svg"
              alt="SM Web Design Studio – Website Design Company in Egypt"
              width={95}
              height={79}
              style={{ height: "auto" }}
              priority
            />
          </a>
          <DesktopNavLinks nav={nav} />
          <LanguageToggle lang={lang} label={strings.langToggleLabel} />
        </div>
      </nav>

      {/* Mobile menu — only client island in the header */}
      <MobileMenu
        lang={lang}
        nav={nav}
        a11y={{
          mobileNav: a11y.mobileNav,
          openMenu: a11y.openMenu,
          closeMenu: a11y.closeMenu,
        }}
        langToggleLabel={strings.langToggleLabel}
      />
    </header>
  );
}
