/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily:{
        montserral:['Montserral','sans-serif'],
        playfairdisplay:['PlayfairDisplay','sans-serif']
      },
      screens:{
        '1200':'1200px',
      },
    },
  },
  plugins:  [],
};
