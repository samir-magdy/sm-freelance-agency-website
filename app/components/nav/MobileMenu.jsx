"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LanguageToggle from "../ui/LanguageToggle";
import { ArrowRight } from "lucide-react";

import translations from "@/app/data/translations";

const { navLinks, hero } = translations;

export default function MobileMenu({ lang, nav, a11y, langToggleLabel }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome =
    pathname === `/${lang}` || pathname === `/${lang}/` || pathname === "/";
  const contactItem = navLinks[navLinks.length - 1];

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();

    if (isHome) {
      closeMenu();
      setTimeout(() => {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    } else {
      router.push(`/${lang}/#${targetId}`);
    }
  };

  // Close menu after pathname changes so navigation renders first, preventing
  // the overlay fade from briefly exposing the previous page (production flicker).
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <nav
      id="mobile-menu"
      aria-label={a11y.mobileNav}
      className="lg:hidden fixed top-0 inset-x-0 z-50 pointer-events-none"
    >
      <div
        className="absolute top-0 inset-x-0 w-full py-1 z-50 backdrop-blur-xl pointer-events-auto"
        dir="ltr"
      >
        <div className="flex justify-between items-center px-3 ps-5">
          <a
            href={`/${lang}/#home`}
            aria-label="Samir Magdy Web Studio - Home"
            onClick={closeMenu}
          >
            <Image
              src="/brand.svg"
              alt="SM Web Design Studio – Website Design Company in Egypt"
              width={50}
              height={42}
              loading="eager"
            />
          </a>
          {/* Header CTA — hidden when menu is open */}
          {!isMenuOpen && (
            <a
              id="mobile-header-cta"
              href={isHome ? "#contact" : `/${lang}/#contact`}
              onClick={(e) => handleNavClick(e, contactItem)}
              className="border border-white/20 font-semibold text-content-body text-sm px-4 py-2 gap-1.5 rounded-lg tracking-wide whitespace-nowrap inline-flex items-center ms-auto mr-3"
            >
              <ArrowRight
                className={`size-3.5 rotate-180 ${lang === "en" ? "hidden" : ""}`}
                aria-hidden
              />
              {hero.mobileHeaderCta[lang]}
              <ArrowRight
                className={`size-3.5 ${lang === "ar" ? "hidden" : ""}`}
                aria-hidden
              />
            </a>
          )}
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
            <span className="w-8 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 bg-content-heading transition-transform duration-500 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block h-0.5 bg-content-heading transition-all duration-500 ${isMenuOpen ? "opacity-0 scale-0" : ""}`}
              />
              <span
                className={`block h-0.5 bg-content-heading transition-transform duration-500 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        onClick={closeMenu}
        inert={!isMenuOpen}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-250 ease-out ${
          isMenuOpen
            ? "opacity-100 backdrop-blur-3xl pointer-events-auto"
            : "opacity-0 backdrop-blur-none pointer-events-none"
        }`}
      />

      <div
        onClick={closeMenu}
        inert={!isMenuOpen}
        className={`pt-10 fixed inset-0 z-40 flex flex-col items-center justify-center transition-[opacity,visibility] duration-250ms ease-out ${
          isMenuOpen
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <ul
          className="flex flex-col items-center gap-8"
          onClick={(e) => e.stopPropagation()}
        >
          {navLinks.slice(0, -1).map((item) => (
            <li key={item}>
              <a
                href={isHome ? `#${item}` : `/${lang}/#${item}`}
                onClick={(e) => handleNavClick(e, item)}
                className="font-semibold text-content-body text-3xl tracking-wide"
              >
                {nav[item]}
              </a>
            </li>
          ))}
          <li onClick={(e) => e.stopPropagation()}>
            <Link
              href={`/${lang}/about`}
              onClick={pathname === `/${lang}/about` ? closeMenu : null}
              className="font-semibold text-content-body text-3xl tracking-wide"
            >
              {nav["about"]}
            </Link>
          </li>
          <li key={contactItem}>
            <a
              href={isHome ? `#${contactItem}` : `/${lang}/#${contactItem}`}
              onClick={(e) => handleNavClick(e, contactItem)}
              className="font-semibold text-content-body text-3xl tracking-wide"
            >
              {nav[contactItem]}
            </a>
          </li>
          <li
            onClick={(e) => e.stopPropagation()}
            className="pt-4 [&_svg]:block [&_a]:text-[1.25rem]"
          >
            <LanguageToggle lang={lang} label={langToggleLabel} />
          </li>
        </ul>
      </div>
    </nav>
  );
}
