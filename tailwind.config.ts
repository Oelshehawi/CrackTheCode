import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        bloop: 'bloop 1s ease-in-out infinite',
        swing: 'swing 4s ease-in-out infinite',
      },
      keyframes: {
        bloop: {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.2)',
          },
        },
        swing: {
          '0%, 100%': {
            transform: 'rotate(-3deg) scale(1)',
          },
          '50%': {
            transform: 'rotate(3deg) scale(1.05)',
          },
        },
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      statusMatches: '#4CAF50',
      statusExists: '#FFEB3B',
      statusNeutral: '#9E9E9E',
      red: '#c94b4b',
      white: '#ffffff',
      midnight: '#121063',
      metal: '#565584',
      tahiti: '#3ab7bf',
      silver: '#ecebff',
      'bubble-gum': '#ff77e9',
      bermuda: '#78dcca',
      blue: '#263955',
    },
  },
  plugins: [],
};
export default config;
