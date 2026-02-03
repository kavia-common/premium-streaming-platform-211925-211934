/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Netflix color palette
        'netflix-red': '#E50914',
        'netflix-red-dark': '#B20710',
        'netflix-red-light': '#F40612',
        
        // Backgrounds
        'bg-primary': '#141414',
        'bg-secondary': '#000000',
        'bg-elevated': '#181818',
        'bg-card': '#2F2F2F',
        
        // Text colors
        'text-primary': '#FFFFFF',
        'text-secondary': '#B3B3B3',
        'text-tertiary': '#808080',
        'text-disabled': '#565656',
        
        // Interactive
        'hover-bg': '#2F2F2F',
        'success-green': '#46D369',
        
        // Legacy support (mapped to Netflix colors)
        primary: '#E50914',
        secondary: '#B3B3B3',
        success: '#46D369',
        error: '#EF4444',
        background: '#141414',
        surface: '#181818',
        text: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.75rem',     // 12px
        'sm': '0.875rem',    // 14px
        'base': '1rem',      // 16px
        'lg': '1.125rem',    // 18px
        'xl': '1.25rem',     // 20px
        '2xl': '1.5rem',     // 24px
        '3xl': '1.875rem',   // 30px
        '4xl': '2.25rem',    // 36px
        '5xl': '3rem',       // 48px
        '6xl': '3.75rem',    // 60px
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'scale-up': 'scaleUp 0.3s ease-out',
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      boxShadow: {
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.8)',
      },
      transitionTimingFunction: {
        'netflix': 'cubic-bezier(0.5, 0, 0.1, 1)',
      },
    },
  },
  plugins: [],
}
