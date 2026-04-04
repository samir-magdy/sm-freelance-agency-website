"use client";

import { useState, useEffect } from "react"; // Added useEffect
import Image from "next/image";
import LanguageToggle from "./LanguageToggle";

export default function MobileMenu({ lang, nav, a11y, langToggleLabel }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <nav
      id="mobile-menu"
      aria-label={a11y.mobileNav}
      aria-hidden={!isMenuOpen}
      className="xl:hidden fixed top-0 left-0 right-0 z-50 pointer-events-none"
    >
      <div
        className="absolute top-0 left-0 right-0 z-50 py-2 backdrop-blur-xl pointer-events-auto"
        dir="ltr"
      >
        <div className="flex justify-between items-center px-3">
          <a
            href="#SMWebStudioEG"
            aria-label="Samir Magdy Web Studio - Home"
            onClick={closeMenu}
          >
            <Image
              src="/brand.svg"
              alt="SM Web Studio – Website Design Company in Egypt"
              width={70}
              height={70}
            />
          </a>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="block p-4"
            aria-label={isMenuOpen ? a11y.closeMenu : a11y.openMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="w-10 flex flex-col gap-2">
              <span
                className={`block h-0.5 bg-content-heading transition-transform duration-500 ${isMenuOpen ? "rotate-45 translate-y-2.5" : ""}`}
              />
              <span
                className={`block h-0.5 bg-content-heading transition-all duration-500 ${isMenuOpen ? "opacity-0 scale-0" : ""}`}
              />
              <span
                className={`block h-0.5 bg-content-heading transition-transform duration-500 ${isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-250 ease-out ${
          isMenuOpen
            ? "opacity-100 backdrop-blur-3xl pointer-events-auto"
            : "opacity-0 backdrop-blur-none pointer-events-none"
        }`}
      />

      <div
        onClick={closeMenu} // Added onClick here to close when clicking empty space
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center transition-[opacity,visibility] duration-250ms ease-out ${
          isMenuOpen
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Stop propagation on the UL so clicking the gap between links still closes the menu, 
            but clicking the list container itself doesn't (optional logic depending on preference) */}
        <ul
          className="flex flex-col items-center gap-6"
          onClick={(e) => e.stopPropagation()}
        >
          {[
            "features",
            "services",
            "portfolio",
            "pricing",
            "process",
            "FAQs",
            "contact",
          ].map((item) => (
            <li key={item}>
              <a
                href={`#${item}`}
                onClick={closeMenu}
                className="font-semibold text-content-body text-[1.6rem] tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light rounded-sm"
              >
                {nav[item]}
              </a>
            </li>
          ))}
        </ul>
        <div
          className="flex flex-col absolute bottom-12 items-center gap-8"
          onClick={(e) => e.stopPropagation()}
        >
          <LanguageToggle lang={lang} label={langToggleLabel} />
        </div>
      </div>
    </nav>
  );
}
