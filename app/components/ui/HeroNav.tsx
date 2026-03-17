import Image from "next/image";
import type { Lang } from "@/app/data/translations";
import ScrollLink from "./ScrollLink";
import DesktopNavLinks from "./DesktopNavLinks";
import LanguageToggle from "./LanguageToggle";
import MobileMenu from "./MobileMenu";

interface HeroNavStrings {
  nav: {
    services: string;
    addOns: string;
    projects: string;
    howItWorks: string;
    faq: string;
    contact: string;
  };
  a11y: {
    desktopNav: string;
    mobileNav: string;
    openMenu: string;
    closeMenu: string;
  };
  langToggleLabel: string;
}

export default function HeroNav({
  lang,
  strings,
}: {
  lang: Lang;
  strings: HeroNavStrings;
}) {
  const { nav, a11y } = strings;

  return (
    <header>
      {/* Fixed Top Navbar for Desktop — fully static, server-rendered */}
      <nav
        aria-label={a11y.desktopNav}
        className="hidden xl:flex fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl px-8 pe-10"
      >
        <div className="py-2 relative flex items-center w-full">
          <ScrollLink to="home" aria-label="Samir Magdy - Home">
            <Image
              src="/brand.svg"
              alt="SM Web Studio – Website Design Company in Egypt"
              width={115}
              height={115}
              priority
            />
          </ScrollLink>
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
