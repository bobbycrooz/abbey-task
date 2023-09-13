/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
         colors: {
        "brand-main": "#419966",
        "brand-typo": colors.gray[600],
        pri: "#1C0832",
        "text-fade": "#9C9C9C",
        "abbey-pri": "#002668"

      },
      fontFamily: {
        'g-bold': ["Gilroy-Bold", "sans-serif"],
        'g-regular': ["Gilroy-Regular", "sans-serif"],
        'g-light': ["Gilroy-Light", "sans-serif"],
        'g-medium': ["Gilroy-Medium", "sans-serif"],
      },
    },
  },
  plugins: [],
}