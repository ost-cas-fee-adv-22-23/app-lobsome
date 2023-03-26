/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@smartive-education/design-system-component-library-lobsome/preset')],
  content: [
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './node_modules/@smartive-education/design-system-component-library-lobsome/dist/esm/components/**/*.js',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      keyframes: {
        textintro: {
          '0%': {
            opacity: 0,
            transform: 'translateY(30%)',
          },
          '20%': { opacity: 1, transform: 'translateY(-20%)' },
          '30%': { transform: 'translateY(10%)' },
          '35%': { transform: 'translateY(0%)' },
          '89%': { opacity: 1, transform: 'translateY(0%)' },
          '90%': { transform: 'translateY(-10%)' },
          '100%': { opacity: 0, transform: 'translateY(-50%)' },
        },
      },
      animation: {
        textintro: 'textintro 2s ease-in infinite',
      },
    },
  },
  plugins: [],
};
