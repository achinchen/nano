import type { MessageSeverity } from '~frontend/components/Message/types';

export const REMAIN_TIME = 3_000;

export const AUTOMATICALLY_CLOSE_SEVERITIES: MessageSeverity[] = [
  'success',
  'info',
];

export const CONTAINER_CLASSNAMES =
  'flex flex-row items-center mx-3 my-2 pr-3 pl-4 py-2 max-w-lg min-w-72 rounded-3 shadow-dialog font-default text-sm whitespace-pre-line';

export const COLOR: { [key in MessageSeverity]: string } = {
  success: 'bg-primary-100 text-primary-500',
  error: 'bg-red-100  text-red-500',
  warning: 'bg-yellow-50  text-yellow-500',
  info: 'bg-blue-100  text-blue-500',
};

export const ICON: { [key in MessageSeverity]: string } = {
  success: 'i-solar-check-circle-bold',
  error: 'i-solar-close-circle-bold',
  warning: 'i-solar-danger-triangle-bold',
  info: 'i-solar-info-circle-bold',
};
