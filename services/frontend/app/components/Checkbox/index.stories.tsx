import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from '.';

type CheckboxStoryArgs = {
  value: string;
  title: string;
};

const Story: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Checkbox',
};

export default Story;

export const Default = {
  args: {
    value: 'checkbox',
    title: 'checkbox',
  },
  render: ({ ...args }: CheckboxStoryArgs) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checkedList, setCheckedList] = useState<string[]>([]);
    const checked = checkedList.includes('checkbox');
    const onChange = (value: string, checked: boolean) => {
      if (checked) {
        setCheckedList((prevOptions) => [...prevOptions, value]);
        return;
      }
      const updatedSelectedOptions = checkedList.filter(
        (item) => item !== value
      );
      setCheckedList(updatedSelectedOptions);
    };

    return (
      <Checkbox checked={checked} onChange={onChange} {...args}></Checkbox>
    );
  },
};
