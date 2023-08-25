import type { IOrderRepository } from '~backend/domain/order/repository/order/abstract';
import type { IResult } from '~backend/domain/shared/result';
import { Result } from '~backend/domain/shared/result';
import { AppError, AppErrorUnexpected } from '~backend/domain/shared/error';
import { UseCase } from '~backend/domain/shared/use-case';
import { OrderAggregateRoot } from '~backend/domain/order/aggregate-root';
import { UpdateOrderNoteDTO } from '~backend/domain/order/dto';
import { INVALID, NOT_ALLOW } from '~backend/domain/order/error';

type UpdateOrderNoteResult = boolean;
export type Payload = UpdateOrderNoteDTO;
type Return = IResult<UpdateOrderNoteResult> | AppErrorUnexpected;

export class UpdateOrderNoteUseCase
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

      const [error, result] = OrderAggregateRoot.updateOrderNote(payload);
      if (error) return Result.fail(error);

      await this.orderRepository.update(result);
      return Result.ok<UpdateOrderNoteResult>(true);
    } catch (error) {
      return AppError.Unexpected(error);
    }
  }
}
