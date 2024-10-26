import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "#eee",
        background: "#111",
        lime: {
          default: "#3B3C36",
          low: "#C6F8A3",
          mediumLow: "#B3E09E",
          medium: "#A3D97A",
          mediumHigh: "#7DCE9A",
          high: "#5BAF5A",
        },
        ice: {
          default: "#3B3C36",
          low: "#B2E3FF",
          mediumLow: "#A2D4F2",
          medium: "#8BB8E1",
          mediumHigh: "#5BA6D7",
          high: "#2A8BDA",
        },
        magenta: {
          default: "#3B3C36",
          low: "#F1A7C5",
          mediumLow: "#EBA4C8",
          medium: "#E76F92",
          mediumHigh: "#D35D80",
          high: "#8A2A68",
        },
        flame: {
          default: "#3B3C36",
          low: "#fed974",
          mediumLow: "#feb24e",
          medium: "#fe6c36",
          mediumHigh: "#e5191c",
          high: "#be0027",
        },
      },
      gridTemplateColumns: {
        "53": "repeat(53, minmax(0, 1fr))",
      },
      width: {
        "1056": "1056px",
      },
    },
  },
  plugins: [],
};
export default config;
