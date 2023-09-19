import type { Meta } from '@storybook/react';
import { useEffect, useState } from 'react';
import Button from '~frontend/components/Button';
import { Sheet, SheetProps } from '.';

const Story: Meta<typeof Sheet> = {
  component: Sheet,
  title: 'Sheet',
};
export default Story;

export const Default = (args: SheetProps) => {
  const [opened, setOpened] = useState(args.opened);

  useEffect(() => {
    setOpened(args.opened);
  }, [args.opened]);

  return (
    <div>
      <Sheet
        {...args}
        opened={opened}
        onClose={() => {
          setOpened(false);
        }}
        picture={<div className="rounded-4 bg-black" />}
      >
        <Button onClick={() => {}}>Button</Button>
        <Button onClick={() => {}}>Button</Button>
      </Sheet>
    </div>
  );
};

Default.args = {
  opened: true,
  title: '標題測試',
  description:
    '內容是什麼！！！內容是什麼！！！內容是什麼！！！內容是什麼！！！',
  severity: 'info',
};
