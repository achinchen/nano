import type { Status } from './types';
import { TAG_CONFIG } from '~frontend/components/Tag/constants';
import i from './i.json';

type StatusTagProps = {
  className?: string;
  status: Status;
};

const STATUS_CONFIG = {
  'has-order': 'bg-orange-500',
  full: 'bg-zinc-400',
};

export function StatusTag({ status, className = '' }: StatusTagProps) {
  if (status === 'unsold') return null;
  return (
    <span
      className={`${TAG_CONFIG.base} ${STATUS_CONFIG[status]} ${className} h-6 color-light-100 ml-3`}
    >
      {i[status]}
    </span>
  );
}

export default StatusTag;
