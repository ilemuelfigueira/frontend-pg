/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-mode="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        poppins: ["var(--font-poppins", "sans-serif"],
      },
      colors: {
        azul_escuro: "#1B4472",
        $cinza: "#6F6F6F",
        s2condPurple: '#a32eff',
      },
      fontSize: {
        "2xs": ".625rem",
        "3xs": ".5rem",
      },
      keyframes: {
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
        slideInLeftFast: "slideInLeft 0.5s ease-in-out",
        slideInLeft: "slideInLeft 1s ease-in-out",
        slideInLeftSlow: "slideInLeft 1.5s ease-in-out",

        appear: "appear 1s ease-in-out",
        appearFast: "appear 0.5s ease-in-out",
        appearSlow: "appear 1.5s ease-in-out",
      },
    },
  },
  plugins: [],
  important: true,
};
