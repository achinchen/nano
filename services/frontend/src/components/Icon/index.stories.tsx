import type { Meta } from '@storybook/react';
import Icon from '.';

const Story: Meta<typeof Icon> = {
  component: Icon,
  title: 'Icon',
};
export default Story;

export const Default = {
  args: {
    icon: 'i-svg-spinners-180-ring-with-bg',
  },
};
