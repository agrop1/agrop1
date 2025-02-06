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
        },
      },
    ],
  },
  plugins: [daisyui],
} satisfies Config;
