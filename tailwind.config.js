/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        tripform: "900px",
        profile: "600px",
        minus: "-30px",
        card: "290px",
      },
    },
  },
  plugins: [require("daisyui")],
});
