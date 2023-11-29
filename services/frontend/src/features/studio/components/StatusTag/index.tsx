import { TAG_CONFIG } from '~frontend/components/Tag/constants';
import i from '~frontend/features/studio/i.json';

type StatusTagProps = {
  className?: string;
  end?: boolean;
};

export function StatusTag({ end, className = '' }: StatusTagProps) {
  return (
    <span
      className={`${TAG_CONFIG.base} ${
        end ? 'bg-clay-300' : 'bg-clay-500'
      } ${className} h-6 min-w-10 color-light-100 ml-3`}
    >
      {end ? i.end : i.processing}
    </span>
  );
}

export default StatusTag;
