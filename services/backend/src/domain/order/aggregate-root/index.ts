import type { IResult } from '~backend/domain/shared/result';
import type { Order } from '~backend/domain/order/entity';
import { AggregateRoot } from '~backend/domain/shared/aggregate-root';
import { Guard } from '~backend/domain/shared/guard';
import {
  ORDER_CREATED,
  ORDER_REQUESTED,
  ORDER_PERMITTED,
  ORDER_REJECTED,
  ORDER_NOTE_UPDATED,
  ORDER_SERVICE_HISTORY_UPDATED,
  ORDER_MERGED,
} from '~backend/domain/order/event';
import {
  CreateOrderDTO,
  PermitOrderDTO,
  RejectOrderDTO,
  UpdateOrderNoteDTO,
  UpdateOrderServiceHistoryDTO,
  MergeOrderDTO,
} from '~backend/domain/order/dto';
import { Result } from '~backend/domain/shared/result';
import {
  DEFAULT_STATE,
  REQUESTED_STATE,
  PERMITTED_STATE,
  REJECTED_STATE,
} from './constants';
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

  public static updateOrderNote(
    payload: UpdateOrderNoteDTO
  ): IResult<UpdateOrderNoteDTO & { noteUpdatedAt: Order['noteUpdatedAt'] }> {
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
      noteUpdatedAt: new Date(),
    };

    const orderAggregateRoot = new OrderAggregateRoot();
    orderAggregateRoot.addDomainEvent(ORDER_NOTE_UPDATED, aggregateRootResult);
    return Result.ok(aggregateRootResult);
  }

  public static updateOrderServiceHistory(
    payload: UpdateOrderServiceHistoryDTO
  ): IResult<UpdateOrderServiceHistoryDTO> {
    const orderAggregateRoot = new OrderAggregateRoot();
    orderAggregateRoot.addDomainEvent(ORDER_SERVICE_HISTORY_UPDATED, payload);
    return Result.ok(payload);
  }

  public static mergeOrder({
    target,
    payload: { id, ...order },
  }: {
    target: Pick<Order, 'serviceHistoryId' | 'startAt'>;
    payload: Order;
  }): IResult<MergeOrderDTO> {
    const aggregateRootResult = {
      payload: {
        ...order,
        serviceHistoryId: target.serviceHistoryId,
        startAt: target.startAt,
        state: PERMITTED_STATE,
      },
      id,
    };

    const orderAggregateRoot = new OrderAggregateRoot();
    orderAggregateRoot.addDomainEvent(ORDER_MERGED, aggregateRootResult);
    return Result.ok(aggregateRootResult);
  }
}
