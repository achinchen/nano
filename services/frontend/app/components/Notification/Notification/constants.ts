import type { NotificationSeverity } from '~frontend/components/Notification/types';

export const CONTAINER_CLASSNAMES =
  'flex flex-row items-center mx-4 mt-2 mb-4 pr-3 pl-4 py-2 max-w-80 min-w-80 shadow-default border-1 border-solid border-zinc-100 bg-light-100 rounded-3 font-default text-sm whitespace-pre-line';

export const COLOR: { [key in NotificationSeverity]: string } = {
  request: 'text-primary-500',
  success: 'text-primary-500',
  error: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500',
};

export const ICON: { [key in NotificationSeverity]: string } = {
  request: 'i-solar-cart-large-4-bold',
  success: 'i-solar-check-circle-bold',
  error: 'i-solar-close-circle-bold',
  warning: 'i-solar-danger-triangle-bold',
  info: 'i-solar-info-circle-bold',
};
