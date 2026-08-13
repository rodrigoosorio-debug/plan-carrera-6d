import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        night: {
          DEFAULT: "hsl(var(--night) / <alpha-value>)",
          deep: "hsl(var(--night-deep) / <alpha-value>)",
        },
        surface: "hsl(var(--surface) / <alpha-value>)",
        line: "hsl(var(--line) / <alpha-value>)",
        gold: {
          DEFAULT: "hsl(var(--gold) / <alpha-value>)",
          bright: "hsl(var(--gold-bright) / <alpha-value>)",
        },
        aqua: "hsl(var(--aqua) / <alpha-value>)",
        cream: "hsl(var(--cream) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Escala para las cifras gigantes de "La cuenta"
        figure: [
          "clamp(3.5rem, 12vw, 9rem)",
          { lineHeight: "0.9", letterSpacing: "-0.04em" },
        ],
        "figure-sm": [
          "clamp(2.5rem, 7vw, 4.5rem)",
          { lineHeight: "0.95", letterSpacing: "-0.03em" },
        ],
      },
      maxWidth: {
        prose: "38rem",
      },
    },
  },
  plugins: [],
};

export default config;
