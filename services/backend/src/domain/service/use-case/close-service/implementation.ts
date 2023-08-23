import type { CloseServiceDTO } from '~backend/domain/service/dto';
import type { IServiceRepository } from '~backend/domain/service/repository/service/abstract';
import type { IResult } from '~backend/domain/shared/result';
import { Result } from '~backend/domain/shared/result';
import { AppError, AppErrorUnexpected } from '~backend/domain/shared/error';
import { UseCase } from '~backend/domain/shared/use-case';
import { INVALID, NOT_ALLOW } from '~backend/domain/service/error';

type CloseServiceResult = boolean;
export type Payload = CloseServiceDTO;
type Return = IResult<CloseServiceResult> | AppErrorUnexpected;

export class CloseServiceUseCase implements UseCase<Payload, Promise<Return>> {
  private serviceRepository: IServiceRepository;

  constructor(serviceRepository: IServiceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async execute(payload?: Payload): Promise<Return> {
    const { id, providerId } = payload;
    if (!providerId || !id) return Result.fail(INVALID);

    try {
      const service = await this.serviceRepository.getByIdAndProviderId(
        id,
        providerId
      );
      if (!service) return Result.fail(NOT_ALLOW);

      await this.serviceRepository.deleteById(id);
      return Result.ok<CloseServiceResult>(true);
    } catch (error) {
      return AppError.Unexpected(error);
    }
  }
}
