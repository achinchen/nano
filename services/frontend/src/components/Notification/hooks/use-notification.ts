import type { NotificationProps } from '~frontend/components/Notification/types';
import { useCallback } from 'react';
import { uiEventEmitter } from '~frontend/components/Notification/utils';
import { EVENT_NAME } from '~frontend/components/Notification/constants';

export const useNotification = () => {
  const addNotification = useCallback(
    (NotificationProps: NotificationProps) => {
      uiEventEmitter.emit(EVENT_NAME, NotificationProps);
    },
    []
  );

  return { addNotification };
};
