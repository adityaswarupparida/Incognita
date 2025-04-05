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
      },
      keyframes: {
        'slow-pulse': {
          '50%': { opacity: 0 }
        }
      },
      animation: {
        'slow-pulse': 'slow-pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    },
  },
  plugins: [],
}

