"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Hashes we deliberately keep in the URL (screen readers rely on the skip
// link's hash to move focus to the main-content target).
const EXEMPT_HASHES = new Set(["#main-content"]);

// Sitewide: keep URL fragments out of the address bar.
// - Same-page hash clicks: intercept, scroll manually, never update the URL.
// - Cross-page hash nav and external deep links: let the navigation happen,
//   then strip the hash via replaceState after the browser positions us.
export default function HashUrlStripper() {
  const pathname = usePathname();

  useEffect(() => {
    // Capture phase: fires before Next Link's own onClick (which preventDefaults
    // and would set e.defaultPrevented) and before any React bubble handler can
    // stopPropagation (e.g. MobileMenu's <ul onClick={e.stopPropagation}>).
    const onClick = (e: MouseEvent) => {
      if (
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const anchor = (e.target as Element | null)?.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (!url.hash || url.hash === "#") return;
      if (EXEMPT_HASHES.has(url.hash)) return;
      if (url.pathname !== window.location.pathname) return;

      e.preventDefault();
      const id = decodeURIComponent(url.hash.slice(1));
      // Match the CSS intent: smooth from the hamburger breakpoint up,
      // instant below it. An explicit `behavior` here always overrides the
      // `html { scroll-behavior }` CSS, so we mirror the same breakpoint.
      const behavior: ScrollBehavior = window.matchMedia(
        "(min-width: 1024px)",
      ).matches
        ? "smooth"
        : "auto";
      document.getElementById(id)?.scrollIntoView({ behavior });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // After navigation (initial load, Next route change, back/forward), if a
  // hash is present, scroll to it and strip it from the URL bar.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash === "#") return;
    if (EXEMPT_HASHES.has(hash)) return;

    const id = decodeURIComponent(hash.slice(1));
    // rAF lets the browser complete its own hash-scroll first so our scroll
    // is a cheap no-op instead of a second animation.
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "auto" });
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    });
  }, [pathname]);

  return null;
}
