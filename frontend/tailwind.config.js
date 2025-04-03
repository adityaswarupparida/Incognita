/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'merriweather': ["Merriweather", 'serif'],
        'cormorant': ["Cormorant", 'serif'],
        'alegreya': ["Alegreya", 'serif'],
        'cardo': ["Cardo", 'serif'],
        'neuton': ["Neuton", 'serif'],
      }
    },
  },
  plugins: [],
}

