import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { InputTel, InputTelProps } from '.';

const Story: Meta<typeof InputTel> = {
  component: InputTel,
  title: 'InputTel',
};

export default Story;

export const Default = (args: InputTelProps) => {
  const [value, setValue] = useState('');
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('onChange', e.target.value);
  };
  const onValueChange = (value: string) => {
    setValue(value);
    console.log('onValueChange', value);
  };

  return (
    <InputTel
      {...args}
      value={value}
      onChange={onChange}
      onValueChange={onValueChange}
    />
  );
};

Default.args = {
  disabled: false,
  placeholder: 'placeholder',
  errorMessage: 'Error Message',
};
