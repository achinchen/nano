import type { Order } from '~backend/domain/order/entity';
import { CreateOrderDTO, UpdateOrderDTO } from '~backend/domain/order/dto';

export interface IOrderRepository {
  create(order: CreateOrderDTO): Promise<Order>;
  getById(id: Order['id']): Promise<Order>;
  getByIdAndProviderId(
    id: Order['id'],
    provider: Order['providerId']
  ): Promise<Order>;
  update(payload: UpdateOrderDTO): Promise<boolean>;
  getAllByProviderId(provider: Order['providerId']): Promise<Order[]>;
  getAllByUserId(id: Order['id']): Promise<Order[]>;
  deleteById(id: Order['id']): Promise<boolean>;
}
