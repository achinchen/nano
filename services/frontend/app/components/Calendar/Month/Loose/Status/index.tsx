import type { Status as StatusType } from '~frontend/components/Calendar/types';

type StatusProps = {
  status: StatusType;
};

export const STATUS_CLASS: { [key in StatusType]: string } = {
  unsold: `bg-primary-300`,
  'has-order': `bg-yellow-500`,
  full: `bg-zinc-200`,
};

export const Status = ({ status }: StatusProps) => {
  return (
    <span className={`flex h-1 w-full rounded-3 ${STATUS_CLASS[status]}`} />
  );
};
