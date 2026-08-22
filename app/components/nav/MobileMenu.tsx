"use client";

import { useState, useEffect, useRef, type CSSProperties } from "react";
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
const REVEAL_DELAY_MS = 200;
const REVEAL_DURATION_MS = 2000;

export default function MobileMenu({
  lang,
  nav,
  a11y,
  langToggleLabel,
  langToggleAriaLabel,
}: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [origin, setOrigin] = useState({ x: "100%", y: "0%", size: "0px" });
  // iOS Safari flashes the page behind a transform/scale reveal during a
  // simultaneous route change (see handleToggle comment below) — clip-path
  // doesn't have that failure mode there, but costs a full-viewport mask
  // repaint every frame, which is the reason it was dropped in the first
  // place and is a worse trade on Android/Chrome, where the scaled version
  // is flicker-free. So: clip-path on iOS only, transform everywhere else.
  const [useClipReveal, setUseClipReveal] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const toggleLockedUntil = useRef(0);
  const pathname = usePathname();

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    const isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isIOS) setUseClipReveal(true);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      return;
    }

    // iOS Safari can flash whatever is behind fixed elements for a frame
    // when body `overflow` changes while they're still on screen — most
    // visible when a route change is mounting new content underneath at
    // the same time (Android/Chrome doesn't have this bug). Keep scroll
    // locked until the reveal circle has fully collapsed so nothing is
    // left to flash by the time it lifts.
    const timeout = setTimeout(() => {
      document.body.style.overflow = "";
    }, REVEAL_DELAY_MS + REVEAL_DURATION_MS);

    return () => {
      clearTimeout(timeout);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleToggle = () => {
    const now = performance.now();
    if (now < toggleLockedUntil.current) return;
    toggleLockedUntil.current = now + TOGGLE_LOCKOUT_MS;

    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Diameter needed to cover the screen from this origin — the
      // distance to the farthest corner, not a blanket oversized
      // constant. A flat 300vmax box (regardless of origin) is a
      // ~7500px+ square at typical phone width x 3x DPR, well past
      // what iOS keeps comfortably tiled/composited; on a route change
      // landing while the menu is still open, that oversized layer is
      // a likely source of the page-behind flashing through for a
      // frame. Sizing to just what's needed keeps the same
      // transform-only technique but with a far smaller layer.
      const radius = Math.hypot(
        Math.max(cx, window.innerWidth - cx),
        Math.max(cy, window.innerHeight - cy),
      );
      setOrigin({
        x: `${cx}px`,
        y: `${cy}px`,
        size: `${Math.ceil(radius * 2) + 8}px`,
      });
    }

    setIsMenuOpen(!isMenuOpen);
  };

  const revealScale = isMenuOpen ? 1 : 0;
  const revealDelay = isMenuOpen ? 0 : REVEAL_DELAY_MS;
  const clipPath = `circle(${isMenuOpen ? 150 : 0}% at ${origin.x} ${origin.y})`;

  const revealClassName = useClipReveal
    ? "lg:hidden fixed inset-0 z-40 bg-background pointer-events-none"
    : "lg:hidden fixed z-40 rounded-full bg-background pointer-events-none";

  const revealStyle: CSSProperties = useClipReveal
    ? {
        clipPath,
        WebkitClipPath: clipPath,
        willChange: "clip-path",
        transition: `clip-path ${REVEAL_DURATION_MS}ms ${EASE_OUT_EXPO} ${revealDelay}ms, -webkit-clip-path ${REVEAL_DURATION_MS}ms ${EASE_OUT_EXPO} ${revealDelay}ms`,
      }
    : {
        left: origin.x,
        top: origin.y,
        width: origin.size,
        height: origin.size,
        transform: `translate(-50%, -50%) scale(${revealScale})`,
        willChange: "transform",
        transition: `transform ${REVEAL_DURATION_MS}ms ${EASE_OUT_EXPO} ${revealDelay}ms`,
      };

  const navStyle: CSSProperties = useClipReveal
    ? {
        clipPath,
        WebkitClipPath: clipPath,
        // On open: no clip-path transition (snaps to full) so Chrome Android
        // hit-testing stays reliable while the menu is interactive.
        // On close: mirror the bg's clip-path animation so items sweep away
        // with the reveal — safe because the nav is pointer-events-none.
        transition: isMenuOpen
          ? "opacity 0s"
          : `clip-path ${REVEAL_DURATION_MS}ms ${EASE_OUT_EXPO} ${revealDelay}ms, -webkit-clip-path ${REVEAL_DURATION_MS}ms ${EASE_OUT_EXPO} ${revealDelay}ms, opacity 0s ${REVEAL_DURATION_MS}ms`,
      }
    : {
        // On open: no transition (snaps visible) — items handle their own
        // staggered entrance via the menu-item-in keyframe.
        // On close: fade out quickly, well within the reveal circle's
        // shrink (which front-loads its motion via ease-out-expo), so
        // text is gone before the backdrop finishes collapsing.
        transition: isMenuOpen
          ? "opacity 0s"
          : `opacity 250ms ${EASE_OUT_EXPO} ${revealDelay}ms`,
      };

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
              className="sm:size-19"
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
            <span className="w-8 sm:w-14 flex flex-col gap-1.5 sm:gap-2">
              <span
                className={`block h-0.5 bg-content-heading transition-transform duration-500 ${isMenuOpen ? "rotate-45 translate-y-2 sm:translate-y-2.5" : ""}`}
                style={{ transitionDelay: `${revealDelay}ms` }}
              />
              <span
                className={`block h-0.5 bg-content-heading transition-all duration-500 ${isMenuOpen ? "opacity-0 scale-0" : ""}`}
                style={{ transitionDelay: `${revealDelay}ms` }}
              />
              <span
                className={`block h-0.5 bg-content-heading transition-transform duration-500 ${isMenuOpen ? "-rotate-45 -translate-y-2 sm:-translate-y-2.5" : ""}`}
                style={{ transitionDelay: `${revealDelay}ms` }}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Decorative reveal, never a click target. iOS gets a clip-path mask
          (see useClipReveal above); everywhere else gets a circle scaled
          via transform, sized to the exact distance-to-farthest-corner
          from the tap origin (see handleToggle) rather than a blanket
          oversized box, to keep the composited layer small. */}
      <div aria-hidden className={revealClassName} style={revealStyle} />

      <nav
        id="mobile-menu"
        aria-label={a11y.mobileNav}
        onClick={closeMenu}
        inert={!isMenuOpen}
        className={`lg:hidden pt-10 fixed inset-0 z-40 flex flex-col items-center justify-center ${
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={navStyle}
      >
        <ul
          className="flex flex-col items-center gap-8 font-semibold text-content-heading text-3xl sm:text-4xl sm:gap-12 tracking-wide"
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
