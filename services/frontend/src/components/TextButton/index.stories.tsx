import type { Meta } from '@storybook/react';
import { COLORS } from './constants';
import TextButton from '.';

const Story: Meta<typeof TextButton> = {
  component: TextButton,
  title: 'TextButton',
  argTypes: {
    color: {
      options: COLORS,
      control: { type: 'radio' },
    },
  },
};
export default Story;

export const Default = {
  args: {
    children: 'text-button',
  },
};
