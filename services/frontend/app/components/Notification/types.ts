import { SEVERITIES } from './constants';
export type NotificationSeverity = (typeof SEVERITIES)[number];

export type NotificationEvent = CustomEvent<NotificationProps>;

export type NotificationId = string;

export type NotificationProps = {
  title: string;
  children: JSX.Element | string;
  severity: NotificationSeverity;
  onClick?: () => void;
  onClose?: () => void;
};

export type Notification = NotificationProps & { id: NotificationId };
