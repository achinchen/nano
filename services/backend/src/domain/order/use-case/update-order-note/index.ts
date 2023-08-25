import { orderRepository } from '~backend/domain/order/repository/order/index';
import { UpdateOrderNoteUseCase } from './implementation';
export const updateOrderNoteUseCase = new UpdateOrderNoteUseCase(
  orderRepository
);
