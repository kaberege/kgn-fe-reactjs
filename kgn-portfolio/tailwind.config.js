/** @type {import('tailwindcss').Config} 
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
  */
 
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: { extend: {} },
  variants: { extend: {} },
  plugins: [],
 };
 
