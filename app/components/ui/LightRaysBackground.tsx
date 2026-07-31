"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LightRays from "./LightRays";

const READY_FALLBACK_MS = 1200;
const INSTANCE_COUNT = 2;

export default function LightRaysBackground() {
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(false);
  const [readyCount, setReadyCount] = useState(0);
  const [faded, setFaded] = useState(false);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const t = setTimeout(() => setFaded(true), READY_FALLBACK_MS);
    return () => clearTimeout(t);
  }, [isDesktop]);

  useEffect(() => {
    if (readyCount >= INSTANCE_COUNT) setFaded(true);
  }, [readyCount]);

  const handleReady = useCallback(() => {
    setReadyCount((c) => c + 1);
  }, []);

  if (!isDesktop) return null;

  // Toggle visibility via CSS instead of unmounting on /guides. Unmounting
  // tears down the WebGL context; remounting on the next nav re-inits it,
  // causing a bright flash. Keep the canvas alive across navigations.
  const hidden = /^\/[^/]+\/guides(\/|$)/.test(pathname ?? "");
  const visible = faded && !hidden;

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
