import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#A50553",
          hover: "#be0761",
        },
        secondary: {
          DEFAULT: "#342e2e",
        },
      },
      fontFamily: {
        sans: ["var(--font-circular)", "sans-serif"],
        heading: ["var(--font-catamaran)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
