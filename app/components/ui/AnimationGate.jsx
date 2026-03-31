"use client";
import { useEffect } from "react";

export default function HeroAnimTrigger() {
  useEffect(() => {
    // Wait for next frame after hydration = page is painted and main thread is free
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.add("hero-go");
      });
    });
  }, []);

  return null;
}