import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        red: "#d32f2f",
        black: "#000000",
        gray: "#525354",
        white: "#ffffff",
        softBrown: "#735243",
        brown: "#272018",
        hardBrown: "#1f1911",
        softBlack: "#1A1A1A",
      },
    },
  },
  plugins: [],
} satisfies Config;
