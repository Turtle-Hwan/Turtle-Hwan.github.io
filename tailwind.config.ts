import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Tahoma", "sans-serif"],
      },
      colors: {
        "xp-blue": "#0058ee",
        "xp-blue-dark": "#003bbf",
        "xp-green": "#52964a",
      },
    },
  },
  plugins: [],
};
export default config;
