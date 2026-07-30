"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LanguageToggle from "../ui/LanguageToggle";
import { navItems, type NavKey } from "@/app/data/translations/nav";
import type { Lang } from "@/app/types";
import { SITE_NAME } from "@/app/constants";

interface MobileMenuProps {
  lang: Lang;
  nav: Record<NavKey, string>;
  a11y: {
    mobileNav: string;
    openMenu: string;
    closeMenu: string;
  };
  langToggleLabel: string;
}

export default function MobileMenu({
  lang,
  nav,
  a11y,
  langToggleLabel,
}: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
      className="lg:hidden fixed top-0 inset-x-0 z-51 pointer-events-none"
    >
      <div
        className="absolute top-0 inset-x-0 w-full py-1 z-50 backdrop-blur-xl pointer-events-auto"
        dir="ltr"
      >
        <div className="flex justify-between items-center px-3">
          <a
            href={`/${lang}`}
            aria-label="Samir Magdy Web Studio - Home"
            onClick={closeMenu}
          >
            <Image
              src="/brand.svg"
              alt={`${SITE_NAME} – Website Design Company in Egypt`}
              width={50}
              height={42}
              priority
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
        className={`pt-10 fixed inset-0 z-40 flex flex-col items-center justify-center transition-[opacity,visibility] ease-out ${
          isMenuOpen
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <ul
          className="flex flex-col items-center gap-8 font-semibold text-content-heading text-3xl tracking-wide"
          onClick={(e) => e.stopPropagation()}
        >
          {navItems.map((item) => {
            if (item.kind === "hash") {
              return (
                <li key={item.key}>
                  {/* Plain <a>: Next Link to a same-page hash sometimes fails
                      to scroll on first click. Native anchor nav is reliable.
                      pathname doesn't include the hash, so the pathname-effect
                      won't fire on same-page hash nav — close explicitly. */}
                  <a
                    href={`/${lang}#${item.target}`}
                    onClick={closeMenu}
                  >
                    {nav[item.key]}
                  </a>
                </li>
              );
            }

            const routeHref = `/${lang}/${item.path}`;
            return (
              <li key={item.key} onClick={(e) => e.stopPropagation()}>
                <Link
                  href={routeHref}
                  onClick={pathname === routeHref ? closeMenu : undefined}
                >
                  {nav[item.key]}
                </Link>
              </li>
            );
          })}
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
