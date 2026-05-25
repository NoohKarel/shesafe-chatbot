/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'crimson': '#dc2626',
        'neon-pink': '#ff1493',
        'violet': '#8b5cf6',
      },
      fontFamily: {
        'sans': ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        'glass': '20px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-crimson': '0 0 20px rgba(220, 38, 38, 0.5)',
        'glow-pink': '0 0 20px rgba(255, 20, 147, 0.3)',
      },
    },
  },
  plugins: [],
}

