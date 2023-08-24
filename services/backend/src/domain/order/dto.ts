import type { Order } from '~backend/domain/order/entity';

type Payload = Omit<Order, 'id' | 'noteUpdatedAt'>;

export type CreateOrderDTO = Payload;
