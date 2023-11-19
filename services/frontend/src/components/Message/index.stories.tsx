import type { Meta } from '@storybook/react';
import { Fragment } from 'react';
import Button from '~frontend/components/Button';
import { SEVERITIES } from './constants';
import { Messages, MessageProps, useMessage } from '.';

const Story: Meta<typeof Messages> = {
  component: Messages,
  title: 'Message',
  argTypes: {
    severity: {
      options: SEVERITIES,
      control: { type: 'radio' },
    },
  },
};
export default Story;

const ChildComponent = (args: MessageProps) => {
  const { addMessage } = useMessage();
  const onClick = () => {
    addMessage(args);
  };
  return <Button onClick={onClick}>add message</Button>;
};

export const Default = (args: MessageProps) => {
  return (
    <Fragment>
      <ChildComponent {...args} />
      <Messages />
    </Fragment>
  );
};

Default.args = {
  title: 'Lorem ipsum dolor sit amet',
  children:
    'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
};
