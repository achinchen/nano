import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { Button } from '~frontend/components/Button';
import { Modal } from '.';

const Story: Meta<typeof Modal> = {
  component: Modal,
  title: 'Modal',
};
export default Story;

export const Default = {
  args: {
    hideCloseIcon: false,
  },
  render: ({ ...args }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [opened, setOpened] = useState(false);
    const openModal = () => setOpened(true);
    const closeModal = () => setOpened(false);
    return (
      <>
        <Button onClick={openModal}>Open Modal</Button>
        {opened && (
          <Modal {...args} onClose={closeModal}>
            <header>title</header>
            <main>
              <div className="h-10 bg-zinc-300 pa-2" />
            </main>
            <Button onClick={() => console.log('clicked')}>OK</Button>;
          </Modal>
        )}
      </>
    );
  },
};
