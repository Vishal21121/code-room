/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "-5px -5px 15px rgba(255, 255, 255, 0.1), 5px 5px 15px rgba(0, 0, 0, 0.35), inset -5px -5px 5px rgba(255, 255, 255, 0.1), inset 5px 5px 15px rgba(0, 0, 0, 0.35)",
        "4xl": "0 0 5px #FF6C00, 0 0 25px #FF6C00, 0 0 50px #FF6C00, 0 0 100px #FF6C00, 0 0 200px #FF6C00",
        "green": "0 0 5px #FF6C00, 0 0 25px #22C55E, 0 0 50px #22C55E, 0 0 100px #22C55E, 0 0 200px #22C55E"
      }
    },
  },
  plugins: [],
}

