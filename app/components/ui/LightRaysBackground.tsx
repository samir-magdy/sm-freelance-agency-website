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
  if (/^\/[^/]+\/guides(\/|$)/.test(pathname ?? "")) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-11 pointer-events-none mix-blend-screen"
    >
      <div className="absolute inset-0">
        <LightRays
        />
      </div>
      <div className="absolute inset-0">
        <LightRays
          raysOrigin="left"
        />
      </div>
    </div>
  );
}
