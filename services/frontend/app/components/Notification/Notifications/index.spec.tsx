import { render, screen } from '@testing-library/react';
import { Notifications } from '~frontend/components/Notification/Notifications';
import { SEVERITIES } from '~frontend/components/Notification/constants';
import { NOTIFICATIONS_ROOT_ID } from './constants';

let mockNotifications = SEVERITIES.map((severity) => ({
  id: severity,
  severity,
  title: severity,
  children: `${severity} Notification`,
}));

jest.mock('./context', () => ({
  useNotificationsContext: () => ({ Notifications: mockNotifications }),
  NotificationsContextProvider: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <div>{children}</div>,
}));

describe('Notifications', () => {
  const setup = () => {
    render(<Notifications />);
  };

  it('render root', () => {
    setup();
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.getElementById(NOTIFICATIONS_ROOT_ID)).toBeInTheDocument();
  });

  test.each(mockNotifications)(
    'render Notification with correct context %s[children]',
    ({ children }) => {
      setup();
      expect(screen.getByText(children)).toBeInTheDocument();
    }
  );

  it('has hidden when no Notification', () => {
    mockNotifications = [];
    setup();
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.getElementById(NOTIFICATIONS_ROOT_ID)).toHaveAttribute(
      'hidden'
    );
  });
});
