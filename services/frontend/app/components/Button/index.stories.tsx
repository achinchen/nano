import type { Meta } from '@storybook/react';
import { SIZES, COLORS, VARIANTS } from './constants';
import { Button } from '.';

const Story: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
  argTypes: {
    size: {
      options: SIZES,
      control: { type: 'radio' },
    },
    color: {
      options: COLORS,
      control: { type: 'radio' },
    },
    variant: {
      options: VARIANTS,
      control: { type: 'radio' },
    },
  },
};

export default Story;

export const Default = {
  args: {
    prefixIcon: 'i-solar-magnifer-linear',
    children: 'button',
    color: 'primary',
    variant: 'solid',
    className: '',
    hasPadding: true,
    disabled: false,
    loading: false,
  },
};
