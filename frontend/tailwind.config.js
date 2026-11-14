/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'IBM Plex Sans'", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
        sans:    ["'IBM Plex Sans'", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
        body:    ["'IBM Plex Sans'", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
        mono:    ["'IBM Plex Mono'", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
        inter:   ["'IBM Plex Sans'", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
      },
      colors: {
        ink:     '#f3f5f8',
        muted:   '#a8b0bf',
        line:    'rgba(255, 255, 255, 0.14)',
        orbit: {
          bg:      '#070b13',
          card:    '#111a29',
          surface: '#080e18',
          blue:    '#70a7ff',
          ice:     '#a9c8ff',
          amber:   '#ffd899',
          border:  'rgba(255, 255, 255, 0.14)',
          subtle:  'rgba(255, 255, 255, 0.08)',
        },
        blue: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#70a7ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        space: {
          950: '#040810',
          900: '#070b13',
          850: '#0b111c',
          800: '#111a29',
          700: '#18253a',
          border: 'rgba(255, 255, 255, 0.14)',
        }
      },
      backgroundImage: {
        'gradient-blue': 'linear-gradient(135deg, #70a7ff 0%, #3b82f6 100%)',
        'gradient-card': 'linear-gradient(140deg, #111a29 0%, #0b111c 100%)',
      }
    },
  },
  plugins: [],
};
