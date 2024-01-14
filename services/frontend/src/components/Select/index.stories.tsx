import type { Meta } from '@storybook/react';
import type { SelectProps } from '.';
import { useState } from 'react';
import Select from '.';

const Story: Meta<typeof Select> = {
  component: Select,
  title: 'Select',
};

export default Story;

export const Default = (args: SelectProps) => {
  const [value, setValue] = useState('');
  const onValueChange = (v: string) => {
    setValue(v);
  };

  return <Select {...args} value={value} onValueChange={onValueChange} />;
};

const options = [
  { label: 'Option1', value: 'option1' },
  { label: 'Option2', value: 'option2' },
  { label: 'Option3', value: 'option3' },
];

Default.args = {
  options,
  disabled: false,
  filterable: false,
  className: '',
};
