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
        primary: {
          DEFAULT: "#102A43", // Deep Navy
          50: "#F0F4F8",
          100: "#D9E2EC",
          200: "#BCCCDC",
          300: "#9FB3C8",
          400: "#829AB1",
          500: "#627D98",
          600: "#486581",
          700: "#334E68",
          800: "#243B53",
          900: "#102A43",
          950: "#0B1D2E",
        },
        royal: {
          DEFAULT: "#1D4ED8",
          light: "#3B82F6",
          dark: "#1E40AF",
        },
        gold: {
          DEFAULT: "#D6A84F",
          light: "#E5BE72",
          dark: "#B88A34",
          soft: "#FBF7EE",
          champagne: "#F7F2E7",
        },
        slate: {
          text: "#526477",
          dark: "#1E293B",
          muted: "#64748B",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F8FAFC",
          canvas: "#F3F6F9",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-lora)", "Georgia", "serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(16, 42, 67, 0.05), 0 1px 2px 0 rgba(16, 42, 67, 0.03)",
        card: "0 4px 12px 0 rgba(16, 42, 67, 0.05), 0 2px 4px 0 rgba(16, 42, 67, 0.03)",
        elevated: "0 12px 24px -4px rgba(16, 42, 67, 0.08), 0 4px 6px -2px rgba(16, 42, 67, 0.04)",
      },
      borderRadius: {
        editorial: "0.375rem", // 6px - avoids excessive roundness, keeping editorial elegance
      },
    },
  },
  plugins: [],
};

export default config;

