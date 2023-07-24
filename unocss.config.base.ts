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
    boxShadow: {
      default: '0 2 4 rgba(0, 0, 0, 0.05)',
      hover: '2 2 4 rgba(0, 0, 0, 0.20)',
      dialog: '0 0 8 rgba(0, 0, 0, 0.20)'
    }
  }
} as UserConfig;

export default config;