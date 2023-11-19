import type { Meta } from '@storybook/react';
import type { InputProps } from '.';
import { useState } from 'react';
import Input from '.';

const Story: Meta<typeof Input> = {
  component: Input,
  title: 'Input',
};

export default Story;

export const Default = (args: InputProps) => {
  const [value, setValue] = useState('');
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('onChange', e.target.value);
  };
  const onValueChange = (value: string) => {
    setValue(value);
    console.log('onValueChange', value);
  };

  return (
    <Input
      {...args}
      value={value}
      onChange={onChange}
      onValueChange={onValueChange}
    />
  );
};

Default.args = {
  prefixIcon: 'i-solar-accumulator-outline',
  suffixIcon: 'i-solar-magnifer-linear',
  disabled: false,
  placeholder: 'placeholder',
  maxLength: 300,
  errorMessage: 'Error Message',
};
