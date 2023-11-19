import { MAX, PERCENTAGE_CLASS } from './constants';

type ProgressProps = {
  value?: number;
};

export default function Progress({ value = MAX }: ProgressProps) {
  return (
    <span
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={MAX}
      className="h-2px w-19 overflow-hidden rounded-40 bg-zinc-200"
    >
      <span
        className={`block h-inherit bg-zinc-700 ${PERCENTAGE_CLASS[value]}`}
      />
    </span>
  );
}
