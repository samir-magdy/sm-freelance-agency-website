"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LightRays from "./LightRays";

export default function LightRaysBackground() {
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
  }, []);

  if (!isDesktop) return null;

  // Toggle visibility via CSS instead of unmounting on /guides. Unmounting
  // tears down the WebGL context; remounting on the next nav re-inits it,
  // causing a bright flash. Keep the canvas alive across navigations.
  const hidden = /^\/[^/]+\/guides(\/|$)/.test(pathname ?? "");

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-11 pointer-events-none mix-blend-screen transition-opacity duration-300 ${hidden ? "opacity-0" : "opacity-100"}`}
    >
      <div className="absolute inset-0">
        <LightRays />
      </div>
      <div className="absolute inset-0">
        <LightRays raysOrigin="left" />
      </div>
    </div>
  );
}
