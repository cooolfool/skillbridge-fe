/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",   // SkillBridge primary blue
        secondary: "#1e293b", // Dark gray/blue
        accent: "#f59e0b",    // Accent orange
        background: "#f8fafc",// Light background
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 6px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
