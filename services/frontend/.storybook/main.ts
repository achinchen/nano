import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  core: { builder: '@storybook/builder-vite' },
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: 'services/frontend/.storybook/vite.config.ts',
      },
    },
  },
  async viteFinal(config, { configType }) {
    // return the customized config
    return mergeConfig(config, {
      // customize the Vite config here
      resolve: {},
    });
  },
  stories: ['../src/components/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials'],
};

export default config;
