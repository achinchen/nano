import type { Meta } from '@storybook/react';
import { useState } from 'react';
import Switch from '.';

const Story: Meta<typeof Switch> = {
  component: Switch,
  title: 'Switch',
};

export default Story;

export const Default = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      checked={checked}
      onChange={() => setChecked((checked) => !checked)}
    />
  );
};
