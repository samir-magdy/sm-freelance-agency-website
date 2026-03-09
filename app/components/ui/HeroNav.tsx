"use client";

import { useState } from "react";
import Image from "next/image";
import translations from "@/app/data/translations";
import type { Lang } from "@/app/data/translations";
import LanguageToggle from "./LanguageToggle";
import SocialIcons from "./SocialIcons";

export default function HeroNav({ lang }: { lang: Lang }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations;

  return (
    <header>
      {/* Fixed Top Navbar for Desktop */}
      <nav
        aria-label={t.a11y.desktopNav[lang]}
        className="hidden xl:flex fixed top-0 left-0 right-0 z-50 h-24 backdrop-blur-3xl"
      >
        <div className="relative flex items-center justify-center w-[85%] max-w-[85%] mx-auto">
          <a
            href="#home"
            aria-label="Samir Magdy - Home"
            className="absolute start-0"
          >
            <Image
              src="/brand.svg"
              alt="SM WEB STUDIO LOGO"
              width={75}
              height={75}
              priority
            />
          </a>
          <ul className="flex w-1/2 justify-between">
            <li>
              <a
                href="#services"
                className="nav-link-underline text-base font-medium tracking-wider text-content-body hover:text-content-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm transition-colors duration-300"
              >
                {t.nav.services[lang]}
              </a>
            </li>
            <li>
              <a
                href="#add-ons"
                className="nav-link-underline text-base font-medium tracking-wider text-content-body hover:text-content-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm transition-colors duration-300"
              >
                {t.nav.addOns[lang]}
              </a>
            </li>
            <li>
              <a
                href="#portfolio"
                className="nav-link-underline text-base font-medium tracking-wider text-content-body hover:text-content-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm transition-colors duration-300"
              >
                {t.nav.projects[lang]}
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="nav-link-underline text-base font-medium tracking-wider text-content-body hover:text-content-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm transition-colors duration-300"
              >
                {t.nav.howItWorks[lang]}
              </a>
            </li>
            <li>
              <a
                href="#faq"
                className="nav-link-underline text-base font-medium tracking-wider text-content-body hover:text-content-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm transition-colors duration-300"
              >
                {t.nav.faq[lang]}
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="nav-link-underline text-base font-medium tracking-wider text-content-body hover:text-content-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm transition-colors duration-300"
              >
                {t.nav.contact[lang]}
              </a>
            </li>
          </ul>
          <div className="absolute end-0">
            <LanguageToggle lang={lang} />
          </div>
        </div>
      </nav>

      {/* Mobile Hamburger Bar */}
      <div
        className={`
          xl:hidden
          fixed top-0 left-0 right-0 z-50
          transition-all duration-[250ms] px-4 pe-5
          backdrop-blur-2xl`}
      >
        <div className="flex justify-between items-center" dir="ltr">
          <a href="#home" aria-label="Samir Magdy - Home">
            <Image
              src="/favicon-v3.svg"
              alt="SM WEB STUDIO LOGO"
              width={30}
              height={30}
              priority
              style={{ filter: "brightness(0.80)" }}
            />
          </a>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block p-6 py-5 -mr-6"
            aria-label={
              isMenuOpen ? t.a11y.closeMenu[lang] : t.a11y.openMenu[lang]
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-6 flex flex-col gap-0.5">
              <span
                className={`block h-0.5 bg-content-heading transition-transform duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-[4px]" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-content-heading transition-all duration-300 ${
                  isMenuOpen ? "opacity-0 scale-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-content-heading transition-transform duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-[4px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <nav
        id="mobile-menu"
        aria-label={t.a11y.mobileNav[lang]}
        aria-hidden={!isMenuOpen}
        onClick={() => setIsMenuOpen(false)}
        className={`2xl:hidden fixed inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-2xl z-40 transition-[opacity,visibility] duration-[250ms] ease-out overscroll-none touch-none ${isMenuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}`}
      >
        <ul className="flex flex-col items-center gap-3">
          <li>
            <a
              href="#services"
              className="font-semibold text-content-body text-[1.75rem] tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm"
            >
              {t.nav.services[lang]}
            </a>
          </li>
          <li>
            <a
              href="#add-ons"
              className="font-semibold text-content-body text-[1.75rem] tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm"
            >
              {t.nav.addOns[lang]}
            </a>
          </li>
          <li>
            <a
              href="#portfolio"
              className="font-semibold text-content-body text-[1.75rem] tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm"
            >
              {t.nav.projects[lang]}
            </a>
          </li>
          <li>
            <a
              href="#how-it-works"
              className="font-semibold text-content-body text-[1.75rem] tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm"
            >
              {t.nav.howItWorks[lang]}
            </a>
          </li>
          <li>
            <a
              href="#faq"
              className="font-semibold text-content-body text-[1.75rem] tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm"
            >
              {t.nav.faq[lang]}
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="font-semibold text-content-body text-[1.75rem] tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm"
            >
              {t.nav.contact[lang]}
            </a>
          </li>
        </ul>
        <div className="flex flex-col absolute bottom-16 items-center gap-8">
          <LanguageToggle lang={lang} />
          <SocialIcons />
        </div>
      </nav>
    </header>
  );
}
