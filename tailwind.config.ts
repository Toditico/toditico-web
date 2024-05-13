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
      "h1-tablet": ["38px", "51.3px"],
      "h1-desktop": ["52px", "70.2px"],
      "h2-tablet": ["28px", "37.8px"],
      "h2-desktop": ["38px", "51.3px"],
      h3: ["22px", "29.7px"],
      "h3-tablet": ["22px", "29.7px"],
      "h3-desktop": ["24px", "32.4px"],
      button: ["14px", "18.9px"],
      body: ["16px", "21.6px"],
      small: ["12px", "16.2px"],
      "body-bold": ["14px", "18.9px"],
      "number-card": ["60px", "81px"],
      "number-card-tablet": ["80px", "108px"],
      "contact-bottom-info": ["30px", "40.5px"],
      "contact-bottom-info-tablet": ["40px", "54px"],
      "contact-bottom-info-desktop": ["60px", "81px"],
      "contact-bottom-info-trust": ["40px", "54px"],
      "contact-bottom-info-trust-tablet": ["50px", "67.5px"],
      "contact-bottom-info-trust-desktop": ["70px", "94.5px"],
    },
    extend: {
      colors: {
        primary: "#CE2C0D",
        secondary: "#DD562C",
        tertiary: "#041A42",
        gray: "#EEE",
        "dark-gray": "#999",
      },
    },
    backgroundImage: {
      home: "url('/images/home-mobile.jpeg')",
      "home-tablet": "url('/images/home-tablet.jpeg')",
      catalog: "url('/images/catalog-tablet.jpeg')",
      "catalog-desktop": "url('/images/catalog-desktop.jpeg')",
      contact: "url('/images/aboutus.jpeg')",
      "contact-bottom": "url('/images/aboutusbottom.jpeg')",
    },
  },
  plugins: [],
};
export default config;
