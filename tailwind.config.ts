import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        seabreeze: "#4a869e",
        softSeabreeze: "#6aa5c7",
        tangerine: "#f26b4e",
        softTangerine: "#f49d8a",
        lightGray: "#F5F5F5",

        // Text colors
        black: "#000000",
        white: "#ffffff",
        textLight: "#585866",
        textLighter: "#81818F",

        // Icon colors
        IconDefault: "#585866",
        IconHovered: "#25252E",
        IconPressed: "#44474A",

        // Status colors
        success: "#48C546",
        danger: "#EB5454",
      },
      fontSize: {
        label: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "22px",
        xxl: "24px",
        h6: "26px",
        h5: "32px",
        h4: "36px",
        h3: "42px",
        h2: "48px",
        h1: "56px",
      },

      spacing: {
        0: "0px",
        2: "2px",
        4: "4px",
        6: "6px",
        8: "8px",
        10: "10px",
        12: "12px",
        16: "16px",
        18: "18px",
        20: "20px",
        22: "22px",
        24: "24px",
        26: "26px",
        28: "28px",
        30: "30px",
        32: "32px",
        38: "38px",
        40: "40px",
        48: "48px",
        50: "50px",
        56: "56px",
        64: "64px",
        72: "72px",
        80: "80px",
        88: "88px",
        96: "96px",
        104: "104px",
        110: "110px",
        112: "112px",
        120: "120px",
        128: "128px",
        160: "160px",
        168: "168px",
        240: "240px",
        255: "255px",
        "fluid-x": "clamp(16px, 0.062 * 100vw, 120px)",
        "fluid-y": "clamp(18px, 0.019 * 100vw, 50px)",
      },
    },
  },

  plugins: [],
};
export default config;
