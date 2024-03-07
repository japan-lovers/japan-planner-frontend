/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        tripform: "900px",
      },
    },
  },
  plugins: [require("daisyui")],
};
