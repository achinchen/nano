import { orderRepository } from '~backend/domain/order/repository/order/index';
import { MergeOrderUseCase } from './implementation';
export const mergeOrderUseCase = new MergeOrderUseCase(orderRepository);
