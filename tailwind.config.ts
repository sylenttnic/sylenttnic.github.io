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
          850: "#ECE5D8",
          950: "#FAF7F0",
        },
        primary: {
          DEFAULT: "#B5512F",
          hover: "#8F3E22",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#F3EEE4",
          foreground: "#211C17",
        },
        background: "#FAF7F0",
        paper: "#FAF7F0",
        ink: "#211C17",
        surface: "#F3EEE4",
        border: "#E2DACB",
        card: {
          DEFAULT: "#F3EEE4",
          foreground: "#3A332B",
        },
        accent: "#B5512F",
        accent2: "#B5512F",
        accent3: "#B5512F",
        accent4: "#B5512F",
        accent5: "#B5512F",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
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
