/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "#2a2a2a",
        background: "#0f172a",
        foreground: "#e2e8f0",

        primary: "#3b82f6",
        secondary: "#1e293b",
        accent: "#22c55e",

        muted: "#334155",
      },
    },
  },
  plugins: [],
}