import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        bg: '#07070d',
        'bg-soft': '#0c0c16',
        surface: 'rgba(255,255,255,0.04)',
        'surface-2': 'rgba(255,255,255,0.06)',
        border: 'rgba(255,255,255,0.08)',
        'border-strong': 'rgba(255,255,255,0.14)',
        text: '#e7e9f2',
        'text-dim': '#9aa0b4',
        'text-faint': '#6b7187',
      },
      backgroundImage: {
        grad: 'linear-gradient(120deg, #7c3aed 0%, #4f46e5 50%, #06b6d4 100%)',
        'grad-soft': 'linear-gradient(120deg, #a78bfa, #22d3ee)',
      },
      boxShadow: {
        glow: '0 10px 40px -10px rgba(124, 58, 237, 0.35)',
        'glow-lg': '0 20px 60px -20px rgba(124, 58, 237, 0.5)',
      },
      animation: {
        float: 'float 22s ease-in-out infinite',
        'float-rev': 'float 26s ease-in-out infinite reverse',
        pulseDot: 'pulseDot 1.8s infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(40px,-30px) scale(1.08)' },
        },
        pulseDot: {
          '0%': { boxShadow: '0 0 0 0 rgba(167,139,250,0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(167,139,250,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(167,139,250,0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
