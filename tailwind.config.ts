import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      h1: ["28px", "37.8px"],
      h3: ["22px", "29.7px"],
      button: ["14px", "18.9px"],
      body: ["16px", "21.6px"],
      "body-bold": ["14px", "18.9px"],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#CE2C0D",
        secondary: "#DD562C",
        tertiary: "#041A42",
        gray: "#EEE",
      },
    },
  },
  plugins: [],
};
export default config;
