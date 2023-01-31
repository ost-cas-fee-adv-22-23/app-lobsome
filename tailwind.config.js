/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require('@smartive-education/design-system-component-library-lobsome/preset')
  ],
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./node_modules/@smartive-education/design-system-component-library-lobsome/dist/esm/components/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
