import type { MessageProps } from '~frontend/components/Message/types';
import { renderHook } from '@testing-library/react';
import { uiEventEmitter } from '~frontend/components/Message/utils';
import { EVENT_NAME } from '~frontend/components/Message/constants';
import { useMessage } from './use-message';

jest.mock('../utils', () => ({
  uiEventEmitter: {
    emit: jest.fn(),
  },
}));

describe('useMessage', () => {
  const setup = () => {
    const { result } = renderHook(() => useMessage());
    const { addMessage } = result.current;
    return addMessage;
  };

  it('has addMessage', () => {
    const addMessage = setup();
    expect(typeof addMessage).toBe('function');
  });

  it('trigger uiEventEmitter when invoking addMessage', () => {
    const addMessage = setup();
    const messageProps = {
      severity: 'error',
      children: 'test',
    } as MessageProps;
    addMessage(messageProps);
    expect(uiEventEmitter.emit).toHaveBeenCalledWith(EVENT_NAME, messageProps);
  });
});
