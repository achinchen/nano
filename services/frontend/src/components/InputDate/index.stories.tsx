import type { Meta } from '@storybook/react';
import type { InputDateProps } from '.';
import { useState } from 'react';
import InputDate from '.';

const Story: Meta<typeof InputDate> = {
  component: InputDate,
  title: 'InputDate',
};

export default Story;

export const Default = (args: InputDateProps) => {
  const [value, setValue] = useState('');

  return <InputDate {...args} value={value} onValueChange={setValue} />;
};
