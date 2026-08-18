"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import LightRaysToggle, { useLightRaysEnabled } from "./LightRaysToggle";
import a11y from "@/app/data/translations/a11y";
import { isLang } from "@/app/types";

// Lazy import so the ~40KB LightRays + ogl chunk never ships to viewports
// that will be gated out below. Fetch is triggered by first render, which
// only happens once the media query passes.
const LightRays = dynamic(() => import("./LightRays"), { ssr: false });

const READY_FALLBACK_MS = 1200;
// Gate on actual pointer capability, not viewport width — a touch device
// should never get this regardless of screen size, and anything with a real
// mouse should, regardless of how narrow the window is.
const FINE_POINTER_MEDIA_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeFinePointer(callback: () => void) {
  const mql = window.matchMedia(FINE_POINTER_MEDIA_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}
function getFinePointerSnapshot() {
  return window.matchMedia(FINE_POINTER_MEDIA_QUERY).matches;
}
// SSR has no pointer info; assume touch so the WebGL canvas doesn't render
// server-side and cause a hydration flash on devices that will be gated out.
function getFinePointerServerSnapshot() {
  return false;
}

export default function LightRaysBackground() {
  const pathname = usePathname();
  const hasFinePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot,
  );
  const [ready, setReady] = useState(false);
  const [fallbackFired, setFallbackFired] = useState(false);
  const enabled = useLightRaysEnabled();

  useEffect(() => {
    if (!hasFinePointer) return;
    const readyFallbackTimer = setTimeout(
      () => setFallbackFired(true),
      READY_FALLBACK_MS,
    );
    return () => clearTimeout(readyFallbackTimer);
  }, [hasFinePointer]);

  if (!hasFinePointer) return null;

  // Toggle visibility via CSS instead of unmounting on /guides. Unmounting
  // tears down the WebGL context; remounting on the next nav re-inits it,
  // causing a bright flash. Keep the canvas alive across navigations.
  const hidden = /^\/[^/]+\/(guides|privacy|terms)(\/|$)/.test(pathname ?? "");
  const visible = (ready || fallbackFired) && !hidden && enabled;

  const langSegment = pathname?.split("/")[1];
  const lang = isLang(langSegment) ? langSegment : "en";

  return (
    <>
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
      {!hidden && <LightRaysToggle label={a11y.toggleLightRays[lang]} />}
    </>
  );
}
