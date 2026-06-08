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
    let active = true;
    document.fonts.ready.then(() => {
      if (!active) return;
      document.documentElement.classList.add("fonts-ready");
      sessionStorage.setItem("heroAnimationPlayed", "true");
    });
    return () => {
      active = false;
      document.documentElement.classList.remove("fonts-ready");
    };
  }, []);

  useEffect(() => {
    const cta = document.getElementById("cta-main");
    if (!cta) return;
    const onEnd = (e) => {
      if (e.animationName === "heroRiseIn") {
        cta.classList.add("cta-shimmer-ready");
      }
    };
    cta.addEventListener("animationend", onEnd);
    return () => cta.removeEventListener("animationend", onEnd);
  }, []);

  return null;
}
