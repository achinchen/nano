import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { uiEventEmitter } from '~frontend/components/Message/utils';
import { EVENT_NAME } from '~frontend/components/Message/constants';
import { generateId } from './utils';
import { MessagesContextProvider, useMessagesContext } from './context';

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
  const { messages } = useMessagesContext();
  return (
    <div>
      {messages.map(({ id, children, onClose }) => (
        <button key={id} onClick={onClose}>
          {children}
        </button>
      ))}
    </div>
  );
};

const setup = () =>
  render(
    <MessagesContextProvider>
      <TestComponent />
    </MessagesContextProvider>
  );

describe('MessagesContextProvider: mounted and unmounted', () => {
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

describe('MessagesContextProvider: add message', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockMessage = 'error message';

  const setupAndAddMessage = async () => {
    setup();
    const listener = (uiEventEmitter.subscribe as jest.Mock).mock.calls[0][1];
    await waitFor(() => listener({ severity: 'error', children: mockMessage }));
  };

  it('add message when event is emitted', async () => {
    await setupAndAddMessage();
    expect(generateId).toHaveBeenCalledTimes(1);
    expect(screen.getByText(mockMessage)).toBeInTheDocument();
  });

  it('remove message when onClose is invoked', async () => {
    await setupAndAddMessage();
    expect(screen.getByText(mockMessage)).toBeInTheDocument();
    userEvent.click(screen.getByText(mockMessage));
    await waitFor(() =>
      expect(screen.queryByText(mockMessage)).not.toBeInTheDocument()
    );
  });
});
