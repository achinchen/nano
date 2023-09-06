import type {
  Notification,
  NotificationProps,
  NotificationId,
} from '~frontend/components/Notification/types';
import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { EVENT_NAME } from '~frontend/components/Notification/constants';
import { uiEventEmitter } from '~frontend/components/Notification/utils';
import { generateId } from './utils';

type InitialState = {
  Notifications: Notification[];
};

export const NotificationsContext = createContext<InitialState>({
  Notifications: [],
});

if (process.env.NODE_ENV !== 'production') {
  NotificationsContext.displayName = 'NotificationsContext';
}

export const NotificationsContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [Notifications, setNotifications] = useState<Notification[]>([]);
  const countRef = useRef(0);

  const onClose = (targetId: NotificationId) => {
    setNotifications((Notifications) =>
      Notifications.filter((Notification) => Notification.id !== targetId)
    );
  };

  const addNotification = useCallback((payload: NotificationProps) => {
    countRef.current += 1;
    const id = generateId(countRef.current);
    setNotifications((Notifications) => [
      ...Notifications,
      {
        ...payload,
        id,
        onClose: () => {
          payload.onClose?.();
          onClose(id);
        },
      },
    ]);
  }, []);

  useEffect(() => {
    uiEventEmitter.unsubscribe(EVENT_NAME, addNotification);
    uiEventEmitter.subscribe(EVENT_NAME, addNotification);
    return () => uiEventEmitter.unsubscribe(EVENT_NAME, addNotification);
  }, [addNotification]);

  return (
    <NotificationsContext.Provider
      value={{
        Notifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export function useNotificationsContext() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error(
      'The NotificationsContext hook must be used within a NotificationsContextProvider.Provider'
    );
  }
  return context;
}
