import type { IOrderRepository } from '~backend/domain/order/repository/order/abstract';
import type { IResult } from '~backend/domain/shared/result';
import type { Order } from '~backend/domain/order/entity';
import { Result } from '~backend/domain/shared/result';
import { AppError, AppErrorUnexpected } from '~backend/domain/shared/error';
import { UseCase } from '~backend/domain/shared/use-case';
import { INVALID, NOT_ALLOW } from '~backend/domain/order/error';

type DeleteOrderResult = boolean;
export type Payload = Pick<Order, 'id' | 'providerId'>;
type Return = IResult<DeleteOrderResult> | AppErrorUnexpected;

export class DeleteOrderUseCase implements UseCase<Payload, Promise<Return>> {
  private orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(payload?: Payload): Promise<Return> {
    const { id, providerId } = payload;
    if (!providerId || !id) return Result.fail(INVALID);
    try {
      const order = await this.orderRepository.getByIdAndProviderId(
        id,
        providerId
      );
      if (!order) return Result.fail(NOT_ALLOW);

      await this.orderRepository.deleteById(id);
      return Result.ok<DeleteOrderResult>(true);
    } catch (error) {
      return AppError.Unexpected(error);
    }
  }
}
