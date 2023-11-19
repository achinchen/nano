import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { uiEventEmitter } from '~frontend/components/Notification/utils';
import { EVENT_NAME } from '~frontend/components/Notification/constants';
import { generateId } from './utils';
import {
  NotificationsContextProvider,
  useNotificationsContext,
} from './context';

jest.mock('./utils', () => ({
  generateId: jest.fn().mockImplementation((id) => `${id}.id`),
}));

jest.mock('../utils', () => ({
  uiEventEmitter: {
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
  },
}));

const TestComponent = () => {
  const { Notifications } = useNotificationsContext();
  return (
    <div>
      {Notifications.map(({ id, children, onClose }) => (
        <button key={id} onClick={onClose}>
          {children}
        </button>
      ))}
    </div>
  );
};

const setup = () =>
  render(
    <NotificationsContextProvider>
      <TestComponent />
    </NotificationsContextProvider>
  );

describe('NotificationsContextProvider: mounted and unmounted', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('unsubscribe and subscribe event when mounted', () => {
    setup();
    expect(uiEventEmitter.unsubscribe).toHaveBeenCalledWith(
      EVENT_NAME,
      expect.any(Function)
    );
    expect(uiEventEmitter.subscribe).toHaveBeenCalledWith(
      EVENT_NAME,
      expect.any(Function)
    );
  });

  it('clear event and subscribe when unmounted', () => {
    const { unmount } = setup();
    expect(uiEventEmitter.unsubscribe).toHaveBeenCalledTimes(1);
    unmount();
    expect(uiEventEmitter.unsubscribe).toHaveBeenCalledTimes(2);
    expect(uiEventEmitter.unsubscribe).toHaveBeenLastCalledWith(
      EVENT_NAME,
      expect.any(Function)
    );
  });
});

describe('NotificationsContextProvider: add Notification', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockNotification = 'error Notification';

  const setupAndAddNotification = async () => {
    setup();
    const listener = (uiEventEmitter.subscribe as jest.Mock).mock.calls[0][1];
    await waitFor(() =>
      listener({ severity: 'error', children: mockNotification })
    );
  };

  it('add Notification when event is emitted', async () => {
    await setupAndAddNotification();
    expect(generateId).toHaveBeenCalledTimes(1);
    expect(screen.getByText(mockNotification)).toBeInTheDocument();
  });

  it('remove Notification when onClose is invoked', async () => {
    await setupAndAddNotification();
    expect(screen.getByText(mockNotification)).toBeInTheDocument();
    userEvent.click(screen.getByText(mockNotification));
    await waitFor(() =>
      expect(screen.queryByText(mockNotification)).not.toBeInTheDocument()
    );
  });
});
