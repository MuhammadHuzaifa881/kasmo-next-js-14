/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f4f3ff',
          100: '#e4e3fe',
          200: '#c8c6fd',
          300: '#a29ffd',
          400: '#7a75f4',
          500: '#4338BD',
          600: '#372fa3',
          700: '#2b2588',
          800: '#211b6d',
          900: '#1a165b',
          950: '#0e0a38',
        },
        secondary: {
          50: '#ffffff',
          100: '#f9f9f9',
          200: '#f0f0f0',
          300: '#e0e0e0',
          400: '#cfcfcf',
          500: '#bfbfbf',
          600: '#a0a0a0',
          700: '#808080',
          800: '#606060',
          900: '#404040',
          950: '#1f1f1f',
        },
        body: '#475569',
        light: '#EBEEFF',
        succes: '#009345',
      },
      height: {
        page: 'calc(100vh - 80px)',
        pipelinepage: 'calc(100vh - 130px)',
      },
      minHeight: {
        page: 'calc(100vh - 80px)',
        pipelinepage: 'calc(100vh - 130px)',
      },
      animation: {
        bounce: 'bounce 0.5s infinite ease-in-out',
        fadeIn: 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
