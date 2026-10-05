import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", ".dark"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#040404",
          surface: "#1f1f1f",
          accent: "#00c896",
          "accent-hover": "#00b285",
          "accent-glow": "rgba(0, 200, 150, 0.15)",
        },
      },
    },
  },
  plugins: [],
};

export default config;