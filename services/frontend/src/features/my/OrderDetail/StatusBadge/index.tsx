import type { OrderStatus } from '~frontend/features/my/types';
import i from '~frontend/features/my/i.json';

const className = {
  request: 'bg-yellow-100 color-yellow-500',
  coming: 'bg-primary-100 color-primary-500',
  end: 'bg-zinc-100 color-zinc-500',
} as const;

export default function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <header
      className={`mt--4 mx--4 mb-4 pa-2 text-center ${className[status]}`}
    >
      {i[status]}
    </header>
  );
}
