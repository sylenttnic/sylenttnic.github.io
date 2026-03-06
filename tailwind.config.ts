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
          850: "#172033", // Custom bridge between 800 and 900
          950: "#020617", // Ensure 950 is available (standard in v3.3+)
        },
        primary: {
          DEFAULT: "#6366f1", // Indigo 500
          hover: "#4f46e5",   // Indigo 600
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#0f172a", // Slate 900
          foreground: "#f8fafc", // Slate 50
        },
        // Adding semantic colors for the dark theme
        background: "#020617", // Slate 950
        surface: "#0f172a",    // Slate 900
        border: "rgba(255, 255, 255, 0.1)",
        card: {
          DEFAULT: "rgba(15, 23, 42, 0.6)", // Slate 900 with opacity for glass effect
          foreground: "#cbd5e1", // Slate 300
        },
        accent: "#3b82f6", // Blue
        accent2: "#06b6d4", // Cyan
        accent3: "#8b5cf6", // Purple
        accent4: "#10b981", // Green
        accent5: "#f59e0b", // Amber
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "pulse-orb": "pulseOrb 2.5s ease-in-out infinite",
        "text-sweep": "textSweep 5.4s linear infinite",
        "flow-down": "flowDown 1.8s ease-in-out infinite",
        "flow-right": "flowRight 1.4s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseOrb: {
          "0%, 100%": { boxShadow: "0 0 4px currentColor, 0 0 8px currentColor, 0 0 12px currentColor", opacity: "0.7" },
          "50%": { boxShadow: "0 0 8px currentColor, 0 0 16px currentColor, 0 0 24px currentColor", opacity: "1" },
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
      },
    },
  },
  plugins: [],
};
export default config;
