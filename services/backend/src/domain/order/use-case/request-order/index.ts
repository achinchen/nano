import { orderRepository } from '~backend/domain/order/repository/order/index';
import { RequestOrderUseCase } from './implementation';
export const requestOrderUseCase = new RequestOrderUseCase(orderRepository);
