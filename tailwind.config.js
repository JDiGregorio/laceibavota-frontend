import formsPlugin from '@tailwindcss/forms'
import tailwindcss from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: '',
  theme: {
    extend: {},
  },
  plugins: [formsPlugin, tailwindcss],
}