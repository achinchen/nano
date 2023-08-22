import type { Service } from '~backend/domain/service/entity';
import type { UpdateServiceDTO } from '~backend/domain/service/dto';
import type { IServiceRepository } from '~backend/domain/service/repository/service/abstract';
import type { IResult } from '~backend/domain/shared/result';
import { ServiceAggregateRoot } from '~backend/domain/service/aggregate-root/service';
import { Result } from '~backend/domain/shared/result';
import versionValueObject from '~backend/domain/service/value-object/version';
import { AppError, AppErrorUnexpected } from '~backend/domain/shared/error';
import { UseCase } from '~backend/domain/shared/use-case';
import { NOT_ALLOW } from '~backend/domain/service/error';

type UpdatedServiceResult = boolean;
export type Payload = Omit<UpdateServiceDTO, 'version'> & {
  providerId: Service['providerId'];
};
type Return = IResult<UpdatedServiceResult> | AppErrorUnexpected;

export class UpdateServiceUseCase implements UseCase<Payload, Promise<Return>> {
  private serviceRepository: IServiceRepository;

  constructor(serviceRepository: IServiceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async execute(payload?: Payload): Promise<Return> {
    const { id, providerId, ...updatedPayload } = payload;
    if (!providerId) return Result.fail(NOT_ALLOW);

    try {
      const service = await this.serviceRepository.getInfoByIdAndProviderId(
        id,
        providerId
      );
      if (!service) return Result.fail(NOT_ALLOW);

      const version = versionValueObject.bumpMajor(service.version);

      const [error, result] = ServiceAggregateRoot.updateService({
        ...updatedPayload,
        version,
      });
      if (error) return Result.fail(error);

      await this.serviceRepository.update({
        id,
        ...result,
      });
      return Result.ok<UpdatedServiceResult>(true);
    } catch (error) {
      return AppError.Unexpected(error);
    }
  }
}
