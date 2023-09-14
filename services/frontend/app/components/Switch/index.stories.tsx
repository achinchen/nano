import type { Meta } from '@storybook/react';
import { Switch } from '.';

const Story: Meta<typeof Switch> = {
  component: Switch,
  title: 'Switch',
};

export default Story;

export const Default = {
  args: {
    checked: false,
    onChange: () => console.log('QQ'),
  },
};
