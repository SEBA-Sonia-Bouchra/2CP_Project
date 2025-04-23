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
        playfairdisplay:['PlayfairDisplay','sans-serif'],
        georgia: ['Georgia', 'serif'],
        arial: ['Arial', 'sans-serif'],
        timesnewroman: ['Times New Roman', 'serif'],
      },
      screens:{
        '1200':'1200px',
      },
    },
  },
  plugins:  [],
};
