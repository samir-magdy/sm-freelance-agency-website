import Image from "next/image";
import LanguageToggle from "../ui/LanguageToggle";
import MobileMenu from "./MobileMenu";
import DesktopNavLinks from "./DesktopNavLinks";
import type { Lang } from "@/app/types";
import type { NavKey } from "@/app/data/translations/nav";

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
              alt="SM Web Design Studio – Website Design Company in Egypt"
              width={80}
              height={69}
              style={{ height: "auto" }}
              priority
            />
          </a>
          <DesktopNavLinks nav={nav} />
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
