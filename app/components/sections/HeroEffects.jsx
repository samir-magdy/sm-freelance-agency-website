"use client";

import { useEffect, useLayoutEffect } from "react";

export default function HeroEffects() {
  useLayoutEffect(() => {
    if (sessionStorage.getItem("heroAnimationPlayed")) {
      document.documentElement.classList.add("hero-played");
    }
    return () => {
      document.documentElement.classList.remove("hero-played");
    };
  }, []);

  useEffect(() => {
    sessionStorage.setItem("heroAnimationPlayed", "true");
  }, []);

  return null;
}
