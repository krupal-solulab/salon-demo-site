import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Template A — Cinematic Atelier
        atelier: { bg: "#14110F", deep: "#0C0A09", raise: "#1E1A17", ink: "#F5F0E8", soft: "#BCB2A4", champagne: "#C9A96A" },
        // Template B — Modern Editorial Studio
        studio: { bg: "#F7F6F3", surface: "#FFFFFF", ink: "#16161A", soft: "#55555E", faint: "#8A8A93", plum: "#6B2D5C", wash: "#F0E7EE" },
        // Generator console
        app: { bg: "#0F1115", panel: "#171A20", line: "#272B33", ink: "#E9ECF1", soft: "#9AA3B2", accent: "#4F8EF7" },
      },
      fontFamily: {
        atelierDisplay: ["Prata", "Georgia", "serif"],
        atelierBody: ["Public Sans", "system-ui", "sans-serif"],
        studioDisplay: ["Archivo", "system-ui", "sans-serif"],
        studioAccent: ["Newsreader", "Georgia", "serif"],
        app: ["Public Sans", "system-ui", "sans-serif"],
      },
      maxWidth: { site: "1240px" },
    },
  },
  plugins: [],
};
export default config;
