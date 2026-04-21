/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'glass-light': 'rgba(255, 255, 255, 0.4)',
        'glass-dark': 'rgba(15, 23, 42, 0.65)',
        'glass-border-light': 'rgba(255, 255, 255, 0.5)',
        'glass-border-dark': 'rgba(255, 255, 255, 0.15)',
      },
      backdropBlur: {
        'glass': '16px',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'glass-soft': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-inner': 'inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
      }
    },
  },
  plugins: [],
}
