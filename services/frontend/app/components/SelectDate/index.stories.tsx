import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { SelectDate, SelectDateProps } from '.';

const Story: Meta<typeof SelectDate> = {
  component: SelectDate,
  title: 'SelectDate',
  // argTypes: {
  //   unit: {
  //     control: {
  //       type: 'radio',
  //       options: UNITS,
  //     },
  //   },
  // },
};

export default Story;

export const Default = (args: SelectDateProps) => {
  const [value, setValue] = useState(new Date());
  const onValueChange = (v: Date) => {
    setValue(v);
    console.log('changed', v);
  };

  return <SelectDate {...args} value={value} onValueChange={onValueChange} />;
};
