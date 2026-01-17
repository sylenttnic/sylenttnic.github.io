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
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
