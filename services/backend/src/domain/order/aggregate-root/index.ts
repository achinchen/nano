import type { IResult } from '~backend/domain/shared/result';
import type { State, Order } from '~backend/domain/order/entity';
import { AggregateRoot } from '~backend/domain/shared/aggregate-root';
import { Guard } from '~backend/domain/shared/guard';
import {
  ORDER_CREATED,
  ORDER_REQUESTED,
  ORDER_PERMITTED,
  ORDER_REJECTED,
} from '~backend/domain/order/event';
import {
  CreateOrderDTO,
  PermitOrderDTO,
  RejectOrderDTO,
} from '~backend/domain/order/dto';
import { Result } from '~backend/domain/shared/result';

export const DEFAULT_STATE = 'accepted' as State;
export const REQUESTED_STATE = 'requested' as State;
export const PERMITTED_STATE = 'permitted' as State;
export const REJECTED_STATE = 'rejected' as State;

export class OrderAggregateRoot extends AggregateRoot {
  public static createOrder(
    payload: Omit<CreateOrderDTO, 'state'>
  ): IResult<CreateOrderDTO> {
    const guardResult = Guard.notNullOrUndefinedBulk(
      Object.entries(payload).map(([key, value]) => ({
        argumentName: key,
        argument: value,
      }))
    );
    const [error] = guardResult;
    if (error) return guardResult;

    const aggregateRootResult = {
      ...payload,
      state: DEFAULT_STATE,
    };

    const orderAggregateRoot = new OrderAggregateRoot();
    orderAggregateRoot.addDomainEvent(ORDER_CREATED, aggregateRootResult);
    return Result.ok(aggregateRootResult);
  }

  public static requestOrder(
    payload: Omit<CreateOrderDTO, 'state'>
  ): IResult<CreateOrderDTO> {
    const guardResult = Guard.notNullOrUndefinedBulk(
      Object.entries(payload).map(([key, value]) => ({
        argumentName: key,
        argument: value,
      }))
    );
    const [error] = guardResult;
    if (error) return guardResult;

    const aggregateRootResult = {
      ...payload,
      state: REQUESTED_STATE,
    };

    const orderAggregateRoot = new OrderAggregateRoot();
    orderAggregateRoot.addDomainEvent(ORDER_REQUESTED, aggregateRootResult);
    return Result.ok(aggregateRootResult);
  }

  public static permitOrder(
    payload: Omit<PermitOrderDTO, 'state'>
  ): IResult<PermitOrderDTO & { state: Order['state'] }> {
    const guardResult = Guard.notNullOrUndefinedBulk(
      Object.entries(payload).map(([key, value]) => ({
        argumentName: key,
        argument: value,
      }))
    );
    const [error] = guardResult;
    if (error) return guardResult;

    const aggregateRootResult = {
      ...payload,
      state: PERMITTED_STATE,
    };

    const orderAggregateRoot = new OrderAggregateRoot();
    orderAggregateRoot.addDomainEvent(ORDER_PERMITTED, aggregateRootResult);
    return Result.ok(aggregateRootResult);
  }

  public static rejectOrder(
    payload: Omit<RejectOrderDTO, 'state'>
  ): IResult<RejectOrderDTO & { state: Order['state'] }> {
    const guardResult = Guard.notNullOrUndefinedBulk(
      Object.entries(payload).map(([key, value]) => ({
        argumentName: key,
        argument: value,
      }))
    );
    const [error] = guardResult;
    if (error) return guardResult;

    const aggregateRootResult = {
      ...payload,
      state: REJECTED_STATE,
    };

    const orderAggregateRoot = new OrderAggregateRoot();
    orderAggregateRoot.addDomainEvent(ORDER_REJECTED, aggregateRootResult);
    return Result.ok(aggregateRootResult);
  }
}
