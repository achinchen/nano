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
import { providerRepository } from '~backend/domain/provider/repository/provider';
import { getPlainPeriodTimes, setDateTime } from '~backend/domain/shared/utils';
import { Result } from '~backend/domain/shared/result';
import { UNCHANGED_CREATE_PAYLOAD } from './constants';

export class ServiceAggregateRoot extends AggregateRoot {
  public static async createService(
    payload: CreateServiceDTO
  ): Promise<IResult<CreateServiceDTO>> {
    const guardResult = Guard.notNullOrUndefinedOrEmptyStringBulk(
      Object.entries(payload).map(([key, value]) => ({
        argumentName: key,
        argument: value,
      }))
    );
    const [error] = guardResult;
    if (error) return guardResult;

    const provider = await providerRepository.getDetailById(payload.providerId);

    const [startTime, endTime] = getPlainPeriodTimes(
      provider.openAt,
      provider.openDuration
    );

    const startAt = payload.allday
      ? setDateTime(payload.startAt, startTime)
      : new Date(payload.startAt);
    const endAt = payload.allday
      ? setDateTime(payload.endAt, endTime)
      : new Date(payload.endAt);

    const aggregateRootResult = {
      ...payload,
      ...UNCHANGED_CREATE_PAYLOAD,
      startAt,
      endAt,
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
