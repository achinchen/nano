import type { Meta } from '@storybook/react';
import { SIZES } from '~frontend/components/Icon';
import { COLORS, VARIANTS } from './constants';
import { IconButton } from '.';

const Story: Meta<typeof IconButton> = {
  component: IconButton,
  title: 'IconButton',
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
    icon: 'i-solar-magnifer-linear',
    size: 'xl',
    color: 'primary',
    variant: 'solid',
    className: '',
    hasPadding: true,
    rounded: false,
    disabled: false,
    loading: false,
  },
};
