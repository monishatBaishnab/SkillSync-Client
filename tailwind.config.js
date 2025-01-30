import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        "royal-blue": {
          50: "#ecf4ff",
          100: "#ddeaff",
          200: "#c2d7ff",
          300: "#9cbcff",
          400: "#7595ff",
          500: "#546fff",
          600: "#3645f5",
          700: "#2a35d8",
          800: "#2530ae",
          900: "#263189",
          950: "#161a50",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
