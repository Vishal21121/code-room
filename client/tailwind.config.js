/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    theme: {
      screens: {
        'sm': { 'min': '640px', 'max': '767px' },
        // => @media (min-width: 640px and max-width: 767px) { ... }

        'md': { 'min': '768px', 'max': '1023px' },
        // => @media (min-width: 768px and max-width: 1023px) { ... }

        'lg': { 'min': '1024px', 'max': '1279px' },
        // => @media (min-width: 1024px and max-width: 1279px) { ... }

        'xl': { 'min': '1280px', 'max': '1535px' },
        // => @media (min-width: 1280px and max-width: 1535px) { ... }

        '2xl': { 'min': '1536px' },
        // => @media (min-width: 1536px) { ... }
      },
    },
    extend: {
      screens: {
        'xs': { "min": "350px", "max": "450px" },
      },
      boxShadow: {
        "3xl": "-5px -5px 15px rgba(255, 255, 255, 0.1), 5px 5px 15px rgba(0, 0, 0, 0.35), inset -5px -5px 5px rgba(255, 255, 255, 0.1), inset 5px 5px 15px rgba(0, 0, 0, 0.35)",
        "4xl": "0 0 5px #FF6C00, 0 0 25px #FF6C00, 0 0 50px #FF6C00, 0 0 100px #FF6C00, 0 0 200px #FF6C00",
        "green": "0 0 5px #FF6C00, 0 0 25px #22C55E, 0 0 50px #22C55E, 0 0 100px #22C55E, 0 0 200px #22C55E",
        "blue": "0 0 5px #3B82F6, 0 0 25px #3B82F6, 0 0 50px #3B82F6, 0 0 100px #3B82F6, 0 0 200px #3B82F6"
      }
    },
  },
  plugins: [],
}

