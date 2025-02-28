/** @type {import('tailwindcss').Config} */
export default {
  content: [ 
    './index.html',
    './src/**/*.jsx'],
  darkMode: ["class"], 
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
            normal: '#0686AE',
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
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      lineClamp: {
        2: '2',
      },
      fontFamily:{
        'body': ['Rubik', 'sans-serif']
      }
    },
  },
  plugins: [
  ],
}

