/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-offwhite, #f7f7f5)',
        foreground: 'var(--color-charcoal, #222f30)',
        muted: {
          DEFAULT: '#e6e9e0',
          foreground: 'var(--color-slate, #445e5f)',
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: 'var(--color-charcoal, #222f30)',
        },
        primary: {
          DEFAULT: 'var(--color-charcoal, #222f30)',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: 'var(--color-lime, #a7e26e)',
          foreground: 'var(--color-charcoal, #222f30)',
        },
        border: 'var(--color-card-border, rgba(34, 47, 48, 0.08))',
        ring: 'var(--color-lime, #a7e26e)',
      },
      fontFamily: {
        sans: ['Aspekta', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
