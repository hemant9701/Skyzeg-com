import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1C398E',
          hover: '#152D73'
        },
        dark: '#0F172A',
        muted: '#64748B',
        light: '#F1F5F9',
        accent: {
          DEFAULT: '#C5A880',
          hover: '#B8956A',
          light: '#F2E2C4'
        },
        body: '#334155',
        'primary-deep': '#12244f',
        surface: {
          dim: '#DCDAD2',
          DEFAULT: '#FBF9F1',
          bright: '#FBF9F1',
          container: {
            lowest: '#FFFFFF',
            low: '#F6F4EB',
            DEFAULT: '#F0EEE6',
            high: '#EAE8E0',
            highest: '#E4E3DB'
          },
          variant: '#DCE5DC'
        },
        'inverse-surface': '#30312B',
        'inverse-on-surface': '#F3F1E9',
        faint: '#94A3B8',
        subtle: '#475569',
        line: {
          DEFAULT: '#E2E8F0',
          strong: '#CBD5E1'
        },
        success: {
          DEFAULT: '#10B981',
          light: '#ECFDF5',
          dark: '#047857'
        },
        danger: {
          DEFAULT: '#F43F5E',
          light: '#FFF1F2',
          dark: '#BE123C'
        },
        warning: '#FBBF24'
      }
    }
  }
};

export default config;