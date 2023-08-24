import { orderRepository } from '~backend/domain/order/repository/order/index';
import { DeleteOrderUseCase } from './implementation';
export const deleteOrderUseCase = new DeleteOrderUseCase(orderRepository);
