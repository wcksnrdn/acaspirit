/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        animation: {
          'grow': 'grow 3s ease-out forwards',
          'float': 'float 20s ease-in-out infinite',
          'pulse-slow': 'pulseGlow 4s ease-in-out infinite',
          'wave': 'wave 2.5s ease-in-out infinite',
          'delay-1': 'delay-1 1s forwards',
          'slight-sway': 'sway 5s ease-in-out infinite',
          'stem-grow': 'stemGrow 2.5s ease-out forwards',
          'petal-grow': 'petalGrow 1.5s ease-out forwards',
          'petal-bloom': 'petalBloom 2s ease-out forwards',
        },
        keyframes: {
          grow: {
            '0%': { transform: 'scale(0) translateY(100%)', opacity: 0 },
            '100%': { transform: 'scale(1) translateY(0)', opacity: 1 },
          },
          float: {
            '0%, 100%': { transform: 'translateY(0) translateX(0)' },
            '25%': { transform: 'translateY(-10px) translateX(10px)' },
            '50%': { transform: 'translateY(0) translateX(20px)' },
            '75%': { transform: 'translateY(10px) translateX(10px)' },
          },
          pulseGlow: {
            '0%, 100%': { textShadow: '0 0 5px rgba(219, 39, 119, 0.5), 0 0 10px rgba(219, 39, 119, 0.3)' },
            '50%': { textShadow: '0 0 15px rgba(219, 39, 119, 0.8), 0 0 20px rgba(219, 39, 119, 0.5)' },
          },
          wave: {
            '0%, 100%': { transform: 'rotate(0deg)' },
            '25%': { transform: 'rotate(10deg)' },
            '75%': { transform: 'rotate(-10deg)' },
          },
          sway: {
            '0%, 100%': { transform: 'rotate(0deg)' },
            '30%': { transform: 'rotate(2deg)' },
            '70%': { transform: 'rotate(-2deg)' },
          },
          stemGrow: {
            '0%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
            '100%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          },
          petalGrow: {
            '0%': { transform: 'translate(-50%, -50%) rotate(var(--rotate)) translateY(-10px) scale(0)', opacity: 0 },
            '100%': { transform: 'translate(-50%, -50%) rotate(var(--rotate)) translateY(-10px) scale(1)', opacity: 1 },
          },
          petalBloom: {
            '0%': { transform: 'scale(0)', opacity: 0 },
            '100%': { transform: 'scale(1)', opacity: 1 },
          },
        },
      },
    },
    plugins: [
      function ({ addComponents, theme }) {
        addComponents({
          '.text-glow': {
            textShadow: '0 0 10px rgba(219, 39, 119, 0.7), 0 0 15px rgba(219, 39, 119, 0.5)'
          },
          '.flower-glow': {
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.7), 0 0 15px currentColor'
          },
          '.flower-center-glow': {
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.7), 0 0 15px rgba(255, 206, 86, 0.7)'
          },
          '.flower-pink': {
            backgroundColor: theme('colors.pink.400'),
            '--color': theme('colors.pink.400')
          },
          '.flower-rose': {
            backgroundColor: theme('colors.rose.400'),
            '--color': theme('colors.rose.400')
          },
          '.flower-purple': {
            backgroundColor: theme('colors.purple.400'),
            '--color': theme('colors.purple.400')
          },
          '.flower-violet': {
            backgroundColor: theme('colors.violet.400'),
            '--color': theme('colors.violet.400')
          },
          '.flower-indigo': {
            backgroundColor: theme('colors.indigo.300'),
            '--color': theme('colors.indigo.300')
          },
          '.flower-fuchsia': {
            backgroundColor: theme('colors.fuchsia.400'),
            '--color': theme('colors.fuchsia.400')
          },
          '.flower-red': {
            backgroundColor: theme('colors.red.400'),
            '--color': theme('colors.red.400')
          },
          '.flower-orange': {
            backgroundColor: theme('colors.orange.400'),
            '--color': theme('colors.orange.400')
          },
        })
      }
    ],
  }