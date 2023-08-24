import type { Order } from '~backend/domain/order/entity';
import type { CreateOrderDTO } from '~backend/domain/order/dto';
import type { IOrderRepository } from '~backend/domain/order/repository/order/abstract';
import type { IResult } from '~backend/domain/shared/result';
import { Result } from '~backend/domain/shared/result';
import { AppError, AppErrorUnexpected } from '~backend/domain/shared/error';
import { OrderAggregateRoot } from '~backend/domain/order/aggregate-root';
import { UseCase } from '~backend/domain/shared/use-case';
import { NOT_ALLOW } from '~backend/domain/order/error';

type CreatedOrderResult = Order;
export type Payload = CreateOrderDTO;
type Return = IResult<Order> | AppErrorUnexpected;

export class CreateOrderUseCase implements UseCase<Payload, Promise<Return>> {
  private orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(payload?: Payload): Promise<Return> {
    if (!payload.userId) return Result.fail(NOT_ALLOW);
    try {
      const [error, result] = OrderAggregateRoot.createOrder(payload);
      if (error) return Result.fail(error);
      const order = await this.orderRepository.create(result);
      return Result.ok<CreatedOrderResult>(order);
    } catch (error) {
      return AppError.Unexpected(error);
    }
  }
}
