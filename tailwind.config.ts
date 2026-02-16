import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['var(--font-cairo)', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out',
      },
      fontSize: {
        'display': '3.5rem', // Hero
        'heading': '2.25rem', // Section Titles
        'subheading': '1.5rem', // Card Titles
        'base': '1.2rem', // Standard Body
        'caption': '1rem' // Small labels
      },
      colors: {
        // --- 1. THE FOUNDATION ---
        // 'background' is your main page color (Warm Charcoal)
        background: '#0C0C0E',

        // --- 2. SURFACES & CARDS ---
        // Use 'low' for section backgrounds, 'card' for actual cards/FAQ items
        surface: {
          low: '#121215',
          card: '#18181B',
          hover: '#222226', // Use for hover states on interactive cards
        },

        // --- 3. TYPOGRAPHY (Hierarchy) ---
        // 'heading' for H1-H3, 'body' for paragraphs, 'muted' for labels/footer
        content: {
          heading: '#FFFFFF',
          body: '#B2B2BA',
          muted: '#71717A',
        },

        // --- 4. BRAND & INTERACTIVE ---
        // 'brand-primary' is a Silver-Slate. Use for your main CTA buttons.
        brand: {
          primary: '#E2E8F0',
          secondary: '#94A3B8',
          accent: '#3B82F6', // A clean blue for links or small highlights
        },

        // --- 5. BORDERS & LINES ---
        // 'border-subtle' is perfect for the timeline line or divider lines
        border: {
          subtle: 'rgba(255,255,255,0.04)',
          strong: 'rgba(255,255,255,0.08)',
        },

        // --- 6. UTILITY & FEEDBACK ---
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',

        // WhatsApp Brand Colors
        whatsapp: {
          DEFAULT: '#25D366',
          hover: '#25d365ae',
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant(
        "hover",
        "@media (hover: hover) and (pointer: fine) { &:hover }"
      );
    }),
  ],
} satisfies Config;