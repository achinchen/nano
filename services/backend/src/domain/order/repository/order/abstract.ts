import type { Order } from '~backend/domain/order/entity';

export interface IOrderRepository {
  getById(id: Order['id']): Promise<Order>;
  getAllByProviderId(provider: Order['providerId']): Promise<Order[]>;
  getAllByUserId(id: Order['id']): Promise<Order[]>;
  deleteById(id: Order['id']): Promise<boolean>;
}
