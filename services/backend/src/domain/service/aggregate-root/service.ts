import type { IResult } from '~backend/domain/shared/result';
import { AggregateRoot } from '~backend/domain/shared/aggregate-root';
import { Guard } from '~backend/domain/shared/guard';
import { CreateServiceDTO } from '~backend/domain/service/dto';
import { SERVICE_CREATED } from '~backend/domain/service/event';
import { Result } from '~backend/domain/shared/result';

const FIRST_VERSION = '1.0.0';

export class ServiceAggregateRoot extends AggregateRoot {
  public static createService(
    payload: CreateServiceDTO
  ): IResult<CreateServiceDTO> {
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
      version: FIRST_VERSION,
    };

    const serviceAggregateRoot = new ServiceAggregateRoot();
    serviceAggregateRoot.addDomainEvent(SERVICE_CREATED, aggregateRootResult);
    return Result.ok(aggregateRootResult);
  }
}
