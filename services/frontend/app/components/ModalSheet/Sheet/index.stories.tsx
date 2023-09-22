import type { Meta } from '@storybook/react';
import type { ModalSheetProps } from '~frontend/components/ModalSheet/types';
import { useState } from 'react';
import Button from '~frontend/components/Button';
import { Sheet } from '.';

const Story: Meta<typeof Sheet> = {
  component: Sheet,
  title: 'ModalSheet-Sheet',
};
export default Story;

export const Default = (args: ModalSheetProps) => {
  const [opened, setOpened] = useState(true);

  const onClick = () => {
    console.log('onClick');
  };

  return (
    <div>
      {opened && (
        <Sheet
          {...args}
          onClose={() => {
            setOpened(false);
          }}
          picture={<div className="rounded-4 bg-black" />}
        >
          <Button onClick={onClick}>Button</Button>
          <Button onClick={onClick}>Button</Button>
        </Sheet>
      )}
    </div>
  );
};

Default.args = {
  title: '標題測試',
  description:
    '內容是什麼！！！內容是什麼！！！內容是什麼！！！內容是什麼！！！',
  severity: 'info',
};
