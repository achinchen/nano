import type { Status } from './type';
import { TAG_CONFIG } from '~frontend/components/Tag/constants';
import i from './i.json';

type StatusTagProps = {
  status: Status;
};

const STATUS_CONFIG = {
  'has-order': 'bg-yellow-500',
  full: 'bg-zinc-400',
};

export function StatusTag({ status }: StatusTagProps) {
  if (status === 'unsold') return null;
  return (
    <span
      className={`${TAG_CONFIG.base} ${STATUS_CONFIG[status]} color-light-100 ml-3`}
    >
      {i[status]}
    </span>
  );
}

export default StatusTag;
