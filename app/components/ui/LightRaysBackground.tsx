"use client";

import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { usePathname } from "next/navigation";
import LightRays from "./LightRays";

const READY_FALLBACK_MS = 1200;
const INSTANCE_COUNT = 2;
const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";

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
  const [readyCount, setReadyCount] = useState(0);
  const [fallbackFired, setFallbackFired] = useState(false);

  useEffect(() => {
    if (!isDesktop) return;
    const readyFallbackTimer = setTimeout(
      () => setFallbackFired(true),
      READY_FALLBACK_MS,
    );
    return () => clearTimeout(readyFallbackTimer);
  }, [isDesktop]);

  const handleReady = useCallback(() => {
    setReadyCount((c) => c + 1);
  }, []);

  if (!isDesktop) return null;

  // Toggle visibility via CSS instead of unmounting on /guides. Unmounting
  // tears down the WebGL context; remounting on the next nav re-inits it,
  // causing a bright flash. Keep the canvas alive across navigations.
  const hidden = /^\/[^/]+\/guides(\/|$)/.test(pathname ?? "");
  const ready = fallbackFired || readyCount >= INSTANCE_COUNT;
  const visible = ready && !hidden;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-11 pointer-events-none mix-blend-screen transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="absolute inset-0">
        <LightRays onReady={handleReady} />
      </div>
      <div className="absolute inset-0">
        <LightRays raysOrigin="left" onReady={handleReady} />
      </div>
    </div>
  );
}
