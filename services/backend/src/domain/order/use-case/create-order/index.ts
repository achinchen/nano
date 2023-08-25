import { orderRepository } from '~backend/domain/order/repository/order/index';
import { CreateOrderUseCase } from './implementation';
export const createOrderUseCase = new CreateOrderUseCase(orderRepository);
