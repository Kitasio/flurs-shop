import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '14': 'repeat(14, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        '2': 'repeat(2, minmax(0, 1fr))',
        '5': 'repeat(5, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}

export default config
