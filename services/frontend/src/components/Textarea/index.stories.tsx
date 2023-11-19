import type { Meta } from '@storybook/react';
import type { TextareaProps } from '.';
import { useState } from 'react';
import Textarea from '.';

const Story: Meta<typeof Textarea> = {
  component: Textarea,
  title: 'Textarea',
};

export default Story;

export const Default = (args: TextareaProps) => {
  const [value, setValue] = useState('Lorem ipsum dolor sit');
  const onValueChange = (value: string) => {
    setValue(value);
    console.log('onChange', value);
  };

  return (
    <div className="w-80">
      <Textarea {...args} value={value} onValueChange={onValueChange} />
    </div>
  );
};

Default.args = {
  value: '',
  placeholder: 'placeholder',
  errorMessage: '',
  minRows: 2,
  maxRows: 5,
  minLength: 20,
  disabled: false,
  autoSize: true,
};
