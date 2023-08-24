import { OrderRepository } from './implementation';

export type { IOrderRepository } from './abstract';

export const orderRepository = new OrderRepository();
