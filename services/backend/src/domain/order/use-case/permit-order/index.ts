import { orderRepository } from '~backend/domain/order/repository/order/index';
import { PermitOrderUseCase } from './implementation';
export const permitOrderUseCase = new PermitOrderUseCase(orderRepository);
