import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  darkMode: "class",
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ["var(--font-cairo)", "sans-serif"],
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scroll-hint": {
          "0%, 100%": { transform: "translateY(0px)", opacity: "0.35" },
          "50%": { transform: "translateY(9px)", opacity: "0.8" },
        },
      },
      animation: {
        "fade-in": "fade-in 1s ease-out",
        "scroll-hint": "scroll-hint 2s ease-in-out infinite",
      },
      fontSize: {
        // Hero — 1.75rem (28px) mobile → 3.5rem desktop
        display: [
          "clamp(1.75rem, 1rem + 3.2vw, 3.5rem)",
          { lineHeight: "1.25", letterSpacing: "-0.02em" },
        ],

        // Section Titles — 1.5rem (24px) → 2.25rem ✓ no change
        heading: [
          "clamp(1.5rem, 1.1rem + 1.7vw, 2.25rem)",
          { lineHeight: "1.3" },
        ],

        // Card Titles — 1.175rem (18.8px) → 1.5rem
        subheading: [
          "clamp(1.175rem, 1rem + 0.65vw, 1.5rem)",
          { lineHeight: "1.4" },
        ],

        // Body — 1rem (16px) → 1.125rem (18px) ✓ tighter max
        base: [
          "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)",
          { lineHeight: "1.75" },
        ],

        // Labels — 0.9375rem (15px) → 1rem (16px)
        caption: [
          "clamp(0.9375rem, 0.9rem + 0.15vw, 1rem)",
          { lineHeight: "1.5" },
        ],
      },
      colors: {
        background: "hsl(var(--background))",
        surface: {
          low: "hsl(var(--surface-low))",
          card: "hsl(var(--surface-card))",
          hover: "hsl(var(--surface-hover))",
        },
        content: {
          heading: "hsl(var(--content-heading))",
          body: "hsl(var(--content-body))",
          muted: "hsl(var(--content-muted))",
        },
        brand: {
          primary: "hsl(var(--brand-primary))",
          secondary: "hsl(var(--brand-secondary))",
          accent: "hsl(var(--brand-accent))",
        },
        border: {
          subtle: "hsl(var(--border-subtle))",
          strong: "hsl(var(--border-strong))",
        },
        // These stay fixed
        success: "#10B981",
        danger: "#EF4444",
        warning: "#F59E0B",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant(
        "hover",
        "@media (hover: hover) and (pointer: fine) { &:hover }",
      );
    }),
  ],
} satisfies Config;
