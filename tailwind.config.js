/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          bg: '#09090b',          // Pure neutral near-black (no blue tint)
          panel: '#121215',       // Adjacent neutral near-black
          surface: '#18181c',     // Elevated card / input surface
          surfaceHover: '#222227',// Hover state
          border: '#26262b',      // Restrained neutral border
          borderSubtle: '#1a1a1e',// Ultra subtle divider
          muted: '#8e8e93',       // Apple/Vercel style neutral muted
          text: '#f4f4f5',        // Crisp white text
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
