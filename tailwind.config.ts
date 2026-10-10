import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'moon-yellow': '#fde047',
        'magic-pink': '#f472b6',
        'magic-purple': '#a855f7',
        'night-dark': '#0f172a',
        'night-deep': '#1e1b4b',
      },
      fontFamily: {
        // Noto Sans KR 폰트 추가
        sans: ['"Noto Sans KR"', 'sans-serif'],
        noto: ['"Noto Sans KR"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;