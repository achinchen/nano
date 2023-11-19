import type { Meta } from '@storybook/react';
import { Tabs, Tab } from '.';

const Story: Meta<typeof Tabs> = {
  component: Tabs,
  title: 'Tabs',
};

export default Story;

export const Default = () => {
  const onChange = (value?: string | number | null) => console.log(value);
  return (
    <Tabs defaultValue="1" onChange={onChange}>
      <Tab value="1" icon="i-solar-magnifer-linear" label="待完成" />
      <Tab value="2" icon="i-solar-magnifer-linear" label="已過期" />
    </Tabs>
  );
};
