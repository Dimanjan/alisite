import { defineConfig, presetWind, presetTypography } from 'unocss'

export default defineConfig({
  presets: [
    presetWind(), // Tailwind-compatible utilities
    presetTypography(), // Typography utilities
  ],
  theme: {
    fontFamily: {
      sans: 'Inter,system-ui,sans-serif',
    },
  },
  shortcuts: {
    // Custom component shortcuts
    'btn-primary': 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4',
    'btn-secondary': 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none border border-gray-300 hover:bg-gray-50 hover:text-gray-900 h-10 px-4 py-2',
    'card': 'rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm',
    'input': 'flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  },
  rules: [
    // Line clamp utilities
    [/^line-clamp-(\d+)$/, ([, d]) => ({
      'overflow': 'hidden',
      'display': '-webkit-box',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': d,
    })],
    // Custom animations
    ['animate-fade-in', { 'animation': 'fadeIn 0.5s ease-in-out' }],
    ['animate-slide-up', { 'animation': 'slideUp 0.3s ease-out' }],
  ],
  safelist: [
    // Ensure commonly used classes are always included
    'animate-pulse',
    'animate-fade-in', 
    'animate-slide-up',
    'line-clamp-1',
    'line-clamp-2', 
    'line-clamp-3',
  ],
}) 