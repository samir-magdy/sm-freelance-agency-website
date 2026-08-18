"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LanguageToggle from "@/app/components/ui/LanguageToggle";
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
  langToggleAriaLabel: string;
}

const EASE_OUT_EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";
const TOGGLE_LOCKOUT_MS = 800;

export default function MobileMenu({
  lang,
  nav,
  a11y,
  langToggleLabel,
  langToggleAriaLabel,
}: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [origin, setOrigin] = useState({ x: "100%", y: "0%" });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const toggleLockedUntil = useRef(0);
  const pathname = usePathname();

  const closeMenu = () => setIsMenuOpen(false);

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

  const handleToggle = () => {
    const now = performance.now();
    if (now < toggleLockedUntil.current) return;
    toggleLockedUntil.current = now + TOGGLE_LOCKOUT_MS;

    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setOrigin({
        x: `${rect.left + rect.width / 2}px`,
        y: `${rect.top + rect.height / 2}px`,
      });
    }

    setIsMenuOpen(!isMenuOpen);
  };

  const clipPath = `circle(${isMenuOpen ? 150 : 0}% at ${origin.x} ${origin.y})`;
  const clipDelay = isMenuOpen ? 0 : 150;

  const itemStyle = (index: number) => ({
    animation: isMenuOpen
      ? `menu-item-in 550ms ${EASE_OUT_EXPO} ${220 + index * 60}ms both`
      : "none",
    willChange: "transform, opacity",
  });

  return (
    <>
      <div
        className="lg:hidden fixed top-0 inset-x-0 w-full py-1 z-50 backdrop-blur-lg"
        dir="ltr"
      >
        <div className="flex justify-between items-center px-3">
          <a
            href={`/${lang}`}
            aria-label={`${SITE_NAME} - Home`}
            onClick={closeMenu}
          >
            <Image
              src="/brand.svg"
              alt={`${SITE_NAME} – Website Design Company in Egypt`}
              width={50}
              height={42}
              priority
              className="sm:size-20"
            />
          </a>
          <button
            ref={buttonRef}
            onClick={handleToggle}
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

      {/* Decorative reveal — clip-path lives here, never a click target.
          Chrome Android's hit-testing on a clip-path element mid-transition
          drops the first tap, so we split visual from interactive.. */}
      <div
        aria-hidden
        className="lg:hidden fixed inset-0 z-40 bg-background pointer-events-none"
        style={{
          clipPath,
          WebkitClipPath: clipPath,
          willChange: "clip-path",
          transition: `clip-path 2000ms ${EASE_OUT_EXPO} ${clipDelay}ms, -webkit-clip-path 2000ms ${EASE_OUT_EXPO} ${clipDelay}ms`,
        }}
      />

      <nav
        id="mobile-menu"
        aria-label={a11y.mobileNav}
        onClick={closeMenu}
        inert={!isMenuOpen}
        className={`lg:hidden pt-10 fixed inset-0 z-40 flex flex-col items-center justify-center ${
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{
          clipPath,
          WebkitClipPath: clipPath,
          // On open: no clip-path transition (snaps to full) so Chrome Android
          // hit-testing stays reliable while the menu is interactive.
          // On close: mirror the bg's clip-path animation so items sweep away
          // with the reveal — safe because the nav is pointer-events-none.
          transition: isMenuOpen
            ? "opacity 0s"
            : `clip-path 2000ms ${EASE_OUT_EXPO} ${clipDelay}ms, -webkit-clip-path 2000ms ${EASE_OUT_EXPO} ${clipDelay}ms, opacity 0s 2000ms`,
        }}
      >
        <ul
          className="flex flex-col items-center gap-8 font-semibold text-content-heading text-3xl sm:text-5xl sm:gap-12 tracking-wide"
          onClick={(e) => e.stopPropagation()}
        >
          {navItems.map((item, i) => {
            if (item.kind === "hash") {
              return (
                <li key={item.key} style={itemStyle(i)}>
                  {/* pathname doesn't include the hash, so the pathname-effect
                      won't fire on same-page hash nav — close explicitly. */}
                  <Link href={`/${lang}#${item.target}`} onClick={closeMenu}>
                    {nav[item.key]}
                  </Link>
                </li>
              );
            }

            const routeHref = `/${lang}/${item.path}`;
            return (
              <li key={item.key} style={itemStyle(i)}>
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
            className="pt-4 [&_svg]:block [&_a]:text-[1.25rem] [&_a]:sm:text-2xl"
            style={itemStyle(navItems.length)}
          >
            <LanguageToggle
              lang={lang}
              label={langToggleLabel}
              ariaLabel={langToggleAriaLabel}
            />
          </li>
        </ul>
      </nav>
    </>
  );
}
