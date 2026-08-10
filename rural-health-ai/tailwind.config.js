/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          glow: '#34d399',
        },
        rural: {
          accent: '#f59e0b', // Amber gold
          teal: '#0d9488',   // Deep teal
          dark: '#030712',   // Near black night
          card: 'rgba(15, 23, 42, 0.65)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Noto Sans Devanagari', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s infinite alternate',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        },
        pulseGlow: {
          '0%': { boxShadow: '0 0 15px rgba(16, 185, 129, 0.25)' },
          '100%': { boxShadow: '0 0 35px rgba(16, 185, 129, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
