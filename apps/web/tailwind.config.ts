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
        background: "#0A0A0A",
        "bg-panel": "#111111",
        "bg-card": "#1A1A1A",
        "bg-input": "#161616",
        "brand-blue": "#93A5CF",
        "brand-light": "#E4ECFA",
        "text-primary": "#F4F4F5",
        "text-secondary": "#A1A1AA",
        "text-muted": "#71717A",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#E11D48",
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
