/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#030305',
          900: '#08080c',
          850: '#0d0e15',
          800: '#12141f',
          700: '#1a1d2e',
        },
        gold: {
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        emerald: {
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'serif'],
        sans: ['Space Grotesk', 'Outfit', 'Inter', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at center, rgba(245, 158, 11, 0.18) 0%, rgba(16, 185, 129, 0.08) 45%, transparent 70%)',
        'gold-gradient': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #10b981 100%)',
      },
      boxShadow: {
        'glass': '0 25px 70px rgba(0, 0, 0, 0.65)',
        'glow-gold': '0 0 50px rgba(245, 158, 11, 0.3)',
        'glow-emerald': '0 0 50px rgba(16, 185, 129, 0.3)',
      },
    },
  },
  plugins: [],
}
