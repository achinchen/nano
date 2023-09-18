import { Notification } from '~frontend/components/Notification/Notification';
import {
  useNotificationsContext,
  NotificationsContextProvider,
} from './context';
import { NOTIFICATIONS_ROOT_ID } from './constants';

function NotificationsWithContext() {
  const { Notifications } = useNotificationsContext();
  const withoutNotifications = Notifications.length === 0;

  return (
    <div
      id={NOTIFICATIONS_ROOT_ID}
      className="position-fixed left-full top-0 flex flex-col translate-x--100% items-center"
      hidden={withoutNotifications}
    >
      {Notifications.map((notification) => (
        <Notification key={notification.id} {...notification} />
      ))}
    </div>
  );
}

export function Notifications() {
  return (
    <NotificationsContextProvider>
      <NotificationsWithContext />
    </NotificationsContextProvider>
  );
}
