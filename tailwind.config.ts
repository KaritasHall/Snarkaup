import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        0: "0px",
        2: "2px",
        4: "4px",
        6: "6px",
        8: "8px",
        10: "10px",
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
        112: "112px",
        120: "120px",
        128: "128px",
        240: "240px",
        "fluid-x": "clamp(16px, 0.062 * 100vw, 120px)",
        "fluid-y": "clamp(18px, 0.019 * 100vw, 50px)",
      },
    },
  },

  plugins: [],
};
export default config;
