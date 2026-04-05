import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      colors: {
        // Emerald green accent
        brand: {
          50:  '#ecfdf5',  // emerald-50
          100: '#d1fae5',  // emerald-100
          200: '#a7f3d0',  // emerald-200
          300: '#6ee7b7',  // emerald-300  (link hover)
          400: '#34d399',  // emerald-400  (links, labels on dark)
          500: '#10b981',  // emerald-500  (tints, borders, icons)
          600: '#059669',  // emerald-600  (primary CTA bg)
          700: '#047857',  // emerald-700  (CTA hover)
          800: '#065f46',  // emerald-800  (CTA active)
          900: '#064e3b',  // emerald-900
          950: '#022c22',  // emerald-950
        },
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
        'card-hover': '0 4px 12px 0 rgb(0 0 0 / 0.08), 0 2px 4px -1px rgb(0 0 0 / 0.06)',
        'result': '0 8px 24px 0 rgb(0 0 0 / 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.35s ease-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
