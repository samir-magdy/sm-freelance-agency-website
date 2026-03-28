"use client";
import { useEffect } from "react";

export default function FontReadyTrigger() {
  useEffect(() => {
    document.fonts.ready.then(() => {
      document.documentElement.classList.add("fonts-ready");
    });
  }, []);
  return null;
}
