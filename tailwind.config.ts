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
        roboto_slab: ["var(--font-roboto-slab)"]
      },
    },
    colors: {
      'primary': '#2E3C63',
      'on-primary': '#FFFFFF',
      'secondary': '#FFC107',
      'on-secondary': '#FFFFFF',
      'primary-container': '#E5E8EF',
      'on-primary-container': '#212738',
      'secondary-container': '#FFE6E1',
      'on-secondary-container': '#FFC107',
      'outline': '#79747E',
      'outline-var': '#CAC4D0',
      'outline-focus': '#2E3C63',
      'sucess': '#388E3C',
      'erorr': '#D32F2F',
      'surface': '#FFFFFF',
      'surface-variant': '#FFD2C1',
      'on-surface': '#49454F',
      'error': '#D32F2F',
      'success': '#388E3C',
      'primary2': '#65558F',
      'high': '#21005D'
    },
  },
  plugins: [],
};
export default config;
