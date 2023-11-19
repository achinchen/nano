import type { Meta } from '@storybook/react';
import Badge from '.';

const Story: Meta<typeof Badge> = {
  component: Badge,
  title: 'Badge',
};

export default Story;

const Item = () => <div className="h-6 w-6 bg-zinc-300" />;

export const Default = () => {
  return (
    <div className="flex gap-12">
      <Badge>
        <Item />
      </Badge>
      <Badge label="1">
        <Item />
      </Badge>
      <Badge label="999+">
        <Item />
      </Badge>
    </div>
  );
};
