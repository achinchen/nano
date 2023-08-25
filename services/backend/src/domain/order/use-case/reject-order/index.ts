import { orderRepository } from '~backend/domain/order/repository/order/index';
import { RejectOrderUseCase } from './implementation';
export const rejectOrderUseCase = new RejectOrderUseCase(orderRepository);
