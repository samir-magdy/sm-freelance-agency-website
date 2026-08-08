"use client";

import { useEffect, useRef } from "react";
import styles from "./Nollie.module.css";

interface NollieAvatarProps {
  animated?: boolean;
  // Size Nollie via Tailwind sizing classes (e.g. "size-10", "size-[54px] sm:size-[62px]").
  className?: string;
}

// Nollie — SM Web Studio's AI assistant avatar. A gilded oracle: navy face
// framed by a gold ring, calm vertical eyes with a soft specular highlight,
// and a breathing halo. On desktop her gaze tracks the cursor; on touch
// devices (no cursor to follow) she glances around every few seconds so
// she doesn't feel dead.
export default function NollieAvatar({
  animated = true,
  className,
}: NollieAvatarProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const stopLight = { stopColor: "var(--color-gold-light)" };
  const stopMid = { stopColor: "var(--color-gold)" };
  const stopDark = { stopColor: "var(--color-gold-dark)" };

  useEffect(() => {
    if (!animated) return;
    const svg = svgRef.current;
    if (!svg) return;

    // Max eye offset in CSS pixels — small enough to feel like a glance,
    // large enough to register at both mobile and desktop display sizes.
    const MAX_OFFSET = 1.4;

    const setEye = (x: number, y: number) => {
      svg.style.setProperty("--nollie-eye-x", `${x.toFixed(2)}px`);
      svg.style.setProperty("--nollie-eye-y", `${y.toFixed(2)}px`);
    };

    // Touch-primary devices: no cursor exists, so run ambient saccades.
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      let glanceTimer: ReturnType<typeof setTimeout>;
      let returnTimer: ReturnType<typeof setTimeout>;

      const scheduleGlance = () => {
        glanceTimer = setTimeout(
          () => {
            const angle = Math.random() * Math.PI * 2;
            const mag = MAX_OFFSET * (0.55 + Math.random() * 0.4);
            setEye(Math.cos(angle) * mag, Math.sin(angle) * mag);
            returnTimer = setTimeout(
              () => setEye(0, 0),
              900 + Math.random() * 400,
            );
            scheduleGlance();
          },
          800 + Math.random() * 1600,
        );
      };

      scheduleGlance();
      return () => {
        clearTimeout(glanceTimer);
        clearTimeout(returnTimer);
        setEye(0, 0);
      };
    }

    // Desktop / pointer devices: track the cursor.
    let rafId = 0;
    let pendingX = 0;
    let pendingY = 0;
    let hasPending = false;

    const applyCursor = () => {
      rafId = 0;
      if (!hasPending) return;
      hasPending = false;
      const rect = svg.getBoundingClientRect();
      const dx = pendingX - (rect.left + rect.width / 2);
      const dy = pendingY - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy);
      if (dist < 0.5) return setEye(0, 0);
      setEye((dx / dist) * MAX_OFFSET, (dy / dist) * MAX_OFFSET);
    };

    const onMove = (e: MouseEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      hasPending = true;
      if (!rafId) rafId = requestAnimationFrame(applyCursor);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
      setEye(0, 0);
    };
  }, [animated]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 64 64"
      className={`${styles.avatar} ${animated ? styles.isAnimated : ""} ${className ?? ""}`}
      style={{ overflow: "visible" }}
      aria-hidden
    >
      <defs>
        <radialGradient id="nollie-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={stopLight} stopOpacity="0.55" />
          <stop offset="55%" style={stopMid} stopOpacity="0.14" />
          <stop offset="100%" style={stopMid} stopOpacity="0" />
        </radialGradient>

        <linearGradient id="nollie-gold" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" style={stopLight} />
          <stop offset="55%" style={stopMid} />
          <stop offset="100%" style={stopDark} />
        </linearGradient>

        <linearGradient id="nollie-gleam" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="45%" stopColor="white" stopOpacity="0.55" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        <clipPath id="nollie-ring-clip">
          <circle cx="32" cy="32" r="20" />
        </clipPath>
      </defs>

      {/* Breathing halo — extends past the SVG bounds thanks to overflow:visible */}
      <circle
        cx="32"
        cy="32"
        r="30"
        fill="url(#nollie-aura)"
        className={styles.auraRing}
      />

      {/* Gold ring (the "frame") */}
      <circle cx="32" cy="32" r="20" fill="url(#nollie-gold)" />

      {/* Diagonal gleam sweeping across the gold ring only */}
      <g clipPath="url(#nollie-ring-clip)">
        <rect
          x="-24"
          y="-8"
          width="18"
          height="80"
          fill="url(#nollie-gleam)"
          className={styles.gleamSweep}
          transform="rotate(-20 0 32)"
        />
      </g>

      {/* Inner dark face */}
      <circle cx="32" cy="32" r="16.75" fill="var(--color-background)" />

      {/* Eyes — vertical gold capsules with a soft specular highlight.
          The parent `.eyes` group receives the gaze translate via CSS
          variables; each inner `.eye` group carries the blink scaleY. */}
      <g className={styles.eyes}>
        <g className={`${styles.eye} ${styles.eyeL}`}>
          <rect
            x="24.75"
            y="27"
            width="3"
            height="9"
            rx="1.5"
            fill="url(#nollie-gold)"
          />
          <ellipse
            cx="26.25"
            cy="28.75"
            rx="0.75"
            ry="1"
            fill="#fff"
            opacity="0.75"
          />
        </g>
        <g className={`${styles.eye} ${styles.eyeR}`}>
          <rect
            x="36.25"
            y="27"
            width="3"
            height="9"
            rx="1.5"
            fill="url(#nollie-gold)"
          />
          <ellipse
            cx="37.75"
            cy="28.75"
            rx="0.75"
            ry="1"
            fill="#fff"
            opacity="0.75"
          />
        </g>
      </g>
    </svg>
  );
}
