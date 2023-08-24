import type { Order } from '~backend/domain/order/entity';

type Payload = Omit<Order, 'id' | 'noteUpdatedAt'>;

export type CreateOrderDTO = Payload;
export type RequestOrderDTO = CreateOrderDTO;
export type UpdateOrderDTO = Partial<Payload> & Pick<Order, 'id'>;
export type PermitOrderDTO = Pick<Order, 'providerId' | 'id'>;
export type RejectOrderDTO = Pick<Order, 'providerId' | 'id'>;
