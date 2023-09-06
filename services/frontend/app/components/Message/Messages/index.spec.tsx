import { render, screen } from '@testing-library/react';
import { Messages } from '~frontend/components/Message/Messages';
import { MESSAGES_ROOT_ID } from './constants';

let mockMessages = ['error', 'info', 'success', 'warning'].map((severity) => ({
  id: severity,
  severity,
  title: `${severity} title`,
  children: `${severity} message`,
}));

jest.mock('./context', () => ({
  useMessagesContext: () => ({ messages: mockMessages }),
  MessagesContextProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('Messages', () => {
  const setup = () => {
    render(<Messages />);
  };

  it('render root', () => {
    setup();
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.getElementById(MESSAGES_ROOT_ID)).toBeInTheDocument();
  });

  test.each(mockMessages)(
    'render message with correct context %s[children]',
    ({ children }) => {
      setup();
      expect(screen.getByText(children)).toBeInTheDocument();
    }
  );

  it('has hidden when no message', () => {
    mockMessages = [];
    setup();
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.getElementById(MESSAGES_ROOT_ID)).toHaveAttribute('hidden');
  });
});
