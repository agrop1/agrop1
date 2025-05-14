import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        customTheme: {
          primary: "#FF7622",
          secondary: "#0083ff",
          accent: "#00b8a0",
          neutral: "#371c2d",
          "base-100": "#fff",
          info: "#0080d8",
          success: "#00bc4e",
          warning: "#ffae00",
          error: "#ff6289",
          verdenatural: "#4caf50",
          marrontierra: "#8D6E63",
          amarillocalido: "#FFB300",
          verdeclaro: "#F1F8E9",
          grisoscuro: "#2E2E2E"
        },
      },
    ],
  },
  plugins: [daisyui],
} satisfies Config;
