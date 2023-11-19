import type { Meta } from '@storybook/react';
import type { NotifyProps } from '~frontend/components/Notify/types';
import { useState } from 'react';
import Dialog from '.';

const Story: Meta<typeof Dialog> = {
  component: Dialog,
  title: 'Dialog',
};
export default Story;

export const Default = (args: NotifyProps) => {
  const [opened, setOpened] = useState(true);
  return (
    <div>
      {opened && (
        <Dialog
          {...args}
          onClose={() => {
            setOpened(false);
          }}
          title={args.title}
          footer={<div>footer</div>}
        >
          <div className="h-40 bg-zinc-300 pa-2" />
        </Dialog>
      )}
    </div>
  );
};

Default.args = {
  title: '標題測試',
};
