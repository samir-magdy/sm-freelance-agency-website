"use client";

import { useState } from "react";
import Image from "next/image";
import type { Lang } from "@/app/data/translations";
import LanguageToggle from "./LanguageToggle";
import SocialIcons from "./SocialIcons";

interface MobileMenuProps {
  lang: Lang;
  nav: {
    services: string;
    addOns: string;
    projects: string;
    howItWorks: string;
    faq: string;
    contact: string;
  };
  a11y: {
    mobileNav: string;
    openMenu: string;
    closeMenu: string;
  };
  langToggleLabel: string;
}

export default function MobileMenu({ lang, nav, a11y, langToggleLabel }: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger Bar */}
      <div
        className={`
          xl:hidden
          fixed top-0 left-0 right-0 z-50
          p-2 pr-5
          backdrop-blur-2xl`}
      >
        <div className="flex justify-between items-center" dir="ltr">
          <a href="#home" aria-label="Samir Magdy - Home">
            <Image
              src="/brand.svg"
              alt="SM WEB STUDIO LOGO"
              width={75}
              height={75}
              priority
            />
          </a>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block"
            aria-label={isMenuOpen ? a11y.closeMenu : a11y.openMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-10 flex flex-col gap-2">
              <span
                className={`block h-0.5 bg-content-heading transition-transform duration-500 ${
                  isMenuOpen ? "rotate-45 translate-y-[10px]" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-content-heading transition-all duration-500 ${
                  isMenuOpen ? "opacity-0 scale-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-content-heading transition-transform duration-500 ${
                  isMenuOpen ? "-rotate-45 -translate-y-[10px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <nav
        id="mobile-menu"
        aria-label={a11y.mobileNav}
        aria-hidden={!isMenuOpen}
        onClick={() => setIsMenuOpen(false)}
        className={`2xl:hidden fixed pb-20 inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-2xl z-40 transition-[opacity,visibility] duration-[250ms] ease-out overscroll-none touch-none ${isMenuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}`}
      >
        <ul className="flex flex-col items-center gap-3">
          <li>
            <a
              href="#services"
              className="font-semibold text-content-body text-[1.75rem] tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm"
            >
              {nav.services}
            </a>
          </li>
          <li>
            <a
              href="#add-ons"
              className="font-semibold text-content-body text-[1.75rem] tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm"
            >
              {nav.addOns}
            </a>
          </li>
          <li>
            <a
              href="#portfolio"
              className="font-semibold text-content-body text-[1.75rem] tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm"
            >
              {nav.projects}
            </a>
          </li>
          <li>
            <a
              href="#how-it-works"
              className="font-semibold text-content-body text-[1.75rem] tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm"
            >
              {nav.howItWorks}
            </a>
          </li>
          <li>
            <a
              href="#faq"
              className="font-semibold text-content-body text-[1.75rem] tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm"
            >
              {nav.faq}
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="font-semibold text-content-body text-[1.75rem] tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm"
            >
              {nav.contact}
            </a>
          </li>
        </ul>
        <div className="flex flex-col absolute bottom-24 items-center gap-8">
          <LanguageToggle lang={lang} label={langToggleLabel} />
          <SocialIcons />
        </div>
      </nav>
    </>
  );
}
