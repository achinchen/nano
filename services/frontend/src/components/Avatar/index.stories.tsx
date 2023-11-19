import type { Meta } from '@storybook/react';
import { default as Avatar, SIZES } from '.';

const Story: Meta<typeof Avatar> = {
  component: Avatar,
  title: 'Avatar',
  argTypes: {
    size: {
      options: SIZES,
      control: { type: 'radio' },
    },
  },
};
export default Story;

export const Default = {
  args: {
    src: 'https://media.istockphoto.com/vectors/seamless-background-with-avocado-fruit-vector-illustration-vector-id527057236?k=6&m=527057236&s=612x612&w=0&h=0S1MNedNW5LBshqYMMNyA2rhG65HmkdCxjZhM5x5-t0=',
  },
};
