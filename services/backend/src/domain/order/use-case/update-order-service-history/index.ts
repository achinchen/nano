import { orderRepository } from '~backend/domain/order/repository/order/index';
import { UpdateOrderServiceHistoryUseCase } from './implementation';
export const updateOrderServiceHistoryUseCase =
  new UpdateOrderServiceHistoryUseCase(orderRepository);
