"use client";

import { useLayoutEffect } from "react";

const STORAGE_KEY = "hero-seen";

export default function HeroAnimationGate() {
  useLayoutEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) {
      document.documentElement.classList.add("skip-hero");
    } else {
      sessionStorage.setItem(STORAGE_KEY, "1");
    }
  }, []);

  return null;
}
