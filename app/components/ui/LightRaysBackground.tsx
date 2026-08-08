"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

// Lazy import so the ~40KB LightRays + ogl chunk never ships to viewports
// that will be gated out below. Fetch is triggered by first render, which
// only happens once the media query passes.
const LightRays = dynamic(() => import("./LightRays"), { ssr: false });

const READY_FALLBACK_MS = 1200;
const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

function subscribeDesktop(callback: () => void) {
  const mql = window.matchMedia(DESKTOP_MEDIA_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}
function getDesktopSnapshot() {
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
}
// SSR has no viewport; assume mobile so the WebGL canvas doesn't render
// server-side and cause a hydration flash on small screens.
function getDesktopServerSnapshot() {
  return false;
}

export default function LightRaysBackground() {
  const pathname = usePathname();
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    getDesktopSnapshot,
    getDesktopServerSnapshot,
  );
  const [ready, setReady] = useState(false);
  const [fallbackFired, setFallbackFired] = useState(false);

  useEffect(() => {
    if (!isDesktop) return;
    const readyFallbackTimer = setTimeout(
      () => setFallbackFired(true),
      READY_FALLBACK_MS,
    );
    return () => clearTimeout(readyFallbackTimer);
  }, [isDesktop]);

  if (!isDesktop) return null;

  // Toggle visibility via CSS instead of unmounting on /guides. Unmounting
  // tears down the WebGL context; remounting on the next nav re-inits it,
  // causing a bright flash. Keep the canvas alive across navigations.
  const hidden = /^\/[^/]+\/guides(\/|$)/.test(pathname ?? "");
  const visible = (ready || fallbackFired) && !hidden;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-11 pointer-events-none mix-blend-screen transition-opacity duration-500 ${visible ? "opacity-60" : "opacity-0"}`}
    >
      {/* One instance now draws both ray origins (left + right) in a single
          canvas / shader pass — halving contexts, compiles, and fill. */}
      <div className="absolute inset-0">
        <LightRays onReady={() => setReady(true)} />
      </div>
    </div>
  );
}
