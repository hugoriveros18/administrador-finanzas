import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      xl: { max: '1280px' },
      lg: { max: '1024px' },
      md: { max: '768px' },
      sm: { max: '640px' }
    },
    extend: {
      colors: {
        blueCharcoal: '#314C59',
        redVerminton: '#E24A38',
        yellowSelective: '#FEB929',
        blueRobin: '#4DD0E1',
        blueLight: '#E0F7FA',
        pinkSalmon: '#F5959C',
        greenPear: '#C0DE00',
        bodyBg: '#F7F7FA',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
