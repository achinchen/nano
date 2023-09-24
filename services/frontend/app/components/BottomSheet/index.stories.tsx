import type { Meta } from '@storybook/react';
import type { NotifyProps } from '~frontend/components/Notify/types';
import { useState } from 'react';
import { BottomSheet } from '.';

const Story: Meta<typeof BottomSheet> = {
  component: BottomSheet,
  title: 'BottomSheet',
};
export default Story;

export const Default = (args: NotifyProps) => {
  const [opened, setOpened] = useState(true);
  return (
    <div>
      {opened && (
        <BottomSheet
          {...args}
          onClose={() => {
            setOpened(false);
          }}
          footer={<div>footer</div>}
        >
          <div className="h-10 bg-zinc-300 pa-2" />
        </BottomSheet>
      )}
    </div>
  );
};

Default.args = {
  title: '標題測試',
};
