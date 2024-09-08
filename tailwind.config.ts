import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        lato: ["var(--font-lato)"],
      },
      screens: {
        'sm': '640px',   // Small screens
        'md': '768px',   // Medium screens
        'lg': '1024px',  // Large screens
        'xl': '1280px',  // Extra large screens
        '2xl': '1536px', // 2x Extra large screens
      },
    },
    colors: {
      'primary': '#2E3C63',
      'on-primary': '#FFFFFF',
      'secondary': '#FF6347',
      'on-secondary': '#FFFFFF',
      'primary-container': '#E5E8EF',
      'on-primary-container': '#212738',
      'secondary-container': '#FFE6E1',
      'on-secondary-container': '#FF6347',
      'outline': '#79747E',
      'outline-var': '#CAC4D0',
      'outline-focus': '#2E3C63',
      'sucess': '#388E3C',
      'erorr': '#D32F2F',
      'surface': '#FFFFFF',
      'surface-variant': '#FFD2C1',
    },
  },
  plugins: [],
};
export default config;
