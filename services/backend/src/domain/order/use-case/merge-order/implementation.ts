import type { Order } from '~backend/domain/order/entity';
import type { IOrderRepository } from '~backend/domain/order/repository/order/abstract';
import type { IResult } from '~backend/domain/shared/result';
import { Result } from '~backend/domain/shared/result';
import { Guard } from '~backend/domain/shared/guard';
import { AppError, AppErrorUnexpected } from '~backend/domain/shared/error';
import { OrderAggregateRoot } from '~backend/domain/order/aggregate-root';
import { UseCase } from '~backend/domain/shared/use-case';
import { INVALID, NOT_ALLOW } from '~backend/domain/order/error';

type MergeOrderResult = Order;
export type Payload = {
  id: Order['id'];
  providerId: Order['providerId'];
  target: Pick<Order, 'serviceHistoryId' | 'startAt'>;
};
type Return = IResult<Order> | AppErrorUnexpected;

export class MergeOrderUseCase implements UseCase<Payload, Promise<Return>> {
  private orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(payload?: Payload): Promise<Return> {
    try {
      const guardResult = Guard.notNullOrUndefinedBulk(
        Object.entries(payload).map(([key, value]) => ({
          argumentName: key,
          argument: value,
        }))
      );
      const [guardError] = guardResult;
      if (guardError) return Result.fail(INVALID);

      const { id, providerId, target } = payload;
      const currentOrder = await this.orderRepository.getById(id);
      if (!currentOrder) return Result.fail(INVALID);
      if (currentOrder.providerId !== providerId) return Result.fail(NOT_ALLOW);

      const [error, result] = OrderAggregateRoot.mergeOrder({
        payload: currentOrder,
        target,
      });
      if (error) return Result.fail(error);
      const order = await this.orderRepository.merge(result);
      return Result.ok<MergeOrderResult>(order);
    } catch (error) {
      return AppError.Unexpected(error);
    }
  }
}
