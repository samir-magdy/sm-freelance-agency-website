"use client"

import Image from "next/image";
import DesktopNavLinks from "./DesktopNavLinks";
import LanguageToggle from "./LanguageToggle";
import MobileMenu from "./MobileMenu";
import SmoothScroll from "./utils/SmoothScroll";

export default function HeroNav({ lang, strings }) {
  const { nav, a11y } = strings;
  const handleScroll = SmoothScroll();

  return (
    <header>
      {/* Fixed Top Navbar for Desktop — fully static, server-rendered */}
      <nav
        aria-label={a11y.desktopNav}
        className="hidden xl:flex fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl px-8 pe-10 py-4"
      >
        <div className="relative flex items-center w-full">
          <a href={`/${lang}/#home`} onClick={handleScroll} aria-label="Samir Magdy Web Studio - Home">
            <Image
              src="/brand.svg"
              alt="SM Web Design Studio – Website Design Company in Egypt"
              width={80}
              height={80}
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
