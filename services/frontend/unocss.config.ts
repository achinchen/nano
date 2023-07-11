import { defineConfig } from 'unocss';
import unocssConfigBase from '../../unocss.config.base';

export default defineConfig({
  ...unocssConfigBase,
  content: {
    pipeline: {
      include: [/\.(ts|tsx|js|jsx|css|html)($|\?)/],
    },
  },
});
