import type { IOrderRepository } from './abstract';
import { Order } from '~backend/domain/order/entity';
import { dataSource } from '~backend/data-source';
import { Order as DBOrder } from '~backend/domain/order/infra/db/order';
import { CreateOrderDTO, UpdateOrderDTO } from '~backend/domain/order/dto';

const orderRepository = dataSource.getRepository(DBOrder);

export class OrderRepository implements IOrderRepository {

  async create(payload: CreateOrderDTO): Promise<Order> {
    const orderPayload = orderRepository.create(payload);
    const order = await orderRepository.save(orderPayload);
    return order;
  }

  async getById(id: Order['id']): Promise<Order> {
    const order = await orderRepository.findOneBy({ id });
    return order;
  }

  async getByIdAndProviderId(
    id: Order['id'],
    providerId: Order['providerId']
  ): Promise<Order> {
    const order = await orderRepository.findOneBy({ id, providerId });
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

  async update({ id, ...payload }: UpdateOrderDTO): Promise<boolean> {
    const order = await orderRepository.update({ id }, payload);
    return Boolean(order);
  }

  async deleteById(id: Order['id']): Promise<boolean> {
    const order = await orderRepository.softDelete({ id });
    return Boolean(order);
  }
}
