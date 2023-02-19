/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        wsWhite: '#FDFFFC',
        wsBlue: '#235789',
        wsRed: '#C1292E',
        wsYellow: '#F1D302',
        wsBlack: '#161925',
      },
      fontFamily: {
        title: 'Montserrat',
      },
      backgroundImage: {
        'bgImage': "url('BackgroundImg.jpg')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
