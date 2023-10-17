import { UserConfig } from 'unocss';
import presetUno from '@unocss/preset-uno';
import presetUnocssIcons from '@unocss/preset-icons'
import presetWebFonts from '@unocss/preset-web-fonts';
import presetRemToPx from '@unocss/preset-rem-to-px';
import transformerDirective from '@unocss/transformer-directives';

const config = {
  presets: [
    presetUno(),
    presetRemToPx(),
    presetUnocssIcons(),
    presetWebFonts({
      provider: 'none',
      fonts: {
        default: "'Helvetica Neue', 'Helvetica', 'Arial', 'PingFang HK', 'PingFang-SC-Regular', 'PingFang', 'Hiragino Sans GB', 'STHeiti', 'Microsoft JhengHei', sans-serif",
        sans: "ui-sans-serif, system-ui, BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
        serif: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
        mono: "ui-monospace, monospace",
      },
    })
  ],
  transformers: [transformerDirective()],
  theme: {
    colors: {
      primary: {
        100: '#EFFBFC',
        200: '#CEEEEF',
        300: '#83D5D7',
        400: '#39BCBE',
        500: '#08ABAE',
        600: '#08A2A5',
        800: '#06898B',
      },
    },
    breakpoints: {
      sm: '320px',
      md: '920px',
      lg: '1200px'
    },
    boxShadow: {
      default: '0 2px 4px rgba(0, 0, 0, 0.20)',
      hover: '2px 2px 8px rgba(0, 0, 0, 0.20)',
      dialog: '0 0 8px rgba(0, 0, 0, 0.40)'
    }
  },
  shortcuts: {
    'content-header': 'items-center w-100% font-bold md:text-xl justify-between gap-4 rounded-t-10 bg-white px-4 py-3 flex md:px-10',
    'content-height': 'md:h-[calc(100vh-156px)]',
    'content-height-with-footer': 'h-[calc(100vh-104px)]',
    'content-height-with-footer-base': 'md:h-[calc(100vh-222px)]',
    'content-width': 'w-100% max-w-5xl',
  }
} as UserConfig;

export default config;