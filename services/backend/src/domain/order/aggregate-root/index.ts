import type { IResult } from '~backend/domain/shared/result';
import { AggregateRoot } from '~backend/domain/shared/aggregate-root';
import { Guard } from '~backend/domain/shared/guard';
import { ORDER_CREATED } from '~backend/domain/order/event';
import { CreateOrderDTO } from '~backend/domain/order/dto';
import { Result } from '~backend/domain/shared/result';

export const FIRST_VERSION = '1.0.0';

export class OrderAggregateRoot extends AggregateRoot {
  public static createOrder(payload: CreateOrderDTO): IResult<CreateOrderDTO> {
    const guardResult = Guard.notNullOrUndefinedBulk(
      Object.entries(payload).map(([key, value]) => ({
        argumentName: key,
        argument: value,
      }))
    );
    const [error] = guardResult;
    if (error) return guardResult;

    const orderAggregateRoot = new OrderAggregateRoot();
    orderAggregateRoot.addDomainEvent(ORDER_CREATED, payload);
    return Result.ok(payload);
  }
}
