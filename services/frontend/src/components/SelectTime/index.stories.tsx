import type { Meta } from '@storybook/react';
import type { SelectTimeProps } from '.';
import { useState } from 'react';
import { UNITS } from './constants';
import SelectTime from '.';

const Story: Meta<typeof SelectTime> = {
  component: SelectTime,
  title: 'SelectTime',
  argTypes: {
    unit: {
      control: {
        type: 'radio',
        options: UNITS,
      },
    },
  },
};

export default Story;

export const Default = (args: SelectTimeProps) => {
  const [value, setValue] = useState('');
  const onValueChange = (v: string) => {
    setValue(v);
    console.log('changed', v);
  };

  return <SelectTime {...args} value={value} onValueChange={onValueChange} />;
};
