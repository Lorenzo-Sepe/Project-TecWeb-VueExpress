import type { Config } from 'tailwindcss'

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
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    
  ],
  prefix: 'tw-', // This is the prefix for all the classes that Tailwind will generate
} satisfies Config