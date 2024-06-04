/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

const { nextui } = require("@nextui-org/react");


module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"

  ],
  theme: {
    extend: {
      colors:{
        black: "#000000",

        primary:"#ED1C24",
        // default:"#71717A"
      }
    },

  },
  darkMode: "class",
  plugins: [nextui()]
})

