import type { Order } from '~frontend/features/my/types';
export type Props = Pick<Order, 'queues' | 'duration'>;
