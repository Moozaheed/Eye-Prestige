import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111110",
        paper: "#FFFFFF",
        bone: "#F5F3EF",
        hairline: "#E5E2DC",
        mute: "#8C887F",
        page: "#E7E4DD",
        "footer-bg": "#111110",
        "footer-text": "#F2F0EB",
        "footer-mute": "#8C8880",
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        pill: "999px",
      },
      spacing: {
        pad: "18px",
      },
      letterSpacing: {
        eyebrow: "0.22em",
        button: "0.16em",
        menu: "0.14em",
        section: "0.1em",
      },
    },
  },
  plugins: [],
};

export default config;
