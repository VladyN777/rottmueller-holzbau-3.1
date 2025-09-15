/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { grotesk: ["Space Grotesk","ui-sans-serif","system-ui","Arial"] },
      colors: { accent: "#008000" }
    }
  },
  plugins: []
};
