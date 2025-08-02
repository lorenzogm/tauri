/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Crypto-inspired color palette
        crypto: {
          gold: {
            50: '#fffdf7',
            100: '#fffbeb',
            200: '#fef3c7',
            300: '#fde68a',
            400: '#facc15',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
            800: '#92400e',
            900: '#78350f',
            950: '#451a03',
          },
          green: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
            800: '#166534',
            900: '#14532d',
            950: '#052e16',
          },
          red: {
            50: '#fef2f2',
            100: '#fee2e2',
            200: '#fecaca',
            300: '#fca5a5',
            400: '#f87171',
            500: '#ef4444',
            600: '#dc2626',
            700: '#b91c1c',
            800: '#991b1b',
            900: '#7f1d1d',
            950: '#450a0a',
          },
          purple: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#a855f7',
            600: '#9333ea',
            700: '#7c3aed',
            800: '#6b21a8',
            900: '#581c87',
            950: '#3b0764',
          },
          dark: {
            900: '#0f0f23',
            800: '#1a1a2e',
            700: '#16213e',
            600: '#1f2937',
            500: '#374151',
            400: '#4b5563',
            300: '#6b7280',
            200: '#9ca3af',
            100: '#d1d5db',
            50: '#f9fafb',
          }
        },
        // Semantic colors for game elements
        currency: {
          cw3: '#facc15', // Gold for $CW3 points
          crymp: '#22c55e', // Green for $CRYMP currency
        },
        danger: '#ef4444', // Red for dangerous/negative effects
        success: '#22c55e', // Green for positive effects
        warning: '#f59e0b', // Orange for warnings
        info: '#3b82f6', // Blue for information
        // Synergy colors
        synergy: {
          influencer: '#ec4899', // Pink for social media
          trader: '#3b82f6', // Blue for analytics
          dao: '#8b5cf6', // Purple for governance
          memecoin: '#f59e0b', // Orange for viral
          defi: '#10b981', // Emerald for finance
          nft: '#f97316', // Orange for collectibles
          scammer: '#ef4444', // Red for danger
        }
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        'mono': ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
        'display': ['Orbitron', 'ui-sans-serif', 'system-ui', 'sans-serif'], // Cyber/tech font
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'neon': '0 0 5px currentColor',
        'neon-lg': '0 0 10px currentColor, 0 0 20px currentColor',
        'neon-xl': '0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'inner-glow': 'inset 0 0 10px rgba(255, 255, 255, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-crypto': 'linear-gradient(135deg, #facc15 0%, #22c55e 50%, #3b82f6 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { 
            boxShadow: '0 0 5px currentColor, 0 0 10px currentColor',
          },
          '100%': { 
            boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
          },
        },
        float: {
          '0%, 100%': { 
            transform: 'translateY(0px)',
          },
          '50%': { 
            transform: 'translateY(-10px)',
          },
        },
      },
    },
  },
  plugins: [],
}