import type { Meta } from '@storybook/react';
import { ModalSheet, ModalSheetProps } from '.';

const Story: Meta<typeof ModalSheet> = {
  component: ModalSheet,
  title: 'ModalSheet',
};
export default Story;

export const Default = (args: ModalSheetProps) => {
  return (
    <div>
      <ModalSheet {...args}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nobis
        possimus exercitationem, error quas mollitia fuga deleniti rem quis
        quaerat nostrum esse dolorem excepturi doloremque obcaecati. Voluptatem
        eos assumenda rerum?
      </ModalSheet>
    </div>
  );
};
