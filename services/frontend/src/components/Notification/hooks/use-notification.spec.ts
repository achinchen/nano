import type { NotificationProps } from '~frontend/components/Notification/types';
import { renderHook } from '@testing-library/react';
import { uiEventEmitter } from '~frontend/components/Notification/utils';
import { EVENT_NAME } from '~frontend/components/Notification/constants';
import { useNotification } from './use-notification';

jest.mock('../utils', () => ({
  uiEventEmitter: {
    emit: jest.fn(),
  },
}));

describe('useNotification', () => {
  const setup = () => {
    const { result } = renderHook(() => useNotification());
    const { addNotification } = result.current;
    return addNotification;
  };

  it('has addNotification', () => {
    const addNotification = setup();
    expect(typeof addNotification).toBe('function');
  });

  it('trigger uiEventEmitter when invoking addNotification', () => {
    const addNotification = setup();
    const NotificationProps = {
      severity: 'error',
      children: 'test',
    } as NotificationProps;
    addNotification(NotificationProps);
    expect(uiEventEmitter.emit).toHaveBeenCalledWith(
      EVENT_NAME,
      NotificationProps
    );
  });
});
