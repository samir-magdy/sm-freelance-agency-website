import Image from "next/image";
import type { Lang } from "@/app/data/translations";
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
        className="hidden xl:flex fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl"
      >
        <div className="py-12 relative flex items-center justify-center w-[90%] mx-auto">
          <a
            href="#home"
            aria-label="Samir Magdy - Home"
            className="absolute start-0"
          >
            <Image
              src="/brand.svg"
              alt="SM WEB STUDIO LOGO"
              width={115}
              height={115}
              priority
            />
          </a>
          <ul className="ms-10 flex w-[65%] justify-between">
            <li>
              <a
                href="#services"
                className="nav-link-underline text-[1.3rem] font-medium tracking-wider text-content-body hover:text-content-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm transition-colors duration-500"
              >
                {nav.services}
              </a>
            </li>
            <li>
              <a
                href="#add-ons"
                className="nav-link-underline text-[1.3rem] font-medium tracking-wider text-content-body hover:text-content-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm transition-colors duration-500"
              >
                {nav.addOns}
              </a>
            </li>
            <li>
              <a
                href="#portfolio"
                className="nav-link-underline text-[1.3rem] font-medium tracking-wider text-content-body hover:text-content-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm transition-colors duration-500"
              >
                {nav.projects}
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="nav-link-underline text-[1.3rem] font-medium tracking-wider text-content-body hover:text-content-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm transition-colors duration-500"
              >
                {nav.howItWorks}
              </a>
            </li>
            <li>
              <a
                href="#faq"
                className="nav-link-underline text-[1.3rem] font-medium tracking-wider text-content-body hover:text-content-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm transition-colors duration-500"
              >
                {nav.faq}
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="nav-link-underline text-[1.3rem] font-medium tracking-wider text-content-body hover:text-content-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm transition-colors duration-500"
              >
                {nav.contact}
              </a>
            </li>
          </ul>
          <div className="absolute -end-5">
            <LanguageToggle lang={lang} label={strings.langToggleLabel} />
          </div>
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
