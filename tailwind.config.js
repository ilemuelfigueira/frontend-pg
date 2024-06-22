/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class", '[data-mode="dark"]'],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    screens: {
      "2xl": "1400px",
      "xs": "475px",
      ...defaultTheme.screens,
    },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        poppins: ["var(--font-poppins", "sans-serif"],
      },
      maxWidth: {
        "page-limit": "1346px",
      },
      colors: {
        azul_escuro: "#1B4472",
        cinza: "#6F6F6F",
        s2condPurple: "#a32eff",
        "focus-blue": "#80CEFF",
        preto: "#303030",
      },
      fontSize: {
        "2xs": ".625rem",
        "3xs": ".5rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        appear: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        slideInLeftFast: "slideInLeft 0.5s ease-in-out",
        slideInLeft: "slideInLeft 1s ease-in-out",
        slideInLeftSlow: "slideInLeft 1.5s ease-in-out",
        appear: "appear 1s ease-in-out",
        appearFast: "appear 0.5s ease-in-out",
        appearSlow: "appear 1.5s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
