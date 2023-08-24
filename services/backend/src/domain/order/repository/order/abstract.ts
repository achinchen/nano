import type { Order } from '~backend/domain/order/entity';
import { CreateOrderDTO } from '~backend/domain/order/dto';

export interface IOrderRepository {
  create(order: CreateOrderDTO): Promise<Order>;
  getById(id: Order['id']): Promise<Order>;
  getAllByProviderId(provider: Order['providerId']): Promise<Order[]>;
  getAllByUserId(id: Order['id']): Promise<Order[]>;
  deleteById(id: Order['id']): Promise<boolean>;
}
