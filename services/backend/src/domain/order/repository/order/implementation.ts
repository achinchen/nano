import type { IOrderRepository } from './abstract';
import { Order } from '~backend/domain/order/entity';
import { dataSource } from '~backend/data-source';
import { Order as DBOrder } from '~backend/domain/order/infra/db/order';
// import {
//   CreateServiceDTO,
//   UpdateServiceDTO,
// } from '~backend/domain/order/dto';

const orderRepository = dataSource.getRepository(DBOrder);

export class OrderRepository implements IOrderRepository {
  async getById(id: Order['id']): Promise<Order> {
    const order = await orderRepository.findOneBy({ id });
    return order;
  }

  async getAllByUserId(userId: Order['userId']): Promise<Order[]> {
    const orders = await orderRepository.findBy({ userId });
    return orders;
  }

  async getAllByProviderId(providerId: Order['providerId']): Promise<Order[]> {
    // TODO: paginated
    const orders = await orderRepository.findBy({ providerId });
    return orders;
  }

  async deleteById(id: Order['id']): Promise<boolean> {
    const order = await orderRepository.softDelete({ id });
    return Boolean(order);
  }
}
