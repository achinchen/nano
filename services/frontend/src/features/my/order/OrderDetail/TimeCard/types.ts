import type { OrderDetail } from '~frontend/features/my/order/types';
export type Props = Partial<Pick<OrderDetail, 'queues' | 'startAt'>> & {
  duration: OrderDetail['service']['duration'];
};
