"use client";

import { useState } from "react";
import Image from "next/image";
import LanguageToggle from "./LanguageToggle";
import SocialIcons from "./SocialIcons";

export default function MobileMenu({ lang, nav, a11y, langToggleLabel }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      id="mobile-menu"
      aria-label={a11y.mobileNav}
      aria-hidden={!isMenuOpen}
      onClick={() => isMenuOpen && setIsMenuOpen(false)}
      className={`xl:hidden fixed inset-0 z-50 ${isMenuOpen ? "pointer-events-auto overscroll-none touch-none" : "pointer-events-none"}`}
    >
      {/* Full-screen backdrop — animates in when open */}
      <div
        className={`absolute inset-0 backdrop-blur-3xl bg-black/40 transition-opacity duration-[250ms] ease-out ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
      />

      {/* Navbar row — always visible and interactive, clicking it also closes the menu */}
      <div
        className="absolute top-0 left-0 right-0 z-10 backdrop-blur-xl pointer-events-auto"
        dir="ltr"
      >
        <div className="flex justify-between items-center px-3">
          <a href="#SMWebStudioEG" aria-label="Samir Magdy Web Studio - Home">
            <Image
              src="/brand.svg"
              alt="SM Web Studio – Website Design Company in Egypt"
              width={80}
              height={80}
              priority
            />
          </a>
          <button
            onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
            className="block p-4"
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

      {/* Menu content — animates in/out */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-[opacity,visibility] duration-[250ms] ease-out ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
      >
        <ul className="flex flex-col items-center gap-4 pb-6">
          <li>
            <a
              href="#features"
              className="font-semibold text-content-body text-[1.75rem] tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm"
            >
              {nav.features}
            </a>
          </li>
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
              href="#portfolio"
              className="font-semibold text-content-body text-[1.75rem] tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm"
            >
              {nav.portfolio}
            </a>
          </li>
          <li>
            <a
              href="#pricing"
              className="font-semibold text-content-body text-[1.75rem] tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm"
            >
              {nav.pricing}
            </a>
          </li>
          <li>
            <a
              href="#process"
              className="font-semibold text-content-body text-[1.75rem] tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm"
            >
              {nav.process}
            </a>
          </li>
          <li>
            <a
              href="#FAQs"
              className="font-semibold text-content-body text-[1.75rem] tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm"
            >
              {nav.FAQs}
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
        <div className="flex flex-col absolute bottom-8 items-center gap-5">
          <div className="flex flex-col items-center gap-4">
          <SocialIcons />
          </div>
          <LanguageToggle lang={lang} label={langToggleLabel} />
        </div>
      </div>
    </nav>
  );
}
