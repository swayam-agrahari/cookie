/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0a0a0a",
        secondary: "#1a1a1a",
        text: "#ffffff",
        accent: "#4f46e5",
        "accent-light": "#6366f1",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        "slide-in": "slideIn 0.3s ease-out forwards",
        "slide-out": "slideOut 0.3s ease-in forwards",
        "fade-in": "fadeIn 0.3s ease-out forwards",
        "fade-out": "fadeOut 0.3s ease-in forwards",
        "pulse-once": "pulse 1s ease-in-out 1",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideOut: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
