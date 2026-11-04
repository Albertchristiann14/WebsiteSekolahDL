import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "360px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        tenant: {
          primary: "var(--primary)",
          foreground: "var(--primary-foreground)",
          accent: "var(--accent)",
          surface: "var(--surface)",
          muted: "var(--muted)",
        },
        primary: {
          DEFAULT: "#102A43",
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
          text: "#475569",
          dark: "#0F172A",
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
        sans: ["var(--font-inter)", "var(--font-jakarta)", "system-ui", "sans-serif"],
        heading: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        serif: ["var(--font-lora)", "Georgia", "serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(16, 42, 67, 0.05), 0 1px 2px 0 rgba(16, 42, 67, 0.03)",
        card: "0 4px 20px -2px rgba(16, 42, 67, 0.06), 0 2px 6px -1px rgba(16, 42, 67, 0.03)",
        elevated: "0 16px 32px -4px rgba(16, 42, 67, 0.09), 0 6px 12px -2px rgba(16, 42, 67, 0.04)",
      },
      borderRadius: {
        editorial: "0.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
