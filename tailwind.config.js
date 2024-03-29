/** @type {import('tailwindcss').Config} */

const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        tripform: '900px',
        profile: '600px',
        minusminus: '-180px',
        minus: '-130px',
        minus50: '-50px',
        minus40: '-40px',
        card: '290px',
        imgw: '600px',
        imgh: '450px',
        maxw: '1260px',
        45: '47%',
        30: '30%',
        22: '22%',
      },
    },
    colors: {
      modalbg: 'rgba(0, 0, 0, 0.5)',
    },
    backgroundImage: {
      home: "url('/public/japan.jpg')",
    },
  },
  plugins: [require('daisyui')],
  darkMode: false,
  daisyui: {
    darkTheme: false,
  },
});
