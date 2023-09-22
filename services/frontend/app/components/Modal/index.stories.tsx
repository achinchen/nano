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
    title: 'Title',
    content: 'Content',
    className: '',
    hideCloseIcon: false,
  },
  render: ({ ...args }) => {
    const footer = <Button onClick={() => console.log('clicked')}>OK</Button>;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [opened, setOpened] = useState(false);
    const openModal = () => setOpened(true);
    const closeModal = () => setOpened(false);
    return (
      <>
        <Button onClick={openModal}>Open Modal</Button>
        {opened && (
          <Modal footer={footer} {...args} onClose={closeModal}>
            {args.content}
          </Modal>
        )}
      </>
    );
  },
};
