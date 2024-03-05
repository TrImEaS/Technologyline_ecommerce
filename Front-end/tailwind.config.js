/** @type {import('tailwindcss').Config} */
export default {
  content: [ 
    './index.html',
    './src/**/*.jsx'],
  theme: {
    extend: {
      colors:{
        marine:{
          100: '#05345b',
          200: '#042e51',
          300: '#042948',
          400: '#03243f',
          500: '#031f36',
        },
        page:{
          blue:{
            normal: '#0b4780',
            dark: '#01386c',
            marine: '#05345b',
            darkMarine: '#042138'
          },
          lightblue: '#108bf1',
          gray: {
            light: '#d9d9d9',
            dark: '#494949'
          },
          red: '#df0202',
          black: '#000000',
          white: '#ffffff',
        }
      },

      fontFamily:{
        'body': ['Rubik', 'sans-serif']
      }
    },
  },
  plugins: [],
}

