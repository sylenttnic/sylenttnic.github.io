import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          850: "#ECEBE6",
          950: "#F9F8F6",
        },
        primary: {
          DEFAULT: "#C84B31",
          hover: "#A53C26",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#F1F0EC",
          foreground: "#1E2E3D",
        },
        background: "#F9F8F6",
        paper: "#F9F8F6",
        ink: "#1E2E3D",
        surface: "#F1F0EC",
        // Warm surface steps (previously only CSS vars — restored as real tokens
        // so bg-surface2 / bg-surface3 resolve instead of silently no-op'ing).
        surface2: "#ECEBE6",
        surface3: "#E7E5DF",
        border: "#EAE7E2",
        // Warmer tan border for hover/hierarchy (was --border-light).
        "border-strong": "#D3C8B5",
        // Focus ring + muted text as real tokens (fix dead ring-ring / muted refs).
        ring: "#C84B31",
        muted: "#6B635A",
        card: {
          DEFAULT: "#F1F0EC",
          foreground: "#3A332B",
        },
        accent: "#C84B31",
        accent2: "#C84B31",
        accent3: "#C84B31",
        accent4: "#C84B31",
        accent5: "#C84B31",
      },
      fontFamily: {
        sans: ["var(--font-instrument-sans)", "sans-serif"],
        // Plus Jakarta Sans — geometric display sans for structural headings/UI.
        serif: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      boxShadow: {
        // Warm, ink-tinted soft shadows for an editorial (not glossy-SaaS) feel.
        soft: "0 1px 2px rgba(30,46,61,0.04), 0 10px 30px -14px rgba(30,46,61,0.14)",
        lift: "0 2px 6px rgba(30,46,61,0.06), 0 22px 48px -20px rgba(30,46,61,0.22)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "pulse-orb": "pulseOrb 2.5s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "text-sweep": "textSweep 5.4s linear infinite",
        "flow-down": "flowDown 1.8s ease-in-out infinite",
        "flow-right": "flowRight 1.4s ease-in-out infinite",
        "line-grow": "lineGrow 1s ease-out both",
      },
      keyframes: {
        lineGrow: {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseOrb: {
          "0%, 100%": { opacity: "0.7" },
          "50%": { opacity: "1" },
        },
        textSweep: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        flowDown: {
          "0%": { top: "-8px", opacity: "0" },
          "30%": { opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { top: "calc(100% + 8px)", opacity: "0" },
        },
        flowRight: {
          "0%": { left: "-6px", opacity: "0" },
          "30%": { opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { left: "calc(100% + 6px)", opacity: "0" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
