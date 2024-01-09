import type { ServiceHistory } from '~backend/domain/service/entity';
import type { CreateServiceDTO } from '~backend/domain/service/dto';
import type { IServiceRepository } from '~backend/domain/service/repository/service/abstract';
import type { IResult } from '~backend/domain/shared/result';
import { ServiceAggregateRoot } from '~backend/domain/service/aggregate-root';
import { Result } from '~backend/domain/shared/result';
import { AppError, AppErrorUnexpected } from '~backend/domain/shared/error';
import { UseCase } from '~backend/domain/shared/use-case';
import { NOT_ALLOW } from '~backend/domain/service/error';

type CreatedServiceResult = ServiceHistory;
export type Payload = CreateServiceDTO;
type Return = IResult<ServiceHistory> | AppErrorUnexpected;

export class CreateServiceUseCase implements UseCase<Payload, Promise<Return>> {
  private serviceRepository: IServiceRepository;

  constructor(serviceRepository: IServiceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async execute(payload?: Payload): Promise<Return> {
    if (!payload.providerId) return Result.fail(NOT_ALLOW);
    try {
      const [error, result] = await ServiceAggregateRoot.createService(payload);
      if (error) return Result.fail(error);
      const serviceHistory = await this.serviceRepository.create(result);
      return Result.ok<CreatedServiceResult>(serviceHistory);
    } catch (error) {
      return AppError.Unexpected(error);
    }
  }
}
