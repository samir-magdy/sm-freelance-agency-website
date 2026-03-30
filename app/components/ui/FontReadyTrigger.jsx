"use client";
import { useEffect } from "react";

export default function FontReadyTrigger() {
  useEffect(() => {
    document.fonts.ready.then(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.add("fonts-ready");
      });
    });
  }, []);
  return null;
}