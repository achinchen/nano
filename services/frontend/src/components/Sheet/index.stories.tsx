import type { Meta } from '@storybook/react';
import type { SheetProps } from '.';
import { useState } from 'react';
import Sheet from '.';

const Story: Meta<typeof Sheet> = {
  component: Sheet,
  title: 'Sheet',
};
export default Story;

export const Default = (args: SheetProps) => {
  const [opened, setOpened] = useState(true);

  return (
    <div>
      {opened && (
        <Sheet {...args} onClose={() => setOpened(false)}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nobis
          possimus exercitationem, error quas mollitia fuga deleniti rem quis
          quaerat nostrum esse dolorem excepturi doloremque obcaecati.
          Voluptatem eos assumenda rerum?
        </Sheet>
      )}
    </div>
  );
};
