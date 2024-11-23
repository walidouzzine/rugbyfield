/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      perspective: {
        '1000': '1000px',
      },
      transform: {
        'rotateX-60': 'rotateX(60deg)',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'shadow-pulse': 'shadowPulse 2s infinite',
        'drop-kick': 'dropKick 2s infinite',
        'ball-trajectory': 'ballTrajectory 2s infinite',
        'crowd': 'crowd 3s infinite',
        'post-sway': 'postSway 4s ease-in-out infinite',
        'post-sway-delayed': 'postSway 4s ease-in-out infinite 0.5s',
        'ball-spin': 'ballSpin 2s infinite linear',
        'ball-squeeze': 'ballSqueeze 1s infinite ease-in-out',
        'flicker': 'flicker 4s infinite',
        'glow': 'glow 2s infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shadowPulse: {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '0.4'
          },
          '50%': {
            transform: 'scale(1.2)',
            opacity: '0.2'
          },
        },
        dropKick: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '30%': {
            transform: 'rotate(-20deg)',
          },
          '40%': {
            transform: 'rotate(10deg)',
          },
          '50%': {
            transform: 'rotate(-30deg)',
          },
          '60%, 100%': {
            transform: 'rotate(0deg)',
          },
        },
        ballTrajectory: {
          '0%': {
            transform: 'translate(0, 0) rotate(45deg)',
          },
          '50%': {
            transform: 'translate(40px, -60px) rotate(180deg)',
          },
          '100%': {
            transform: 'translate(80px, 0) rotate(315deg)',
          },
        },
        crowd: {
          '0%, 100%': {
            transform: 'translateY(0) scale(1)',
            opacity: '0.5',
          },
          '50%': {
            transform: 'translateY(-10px) scale(1.2)',
            opacity: '1',
          },
        },
        postSway: {
          '0%, 100%': {
            transform: 'rotate(0deg)',
          },
          '50%': {
            transform: 'rotate(2deg)',
          },
        },
        ballSpin: {
          '0%': {
            transform: 'rotate(0deg) translateY(0)',
          },
          '25%': {
            transform: 'rotate(180deg) translateY(-50px)',
          },
          '50%': {
            transform: 'rotate(360deg) translateY(-75px)',
          },
          '75%': {
            transform: 'rotate(540deg) translateY(-50px)',
          },
          '100%': {
            transform: 'rotate(720deg) translateY(0)',
          },
        },
        ballSqueeze: {
          '0%, 100%': {
            transform: 'scaleX(1) scaleY(1)',
          },
          '50%': {
            transform: 'scaleX(1.2) scaleY(0.8)',
          },
        },
        flicker: {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.6',
            transform: 'scale(0.95)',
          },
        },
        glow: {
          '0%, 100%': {
            opacity: '0.5',
            transform: 'scale(1.5)',
          },
          '50%': {
            opacity: '0.2',
            transform: 'scale(2)',
          },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: .5 },
        },
      },
    },
  },
  plugins: [],
}
