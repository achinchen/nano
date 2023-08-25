import type { Order } from '~backend/domain/order/entity';

type Payload = Omit<Order, 'id' | 'noteUpdatedAt'>;

export type CreateOrderDTO = Payload;
export type MergeOrderDTO = {
  id: Order['id'];
  payload: Payload;
};
export type RequestOrderDTO = CreateOrderDTO;
export type UpdateOrderDTO = Partial<Payload> & Pick<Order, 'id'>;
export type PermitOrderDTO = Pick<Order, 'providerId' | 'id'>;
export type RejectOrderDTO = Pick<Order, 'providerId' | 'id'>;
export type UpdateOrderNoteDTO = Pick<Order, 'providerId' | 'id' | 'note'>;
export type UpdateOrderServiceHistoryDTO = Pick<
  Order,
  'providerId' | 'id' | 'serviceHistoryId'
>;
