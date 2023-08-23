import type { IResult } from '~backend/domain/shared/result';
import { AggregateRoot } from '~backend/domain/shared/aggregate-root';
import { Guard } from '~backend/domain/shared/guard';
import {
  CreateServiceDTO,
  UpdateServiceDTO,
} from '~backend/domain/service/dto';
import {
  SERVICE_CREATED,
  SERVICE_UPDATED,
  HAS_ORDER_SERVICE_UPDATED,
} from '~backend/domain/service/event';
import { Result } from '~backend/domain/shared/result';

export const FIRST_VERSION = '1.0.0';

export class ServiceAggregateRoot extends AggregateRoot {
  public static createService(
    payload: CreateServiceDTO
  ): IResult<CreateServiceDTO> {
    const guardResult = Guard.notNullOrUndefinedOrEmptyStringBulk(
      Object.entries(payload).map(([key, value]) => ({
        argumentName: key,
        argument: value,
      }))
    );
    const [error] = guardResult;
    if (error) return guardResult;

    const aggregateRootResult = {
      ...payload,
      version: FIRST_VERSION,
    };

    const serviceAggregateRoot = new ServiceAggregateRoot();
    serviceAggregateRoot.addDomainEvent(SERVICE_CREATED, aggregateRootResult);
    return Result.ok(aggregateRootResult);
  }

  public static updateService(
    payload: Omit<UpdateServiceDTO, 'id'>
  ): IResult<Omit<UpdateServiceDTO, 'id'>> {
    const guardResult = Guard.notNullOrUndefinedOrEmptyStringBulk(
      Object.entries(payload).map(([key, value]) => ({
        argumentName: key,
        argument: value,
      }))
    );
    const [error] = guardResult;
    if (error) return guardResult;

    const serviceAggregateRoot = new ServiceAggregateRoot();
    serviceAggregateRoot.addDomainEvent(SERVICE_UPDATED, payload);
    return Result.ok(payload);
  }

  public static updateServiceHasOrder(
    payload: Omit<UpdateServiceDTO, 'id'>
  ): IResult<Omit<UpdateServiceDTO, 'id'>> {
    // supplierId/ locationId/ duration，
    const guardResult = Guard.notNullOrUndefinedOrEmptyStringBulk(
      Object.entries(payload).map(([key, value]) => ({
        argumentName: key,
        argument: value,
      }))
    );
    const [error] = guardResult;
    if (error) return guardResult;

    const serviceAggregateRoot = new ServiceAggregateRoot();
    serviceAggregateRoot.addDomainEvent(HAS_ORDER_SERVICE_UPDATED, payload);

    return Result.ok(payload);
  }
}
