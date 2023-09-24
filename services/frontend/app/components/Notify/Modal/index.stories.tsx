import type { Meta } from '@storybook/react';
import type { NotifyProps } from '~frontend/components/Notify/types';
import { useState } from 'react';
import Button from '~frontend/components/Button';
import { NotifyModal } from '.';

const Story: Meta<typeof NotifyModal> = {
  component: NotifyModal,
  title: 'NotifyModal',
};
export default Story;

export const Default = (args: NotifyProps) => {
  const [opened, setOpened] = useState(true);

  const onClick = () => {
    console.log('onClick');
  };

  return (
    <div>
      {opened && (
        <NotifyModal
          {...args}
          onClose={() => {
            setOpened(false);
          }}
          picture={<div className="rounded-4 bg-black" />}
        >
          <Button onClick={onClick}>Button</Button>
          <Button onClick={onClick}>Button</Button>
        </NotifyModal>
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
