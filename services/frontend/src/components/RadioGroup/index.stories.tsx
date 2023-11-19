import type { Meta } from '@storybook/react';
import type { RadioGroupProps } from '.';
import { useState } from 'react';
import RadioGroup from '.';

const Story: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  title: 'RadioGroup',
};

export default Story;

export const Default = {
  args: {
    options: [
      { value: '1', title: 'Option 1' },
      { value: '2', title: 'Option 2' },
      { value: '3', title: 'Option 3', subtitle: 'Subtitle 3' },
      { value: '4', title: 'Option 4', disabled: true },
      { value: '5', title: 'Option 5' },
    ],
    value: '1',
  },
  render: ({ options, ...args }: RadioGroupProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(args.value);

    return <RadioGroup options={options} value={value} onChange={setValue} />;
  },
};
