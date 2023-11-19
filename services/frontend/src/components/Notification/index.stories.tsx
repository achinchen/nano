import type { Meta } from '@storybook/react';
import { Fragment } from 'react';
import Button from '~frontend/components/Button';
import { SEVERITIES } from './constants';
import { Notifications, NotificationProps, useNotification } from '.';

const Story: Meta<typeof Notifications> = {
  component: Notifications,
  title: 'Notification',
  argTypes: {
    severity: {
      options: SEVERITIES,
      control: { type: 'radio' },
    },
  },
};
export default Story;

const ChildComponent = (args: NotificationProps) => {
  const { addNotification } = useNotification();
  const onClick = () => {
    addNotification(args);
  };
  return <Button onClick={onClick}>add Notification</Button>;
};

export const Default = (args: NotificationProps) => {
  return (
    <Fragment>
      <ChildComponent {...args} />
      <Notifications />
    </Fragment>
  );
};

Default.args = {
  title: '標題',
  children:
    'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
};
