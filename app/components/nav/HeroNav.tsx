// Server component: only MobileMenu and LanguageToggle ship JS; hash-link
// smooth-scroll is handled by CSS `scroll-behavior` + Next's router.

import Image from "next/image";
import Link from "next/link";
import LanguageToggle from "../ui/LanguageToggle";
import MobileMenu from "./MobileMenu";
import type { Lang } from "@/app/types";
import { SITE_NAME } from "@/app/constants";
import { navItems, type NavKey } from "@/app/data/translations/nav";

export interface HeroNavStrings {
  nav: Record<NavKey, string>;
  a11y: {
    desktopNav: string;
    mobileNav: string;
    openMenu: string;
    closeMenu: string;
  };
  langToggleLabel: string;
}

interface HeroNavProps {
  lang: Lang;
  strings: HeroNavStrings;
}

export default function HeroNav({ lang, strings }: HeroNavProps) {
  const { nav, a11y } = strings;
  const linkClass =
    "nav-link-underline hover:text-content-heading transition-colors duration-500";

  return (
    <header>
      <nav
        aria-label={a11y.desktopNav}
        className="hidden lg:flex fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl px-8 pe-10 py-1 pt-1.5"
      >
        <div className="relative flex items-center w-full">
          <a href={`/${lang}`} aria-label="Samir Magdy Web Studio - Home">
            <Image
              src="/brand.svg"
              alt={`${SITE_NAME} – Website Design Company in Egypt`}
              width={80}
              height={69}
              style={{ height: "auto" }}
              priority
            />
          </a>
          <ul className="flex w-full justify-around xl:px-20 lg:px-16 text-subheading font-medium tracking-wider text-content-body">
            {navItems.map((item) =>
              item.kind === "hash" ? (
                <li key={item.key}>
                  {/* Plain <a>: Next Link to a same-page hash sometimes fails
                      to scroll on first click. Native anchor nav is reliable. */}
                  <a href={`/${lang}#${item.target}`} className={linkClass}>
                    {nav[item.key]}
                  </a>
                </li>
              ) : (
                <li key={item.key}>
                  <Link href={`/${lang}/${item.path}`} className={linkClass}>
                    {nav[item.key]}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <LanguageToggle lang={lang} label={strings.langToggleLabel} />
        </div>
      </nav>

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
