import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background))",
        surface: {
          DEFAULT: "rgb(var(--surface))",
          hover: "rgb(var(--surface-hover))",
        },
        primary: {
          DEFAULT: "rgb(var(--primary))",
          glow: "rgb(var(--primary-glow))",
        },
        secondary: "rgb(var(--secondary))",
        accent: "rgb(var(--accent))",
        success: "rgb(var(--success))",
        warning: "rgb(var(--warning))",
        error: "rgb(var(--error))",
        text: {
          primary: "rgb(var(--text-primary))",
          secondary: "rgb(var(--text-secondary))",
          muted: "rgb(var(--text-muted))",
        },
        border: "rgba(var(--border), 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-jetbrains-mono)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glass-gradient": "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
      },
      boxShadow: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "glow": "0 0 20px rgba(var(--primary), 0.3)",
        "glow-lg": "0 0 40px rgba(var(--primary), 0.2)",
      },
      animation: {
        "shimmer": "shimmer 2s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
