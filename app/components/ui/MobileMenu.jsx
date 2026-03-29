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
        <ul className="flex flex-col items-center gap-4 pb-16">
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
        <div className="flex flex-col absolute bottom-12 items-center gap-12">
          <div className="flex flex-col items-center gap-4">
             <a
            href="tel:+201274613331"
            dir="ltr"
            className="inline-flex items-center gap-1.5 text-content-muted hover:text-content-heading"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            <p className="md:pb-0.5 text-lg">+20 127 461 3331</p>
          </a>
          <SocialIcons />
          </div>
          <LanguageToggle lang={lang} label={langToggleLabel} />
        </div>
      </div>
    </nav>
  );
}
