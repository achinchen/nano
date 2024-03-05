import type { ServiceStatus } from '~frontend/types';
import { TAG_CONFIG } from '~frontend/components/Tag/constants';
import i from './i.json';

type StatusTagProps = {
  className?: string;
  status: ServiceStatus;
};

const STATUS_CONFIG = {
  'has-order': 'bg-orange-500',
  full: 'bg-zinc-400',
};

export function StatusTag({ status, className = '' }: StatusTagProps) {
  if (status === 'unsold') return null;
  return (
    <span
      className={`${TAG_CONFIG.base} ${STATUS_CONFIG[status]} ${className} h-6 min-w-10 color-light-100 ml-3`}
    >
      {i[status]}
    </span>
  );
}

export default StatusTag;
