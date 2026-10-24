/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'Inter', '-apple-system', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'monospace'],
        headline: ['Geist', 'sans-serif'],
        body: ['Geist', 'sans-serif'],
      },
      colors: {
        // Stitch Token System (Zerodha Clean Slate)
        'surface': '#F8F9FF',
        'surface-dim': '#CBDBF5',
        'surface-bright': '#F8F9FF',
        'surface-container-lowest': '#FFFFFF',
        'surface-container-low': '#EFF4FF',
        'surface-container': '#E5EEFF',
        'surface-container-high': '#DCE9FF',
        'surface-container-highest': '#D3E4FE',
        'on-surface': '#0B1C30',
        'on-surface-variant': '#414751',
        'inverse-surface': '#213145',
        'inverse-on-surface': '#EAF1FF',
        'outline': '#727783',
        'outline-variant': '#C1C6D3',
        'surface-tint': '#005FAF',
        
        // Brand & Accents
        'primary': '#005CAB',
        'primary-hover': '#004C8C',
        'on-primary': '#FFFFFF',
        'primary-container': '#2D76C8',
        'on-primary-container': '#FEFCFF',
        'primary-fixed': '#D4E3FF',
        'primary-fixed-dim': '#A5C8FF',
        'on-primary-fixed': '#001C3A',
        
        'secondary': '#006C4A',
        'on-secondary': '#FFFFFF',
        'secondary-container': '#82F5C1',
        'on-secondary-container': '#00714E',
        'secondary-fixed': '#85F8C4',
        
        'tertiary': '#A33900',
        'on-tertiary': '#FFFFFF',
        'tertiary-container': '#CC4900',
        'on-tertiary-container': '#FFFBFF',
        'tertiary-fixed': '#FFDBCE',
        'tertiary-fixed-dim': '#FFB599',
        
        'error': '#BA1A1A',
        'on-error': '#FFFFFF',
        'error-container': '#FFDAD6',
        'on-error-container': '#93000A',
        
        // Brand Named Aliases
        brand: {
          blue: '#387ED1',
          darkBlue: '#005CAB',
          coral: '#EA580C',
          amber: '#D97706',
          emerald: '#059669',
          crimson: '#DC2626',
        },
        slate: {
          850: '#151F32',
          950: '#0B1C30',
        }
      },
      spacing: {
        'space-xs': '0.25rem',
        'space-sm': '0.5rem',
        'space-md': '1rem',
        'space-lg': '1.5rem',
        'space-xl': '2.5rem',
        'gutter-desktop': '1.5rem',
        'margin-desktop': '3rem',
      }
    },
  },
  plugins: [],
}
