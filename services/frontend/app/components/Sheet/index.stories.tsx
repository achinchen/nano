import type { Meta } from '@storybook/react';
import Button from '../Button';
import { Sheet, SheetProps } from '.';

const Story: Meta<typeof Sheet> = {
  component: Sheet,
  title: 'Sheet',
};
export default Story;

export const Default = (args: SheetProps) => {
  return (
    <div>
      <Sheet {...args} picture={<div className="rounded-4 bg-black" />}>
        <Button onClick={() => {}}>Button</Button>
        <Button onClick={() => {}}>Button</Button>
      </Sheet>
    </div>
  );
};

Default.args = {
  title: '標題測試',
  description:
    '內容是什麼！！！內容是什麼！！！內容是什麼！！！內容是什麼！！！',
  severity: 'info',
};
