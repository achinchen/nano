import type { Order } from '~frontend/features/my/order/types';
export type Props = Pick<Order, 'queues' | 'duration'>;
