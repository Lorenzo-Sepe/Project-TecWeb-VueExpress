import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';
import typography from '@tailwindcss/typography';

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      'honey': '#f9b63c',
      'secLight': '#005676',
      'secDark': '#0b1a29',
      'error':'#B00020',
      'success':'#4caf50',
    },
    extend: {},
  },
  plugins: [
    forms,
    aspectRatio,
    typography,
  ],
  prefix: 'tw-', // This is the prefix for all the classes that Tailwind will generate
} satisfies Config