"use client";

import { useState, useEffect, useRef, useCallback, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LanguageToggle from "@/app/components/ui/LanguageToggle";
import { navItems, type NavKey } from "@/app/data/translations/nav";
import type { Lang } from "@/app/types";
import { SITE_NAME } from "@/app/constants";
import { CHAT_CLOSE_EVENT } from "@/app/components/chat/ChatWidget";

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

const EASE_OUT_EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";

export default function MobileMenu({
  lang,
  nav,
  a11y,
  langToggleLabel,
}: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [origin, setOrigin] = useState({ x: "100%", y: "0%" });
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const toggleLockedUntil = useRef(0);
  const pathname = usePathname();

  const TOGGLE_LOCKOUT_MS = 500;

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

  const captureOrigin = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setOrigin({
      x: `${rect.left + rect.width / 2}px`,
      y: `${rect.top + rect.height / 2}px`,
    });
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const now = performance.now();
    if (now < toggleLockedUntil.current) return;
    toggleLockedUntil.current = now + TOGGLE_LOCKOUT_MS;
    captureOrigin();
    const next = !isMenuOpen;
    setIsMenuOpen(next);
    if (next) window.dispatchEvent(new Event(CHAT_CLOSE_EVENT));
  };

  const clipPath = `circle(${isMenuOpen ? 150 : 0}% at ${origin.x} ${origin.y})`;
  const clipDuration = 2000;
  const clipDelay = isMenuOpen ? 0 : 150;

  const itemLift = (index: number): CSSProperties => {
    const openDelay = 220 + index * 60;
    return {
      animation: isMenuOpen
        ? `menu-item-in 550ms ${EASE_OUT_EXPO} ${openDelay}ms both`
        : "none",
      willChange: "transform, opacity",
    };
  };

  return (
    <nav
      id="mobile-menu"
      aria-label={a11y.mobileNav}
      className="lg:hidden fixed top-0 inset-x-0 z-51 pointer-events-none"
    >
      <div
        className="absolute top-0 inset-x-0 w-full py-1 z-50 backdrop-blur-lg pointer-events-auto"
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

      <div
        onClick={closeMenu}
        inert={!isMenuOpen}
        className={`pt-10 fixed inset-0 z-40 flex flex-col items-center justify-center bg-background ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{
          clipPath,
          WebkitClipPath: clipPath,
          transition: `clip-path ${clipDuration}ms ${EASE_OUT_EXPO} ${clipDelay}ms, -webkit-clip-path ${clipDuration}ms ${EASE_OUT_EXPO} ${clipDelay}ms`,
        }}
      >
        <ul
          className="flex flex-col items-center gap-8 font-semibold text-content-heading text-3xl tracking-wide"
          onClick={(e) => e.stopPropagation()}
        >
          {navItems.map((item, i) => {
            if (item.kind === "hash") {
              return (
                <li key={item.key} style={itemLift(i)}>
                  {/* pathname doesn't include the hash, so the pathname-effect
                      won't fire on same-page hash nav — close explicitly. */}
                  <Link
                    href={`/${lang}#${item.target}`}
                    onClick={closeMenu}
                  >
                    {nav[item.key]}
                  </Link>
                </li>
              );
            }

            const routeHref = `/${lang}/${item.path}`;
            return (
              <li
                key={item.key}
                onClick={(e) => e.stopPropagation()}
                style={itemLift(i)}
              >
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
            style={itemLift(navItems.length)}
          >
            <LanguageToggle lang={lang} label={langToggleLabel} />
          </li>
        </ul>
      </div>
    </nav>
  );
}
