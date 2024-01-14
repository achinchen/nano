import type { Meta } from '@storybook/react';
import type { InputTimeProps } from '.';
import { useState } from 'react';
import InputTime from '.';

const Story: Meta<typeof InputTime> = {
  component: InputTime,
  title: 'InputTime',
};

export default Story;

export const Default = (args: InputTimeProps) => {
  const [value, setValue] = useState('');

  return <InputTime {...args} value={value} onValueChange={setValue} />;
};
