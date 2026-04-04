"use client";

import { useState, useEffect } from "react";

export default function FontReadyWrapper({ children, className, ...props }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => setIsReady(true));
  }, []);

  return (
    <section className={`${className}${isReady ? " is-ready" : ""}`} {...props}>
      {children}
    </section>
  );
}
