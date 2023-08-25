import type { IOrderRepository } from '~backend/domain/order/repository/order/abstract';
import type { IResult } from '~backend/domain/shared/result';
import { Result } from '~backend/domain/shared/result';
import { AppError, AppErrorUnexpected } from '~backend/domain/shared/error';
import { UseCase } from '~backend/domain/shared/use-case';
import { OrderAggregateRoot } from '~backend/domain/order/aggregate-root';
import { UpdateOrderServiceHistoryDTO } from '~backend/domain/order/dto';
import { INVALID, NOT_ALLOW } from '~backend/domain/order/error';

type UpdateOrderServiceHistoryResult = boolean;
export type Payload = UpdateOrderServiceHistoryDTO;
type Return = IResult<UpdateOrderServiceHistoryResult> | AppErrorUnexpected;

export class UpdateOrderServiceHistoryUseCase
  implements UseCase<Payload, Promise<Return>>
{
  private orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(payload?: Payload): Promise<Return> {
    const { id, providerId } = payload;
    if (!providerId || !id) return Result.fail(INVALID);

    try {
      const order = await this.orderRepository.getById(id);
      if (!order) return Result.fail(NOT_ALLOW);

      if (order.providerId !== providerId) return Result.fail(NOT_ALLOW);

      const [error, result] =
        OrderAggregateRoot.updateOrderServiceHistory(payload);
      if (error) return Result.fail(error);

      await this.orderRepository.update(result);
      return Result.ok<UpdateOrderServiceHistoryResult>(true);
    } catch (error) {
      return AppError.Unexpected(error);
    }
  }
}
