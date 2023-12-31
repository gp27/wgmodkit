/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['light', 'dark'],
  },
  plugins: [daisyui],
} as Config
